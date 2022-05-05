import ShoppingList from './pages/ShoppingList';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthenticationProvider from "./AuthenticationProvider";
import { RequireAuth } from './RequireAuth';

function App () {

    return (
      <AuthenticationProvider>
        <Router>
          <Header />
          <main className="container">
            <Routes>
              
                <Route path="/" element={<RequireAuth><ShoppingList /></RequireAuth>} />
             
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
          </main>
        </Router>	 
    </AuthenticationProvider>
    
    )
}

export default App;





