import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { FaGoogle, FaFacebook, FaYoutube, FaGithub } from "react-icons/fa";
function LoginComponent({ setToggleCompo, toggleCompo }) {
  return (
    <div className="formContainer">
      <Typography variant="h3" textAlign="center" color="brown" fontSize="3rem">
        Login In Account
      </Typography>
      <Box className="IconbtnContainer">
        <IconButton aria-label="Google" style={{ marginRight: "2rem" }}>
          <FaGoogle color="black" size={"2rem"} />
        </IconButton>
        <IconButton aria-label="Facebook" style={{ marginRight: "2rem" }}>
          <FaFacebook color="black" size={"2rem"} />
        </IconButton>
        <IconButton color="secondary" aria-label="Github">
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
        />
      </Box>
      <Box className="emailFilled">
        <TextField
          label="password"
          variant="filled"
          size="small"
          fullWidth
          color="warning"
        />
      </Box>
      <Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
          size="large"
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
  );
}

export default LoginComponent;
