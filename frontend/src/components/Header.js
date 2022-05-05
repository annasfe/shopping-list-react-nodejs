import { Link, NavLink } from 'react-router-dom'
import { useAuthentication } from "../AuthenticationProvider";

const Header = () => {

  const { authData } = useAuthentication();

  return (
    <header>
    <nav> 
        <ul>
           { authData?.name ? 
            (<li>
            <NavLink to="/">
              Shopping List
            </NavLink>
            </li>) : 
            (<><li>
              <NavLink to="/login">
              Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
              Register
              </NavLink>
            </li></>) }      
        </ul>
    </nav>
    </header>
  )
}

export default Header