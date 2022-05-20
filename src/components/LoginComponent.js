import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { FaGoogle, FaFacebook, FaYoutube, FaGithub } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { provider, Gitprovider } from "../firebase.config";
import { useNavigate } from "react-router-dom";
const auth = getAuth();
function LoginComponent({ setToggleCompo, toggleCompo }) {
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
        setToken(res.user.accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logInWithEmailAndPassword = async () => {
    const { email, password } = userDetails;
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("token", data.user.accessToken);
      localStorage.setItem("userId", data.user.uid);
      setToken(data.user.accessToken);
    } catch (err) {
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
      {isLoading && <CircularProgress />}
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
            Login
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