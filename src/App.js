import logo from './logo.svg';
import './App.css';
import MainNavBar from './components/Navbar';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Footer from './components/Footer'
import History from './pages/History';
import Analyze from './pages/Analyze';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Details from "./pages/Details";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import RequireAuth from "./components/RequireAuth";
function App() {
  return (
    <div className="App">
      <Router>
        <MainNavBar/>
        <ToastContainer limit={3}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route
              path='/Scan'
              element={
                <RequireAuth>
                  <Scan />
                </RequireAuth>
              }
          />
          <Route
              path='/History'
              element={
                <RequireAuth>
                  <History />
                </RequireAuth>
              }
          />
          <Route
              path='/Analyze'
              element={
                <RequireAuth>
                  <Analyze />
                </RequireAuth>
              }
          />
          <Route
              path='/Details'
              element={
                <RequireAuth>
                  <Details />
                </RequireAuth>
              }
          />
        </Routes>
      </Router>
      <Footer/>
      
    </div>
  );
}

export default App;
