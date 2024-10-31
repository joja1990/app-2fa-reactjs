import React, { useEffect } from "react";
import { useGlobalState } from "../context/GlobalContext";
import { useHistory, Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "../Dashboard.css";  // Estilo vinculado
import NavBar from "./NavBar";
const Dashboard = () => {
  const { loggedInUser, editSuccess, success, changeCurrentUser } = useGlobalState();
  const history = useHistory();

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

  const signOut = () => {
    localStorage.removeItem("myToken");
    localStorage.removeItem("authed");
    localStorage.removeItem("didAuth");
    editSuccess("Su sesión se cerró!");
    history.push("/");
  };

  return (
    <div className="admin-dashboard">
      <NavBar/>
      <div className="content">
        <div className="header">
          <h1>Bienvenido, {loggedInUser?.user?.email}</h1>
          <p>Administrar tu cuenta y revisa las estadísticas de seguridad.</p>
        </div>

        {!loggedInUser?.user?.secret && (
          <div className="alert">
            <strong>
              Aún no has activado la autenticación de dos factores. {" "}
              <Link to="/dashboard/2fa" className="activate-2fa">
                Activa la seguridad con Google Authenticator
              </Link>
            </strong>
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <div className="stat-card">
          <h3>Usuarios Activos</h3>
          <p>45</p>
        </div>
        <div className="stat-card">
          <h3>Intentos de Inicio de Sesión Fallidos</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
