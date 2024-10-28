import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";
import Register from "./pages/register";
import MovieList from "./pages/movie";
import CreateMovie from "./pages/create";
import ProtectedRoute from "./utils/protectedRoutes"; // Import your ProtectedRoute component
import './App.css';
import './css/style.css';
import './css/responsive.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protect the routes using the ProtectedRoute component */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <CreateMovie />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <ProtectedRoute>
                <CreateMovie />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
