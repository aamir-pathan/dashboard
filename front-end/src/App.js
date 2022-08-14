import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import Signtup from './components/signup';
import PrivateComponent from './components/privatecomponent';
import Login from './components/login';
import AddProduct from './components/addproduct';
import ListProduct from './components/productlist';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Updateproduct from './components/updateproducts';
import Demo from './demo';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Nav/>
         <Routes>
          <Route element={<PrivateComponent/>} />
            <Route path='/' element = {<ListProduct/>} />
            <Route path='/add' element = {<AddProduct/>} />
            <Route path='/update/:id' element = {<Updateproduct/>} />
            <Route path='/logout' element = {<h1>logout page from main page</h1>} />
          <Route/>
          <Route path='/signup' element = {<Signtup/>} />
          <Route path='/login' element = {<Login/>} />
         </Routes>
         </BrowserRouter>
         <Footer/>
    </div>
  );
}

export default App;
