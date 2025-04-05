import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";
import './heder.css'; // Import your CSS file for styling


function Header() {
    const [dropdown, setDropdown] = useState(null);
  
    const toggleDropdown = (role) => {
      setDropdown(dropdown === role ? null : role);
    };
  
    const roles = ["admin", "faculty", "student"];
  
    return (
      <nav className=" navsetbar navbar navbar-expand-lg navbar-light bg-light px-4 py-3 shadow-sm position-relative"
        >
  
        {}
        <ul className="navbar-nav d-flex flex-row gap-4">
          {roles.map((role) => (
            <li className="nav-item dropdown" key={role}>
              <button
                className="btn btn-link nav-link dropdown-toggle text-capitalize"
                onClick={() => toggleDropdown(role)}
              >
                {role}
              </button>
              {dropdown === role && (
                <ul className="dropdown-menu show position-absolute">
                  <li><Link className="dropdown-item" to={`/${role}/login`}>Login</Link></li>
                  <li><Link className="dropdown-item" to={`/${role}/signin`}>Sign Up</Link></li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  

  export default Header; // ✅ CORRECT
