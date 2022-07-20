// const express =require('express');
// const app =  express();
// const mongoose = require('mongoose');

// const data = async ()=>{
//     mongoose.connect('mongodb://localhost:27017/nodedb');
//     const nodeSchema = await new mongoose.Schema({});
//     const node = mongoose.model('node1',nodeSchema);
//     const data =  await node.find();
//     console.log(data);
// }
// data();

//create api for signup
require('./db/config');
const express =require('express');
const app =  express();
const mongoose = require('mongoose');
const users = require('./db/users');
const cors =  require('cors')
app.use(cors());
app.use(express.json())
        app.post('/register',async (req,resp)=>{
            let me  = new users(req.body);
            let result = await me.save();
            result = result.toObject();
            delete result.password;
            resp.send(result);
            console.log(result);
        })

app.post('/login', async (req,resp)=>{
    console.warn(req.body)
  if(req.body.email && req.body.password){ 
    let data  = await users.findOne(req.body).select('-password');
    if(data){
        resp.send(data);
    }else{
    resp.send({result:'sorry no data found'});
    }
   }else{
    resp.send({result:'sorry no data found'});
   }
});
app.listen(4000);
