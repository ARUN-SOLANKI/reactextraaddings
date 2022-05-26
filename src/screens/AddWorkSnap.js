import { Button } from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import Navbar from "../components/Navbar";
import TaskWithPhoto from "../components/TaskWithPhoto";
import { db, storage } from "../firebase.config";
const storageRef = ref(storage);

const AddWorkSnap = () => {
  const hiddenFileInput = React.useRef(null);
  const [images, setimages] = useState("");
  const [Progresspercent, setProgresspercent] = useState("");
  const [imgInfo, setImgInfo] = useState("");
  const [allImg, setallImg] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [dataWithImage, setdataWithImage] = useState([]);
  const [alllistAll, setAlllistAll] = useState([]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    setImgInfo(fileUploaded);
  };

  const handleUploads = async () => {
    if (textArea && imgInfo.name) {
      const docRef = await addDoc(collection(db, "snapWork"), {
        descriptions: textArea,
        imageName: imgInfo.name,
        userId: localStorage.getItem("userId"),
        createdAt: new Date(),
        status: false,
      });

      const storageRef = ref(
        storage,
        `${localStorage.getItem("userId")}/${imgInfo.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imgInfo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setimages(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    }
  };

  // function handleimages() {
  //   const starsRef = ref(storage, localStorage.getItem("userId"));
  //   listAll(starsRef)
  //     .then((res) => {
  //       // res.items.forEach((itemRef) => {
  //       console.log(res);
  //       displayImage(res);
  //       // });
  //     })
  //     .catch((error) => {
  //       console.log("err", error);
  //     });
  // }
  // const displayImage = async (res) => {
  //   try {
  //     res.items.forEach((itemRef) => {
  //       const imgUrl = getDownloadURL(itemRef).then((geturl) => {
  //         setallImg((prev) => [...prev, geturl]);
  //       });
  //     });
  //   } catch (error) {}
  // };
  useEffect(() => {
    const getData = async () => {
      const newArr = [];
      const querySnapshot = await getDocs(collection(db, "snapWork"));
      querySnapshot.forEach((doc) => {
        newArr.push(doc.data());
        console.log(doc.data());
      });
      setdataWithImage(newArr);
    };
    getData();
  }, []);

  console.log(dataWithImage);

  const getImageUrl = async (imgName) => {
    const data = await getDownloadURL(
      ref(storage, `${localStorage.getItem("userId")}/${imgName}`)
    );
    console.log(data, "========><><><><><><><><><============");
  };

  return (
    <>
      {/* <div>{Progresspercent}</div> */}
      <Navbar />
      <div
        style={{
          backgroundColor: "#fff",
          width: "500px",
          padding: "10px 20px",
        }}
      >
        <textarea
          rows={5}
          placeholder="write description about task"
          style={{ width: "100%", padding: "5px" }}
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
        <div style={{ backgroundColor: "#ccc" }}>
          <Button
            onClick={handleClick}
            style={{
              display: "flex",
              border: "1px solid #ccc",
              background: "#fff",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "2px 5px",
              color: "blue",
            }}
          >
            <p>Upload a ScreenShot</p> <FaPhotoVideo size={20} />
          </Button>
        </div>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />

        <Button
          onClick={handleUploads}
          variant="contained"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </div>
      <button onClick={getImageUrl}>click to connect</button>

      <TaskWithPhoto />
    </>
  );
};
export default AddWorkSnap;
