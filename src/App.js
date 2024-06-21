import logo from './logo.svg';
import './App.css';
import MainNavBar from './components/Navbar';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';

import Scan from './pages/Scan';
import Footer from './components/Footer'
import History from './pages/History';
import Analyze from './pages/Analyze';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Details from "./pages/Details";
function App() {
  return (
    <div className="App">
      <Router>
        <MainNavBar/>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/Scan' Component={Scan}></Route>
          <Route path='/History' Component={History}></Route>
          <Route path='/Analyze' Component={Analyze}></Route>
          <Route path='/Login' Component={LoginRegister}></Route>
          <Route path='/Details' Component={Details}></Route>
        </Routes>
      </Router>
      <Footer/>
      
    </div>
  );
}

export default App;
