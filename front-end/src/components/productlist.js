import React, { useState , useEffect } from "react";

const ListProduct = ()=>{
    const [products,setProducts] = useState([]);

// LOAD WHEN COMPONETS CALL
    useEffect(() => {
        getProduct();
    },[])

    const getProduct = async()=>{
        let result = await fetch('http://localhost:4000/products');

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
        method: 'delete'    
    });
    data = await data.json();
    if(data){
        getProduct(); 
       alert("Dlete data successful");
      }else alert('no found')
    }
    return(
        <div className="product-list-container">
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
                products.map((items,index)=>
             <>
                <tr>

                    <td>{index+1}</td>
                    <td>{items.name}</td>
                    <td>{items.price}</td>
                    <td>{items.category}</td>
                    <td>{items.company}</td>
                    <td><button type="button" onClick={()=>deleteProject(items._id)}>Delete</button></td>
                </tr>
            </>   
                            )
                        }
           </tbody>
        </table>
        </div>
    )
}


export default ListProduct;