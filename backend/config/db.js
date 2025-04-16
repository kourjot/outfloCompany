import {connect} from "mongoose"
import "dotenv/config"
const Connection=async()=>{
    try{
        await connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")

    }catch(err){
        console.log("Error in Connect with DataBase",err.message)
    }
}

export {Connection}