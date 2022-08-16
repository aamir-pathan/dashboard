import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button'; 

const Updateproduct = ()=>{
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const params = useParams();
    useEffect(()=>{
        getProduct();
        console.warn(params);
    },[])
    const getProduct = async ()=>{
        let data = await fetch(`http://localhost:4000/getproduct/${params.id}`,{
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
        data = await data.json();
        //console.warn(data);
        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setCompany(data.company);
    }

    const ListUpdate = async()=>{   
        let data = await fetch(`http://localhost:4000/update/${params.id}`,{
            method : 'put',
            body: JSON.stringify({price,company,name,category}),
            headers: {"Content-Type":"application/json",
                      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                  }
        })
        console.warn(price,company,name,category); 
        data = await data.json();
    }


    return(

        <div className="update-product">
        <h1>Update product</h1>
        <div>
            <TextField label="enter Product name" onChange={(e)=>setName(e.target.value)} value={name} type="text" variant="standard"/>
            <TextField label="Price" onChange={(e)=>{setPrice(e.target.value)}} value={price} type="text" variant="standard"/>
            <TextField label="Category" onChange={(e)=>{setCategory(e.target.value)}} value={category} type="text" variant="standard"/>
            <TextField label="Company" onChange={(e)=>{setCompany(e.target.value)} }value={company}  type="text" variant="standard"/>
        </div>
        <Button variant="contained" type="button" onClick={ListUpdate} color="error">Update</Button>
    </div>
    )
}

export default Updateproduct;