import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import {  Modal, Space } from 'antd';
import $ from 'jquery';
//add
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'; 

import TextField from '@mui/material/TextField';

const { confirm } = Modal;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
}));

//end


const ListProduct = ()=>{
  $('.ant-fade').hide();
  $('.ant-modal-root').hide();
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
         result = await result.json();
         setProducts(result);
    }
    console.warn('produ-list:',products);


    const deletepro = async (id)=>{
      $('.ant-modal-root').show();
      $('.ant-fade').show();
      
      confirm({
        title: 'Do you Want to delete this Product?',
        //content: 'Some descriptions',
        onOk:  async ()=>{
          let data = await fetch(`http://localhost:4000/delete/${id}`,{
            method: 'delete',    
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            });
            data = await data.json();
            if(data){
                getProduct();
          }else alert('no found')
        },
        onCancel() {
          console.log('Cancel');
          $('.ant-fade').hide();
          $('.ant-modal-root').hide();
        },
      });
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
                   <TextField
                        label="Search field"
                        type="search"
                        variant="standard"
                        onChange={searchitem}
        />   
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">sr. Number</StyledTableCell>
            <StyledTableCell align="center">Product name</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Company</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          products.length > 0 ? products.map((items,index)=> (
            <StyledTableRow key={items.name}>
              <StyledTableCell align="center">{index+1}</StyledTableCell>
              <StyledTableCell align="center">{items.name}</StyledTableCell>
              <StyledTableCell align="center">{items.price}</StyledTableCell>
              <StyledTableCell align="center">{items.category}</StyledTableCell>
              <StyledTableCell align="center">{items.company}</StyledTableCell>
              <StyledTableCell align="center">
                <Stack spacing={1} direction="row">
                        <Button variant="contained" onClick={()=>deletepro(items._id)}>Delete</Button>
                        <Button variant="outlined" color="success"><Link to={'/update/'+items._id}>update</Link></Button>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ) ):
          <StyledTableRow><StyledTableCell align="center" colSpan={6}>no data found</StyledTableCell></StyledTableRow>
          }
        </TableBody>
      </Table>
    </TableContainer> 
        </div>
    )
}


export default ListProduct;