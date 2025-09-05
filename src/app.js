
import express from "express"
import CookieParser from "cookie-parser"
import cors from "cors"
const app = express()



app.use(cors({

  origin: "https://backlink-exchange-six.vercel.app/",
  
    
  credentials: true
}))

app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))
app.use(CookieParser())




import {router} from "./router/user.router.js"

app.use("/users", router);


export {app}

