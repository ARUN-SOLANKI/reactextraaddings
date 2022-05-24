import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { provider, Gitprovider } from "../firebase.config";
import { useNavigate } from "react-router-dom";
const auth = getAuth();
function LoginComponent({ setToggleCompo, toggleCompo, errAlert }) {
  const [isLoading, setIsLoading] = useState(false);
  const [Token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const userdetail = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  useEffect(() => {
    const asyncdata = async () => {
      const res = localStorage.getItem("token");
      if (res) {
        navigate("home");
      }
    };
    asyncdata();
  }, [Token]);

  const GoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      // const res = await signInWithRedirect(auth, provider);
      // const res = await getRedirectResult(auth);
      if (res) {
        localStorage.setItem("token", res.user.accessToken);
        localStorage.setItem("userId", res.user.uid);
        errAlert(false, "success", "login successfully");
        setToken(res.user.accessToken);
      }
    } catch (err) {
      errAlert(true, "error", "Something Went Wrong");
      console.log(err);
    }
  };

  const logInWithEmailAndPassword = async () => {
    setIsLoading(true);
    const { email, password } = userDetails;
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      if (data) {
        setIsLoading(false);
        errAlert(true, "success", "Login Successfully");
        setUserDetails({
          email: "",
          password: "",
        });
      }
      localStorage.setItem("token", data.user.accessToken);
      localStorage.setItem("userId", data.user.uid);
      setToken(data.user.accessToken);
    } catch (err) {
      setIsLoading(false);
      errAlert(true, "error", "Something Went Wrong");
      console.error(err);
    }
  };

  const githubsignIn = async () => {
    try {
      const getdata = await signInWithPopup(auth, Gitprovider);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="formContainer">
        <Typography
          variant="h3"
          textAlign="center"
          color="brown"
          fontSize="3rem"
        >
          Login In Account
        </Typography>
        <Box className="IconbtnContainer">
          <IconButton
            aria-label="Google"
            style={{ marginRight: "2rem" }}
            onClick={() => GoogleSignIn()}
          >
            <FaGoogle color="black" size={"2rem"} />
          </IconButton>
          <IconButton aria-label="Facebook" style={{ marginRight: "2rem" }}>
            <FaFacebook color="black" size={"2rem"} />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="Github"
            onClick={githubsignIn}
          >
            <FaGithub color="red" size={"2rem"} />
          </IconButton>
        </Box>

        <Box className="emailFilled">
          <TextField
            label="email"
            variant="filled"
            size="small"
            fullWidth
            color="warning"
            name="email"
            onChange={userdetail}
          />
        </Box>
        <Box className="emailFilled">
          <TextField
            type="password"
            label="password"
            variant="filled"
            size="small"
            fullWidth
            name="password"
            color="warning"
            onChange={userdetail}
          />
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            size="large"
            onClick={logInWithEmailAndPassword}
          >
            {isLoading ? (
              <CircularProgress color="warning" size={15} />
            ) : (
              "Login"
            )}
          </Button>

          <Typography
            variant="h6"
            className="notauser"
            marginTop={"1rem"}
            onClick={() => setToggleCompo(!toggleCompo)}
          >
            Not a User ? Please Register
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default LoginComponent;
