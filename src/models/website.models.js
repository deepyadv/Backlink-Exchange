import mongoose from "mongoose";


          const websiteSchema =   mongoose.Schema({
              user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
              },

              url: {
                type: String,
                required: true,
                
             },
              
              domainAuthority:{
                type: Number,
                required: true,
              },

              categories:{
                 type: [String],
                 enum: ['Earn Money', 'Finance', 'Sarkari Yojana', 'AI']
              },

              traffic:{
                type:Number,
                required:true
              },

              language:{
                type:String,
                enum:["Hindi", "English"]
              },

              price:{
                type:Number,
                required: true
              },

              image :{
                type:String,
                required: true
            }, 
                
            }, { timestamps: true});


                export const website = mongoose.model("website", websiteSchema) 


                // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE4YWJhMjI0YTVkYTQ0MmI1NWZiYmIiLCJpYXQiOjE3NDY0NDc2ODgsImV4cCI6MTc1MDc2NzY4OH0.i1kZVXQYytfV7Ulafp-nqDSTWkaN75aDqqqt-x3YNZY"
                // 