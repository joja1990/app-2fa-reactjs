import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalContext";
import { useHistory } from "react-router-dom";
import QRCodeGenerator from './QR';
import NavBar from "./NavBar";
import "../Dashboard.css";  // Estilo vinculado
const TwoFactor = () => {
  const { loggedInUser, editSuccess, changeCurrentUser } = useGlobalState();
  const [userSecret, setUserSecret] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const history = useHistory();
console.log(loggedInUser.user.email);
  const getSecret = async () => {
    const res = await fetch(process.env.REACT_APP_URL_API+"/api/2fa/activate");
    const data = await res.json();
    if (data.status === "success") {
      setUserSecret(data.tempSecret);
    }
  };

  const verifySecret = async () => {
    setErr("");
    const submission = await fetch(process.env.REACT_APP_URL_API+"/api/2fa/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: userSecret,
        userId: loggedInUser.user.id,
        token: pin,
      }),
    });
    const res = await submission.json();
    if (res.verified) {
      editSuccess("2FA activated successfully!");
      localStorage.setItem("didAuth", "true");
      localStorage.setItem("authed", userSecret);
      changeCurrentUser({
        ...loggedInUser,
        user: {
          ...loggedInUser.user,
          secret: userSecret,
        },
      });
      history.push("/dashboard");
    } else {
      setErr("PIN incorrecto! Ingrese nuevamente.");
    }
  };

  useEffect(() => {
    getSecret();
  }, []);
  return (

    <div className="admin-dashboard">
       <NavBar/>
      <div  >
        <h3 className="text-center">2FA Activation</h3>
        {err ? (
          <div
            className="alert alert-danger alert-dismissible fade show w-50 m-auto"
            role="alert"
          >
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {err}
          </div>
        ) : null}
        <p className="text-center">
          1- Utiliza tu telefono para escanear este codigo, asegurate de tenerlo siempre
        </p>
        <p className="text-center" style={{ color: "red", lineHeight: "0px" }}>
          Clave segura
        </p>
        <p className="text-center" style={{ fontSize: 20 }}>
        |<QRCodeGenerator value={`otpauth://totp/grupo6UMG:${loggedInUser.user.email}?secret=${userSecret}`} />
           
        </p>
        <p className="text-center">
          2- Ingresa el Pin de Google Authenticator
        </p>
        <div className="text-center">
          <input
            type="number"
            placeholder="PIN"
            className="form-control w-25 m-auto text-center"
            required
            onChange={(e) => setPin(e.target.value)}
            min={0}
          />
        </div>
        <br />
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={verifySecret}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactor;
