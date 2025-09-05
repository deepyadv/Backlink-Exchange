import dotenv from "dotenv";
import express from "express";
import http from "http";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/indax.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import { Message } from "./models/message.model.js";

dotenv.config({
  path: "./.env"
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:  "https://backlink-exchange-six.vercel.app",
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("🔌 New socket connection:", socket.id);

  socket.on("join", (userId) => {
    console.log("my user id:", userId)
    socket.join(userId);
    console.log(`📥 User ${userId} joined their own room`);
  });

  socket.on("sendMessage", async ({ sender, receiver, content }) => {
    console.log("📩 Incoming Message Payload:");
    console.log("Sender:", sender);
    console.log("Receiver:", receiver);
    console.log("Content:", content);

    if (!sender || !receiver || !content) {
      console.error("❌ Missing sender, receiver, or content");
      return;
    }

    try {
      const newMessage = await Message.create({ sender, receiver, content });
      console.log("✅ Message saved to DB:", newMessage);

     
      io.to(receiver).emit("receiveMessage", newMessage);

      
     
    } catch (error) {
      console.error("❌ Error saving message to DB:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});


connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`🚀 App running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
