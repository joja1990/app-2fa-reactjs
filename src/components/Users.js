import React, { useEffect } from "react";
import { useGlobalState } from "../context/GlobalContext";
import { useHistory, Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "../Dashboard.css";  // Estilo vinculado
import NavBar from "./NavBar";
const Users = () => {
  const { loggedInUser,  changeCurrentUser } = useGlobalState();
 
  useEffect(() => {
    if (loggedInUser?.user) {
      console.log("User exists");
    } else {
      const token = localStorage.getItem("myToken");
      const authed = localStorage.getItem("authed");
      if (token) {
        let decoded = jwtDecode(token);
        if (decoded?.id && decoded?.email) {
          changeCurrentUser({
            user: {
              id: decoded.id,
              email: decoded.email,
              secret: authed,
            },
            status: "success",
            two_fa_Validated: authed ? true : false,
          });
        } else {
          console.error("El token no contiene id o email.");
        }
      }
    }
  }, [loggedInUser, changeCurrentUser]);

 

  return (
    <div className="admin-dashboard">
      <NavBar/>
      <div className="content">
        <div className="header">
          <h1>Lista de usuarios,  </h1>
     
        </div>
 
        

       
       
      </div>
    </div>
  );
};

export default Users;
