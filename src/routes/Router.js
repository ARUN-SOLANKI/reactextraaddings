import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/Login";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </>
  );
}

export default Routers;
