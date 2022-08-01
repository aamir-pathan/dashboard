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
const User = require('./db/users');
const products = require('./db/products')
const cors =  require('cors')
//jwr token
const jwt = require('jsonwebtoken')
const jwtkeyy = 'itemkeys';
app.use(cors());
app.use(express.json())
        app.post('/register',async (req,resp)=>{
            let me  = new User(req.body);
            let result = await me.save();
            result = result.toObject();
            delete result.password;
            jwt.sign({result}, jwtkeyy, {expiresIn:'5h'}, (err,token)=>{
                if(err){
                    resp.send({result: "ohh no rsult found jwt error"})
                }
                resp.send({result, authh:token});
            })
            //resp.send(result);
            console.log(result);
        })

app.post('/login', async (req,resp)=>{
    console.warn(req.body)
  if(req.body.email && req.body.password){ 
    let data  = await User.findOne(req.body).select('-password');
    if(data){
        jwt.sign({data}, jwtkeyy, {expiresIn:'5h'}, (err,token)=>{
            if(err){
                resp.send({result: "ohh no rsult found jwt error"})
            }
            resp.send({data, authh:token});
        })
        //resp.send(data);
    }else{
    resp.send({result:'sorry no data found'});
    }
   }else{
    resp.send({result:'sorry no data found outer'});
   }
});

app.post('/add-product', async(req,resp)=>{
    let getproduct = new products(req.body);
    let pro = await getproduct.save();
    resp.send(pro);
})

app.delete('/delete/:id', async (req,resp)=>{
    //resp.send(req.params.id);
    let result = await products.deleteOne({_id:req.params.id})
    resp.send(result);
})
app.get('/getproduct/:ids',async (req,resp)=>{
     let data =  await products.findOne({_id:req.params.ids})
     resp.send(data);
})
app.put('/update/:ide',async (req,resp)=>{
    let data = await products.updateOne(
        {_id: req.params.ide},
        {
            $set : req.body
        }
        );
        resp.send(data)
})

app.get('/products', async (req,resp)=>{
    let getProducts = await products.find({});
    if(getProducts.length > 0){
        resp.send(getProducts);
    }else resp.send({result:"no result found"});
})

app.get("/search/:keys",async(req,resp)=>{
    let result = await products.find(
        {
           '$or': [
                    {name: {$regex: req.params.keys}},
                    {price: {$regex: req.params.keys}}
                  ]
        }
    )
    resp.send(result);
})


app.listen(4000);
