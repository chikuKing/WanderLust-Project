const express= require("express");
const router = express.Router();//Creating a new router object 



//Index Users
router.get("/", (req, res)=>{
    res.send("GET for posts");
    });
    
    //Show Users
    router.get("/:id", (req, res)=>{
    res.send("GET for posts id");
    });
    
    //Post Users
    router.post("/", (req, res)=>{
    res.send("Post for posts");
    });
    
    
    //Delete Users
    router.delete("/:id", (req, res)=>{
    res.send("Delete for pos id ");
    });


    module.exports= router;