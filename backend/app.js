import express from "express"
import {Connection} from "./config/db.js"
import {router} from "./router/compaignRouter.js"
import {logRequests} from "./middleware/logger.js"

import "dotenv/config"
import cors from "cors"
const app=express()
app.use(cors())
app.use(express.json())
app.use(logRequests);
app.use("/compaign",router)

  
app.get("/",(req,res)=>{
    res.send("Server is Healthy")
})


app.listen(3000,()=>{
    Connection()
    console.log("Server is running on port http://localhost:3000")
})