 import mongoose from "mongoose";

 const orderSchema  = new mongoose.Schema({
       
         seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
         },

         buyer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
         },

         website: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "website",
            required: true
         },

         paymentAmount: {
            type: Number,
            required: true
         },
         buyerLink:{
            type: String,
            required: true
         },

         status:{
            type: String,
            enum: ["pending","complete"],
            default: "pending"
         },
         
         razorpayOrderId: {
            type: String,
            required: true,
            unique: true,
          },


 }, { timestamps: true})


 export const order  = mongoose.model("order", orderSchema)