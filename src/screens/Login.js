// import React from "react";
// import {
//   TextField,
//   Typography,
//   Box,
//   createStyles,
//   Button,
//   IconButton,
//   DeleteIcon,
// } from "@mui/material";
// import { FaHeart, FaGoogle, FaFacebook, FaYoutube } from "react-icons/fa";

// function Login() {
//   return (
//     <div className="outerContainer">
//       <div className="leftContainer"></div>
//       <div className="rightContainer">
//         <div className="formContainer">
//           <Typography
//             variant="h3"
//             textAlign="center"
//             color="brown"
//             fontSize="3rem"
//           >
//             Login In Account
//           </Typography>
//           <Box className="IconbtnContainer">
//             <IconButton aria-label="Google" style={{ marginRight: "2rem" }}>
//               <FaGoogle color="black" size={"2rem"} />
//             </IconButton>
//             <IconButton aria-label="Facebook" style={{ marginRight: "2rem" }}>
//               <FaFacebook color="black" size={"2rem"} />
//             </IconButton>
//             <IconButton color="secondary" aria-label="Youtube">
//               <FaYoutube color="red" size={"2rem"} />
//             </IconButton>
//           </Box>
//           <Box className="emailFilled">
//             <TextField
//               label="name"
//               variant="filled"
//               size="small"
//               fullWidth
//               color="warning"
//             />
//           </Box>
//           <Box className="emailFilled">
//             <TextField
//               label="email"
//               variant="filled"
//               size="small"
//               fullWidth
//               color="warning"
//             />
//           </Box>
//           <Box className="emailFilled">
//             <TextField
//               label="password"
//               variant="filled"
//               size="small"
//               fullWidth
//               color="warning"
//             />
//           </Box>
//           <Box>
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               style={{ marginTop: "1rem" }}
//               size="large"
//             >
//               Login
//             </Button>

//             <Typography variant="h6" className="notauser" marginTop={"1rem"}>
//               Not a User ? Please Register
//             </Typography>
//           </Box>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import SignUpComponent from "../components/SignUpComponent";
import "./styles/LoginStyles.css";

function Login() {
  const [toggleCompo, setToggleCompo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const asyncdata = async () => {
      const res = localStorage.getItem("token");
      if (res) {
        navigate("home");
      }
    };
    asyncdata();
    console.log("Called");
    return () => {
      console.log("will unmount");
    };
  }, []);

  return (
    <div className="outerContainer">
      <div className="leftContainer"></div>
      <div className="rightContainer">
        {toggleCompo ? (
          <LoginComponent
            setToggleCompo={setToggleCompo}
            toggleCompo={toggleCompo}
          />
        ) : (
          <SignUpComponent
            setToggleCompo={setToggleCompo}
            toggleCompo={toggleCompo}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
