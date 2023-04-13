const express = require("express");
const  mongoose  = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Task = mongoose.model("Task");

require('dotenv').config();

router.get("/api/task", async (req, res) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }
  
    try {
      const token = authorization.replace("Bearer ", "");
      const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  
      const tasks = await Task.find({ owner: _id });
      res.send(tasks);
    } catch (e) {
      res.status(500).send();
    }
  });
  
  

router.post("/api/task",async (req,res)=>{
 
const {name,priority} =req.body;
const {authorization}  = req.headers;

if (!name | !priority){
    res.status(400).send({error:"Please provide all data"});
}
      else{
        const token = authorization.replace("Bearer ","")
      const {_id} = jwt.verify(token,process.env.JWT_SECRET);
      
        const task = new Task({
          name,priority,
          owner:_id,
          status: 'Pending'
        });
      
        try {
          await task.save();
          res.status(201).send({message:"Task Added successfully",task});
        } catch (e) {
          res.status(400).send(e);
        }
      }
     
})


router.patch('/api/task/:id/completed', async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
  
    if (!id) {
      return res.status(400).send({ error: 'Please provide valid task Id' });
    }
  
    try {
      const token = authorization.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const owner = decodedToken._id;
      const task = await Task.findOneAndUpdate(
        { _id: id, owner },
        { status:"Completed" },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).send({ error: 'Task not found' });
      }
      const tasks = await Task.find({ owner: owner});
      
      res.send(tasks);
      
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'Something went wrong' });
    }
  });


  router.patch('/api/task/:id/cancel', async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
  
    if (!id) {
      return res.status(400).send({ error: 'Please provide valid task Id' });
    }
  
    try {
      const token = authorization.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const owner = decodedToken._id;
      const task = await Task.findOneAndUpdate(
        { _id: id, owner },
        { status:"Canceled" },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).send({ error: 'Task not found' });
      }
      const tasks = await Task.find({ owner: owner});
      
      res.send(tasks);
      
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'Something went wrong' });
    }
  });




  router.delete('/api/task/:id/delete', async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
     
    if (!id) {
      return res.status(400).send({ error: 'Please provide valid task Id' });
    }
    
    try {
      const token = authorization.replace('Bearer ', '');
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const owner = decodedToken._id;
      const task =await Task.updateOne(
        { _id: id, owner },
        { $set: { status: "Deleted" } }
      );
      
      if (!task) {
        return res.status(404).send({ error: 'Task not found' });
      }
      
      const tasks = await Task.find({ owner: owner, status: { $ne: "Deleted" } });
      res.send(tasks);
    
        
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'Something went wrong' });
    }
  });
  
  



 

 
  
  
module.exports=router;