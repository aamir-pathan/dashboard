import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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
        let data = await fetch(`http://localhost:4000/getproduct/${params.id}`);
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
            headers: {"Content-Type":"application/json"}
        })
        console.warn(price,company,name,category); 
        data = await data.json();
    }


    return(

        <div className="add-product">
        <h1>Update product</h1>
        <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="enter Product name"/>
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder="price"/>
            <input type="text" onChange={(e)=>{setCategory(e.target.value)}} value={category} placeholder="Category"/>
            <input type="text" onChange={(e)=>{setCompany(e.target.value)} }value={company} placeholder="company"/>
        <button type="button" onClick={ListUpdate}>update button</button>
    </div>
    )
}

export default Updateproduct;