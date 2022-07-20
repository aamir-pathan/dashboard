import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import Signtup from './components/signup';
import PrivateComponent from './components/privatecomponent';
import Login from './components/login';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Nav/>
         <Routes>
          <Route element={<PrivateComponent/>} />
            <Route path='/' element = {<h1>this our home page</h1>} />
            <Route path='/add' element = {<h1>add page from main page</h1>} />
            <Route path='/update' element = {<h1>update page from main page</h1>} />
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
