
import React from "react";


const AddProduct = ()=>{
const [name,setName] = React.useState('');
const [price,setPrice] = React.useState('');
const [category,setCategory] = React.useState('');
const [company,setCompany] = React.useState('');
const [error,setErrors] = React.useState('false');
const inteProduct = async ()=>{
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    // console.warn(userId._id)

     if(!name || !price || !category || !company){
        setErrors(true);
        return false;
     }

    let result = await fetch('http://localhost:4000/add-product',{
        method: 'post',
        body : JSON.stringify({name,price,category,company}),
        headers : {'Content-Type':'application/json'}
    });
    result = await result.json();
    console.warn(result);
}
    return(
        <div className="add-product">
            <h1>add product</h1>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="enter Product name"/>
            {error && !name && <span>name should be require</span>}
            <input type="text" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder="price"/>
            {error && price == Number && !price && <span>price should be require</span>}
            <input type="text" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder="Category"/>
            {error && !category && <span>category should be require</span>}
            <input type="text" onChange={(e)=>setCompany(e.target.value)} value={company} placeholder="company"/>
            {error && !company && <span>company should be require</span>}
            <button type="button" onClick={inteProduct}>Add button</button>
        </div>
    )
}


export default AddProduct;