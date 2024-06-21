import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainNavBar from './components/Navbar';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Scan from './pages/Scan';
import Footer from './components/Footer';
import History from './pages/History';
import Analyze from './pages/Analyze';
import Details from './pages/Details';
import useAuth from './services/AuthService';
import PrivateRoute from './PrivateRoute';

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="App">
      <Router>
        <MainNavBar isAuthenticated={isAuthenticated} logout={logout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginRegister />} />
          <Route element={<PrivateRoute />}>
            <Route path="/Scan" element={<Scan />} />
            <Route path="/History" element={<History />} />
            <Route path="/Analyze" element={<Analyze />} />
            <Route path="/Details" element={<Details />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
