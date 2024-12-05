import './App.css';
import MainNavBar from './components/Navbar';
import Scan from './pages/Scan';
import Footer from './components/Footer'
import History from './pages/History';
import Analyze from './pages/Analyze';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Details from "./pages/Details";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Label from "./pages/Label";
import LabelAnalysis from "./pages/LabelAnalysis";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import { ConnectionProvider } from "./utils/ConnectionContext";
import RequireConnection from "./components/RequireConnection";

function App() {
  return (
    <div className="App">
        <ConnectionProvider>
      <Router>
        <MainNavBar/>
        <ToastContainer limit={3}/>
          <div style={{flex: "1"}}>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route
                      path='/Scan'
                      element={
                          <RequireAuth>
                              <RequireConnection>
                                  <Scan />
                              </RequireConnection>
                          </RequireAuth>
                      }
                  />
                  <Route
                      path='/Label'
                      element={
                          <RequireAuth>
                              <RequireConnection>
                                  <Label />
                              </RequireConnection>
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
                  <Route
                      path='/LabelAnalysis'
                      element={
                          <RequireAuth>
                              <RequireConnection>
                                  <LabelAnalysis />
                              </RequireConnection>
                          </RequireAuth>
                      }
                  />
                  <Route
                      path='/Achievements'
                      element={
                          <RequireAuth>
                              <RequireConnection>
                                  <Achievements />
                              </RequireConnection>
                          </RequireAuth>
                      }
                  />
                  <Route
                      path='/Leaderboard'
                      element={
                          <RequireAuth>
                              <RequireConnection>
                                  <Leaderboard />
                              </RequireConnection>
                          </RequireAuth>
                      }
                  />
                  <Route
                      path='/Settings'
                      element={
                          <RequireAuth>
                              <RequireConnection>
                                  <Settings />
                              </RequireConnection>
                          </RequireAuth>
                      }
                  />
              </Routes>
          </div>
        <Footer/>
      </Router>
        </ConnectionProvider>

    </div>
  );
}

export default App;
