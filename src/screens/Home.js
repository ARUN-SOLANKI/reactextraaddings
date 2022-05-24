import {
  TextField,
  Button,
  Box,
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../screens/styles/TableStyles.css";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import _ from "underscore";

import { db } from "../firebase.config";
import Table from "../components/Table";
import Navbar from "../components/Navbar";

function Home() {
  const [list, setList] = useState([]);
  const [userId, setuserId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [editDetails, setEditDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortby, setSortBy] = useState("");
  useEffect(() => {
    const Userid = localStorage.getItem("userId");
    setuserId(Userid);
  }, []);

  const navigate = useNavigate();

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
    setIsLoading(true);
    let upArr = [];
    const Userid = localStorage.getItem("userId");
    const querySnapshot = await getDocs(collection(db, Userid));
    querySnapshot.forEach((doc) => {
      upArr.push({ ...doc.data(), docId: doc.id });
    });
    setList(upArr);
    setIsLoading(false);
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

  const handleChange = (e) => {
    setSortBy(e.target.value);
    const filtereddata = _.sortBy(list, e.target.value);
    setList(filtereddata);
  };

  return (
    <Box>
      <Navbar isLoading={isLoading} />
      {isLoading && <LinearProgress />}

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
        <box>
          <Select
            style={{ marginBottom: "10px", width: "100px" }}
            value={sortby}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Sort by</em>;
              } else if (selected == "title") {
                return "name";
              } else if (selected == "createdTime") {
                return "time";
              } else if (selected == "checked") {
                return "checked";
              }
              return "date";
            }}
            onChange={handleChange}
            color="primary"
            size="small"
          >
            <MenuItem value={"createdAt"}>date</MenuItem>
            <MenuItem value={"createdTime"}>time</MenuItem>
            <MenuItem value={"title"}>name</MenuItem>
            <MenuItem value={"checked"}>checked</MenuItem>
          </Select>
        </box>

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

export default Home;
