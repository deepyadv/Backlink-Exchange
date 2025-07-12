import mongoose from "mongoose"; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



const userSchema = new mongoose.Schema(
    {
         name: {
            type: String,
             required: [true, "name is required"],
             unique: true,
             
        },

        email:{
            type: String,
            required: [true, "email is required"],
            unique: true,

        },

        password: {

            type: String,
            required: true,
            minlength:[6, "password must be at least 6 characters"]
        },

        username: {
                type: String,
                required: true,
                unique: true
        },

        role: {
            type: String,
            enum: ["buyer", "seller", "admin"],
            default: "buyer" 
          },

        refreshToken:{

            type: String,
            default: null
        },
        

    }
);  
               
          // using bcrypt library for hash password

           try {
            userSchema.pre("save", async function(next){
 
             if(!this.isModified("password")) return next();
 
             this.password = await bcrypt.hash(this.password, 14)
 
             next() 
            });
 
            // using custom methods for compare password
 
            userSchema.methods.isPasswordCorrect = async function (password) {
             
                  return bcrypt.compare(password, this.password)
 
            };
           } catch (error) {
               throw new Error("password does not match")
           }

           // generating ACCESS_TOKEN 

           userSchema.methods.generateAccessToken = async function(){
              
              return jwt.sign({
                  _id: this._id,
            
             },

               process.env.ACCESS_TOKEN_SECRET,
               {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
               }
            
            )};
             
            // generating REFRESH_TOKEN

            userSchema.methods.generateRefreshToken = async function () {
                
               return jwt.sign({
                    _id: this._id,
               },
  
                 process.env.REFRESH_TOKEN_SECRET,
                 {
                  expiresIn: process.env.REFRESH_TOKEN_EXPIRY
                 }
              
              )

            }
   

export const User = mongoose.model("User", userSchema)


 