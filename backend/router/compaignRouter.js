import {getCompaign,getCompaignById,createCompaign,updateCompaign,deleteCompaign,
    personalizedMessage} from "../controller/compaignController.js"
    import {Router} from "express"
    const router=Router()
    router.get("/",getCompaign)
    router.get("/:id",getCompaignById)
    router.post("/",createCompaign)
    router.put("/:id",updateCompaign)
    router.delete("/:id",deleteCompaign)
    
    router.post("/personalized-message",personalizedMessage)
    
    export {router}