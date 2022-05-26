import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function TodoComponent({
  item,
  deleteItem,
  handleEdit,

  handleChecked,
}) {
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
        <h1
          style={
            item.checked
              ? { height: "2rem", width: "2rem", background: "red" }
              : { height: "2rem", width: "2rem", background: "blue" }
          }
          onClick={() => handleChecked(item)}
          variant="contained"
        ></h1>
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
          <Box>
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
            <h2
              style={{
                fontSize: "1rem",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              {item.createdTime}
            </h2>
          </Box>
          <Button variant="contained" onClick={() => deleteItem(item.docId)}>
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => handleEdit(item.docId, item.title)}
          >
            edit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default TodoComponent;
