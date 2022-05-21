import { TextField, Button, Box, DataGrid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoComponent from "../components/TodoComponent";
import "../screens/styles/TableStyles.css";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase.config";
import Table from "../components/Table";
import Navbar from "../components/Navbar";

function InCompleted() {
  const [list, setList] = useState([]);
  const [userId, setuserId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [editDetails, setEditDetails] = useState("");
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
      createdTime: new Date().toLocaleTimeString(),
      checked: false,
    };
    try {
      if (inputValue) {
        const docRef = await addDoc(collection(db, userId), todoobj);
        getData();
        setInputValue("");
      }
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
      upArr.push({ ...doc.data(), docId: doc.id });
    });
    const filterArray = upArr.filter((item) => {
      return item.checked != true;
    });
    setList(filterArray);
  };

  const deleteItem = async (docId) => {
    try {
      const Userid = localStorage.getItem("userId");
      const newitem = await deleteDoc(doc(db, userId, docId));
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUppdate = () => {
    try {
      const Userid = localStorage.getItem("userId");
      const docRef = doc(db, userId, editDetails);
      setDoc(docRef, {
        title: inputValue,
        createdAt: new Date().toLocaleDateString(),
        createdTime: new Date().toLocaleTimeString(),
        checked: false,
      });
      getData();
      setEditDetails("");
      setInputValue("");
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (docId, title) => {
    setEditDetails(docId);
    setIsUpdate(true);
    setInputValue(title);
  };

  const handleChecked = (item) => {
    try {
      const Userid = localStorage.getItem("userId");
      const docRef = doc(db, userId, item.docId);
      setDoc(docRef, {
        ...item,
        checked: !item.checked,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const filteredList = list.filter((item) => {
      return item.checked != false;
    });
    setList(filteredList);
  }, []);

  return (
    <Box>
      <Navbar />
      <Box className="myTodo">
        <Box className="inputContainer">
          <TextField
            style={{ backgroundColor: "#fff" }}
            name="todo"
            label="write something ...."
            variant="filled"
            fullWidth
            color="warning"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isUpdate ? (
            <Button variant="contained" onClick={handleUppdate}>
              update Todo
            </Button>
          ) : (
            <Button variant="contained" onClick={handleTodo}>
              Add Todo
            </Button>
          )}
        </Box>

        <Box className="table">
          <Box className="TableHeadings">
            <p className="col1">Complete</p>
            <p className="col2">Task</p>
            <p className="col3">Created time</p>
            <p className="col4">Operations</p>
          </Box>
          <Box className="tableBody">
            {list?.map((item, i) => {
              return (
                <Table
                  item={item}
                  handleEdit={handleEdit}
                  deleteItem={deleteItem}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                  handleUppdate={handleUppdate}
                  handleChecked={handleChecked}
                  key={i}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InCompleted;
