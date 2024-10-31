import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalState } from "../context/GlobalContext";
import "../login.css"; // Asegúrate de tener el archivo CSS vinculado

const Login = () => {
  const {
    changeCurrentUser,
    toggleLoading,
    error,
    editError,
    success,
    editSuccess,
  } = useGlobalState();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const history = useHistory();

  function loginUser(e) {
    toggleLoading(true);
    editSuccess("");
    changeCurrentUser({ user: "", status: "", two_fa_Validated: false });
    e.preventDefault();
    editError("");
    fetch(process.env.REACT_APP_URL_API+"/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    })
      .then((res) => res.json())
      .then((dataRes) => {
        if (dataRes.status === "error") {
          editError(dataRes.message);
        } else {
          localStorage.setItem("myToken", dataRes.token);
          localStorage.setItem("authed", dataRes.message.secret);
          changeCurrentUser({
            user: dataRes.message,
            status: dataRes.status,
            two_fa_Validated: false,
          });
          history.push(dataRes.message.secret ? "/user/validate" : "/dashboard");
        }
      })
      .catch(() => {
        editError("Error del servidor. Intenta nuevamente.");
      })
      .finally(() => toggleLoading(false));
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginUser}>
        <h2 className="login-title">Iniciar Sesión</h2>

        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Ingresar
        </button>

        <div className="register-link">
          <Link to="/register" onClick={() => editError("")}>
            ¿No tienes cuenta? Regístrate aquí.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
