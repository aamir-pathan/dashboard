
import React, { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 

const AddProduct = ()=>{
const [name,setName] = React.useState('');
const [price,setPrice] = React.useState('');
const [category,setCategory] = React.useState('');
const [company,setCompany] = React.useState('');
const [error,setErrors] = React.useState('false');

const inteProduct = async ()=>{
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    // console.warn(userId._id)
    let me  = price;
    if(!isNaN(me)){
        console.warn(me);
        setErrors(true);
        return false;
    }

     if(!name || !price || !category || !company){
        setErrors(true);
        return false;
     } 

    let result = await fetch('http://localhost:4000/add-product',{
        method: 'post',
        body : JSON.stringify({name,price,category,company}),
        headers : {'Content-Type':'application/json',
                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`}
    });
    result = await result.json();
    console.warn(result);
}
    return(
        <div className="add-product">
            <h1>add product</h1>
        <div className="text-wrapper">
            <TextField label="Enter Product name" onChange={(e)=>setName(e.target.value)} value={name} type="text" variant="standard"/>
            {error && !name && <span>name should be require</span>}
        </div> 

        <div className="text-wrapper">
            <TextField label="Price" pattern="[A-Za-z0-9]" onChange={(e)=>setPrice(e.target.value)} value={price} type="text" variant="standard"/>
            {error && !price && <span>price require </span>}
        </div>    

        <div className="text-wrapper">
            <TextField label="Category" onChange={(e)=>setCategory(e.target.value)} value={category} type="text" variant="standard"/>
            {error && !category && <span>category should be require</span>}
        </div>
       <div className="text-wrapper">
            <TextField label="Company" onChange={(e)=>setCompany(e.target.value)} value={company}  type="text" variant="standard"/>
            {error && !company && <span>company should be require</span>}
       </div>
            <Button variant="contained" type="button" color="error" onClick={inteProduct}>Add button</Button>
        </div>
    )
}


export default AddProduct;