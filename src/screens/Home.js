import { TextField, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoComponent from "../components/TodoComponent";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../firebase.config";

function Home() {
  const [list, setList] = useState([]);
  const [userId, setuserId] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const Userid = localStorage.getItem("userId");
    setuserId(Userid);
  }, []);

  const navigate = useNavigate();
  const clearLocal = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleTodo = async () => {
    const todoobj = {
      title: inputValue,
      createdAt: new Date().toLocaleDateString(),
      checked: false,
    };
    try {
      const docRef = await addDoc(collection(db, userId), todoobj);
      getData();
      setInputValue("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let upArr = [];
    const Userid = localStorage.getItem("userId");
    const querySnapshot = await getDocs(collection(db, Userid));
    querySnapshot.forEach((doc) => {
      upArr.push(doc.data());
    });
    setList(upArr);
  };
  return (
    <div style={{ magin: "auto" }}>
      <button onClick={clearLocal}>logout</button>
      <h1>Todo App</h1>
      <Box style={{ minWidth: "50rem", maxWidth: "80rem", display: "flex" }}>
        <TextField
          name="todo"
          label="write something ...."
          variant="filled"
          fullWidth
          color="warning"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="contained" onClick={handleTodo}>
          Add Todo
        </Button>
      </Box>
      {list?.map((item, i) => {
        return <TodoComponent item={item} key={i} />;
      })}
    </div>
  );
}

export default Home;
