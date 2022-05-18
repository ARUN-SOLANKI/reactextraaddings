import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
function SignUpComponent({ setToggleCompo, toggleCompo }) {
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
          label="First Name"
          variant="filled"
          size="small"
          fullWidth
          color="warning"
        />
      </Box>
      <Box className="emailFilled">
        <TextField
          label="Last Name"
          variant="filled"
          size="small"
          fullWidth
          color="warning"
        />
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
          SignUp
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
