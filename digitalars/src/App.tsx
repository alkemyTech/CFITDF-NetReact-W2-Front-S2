import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import * as React from 'react';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/login">Login</Link> | <Link to="/register">Crear Cuenta</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App; 