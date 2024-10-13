import logo from './logo.svg';
import './App.css';
import MainNavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Scan from './pages/Scan';
import Footer from './components/Footer'
import History from './pages/History';
import Analyze from './pages/Analyze';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Details from "./pages/Details";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
function App() {
  return (
      <div>
      <Router>
          <MainNavBar/>
          <ToastContainer limit={3}/>
          <Routes>
              <Route path='/' Component={Home}></Route>
              <Route path='/Scan' Component={Scan}></Route>
              <Route path='/History' Component={History}></Route>
              <Route path='/Analyze' Component={Analyze}></Route>
              <Route path='/Login' Component={Login}></Route>
              <Route path='/Register' Component={Register}></Route>
              <Route path='/Details' Component={Details}></Route>
          </Routes>
      </Router>
    <Footer/>
      </div>
  );
}

export default App;
