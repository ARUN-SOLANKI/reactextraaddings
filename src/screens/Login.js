import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import SignUpComponent from "../components/SignUpComponent";
import "./styles/LoginStyles.css";
import { Alert } from "@mui/material";

function Login() {
  const [toggleCompo, setToggleCompo] = useState(true);
  const [errMsg, setErrMsg] = useState({
    Status: false,
    alertType: "",
    errMessage: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const asyncdata = async () => {
      const res = localStorage.getItem("token");
      if (res) {
        navigate("home");
      }
    };
    asyncdata();
  }, []);

  const errAlert = (errstatus, alerttype, errmsg) => {
    setErrMsg({
      Status: errstatus,
      alertType: alerttype,
      errMessage: errmsg,
    });

    setTimeout(() => {
      setErrMsg({
        Status: false,
        alertType: "",
        errMessage: "",
      });
      if (alerttype == "success") {
      }
    }, 3000);

    console.log(errstatus, alerttype, errmsg);
  };

  return (
    <div className="outerContainer">
      <div className="leftContainer"></div>
      <div className="rightContainer">
        {errMsg.Status && (
          <Alert
            style={{ position: "absolute", top: 15 }}
            severity={errMsg.alertType}
          >
            {errMsg.errMessage}
          </Alert>
        )}
        {toggleCompo ? (
          <LoginComponent
            setToggleCompo={setToggleCompo}
            toggleCompo={toggleCompo}
            errAlert={errAlert}
          />
        ) : (
          <SignUpComponent
            setToggleCompo={setToggleCompo}
            toggleCompo={toggleCompo}
            errAlert={errAlert}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
