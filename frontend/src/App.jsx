import React, { useState } from 'react';
// react-router
import {
    BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

//importing pages and components
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MapsPage from './pages/MapsPage'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'
import FormLogin from './components/FormLogin'
import FormRegister from './components/FormRegister'
// style
import './App.css'

function App() {
  //hooks for checking role of a user
  const [userStatus, setUserStatus] = useState(false);
  const [adminStatus, setAdminStatus] = useState(false);
  
  return (
    <div className="App">
      <Router>
        <Header userStatus={userStatus} setUserStatus={setUserStatus} adminStatus={adminStatus} setAdminStatus={setAdminStatus}/>  
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<MapsPage />} path="/maps" />
          <Route element={<AdminPage />} path="/admin" />
          <Route element={<FormLogin setUserStatus={setUserStatus} setAdminStatus={setAdminStatus}/>} path="/login" />
          <Route element={<FormRegister />} path="/register" />
          <Route element={<NotFound />} path='*' />
        </Routes>
      </Router>  
    </div>
  )
}

export default App;
