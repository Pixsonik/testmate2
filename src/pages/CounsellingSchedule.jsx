import React, { useCallback, useEffect, useState } from "react";
import "../assets/css/pages.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
// import Home from "../assets/img/store.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TextField } from "@mui/material";
import moment from "moment";
import {
  counsellingApi,
  counsellingTimeApi,
  userPackageApi,
  getChaptersListApi,
  getSemesterListApi,
  mainUrl,
  urlToken,
  userDetailApi,
  userSubjectApi,
  getSemChapeterList,
} from "../api/api";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
import LoadingSpinner from "../loader/LoadingSpinner";
import { event } from "jquery";
import toast, { Toaster } from "react-hot-toast";


const userId = localStorage.getItem("UserId");
const boardId = localStorage.getItem("BoardId");
const classId = localStorage.getItem("ClassId");
const langId = localStorage.getItem("langIddd");
const first_name = localStorage.getItem("Name");
const email = localStorage.getItem("Email");
const mobile = localStorage.getItem("mobile");

// const BookingSucces = (props) => {
//   return (

//   )
// }

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Booking status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p>
          Booking Succesful
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/counselling">
          <Button>OK</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

const CounsellingSchedule = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [selectSubject, setSelectSubject] = useState("default");
  const [selectSemester, setSelectSemester] = useState("default");
  const [selectChapter, setSelectChapter] = useState("default");
  const [userSubjectData, setUserSubjectData] = useState([]);
  const [semList, setSemList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [subjectId, setSubjectId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [description, setDescription] = useState("");
  const [bookingTime, setBookingTime] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookAppointment, setBookAppointment] = useState(false);
  const [userCounselling, setUserCounselling] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [loader, setLoader] = useState(false)
  const [showError, setShowError] = useState(false)
  const [borderRed, setBorderRed] = useState(false)
  const [bordero, setBordero] = useState(false)
  const [bordert, setBorderT] = useState(false)
  const [borderDes, setBorderDes] = useState(false)
  const [borderBtn, setBorderBtn] = useState(false)
  const [show, setShow] = useState(true);
  const [isChapertEmpty, setisChapertEmpty] = useState(false)
  const [semId, setSemId] = useState(0)
  const [subId, setSubId] = useState('')
  const [checkSubject,setCheckSubject]=useState(false)
  const [ifSemList, setIfSemList]=useState(false)
  

  // console.log("semState", subId, semId)

  const Razorpay = useRazorpay();

  const required =
    chapterId != "" &&
    description != "" &&
    subjectId != "" &&
    semesterId != "" &&
    selectedTimeIndex !== ''
  // selectedDate != "" &&
  // bookingTime != "";

  useEffect(() => {
    userDetail();
    getUserSubject();
    // getSemList();
    counsellingTime();
    checkUserPackage();
    // bookCounselling();
  }, []);

  const userDetail = () => {
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: userId,
    };
    // console.log('All ---------------', body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Detail ", resp.data.data[0]);
        setUserInfo(resp.data.data[0]);
        // console.log('userName----------', resp.data.data[0].first_name);
        // console.log('userName----------', resp.data.data[0].email);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const getUserSubject = () => {
    const url = userSubjectApi();
    const body = {
      token: urlToken,
      user_id: userId,
      class_id: classId,
    };
    // console.log('User Subject  --> ', body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.data == '' || null) {
          setisChapertEmpty(true)
          console.log('resp data of the value',resp.data)
        } else {
          setisChapertEmpty(false)
          setSelectSubject(resp.data);
          setUserSubjectData(resp.data);

        }
        // console.log("Counselling subject  --->  ", resp.data);
      })
      .catch((err) => {
        // console.log("Counselling Subject Error --> ", err);
      });
  };

  const handleSubject = (e) => {
    setBordero(false)

    setSubjectId(e);
    setTimeout(() => {
      getSemList(e);
    }, 100);
    // console.log("Subject id :>> ", e);
  };

  const getSemList = async (selectedSubjectId) => {
    const url = await getSemesterListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: selectedSubjectId,
    };
    // console.log('Semester list--- ', body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {

        if (resp.data.status == "false") {
          // console.log("Please add sem");
          setIfSemList(true)
        } else {
          setIfSemList(false)
          setSemList(resp.data.data);
          // console.log("sem list line no 220", resp.data.data);
          setSubId(resp.data.data[0].subject_id)
          // subjectChapters(resp.data.data.semester_id,resp.data.data.subject_id)
          // subjectChapters()
        }
      })
      .catch((error) => {
        // console.log("Error -----> ", error);
      });
  };

  const handleSemester = (e) => {


    setSemId(e);
    subjectChapters();
    // console.log("Sem id :>> ", e);
  };

  const subjectChapters = (semesterId) => {
    setSemId(semesterId)
    setBorderT(false)
    const url = getSemChapeterList();
    const body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: subId,
      semester_id: semesterId,
    };
    console.log("subjectChapters", body)
    // console.log('add chp body --->  ', body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setChapterList(resp.data.data);
        console.log("chapter list --->  ", resp.data);
      })
      .catch((err) => {
        // console.log("Chapter--> ", err);
      });
  };

  const handleChapter = (e) => {
    setChapterId(e);
    setBorderRed(false)
    // console.log("Chapter id :>> ", e);
  };

  const handleDescription = (desc) => {
    setBorderDes(false)
    setDescription(desc);
    // console.log("Description ---->", desc);
  };

  const counsellingTime = () => {
    const url = counsellingTimeApi();
    const body = {
      token: urlToken,
      date_check: selectedDate,
    };
    // console.log('Time for counselling body --->  ', body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("time slot ", resp.data.data);
        setBookingTime(resp.data.data);
        // console.log('userName----------', resp.data.data[0].start_time);
        // console.log('selected time----------', resp.data.data[0].end_time);
      })
      .catch((error) => {
        // console.log("error for time slot--> ", error);
      });
  };

  const handleTimeSelection = (index, time, end_time) => {
    setBorderBtn(false)
    setSelectedTimeIndex(index);
    setStartTime(time);
    setEndTime(end_time);
    // console.log("selected time ", startTime, endTime);
  };

  const checkTimeSelection = () => {
    // console.log("time", selectedTimeIndex);
    if (selectedTimeIndex === "") {
      alert("Select appointment time");
    } else {
      setBookAppointment(true);
      // console.log("counselling remaining--- ", userCounselling);
      userCounselling > 0 ? bookCounsellingApi() : showPriceAlert();
    }
  };

  const showPriceAlert = () => {
    // console.log("first ----", userInfo.mobile);
    if (
      window.confirm(
        "You dont have any pack currently so go and buy a subscription pack."
      )
    ) {
      window.open(
        mainUrl +
        "package_price.php?token=" +
        urlToken +
        "&user_id=" +
        userId +
        "&code=CSG",
        "Thanks for Visiting!"
      );
    }
  };

  const handlePayment = useCallback((price = 100) => {
    var options = {
      description: "Book counselling.",
      image: userInfo.profile_photo_path,
      currency: "INR",
      key: "rzp_test_iNvUrkMVV4drdT",
      amount: price * 100,
      name: userInfo.first_name,
      prefill: {
        name: userInfo.first_name,
        email: userInfo.email,
        contact: userInfo.mobile,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay
      .open(options)
      .then((data) => {
        // console.log(data);
        alert(`Success: ${data.razorpay_payment_id}`);
        bookCounsellingApi();
      })
      .catch((error) => {
        // console.log(error.description);
        alert(`Error: ${error.code}  ${error.description}`);
      });
  });

  const bookCounsellingApi = () => {
    setLoader(true)
    const url = counsellingApi();
    var body = {
      user_id: userId,
      token: urlToken,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: subjectId,
      chapter_id: chapterId,
      description: description,
      start_time: startTime,
      end_time: endTime,
      select_date: selectedDate
    };
    console.log("Counselling body  --->  ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("counselling status is:------ ", resp.data);
        setLoader(false)
        if (resp.data.status == "true") {
          setModalShow(true)
          console.log("counselling status is:------ ", resp.data);

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkUserPackage = () => {
    const url = userPackageApi();
    const body = {
      user_id: userId,
      token: urlToken,
    }
    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      // console.log("user package data is ==== ", response.data);
      if (response.data.status == 'true') {

        setUserCounselling(response.data.data.remain_counselling)
      } else {
        setUserCounselling(0)
      }
    }).catch((error) => {
      // console.log("error in getting user package data ", error);
    });
  }


  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };


  const empty = () => {
    if (chapterId.length == 0 && description.length == 0 && subjectId.length == 0 && semesterId.length == 0 && selectedDate == moment().format("YYYY-MM-DD") && selectedTimeIndex == '') {
      // console.log("empty")
      setBorderRed(true)
      setBordero(true)
      setBorderT(true)
      setBorderDes(true)
      setBorderBtn(true)

    }
    // if(chapterId != "" &&
    // description != "" &&
    // subjectId != "" &&
    // semesterId != "" &&
    // selectedTimeIndex !== ''){
    //         // console.log('nxsjkn')
    // }
    if (!required) {
      // console.log("hello")
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 1000)
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const checkSubjectHandler=()=>{
    // console.log("He")

    // chapterId != "" || null ? 
    // setCheckSubject(true) : ""
    if(chapterId.length == 0){
      setCheckSubject(true) 
      // console.log("He")
    }
  }

  // console.log(userSubjectData)
  return (

    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 m-auto">
          {/* <Widget /> */}

          <MyVerticallyCenteredModal
            show={modalShow}
          />
          {/* {
            isChapertEmpty ?
              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal> :
              null
          } */}
          <div className="container-fluid m-auto mt-5">
            <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto mt-5 pt-2">
              <div className="col-12">
                <div className="row">
                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-5">
                    <label htmlFor="subject" className="form-label">
                      Select Subject
                    </label>
                    <select
                      defaultValue={selectSubject}
                      className="form-select shadow-none"
                      style={{ borderRadius: "13px", border: bordero ? "1px solid red" : "" }}
                      id="subject"
                      onChange={(e) => { handleSubject(e.target.value) }}
                      required
                    >
                      <option value="default" disabled hidden>
                        Select Subject
                      </option>
                      {userSubjectData.map((data, index) => (
                        <option key={index + data.id} value={data.subject_id}>
                          {data.subject_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-5">
                    <label htmlFor="semester" className="form-label">
                      Select Semester  
                    </label>
                    {
                     ifSemList  ? <p className="errTes"> Please Add semeter in subject</p> : 
                    <select
                      defaultValue={selectSemester}
                      className="form-select shadow-none"
                      style={{ borderRadius: "13px", border: bordert ? "1px solid red" : "" }}
                      id="sem"
                      onChange={(event) => subjectChapters(event.target.value)}
                      required
                      onClick={checkSubjectHandler}
                    >
                      <option value="default" disabled hidden>
                        Select Semester
                      </option>

                      {semList.map((data) => (
                        <option key={data.id}
                          value={data.semester_id}
                        // value={data.semester_id}
                        // onChange={e=>setSemId(e.target.value)}
                        >
                          {data.semester_name}
                        </option>
                      ))}
                    </select>
                    }
                  </div>

                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-5">
                    <label htmlFor="topic" className="form-label">
                      Select Chapter
                    </label>
                    {
                      chapterList == null || "" ? <p className="errTes">Select semester from your selected subject</p> :
                        <select
                          defaultValue={selectChapter}
                          className="form-select shadow-none"
                          style={{ borderRadius: "13px", border: borderRed ? "1px solid red" : "" }}
                          id="topic"
                          onChange={(data) => handleChapter(data.target.value)}
                          required
                        >
                          <option value="default" disabled hidden>
                            Select Chapter
                          </option>
                          {chapterList.map((data) => (
                            <option key={data.id} value={data.chapter_id}>
                              {data.chapter_name}
                            </option>
                          ))}
                        </select>
                    }

                  </div>

                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-5">
                    <label className="form-label">Descprition</label>
                    <textarea
                      rows="3"
                      type="text"
                      className="form-control shadow-none"
                      style={{ borderRadius: "13px", border: borderDes ? "1px solid red " : "" }}
                      id="description"
                      required
                      value={description}
                      onChange={(desc) => handleDescription(desc.target.value)}
                      placeholder="Write Note in 100 words"
                      onClick={() => showError(false)}
                    />
                  </div>

                  <div className="counselling-Form col-12 col-sm-12 col-md-6 col-lg-6 mt-5 mb-5">
                    <label htmlFor="days" className="form-label">
                      Select Days
                    </label>
                    <div
                      className="col-12 w-75 mr-3 mt-4"
                      style={{ marginLeft: "-1.2rem" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          disablePast
                          displayStaticWrapperAs="desktop"
                          value={selectedDate}
                          onChange={(newValue) => {
                            var timeFormat =
                              moment(newValue).format("YYYY-MM-DD");
                            setSelectedDate(timeFormat);
                            // console.log(timeFormat);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          style={{ width: "246px", height: "44px" }}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className="counselling-Form col-12 col-sm-12 col-md-6 col-lg-6 mt-5">
                    <div className="label">
                      <label
                        htmlFor="timing"
                        className="form-label text-center m-auto"
                      >
                        Select Time
                      </label>
                    </div>
                    {bookingTime.map((data, index) => (

                      <button
                        key={index}
                        className="time-buttons col-12 col-sm-4 col-md-4 col-lg-4 mt-4 m-auto "
                        style={{
                          backgroundColor:
                            selectedTimeIndex === index ? "var(--blue)" : "white",
                          color:
                            selectedTimeIndex === index ? "white" : "black",
                          border: borderBtn ? "1px solid red" : "",
                        }}
                        onClick={() =>
                          handleTimeSelection(
                            index,
                            data.start_time,
                            data.end_time
                          )
                        }
                        required
                      >
                        &nbsp;{data.start_time}&nbsp;-&nbsp;{data.end_time}&nbsp;
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Link to=""> */}

          <div
            className="col-7 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 m-auto"
          >
            {/* {loader ? <LoadingSpinner/> : <button
              type="button"
              className="btn btn-primary btn-block"
              // disabled={!required}
              onClick={() => checkTimeSelection()}
            >
              Book Now<i className="fas fa-arrow-right mx-2"></i>
            </button> }  */}
            <div style={{ margin: "0", padding: "0", textAlign: "center" }}>
              {showError ? <p style={{ margin: "0", }} className="btnErrText"> <i class="fa-solid fa-circle-exclamation"></i>Invalid details</p> : null}
              {/* <p style={{margin: "0", padding :"0"}}> <i class="fa-solid fa-circle-exclamation"></i>Invalid details</p>  */}

            </div>
            {
              semList != "" &&
                description != "" &&
                subId != "" &&
                semId != "" &&
                selectedTimeIndex !== '' &&
                chapterId != ""
      
                // selectedDate != "" &&
                // bookingTime != "" 

                ? loader ? (<LoadingSpinner />) :
                  (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        // disabled={!required}
                        onClick={() => checkTimeSelection()}
                      >
                        Book Now<i className="fas fa-arrow-right mx-2"></i>
                      </button>
                    </>) :
                <> <button className="errCounbtn" onClick={() => empty()}> Book Now<i className="fas fa-arrow-right mx-2"></i></button></>

            }


          </div>
          {/* </Link> */}
          {/* <div className="homeIcon col mt-5">
            <img className="hicon mr-3" src={Home} alt="homeicon" />
          </div> */}
        </section>
      </div>
    </>
  );
};
export default CounsellingSchedule;
