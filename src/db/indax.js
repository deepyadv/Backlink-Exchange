import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB  = async () =>{

try {

   const database = await mongoose.connect(`${process.env
                          .MONGODB_URI}${process.env.DB_NAME}`)
                    

                          console.log("MongoDb Connected !!")
                          
} catch (error) {
    console.log("ERROR :", error)
    process.exit(1)
}

}

export default connectDB