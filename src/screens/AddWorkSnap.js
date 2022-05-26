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
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
const storageRef = ref(storage);

const AddWorkSnap = () => {
  const hiddenFileInput = React.useRef(null);
  const [images, setimages] = useState("");
  const [Progresspercent, setProgresspercent] = useState("");
  const [imgInfo, setImgInfo] = useState("");
  const [allImg, setallImg] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [dataWithImage, setdataWithImage] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    setImgInfo(fileUploaded);
  };

  console.log("initialData", dataWithImage);
  console.log(dataWithImage.length, "dataLegnth1");

  const handleUploads = async () => {
    if (textArea && imgInfo.name) {
      const docRef = await addDoc(collection(db, "snapWork"), {
        descriptions: textArea,
        imageName: imgInfo.name,
        userId: localStorage.getItem("userId"),
        createdAt: new Date(),
        status: isComplete,
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
    getData();
  }, []);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "snapWork"));
    querySnapshot.forEach((doc) => {
      // newArr.push(doc.data());
      getImageUrl(doc?.data());
      // console.log(doc.data());
    });
  };

  let newArr = [];
  const getImageUrl = async (imgName) => {
    // 5 times
    const data = await getDownloadURL(
      ref(storage, `${localStorage.getItem("userId")}/${imgName.imageName}`)
    );
    const newObj = {
      ...imgName,
      ImgUrl: data,
    };
    // console.log(newObj, "newObjnewObjnewObjnewObj");
    // let xyz = await Promise.resolve(newArr.push(newObj));
    newArr = [...newArr, newObj];

    setdataWithImage(newArr);
  };

  return (
    <>
      {/* <div>{Progresspercent}</div> */}
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginTop: "10px",
          marginLeft: "5px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            width: "50%",
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
          <div style={{}}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Is Task Completed ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row
                onChange={(e) => {
                  setIsComplete(e.target.value);
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="complete"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="not complete"
                />
              </RadioGroup>
            </FormControl>
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "50%",
            height: "100vh",
            overflow: "scroll",
            // justifyContent: "space-between",
          }}
        >
          {dataWithImage.map((item, index) => {
            return <TaskWithPhoto item={item} />;
          })}
        </div>
      </div>
    </>
  );
};
export default AddWorkSnap;
