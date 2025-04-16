import {Compaign} from "../model/compaignSchema.js"

import "dotenv/config"

const getCompaign=async(req,res)=>{
    try{
        const compaign=await Compaign.find({status:{$ne:"deleted"}})
        res.status(200).json(compaign)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

const getCompaignById=async(req,res)=>{
    const {id}=req.params
    try{
        const compaign=await Compaign.findById(id)
        if(!compaign){
            return res.status(404).json({error: "Compaign not found"})
        }
        res.status(200).json(compaign)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

const createCompaign=async(req,res)=>{
    const {name,description,status,leads,accountIDs}=req.body
    try{
        if(!name || !description || !status || !leads || !accountIDs){
            return res.status(400).json({error: "All fields are required"})
        }
        const compaign=await Compaign.create({name,description,status,leads,accountIDs})
        await compaign.save()
        res.status(201).json(compaign)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
const updateCompaign=async(req,res)=>{
    const {id}=req.params
    try{
        
        const compaign=await Compaign.findByIdAndUpdate(id,req.body,{new:true})
        if(!compaign){
            return res.status(404).json({error: "Compaign not found"})
        }
        await compaign.save()
        res.status(200).json({msg:"Compaign updated sussceefully",compaign})

        
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
const deleteCompaign=async(req,res)=>{
    const {id}=req.params
    try{
        const compaign=await Compaign.findByIdAndUpdate(id,{status:"deleted"},{new:true})
        if(!compaign){
            return res.status(404).json({error: "Compaign not found"})
        }
        await compaign.save()
        res.status(200).json({msg:"Compaign deleted sussceefully"})
    }catch(err){
        res.status(500).json({error: err.message})
}
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const  personalizedMessage =async(req,res)=>{
    const {name, job_title, company, location, summary}=req.body
    try{
        const prompt = `
        Create a short, personalized LinkedIn outreach message based on the profile below:
        
        - Name: ${name}
        - Job Title: ${job_title}
        - Company: ${company}
        - Location: ${location}
        - Summary: ${summary}
        
        The message should:
        - Be 1–2 lines long
        - Mention the person's role and company
        - Highlight how Outflo (an AI sales outreach tool) can help
        - Include a friendly call to action to connect
        
        Respond with only the outreach message text, no bullet points or extra explanation.
        `;
        



        const url =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
        const request = {
          contents: [{ parts: [{ text: prompt }] }],
        };
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const textResponse = data.candidates[0].content.parts[0].text.trim();
    
        return res.status(200).json({ message: textResponse });

    }catch(error){
        console.error("Error generating outreach message:", error);
        return res.status(500).send("Error generating message.");

    }
}

  
export {getCompaign,getCompaignById,createCompaign,updateCompaign,deleteCompaign,personalizedMessage}