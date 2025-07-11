import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import { Toaster } from 'react-hot-toast';
import UserDashboardEdit from "./pages/userDashboardEdit";


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Toaster />
        <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/userDashboardEdit" element={<UserDashboardEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
