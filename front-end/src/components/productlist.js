import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";

const ListProduct = ()=>{
    const [products,setProducts] = useState([]);

// LOAD WHEN COMPONETS CALL
    useEffect(() => {
        getProduct();
    },[])

    const getProduct = async()=>{
        let result = await fetch('http://localhost:4000/products',{
            headers: {
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        // no need to use method ,headers etc due to get mehtod
        //    method : 'post',
        //    body: JSON.stringify({nam,price,category,company}),
        //    headers: {"Content-Type":"application/json"}
         result = await result.json();
         setProducts(result);
    }
    console.warn('produ-list:',products);

    const deleteProject = async (id)=>{   
         //console.warn(id);
        let data = await fetch(`http://localhost:4000/delete/${id}`,{
            method: 'delete',    
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
        data = await data.json();
        if(data){
            getProduct(); 
        alert("Dlete data successful");
      }else alert('no found')
    }

    const searchitem = async (ee)=>{
        //console.warn(ee.target.value)
        let itemValue = ee.target.value;
        if(itemValue){
            let result = await fetch(`http://localhost:4000/search/${itemValue}`,{
                headers: {
                  authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            });
            result = await result.json();
            if(result){
                setProducts(result)
            }
       }else{
        getProduct();     
       }
    }
    return(
        <div className="product-list-container">
            <input type="text" placeholder="Search item" onChange={searchitem}/>
        <table>
           <thead>
           <tr>
           <th>sr. Number</th>
            <th>Product name</th>
            <th>Price</th>
            <th>Category</th>
            <th>company</th>
            <th>Actions</th>
            </tr>
           </thead>
           <tbody>
           {   
            products.length > 0 ? products.map((items,index)=>
             <>
                <tr key={items}>

                    <td>{index+1}</td>
                    <td>{items.name}</td>
                    <td>{items.price}</td>
                    <td>{items.category}</td>
                    <td>{items.company}</td>
                    <td><button type="button" onClick={()=>deleteProject(items._id)}>Delete</button>
                        <Link to={'/update/'+items._id}>update</Link>
                    </td>
                </tr>
            </>   
                            )
             : <tr><td>No reuslt found</td></tr>

                        }
           </tbody>
        </table>
        </div>
    )
}


export default ListProduct;