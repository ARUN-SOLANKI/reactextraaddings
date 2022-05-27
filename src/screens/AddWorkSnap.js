import { Button } from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  writeBatch,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import { FaPhotoVideo, FaCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";
import TaskWithPhoto from "../components/TaskWithPhoto";
import { db, storage } from "../firebase.config";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
const storageRef = ref(storage);

const AddWorkSnap = () => {
  const hiddenFileInput = React.useRef(null);
  const [images, setimages] = useState("");
  const [Progresspercent, setProgresspercent] = useState("");
  const [imgInfo, setImgInfo] = useState({});
  const [allImg, setallImg] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [dataWithImage, setdataWithImage] = useState([]);
  const [isComplete, setIsComplete] = useState("");
  const [isLoading, setIsLoading] = useState({
    getdata: false,
    loadImage: false,
    getTodoData: false,
  });
  const [allTodos, setAllTodos] = useState([]);
  const [taskSelected, setTaskSelected] = useState({});

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    setImgInfo(fileUploaded);
  };

  const handleUploads = async () => {
    if (textArea && imgInfo.name && taskSelected) {
      setIsLoading({ ...isLoading, loadImage: true });
      const docRef = await addDoc(collection(db, "snapWork"), {
        descriptions: textArea,
        imageName: imgInfo.name,
        userId: localStorage.getItem("userId"),
        updatedAt: new Date(),
        status: isComplete,
        ...taskSelected,
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
      getData()
        .then((res) => handleUpdate())
        .catch((err) => console.log(err));

      setTextArea("");
      setImgInfo({});
      setIsComplete("");

      setIsLoading({ ...isLoading, loadImage: false });
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
    getTodo();
  }, []);

  const getData = async () => {
    setIsLoading({ ...isLoading, getdata: true });
    const querySnapshot = await getDocs(collection(db, "snapWork"));
    querySnapshot.forEach((doc) => {
      if (doc?.data().userId == localStorage.getItem("userId")) {
        getImageUrl(doc?.data());
      }
    });
  };

  let newArr = [];
  const getImageUrl = async (imgName) => {
    const data = await getDownloadURL(
      ref(storage, `${localStorage.getItem("userId")}/${imgName.imageName}`)
    );
    const newObj = {
      ...imgName,
      ImgUrl: data,
    };
    // let xyz = await Promise.resolve(newArr.push(newObj));
    newArr = [...newArr, newObj];

    setdataWithImage(newArr);
    setIsLoading({ ...isLoading, getdata: false });
  };

  const getTodo = async () => {
    const newArr = [];
    setIsLoading({ ...isLoading, getTodoData: true });
    const querySnapshot = await getDocs(
      collection(db, localStorage.getItem("userId"))
    );
    querySnapshot.forEach((doc) => {
      newArr.push(doc?.data());
    });
    setAllTodos(newArr);
  };

  const handleTask = (e) => {
    if (e.target.value) {
      setTaskSelected(e.target.value);
    }
  };

  const handleUpdate = async () => {
    try {
      const Userid = localStorage.getItem("userId");
      dataWithImage?.forEach((item) => {
        if (taskSelected.taskId == item.taskId) {
          const docRef = doc(db, Userid, item.docId);
          console.log(
            docRef,
            item.docId,
            "docRefdocRefdocRefdocRefdocRefdocRef"
          );

          updateDoc(docRef, {
            checked: item.status == "true" ? true : false,
          });
        }
      });

      // setEditDetails("");
      // setInputValue("");
      // setIsUpdate(false);
      // setTaskId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
          <box>
            <Select
              // value={taskSelected}
              displayEmpty
              renderValue={(selected) => {
                if (selected) {
                  return <em>{selected.title}</em>;
                }
                return "select your task";
              }}
              onChange={handleTask}
              color="primary"
              size="small"
              fullWidth
            >
              {allTodos?.map((item) => {
                return <MenuItem value={item}>{item.title}</MenuItem>;
              })}
            </Select>
          </box>
          <div style={{}}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Is Task Completed ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                value={isComplete}
                row
                onChange={(e) => {
                  console.log(typeof e.target.value, "--------><><><M/>nbfsrt");
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

            <div style={{ display: "flex" }}>
              <Button
                onClick={handleClick}
                style={{
                  display: "flex",
                  border: "1px solid #ccc",
                  background: "#fff",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: imgInfo.name ? "60%" : "100%",
                  padding: "2px 5px",
                  color: "blue",
                }}
              >
                <p>Upload a ScreenShot</p> <FaPhotoVideo size={20} />
              </Button>
              {imgInfo.name && (
                <Button
                  onClick={handleClick}
                  style={{
                    display: "flex",
                    border: "1px solid #ccc",
                    background: "#fff",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "40%",
                    padding: "2px 5px",
                    color: "green",
                  }}
                >
                  <p>{imgInfo.name}</p> <FaCheck size={15} />
                </Button>
              )}
            </div>
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
            {isLoading.loadImage ? (
              <CircularProgress color="warning" size={20} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
        {isLoading.getdata ? (
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              height: "90vh",
            }}
          >
            <CircularProgress size={30} />
          </div>
        ) : (
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
              return <TaskWithPhoto item={item} isLoading={isLoading} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default AddWorkSnap;
