import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function TodoComponent({ item }) {
  return (
    <>
      <Box
        style={{
          display: "flex",
          width: "80rem",
          marginTop: "1rem",
          alignItems: "center",
        }}
      >
        <button
          style={{
            width: "3rem",
            height: "3rem",
            background: "blue",
            borderRadius: "5px",
          }}
          variant="contained"
        ></button>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              marginLeft: "1rem",
              width: "90%",
            }}
          >
            {item.title}
          </h2>
          <h2
            style={{
              fontSize: "2rem",
              marginLeft: "1rem",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {item.createdAt}
          </h2>
        </Box>
      </Box>
    </>
  );
}

export default TodoComponent;
