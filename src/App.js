import "./App.css";
import React, { useEffect } from "react";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ContextProvider } from "./context/GlobalContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthedRoute from "./components/AuthedRoute";
import TwoFactor from "./components/twoFactor";
import Validation from "./components/validation";
import Users from "./components/Users";
function App() {
  return (
    
      
      <ContextProvider>
        <Router>
          <Switch>
            <AuthedRoute exact path="/" component={Login} />
            <AuthedRoute path="/register" component={Register} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/settings" component={Dashboard} />
            <ProtectedRoute exact path="/users" component={Users} />
            <ProtectedRoute path="/dashboard/2fa" component={TwoFactor} />
            <ProtectedRoute path="/user/validate" component={Validation} />
          </Switch>
        </Router>
      </ContextProvider>
   
  );
}

export default App;
