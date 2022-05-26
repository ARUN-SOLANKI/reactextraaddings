import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AddWorkSnap from "../screens/AddWorkSnap";
import Completed from "../screens/Completed";
import Home from "../screens/Home";
import InCompleted from "../screens/InCompleted";
import Login from "../screens/Login";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="completed" element={<Completed />} />
        <Route path="incompleted" element={<InCompleted />} />
        <Route path="addworksnap" element={<AddWorkSnap />} />
      </Routes>
    </>
  );
}

export default Routers;
