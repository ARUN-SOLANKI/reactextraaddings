import React from "react";
import "../screens/styles/TableStyles.css";
import { Button, Box, IconButton } from "@mui/material";
import { FaCheck, FaCircleNotch, FaTrash, FaEdit } from "react-icons/fa";
function Table({
  item,
  deleteItem,
  handleEdit,
  handleUppdate,
  isUpdate,
  setIsUpdate,
  handleChecked,
}) {
  return (
    <Box className="tableData">
      <Box className="tr1">
        <IconButton
          aria-label="delete"
          color={item.checked ? "warning" : "primary"}
          onClick={() => handleChecked(item)}
        >
          {item.checked ? <FaCheck /> : <FaCircleNotch />}
        </IconButton>
      </Box>
      <Box className="tr2">
        <h3>{item.title}</h3>
      </Box>
      <Box className="tr3">
        <h2>{item.createdAt}</h2>
        <h5>{item.createdTime}</h5>
      </Box>
      <Box className="tr4">
        <IconButton
          aria-label="delete"
          color={"warning"}
          onClick={() => deleteItem(item.docId)}
        >
          <FaTrash />
        </IconButton>
        <IconButton
          aria-label="edit"
          color={"warning"}
          onClick={() => handleEdit(item.docId, item.title)}
        >
          <FaEdit />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Table;
