import logo from './logo.svg';
import './App.css';
import MainNavBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Scan from './pages/Scan';
import History from './pages/History';
import Analyze from './pages/Analyze';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
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
          <Route path='/Login' Component={Login}></Route>
          <Route path='/Register' Component={Register}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
