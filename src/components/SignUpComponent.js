import React, { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { provider } from "../firebase.config";
const auth = getAuth();
function SignUpComponent({ setToggleCompo, toggleCompo, errAlert }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const registerWithEmailAndPassword = async () => {
    setIsLoading(true);

    const name = userDetails.first + " " + userDetails.last;
    const email = userDetails.email;
    const password = userDetails.password;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );
      if (res) {
        setIsLoading(false);
        await errAlert(true, "success", "SignUp successfully");
        setToggleCompo(true);
        setUserDetails({
          first: "",
          last: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      setIsLoading(false);
      errAlert(true, "error", "somthing went wrong");
      console.log(err, ":------------->");
    }
  };

  const userdetail = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  return (
    <div className="formContainer">
      <Typography
        variant="h3"
        textAlign="center"
        color="brown"
        fontSize="3rem"
        marginBottom={"2rem"}
      >
        Create An Account
      </Typography>

      <Box className="emailFilled">
        <TextField
          name="first"
          label="First Name"
          variant="filled"
          size="small"
          fullWidth
          color="warning"
          onChange={userdetail}
        />
      </Box>
      <Box className="emailFilled">
        <TextField
          name="last"
          label="Last Name"
          variant="filled"
          size="small"
          fullWidth
          color="warning"
          onChange={userdetail}
        />
      </Box>
      <Box className="emailFilled">
        <TextField
          name="email"
          label="email"
          variant="filled"
          size="small"
          fullWidth
          color="warning"
          onChange={userdetail}
        />
      </Box>
      <Box className="emailFilled">
        <TextField
          type="password"
          name="password"
          label="password"
          variant="filled"
          size="small"
          fullWidth
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
          onClick={registerWithEmailAndPassword}
        >
          {isLoading ? (
            <CircularProgress color="warning" size={15} />
          ) : (
            "Sign Up"
          )}
        </Button>

        <Typography
          variant="h6"
          className="notauser"
          marginTop={"1rem"}
          onClick={() => setToggleCompo(!toggleCompo)}
        >
          Already A User ? Please Login
        </Typography>
      </Box>
    </div>
  );
}

export default SignUpComponent;
