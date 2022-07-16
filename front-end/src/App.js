import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import Signtup from './components/signup';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Nav/>
         <Routes>
          <Route path='/' element = {<h1>this our home page</h1>} />
          <Route path='/add' element = {<h1>add page from main page</h1>} />
          <Route path='/update' element = {<h1>update page from main page</h1>} />
          <Route path='/signup' element = {<Signtup/>} />
         </Routes>
         </BrowserRouter>
         <Footer/>
    </div>
  );
}

export default App;
