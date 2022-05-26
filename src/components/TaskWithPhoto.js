import React from "react";

function TaskWithPhoto({ item }) {
  console.log(item, "---------->");
  return (
    <div
      style={{
        background: "#fff",
        width: "30%",
        height: "250px",
        display: "flex",
        justifyContent: "center",
        margin: "0px 10px",
        marginBottom: "20px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "10px 10px", width: "80%" }}>
        <img
          src={item.ImgUrl}
          style={{ height: 100, width: 100, background: "blue" }}
        />
        <p>{item.status ? "true" : "false"}</p>
        <h3>description :- </h3>
        <p>{item.descriptions}</p>
      </div>
    </div>
  );
}

export default TaskWithPhoto;
