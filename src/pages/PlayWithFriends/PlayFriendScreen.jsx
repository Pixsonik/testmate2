import React, { useEffect, useState } from "react";
import "../../assets/css/pages.css";
import "../../assets/css/Responsive.css"
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { getChaptersListApi, urlToken, userSubjectApi } from "../../api/api";
import { TextField } from "@mui/material";
import { alpha } from "@material-ui/core/styles";
import moment from "moment";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Input,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import { TimePicker } from "material-ui-time-picker";
import AccessTime from "@material-ui/icons/AccessTime";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../loader/LoadingSpinner";


const userId = localStorage.getItem("UserId");
const boardId = localStorage.getItem("BoardId");
const classId = localStorage.getItem("ClassId");
const langId = localStorage.getItem("langIddd");

const PlayFriendScreen = () => {
  const [testName, setTestName] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  // const [value, setValue] = useState("10:10");
  const [isOpen, setIsOpen] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState("");

  const [chapterData, setChapterData] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState([]);
  const [chapterId, setChapterId] = useState([]);
  const [renderData, setrenderData] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:10");
  const [chapterlength, setchapterlength] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  // const [showbtn , setShowbtn]=useState(false)
  const [borderTestN, setBorderTestN]=useState(false)
  const [borderchapterData,setBorderchapterData] =useState(false)
 const [borderSelectedChapterId,setBorderSelectedChapterId] = useState(false)


//  console.log("chapterData",chapterData)

  const navigate = useNavigate();

  useEffect(() => {
    getUserSubject();
  }, []);

  const dateFormat= moment(selectedDate).format('DD-MM-YYYY')

  const required = testName != "" && selectedDate != "" && selectedTime != "" && subjects != "" && chapterData!= "";

  const getUserSubject = () => {
    const url = userSubjectApi();
    const body = {
      token: urlToken,
      user_id: userId,
      class_id: classId,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setSubjects(resp.data);
        // console.log("response in user added Subjet --->  ", resp.data);
      })
      .catch((err) => {
        // console.log("error in user added subject --> ", err);
      });
  };

  const handleSubject = (index, id, sub_name) => {
    setSelectedSubjects(index);
    setSubjectId(id);
    setSubjectName(sub_name);
    console.log("subject id is : ", id);
    subjectChapters(id);
    setBorderchapterData(false);
  };

  const subjectChapters = (id) => {
    const url = getChaptersListApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: id,
      chapter_id: chapterId,
      chapter_count: chapterlength,
    };
    // console.log("body of chapter -----------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setChapterData(resp.data.data);
        setrenderData(resp.data.data);
        // console.log("chapter --->  ", resp.data.data);
      })
      .catch((err) => {
        // console.log("Chapter--> ", err);
      });
  };

  const handleChapter = (id) => {
    // console.log("Chapter Id----------", id);
    setBorderSelectedChapterId(false)

    let renderDatas = [...renderData];
    setSelectedChapterId([...selectedChapterId, id]);

    for (let data of renderDatas) {
      if (data.chapter_id == id) {
        data.status = data.status === "true" ? "false" : "true";
        break;
      }
    }
    setrenderData(renderDatas);
    // console.log("selected chapters arr ", renderData);
    getSelectedChaptersId();
  };

  const getSelectedChaptersId = () => {
    var dr = [];
    for (let index = 0; index < renderData.length; index++) {
      renderData[index].status === "true" &&
        dr.push(parseInt(renderData[index].chapter_id));
    }
    setChapterId(dr);
    setTimeout(() => {
      // console.log("string convert--", dr.join().split(','));
      // console.log("string convert--", dr.map(function(e){return e.toString()}));
    }, 1000);
    
    // console.log("list ", dr.length, dr);
    setchapterlength(dr.length);
  };

  const     handleAddFriend = () => {
    checkFunc()
    return navigate("/friendcontact", {
      state: {
        test_Name: testName,
        student_id: subjectId,
        chapter_id: chapterId,
        selectedTime: selectedTime,
        selectedDate: selectedDate,
        chapter_count: chapterlength,
      },
    });
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleDialogTimeChange = (newValue) => {
    const hours = newValue.getHours().toString().padStart(2, "0");
    const minutes = newValue.getMinutes().toString().padStart(2, "0");
    let zone = "";
    if (hours<12) {
      zone += ": AM"
    }else{
      zone += ": PM"
    }
    console.log('time check', hours, minutes)
    const textValue = hours + ":" + minutes + zone;
    setSelectedTime(textValue);
  };
  const handleKeyboardTimeChange = (event) =>
    setSelectedTime(event.target.selectedTime);

  const createDateFromTextValue = (selectedTime) => {
    const splitParts = selectedTime.split(":");
    return new Date(1970, 1, 1, splitParts[0], splitParts[1]);
  };

  // console.log("Time ----------------> ", selectedTime);
  // console.log("Test Name---->", testName);
  // console.log("Date---->", selectedDate);
  // console.log("Length---->", chapterlength);

  const checkFunc=()=>{
    if(testName.length===0){
      // console.log("please enter Test name")
    }
  }

  const empty = ()=>{
    if(testName.length===0 && chapterData.length === 0 && selectedChapterId.length === 0){
      setBorderTestN(true)
      setBorderchapterData(true)
      setBorderSelectedChapterId(true)
      
    }
  }

  const handleTestName=(id)=>{
    setBorderTestN(false)
    
    setTestName(id)
  }
  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 m-auto">
          <div className="container-fluid m-auto mt-5">
          {isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) :
            (<div className="col-lg-10 m-auto mt-5 pt-2">
              <div className="col-12">
                <div className="row">
                  <div className="counselling-Form col-12 col-sm-12 col-md-6 col-lg-12 mt-5 m-auto">
                    <label htmlFor="days" className="form-label text-center">
                      Test Name
                    </label>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-12 m-auto">
                      <div className="form-outline flex-fill mb-1">
                        <input
                          required={true}
                          type="text"
                          name="text"
                          id="text"
                          className="form-control search-form"
                          placeholder="Test Name"
                          style={{border : borderTestN ? "2px solid red" : ""}}
                          onChange={(e) =>  handleTestName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="counselling-Form col-12 col-sm-12 col-md-6 col-lg-6 mt-5">
                    <label htmlFor="days" className="form-label text-center">
                      Select Days
                    </label>
                    <div className="" style={{ marginRight: "20rem" }}>
                      <div
                        className="col-12 w-75 mr-3 mt-4"
                        style={{ marginLeft: "-1.2rem" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <StaticDatePicker
                            disablePast
                            displayStaticWrapperAs="desktop"
                            // required={true}
                            value={selectedDate}
                            onChange={(newValue) => {
                              var dateFormat =
                                moment(newValue).format("YYYY-MM-DD");
                                setTimeout(() => {
                                  setSelectedDate(dateFormat);
                                }, 100);
                                setTimeout(() => {
                                  // console.log("99999999=== ",selectedDate);
                                }, 500);
                            }}
                            {...moment(new Date()).format("DD/MM/YYYY")}
                            renderInput={(params) => <TextField {...params} />}
                            style={{ width: "246px", height: "44px" }}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                  <div className="label container-fluid col-12 col-sm-12 col-md-6 col-lg-6 mt-4">
                    <label htmlFor="time" className="form-label mt-4">
                      Select Time
                    </label>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-12">
                      <div className="m-auto">
                        <div className="card-clock w-100">
                          <div>
                            <Input
                              fullWidth
                              value={selectedTime}
                              // placeholder="10:10 AM"
                              required={true}
                              onChange={handleKeyboardTimeChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={openDialog}>
                                    <AccessTime />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            <Dialog maxWidth="xs" open={isOpen}>
                              <TimePicker
                                mode="12h"
                                value={createDateFromTextValue(selectedTime)}
                                onChange={handleDialogTimeChange}
                              />
                              <DialogActions>
                                <Button onClick={closeDialog} color="primary">
                                  Cancel
                                </Button>
                                <Button onClick={closeDialog} color="primary">
                                  Ok
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="label container-fluid col-12 col-sm-12 col-md-6 col-lg-4 mt-4">
                    <label htmlFor="subject" className="form-label mt-5 m-auto">
                      Select Subject
                    </label>
                    <div className="" style={{ borderRadius: "2px" }}>
                      <div className="col-12 row create-flex">
                        {
                          subjects == "" || null ? <p>Please select subject from the subject list</p> :
                          subjects.map((data, index) => (
                            <>
                              <div className="col-6 col-md-6 col-sm-2 col-lg-5 mt-3">
                                <img
                                  src={data.subject_icon}
                                  key={data.id}
                                  alt="sub-img"
                                  // required={true}
                                  className="sub-img m-2 create-text-img"
                                  style={{
                                    padding: ".2rem",
                                    cursor: "pointer",
                                    border:
                                      selectedSubjects === index
                                        ? "3px solid var(--blue)"
                                        : "0px",
                                  }}
                                  onClick={() =>
                                    handleSubject(
                                      index,
                                      data.subject_id,
                                      data.name
                                    )
                                  }
                                />
                                <p
                                  className="text-center text-break text-wrap mt-2 pr-5 create-text"
                                  style={{width:"10rem", border : borderchapterData ? "2px solid red" : "" }} 
                                >
                                  {data.subject_name}
                                </p>
                              </div>
                            </>
                          ))
                        }
                       
                      </div>
                    </div>
                  </div>
                  <div className="label container-fluid col-12 col-sm-12 col-md-6 col-lg-6 mt-4">
                    <label htmlFor="chapter" className="form-label mt-5">
                      Select Chapter
                    </label>
                    <div className="" style={{ borderRadius: "0.2rem" }}>
                      <div
                        className="overflow-auto w-100"
                        style={{
                          width: "auto",
                          maxHeight: "550px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                      >
                        {
                          chapterData == "" || null ? 
                          <p>You have not selected subject</p> 
                          :
                          chapterData.map((data) => (
                            <ul
                              className="playwList"
                              required={true}
                              style={{
                                borderRadius: "1rem",
                                backgroundColor: data.status
                                  ? "var(--blue) "
                                  : "white",
                                color: data.status ? " white " : "black",
                                border : borderSelectedChapterId ? "2px solid red" : ""
                              }}
                              onClick={() => handleChapter(data.chapter_id)}
                              // onClick={()=> console.log("first")}
                            >
                              <li key={data.id} value={data.chapter_id}>
                                {data.chapter_name}
                              </li>
                            </ul>
                          ))
                        }
                        {}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
          <div className="col-7 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 m-auto">
            {
              testName != ""  && 
              chapterData!= "" &&
              selectedChapterId!= "" ? 
              <button
              onClick={() => handleAddFriend()}
              // onClick={()=> console.log("first")}
              type="submit"
              className="btn btn-primary btn-block "
              // disabled={!required}
              style={{
                fontSize: "1.3rem",
                color: "var(--white)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              Add Friend
            </button>
            :
            <button onClick={()=>empty()} className= "addFriendErrBtn">Add Friend</button> 
            }
           
          </div>
          {/* <div className="homeIcon col mt-5">
            <img className="hicon mr-3" src={Home} alt="homeicon" />
          </div> */}
        </section>
      </div>
    </>
  );
};

export default PlayFriendScreen;
