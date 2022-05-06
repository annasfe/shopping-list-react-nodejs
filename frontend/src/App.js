import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ShoppingList from './pages/ShoppingList';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import AuthenticationProvider from "./AuthenticationProvider";
//import { RequireAuth } from './RequireAuth';
import { useLoader } from "./LoadContext";

function App () {
  const { isLoading } = useLoader();

  return (
      <AuthenticationProvider>
        {isLoading ? (
          <div class="loader">Loading...</div>
        ) : (
        <Router>
          <Header />
          <main className="container">
            <Routes>
                <Route path="/" element={<ShoppingList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
              </Routes>
          </main>
        </Router>
        )}	 
    </AuthenticationProvider>
    
    )
}

export default App;





