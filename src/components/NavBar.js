import React from 'react';
import "../Dashboard.css";
import { useGlobalState } from "../context/GlobalContext";
import { useHistory, Link } from "react-router-dom";
const NavBar = ({ value }) => {
    const { editSuccess} = useGlobalState();
    const history = useHistory();
    const signOut = () => {
        localStorage.removeItem("myToken");
        localStorage.removeItem("authed");
        localStorage.removeItem("didAuth");
        editSuccess("Su sesión se cerró!");
        history.push("/");
      };

  return (
    <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/users">Users</Link></li>
           
        </ul>
        <button className="btn-logout" onClick={signOut}>Cerrar sesión</button>
      </div>
  );
};

export default NavBar;
