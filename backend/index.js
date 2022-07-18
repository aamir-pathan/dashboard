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
    let user  = new users(req.body);
    let result = await user.save();
    resp.send(result);
})
app.listen(4000);
