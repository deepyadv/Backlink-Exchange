import dotenv from "dotenv";
import express from "express"
import http from "http";
import { DB_NAME } from "./constants.js"
import connectDB from "./db/indax.js";
import { app } from "./app.js";
import { Server } from "socket.io"
import { message } from "./models/message.model.js"




dotenv.config({
    path: "./env"
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend
    credentials: true,
  },
});

io.on("connection", (socket) => {
    console.log("🔌 New socket connection:", socket.id);
  
    // Join room for private messaging (optional)
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`📥 User ${userId} joined their own room`);
    });
  
    socket.on("sendMessage", async ({ sender, receiver, content }) => {
      try {
        // Save message to DB
        const newMessage = await message.create({ sender, receiver, content });
  
        // Emit message to receiver's room
        io.to(receiver).emit("receiveMessage", newMessage);
  
        // Optionally: echo to sender
        io.to(sender).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("❌ Error sending message:", error);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

connectDB()
.then(() =>{
    server.listen(process.env.PORT , () =>{
        console.log(`App is running on ${process.env.PORT}`)
    })
})

.catch((err) =>{
    console.log("MONGOODB CONNECTION FAILED", err)
})





  
  
  
  

  
