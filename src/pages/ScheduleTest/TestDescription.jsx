import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import Ques from "../../assets/img/schedule/ques.png";
import Clock from "../../assets/img/schedule/clock.png";
import Instru from "../../assets/img/schedule/instru.png";
import { scheduleTestDescApi, urlToken } from "../../api/api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { set_question_data } from "../../Redux_two/Actions/ActionCreator";
import toast, { Toaster } from "react-hot-toast";
import { milliseconds } from "date-fns";

const TestDescription = () => {
  const [userData, setUserdata] = useState([]);
  const [testDescription, setTestDescription] = useState([]);
  const [testData, setTestData] = useState([]);
  const [tokenKey, setTokenKey] = useState([]);
  const [currenttime, setcurrentTime] = useState();
  const [date,  setDate] = useState();
  const location = useLocation();
  const [hasReloaded, setHasReloaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('remainingTime');
    localStorage.removeItem('timeLeft')
    setTestData(location.state.contest_data);
    setTokenKey(location.state.contest_data.contest_key);
    testDescriptionScreen(location.state.contest_id);
    // dispatch(set_question_data(" "))
  }, []);

  const testDescriptionScreen = (id) => {
    const url = scheduleTestDescApi();
    const body = {
      token: urlToken,
      contest_id: id,
    };

    console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setUserdata(resp.data.data);
        setcurrentTime(resp.data.data.start_time);
        setDate(resp.data.data.date);
        localStorage.setItem('examTime', resp.data.data.duration)
        setTestDescription(resp.data.data.description);
        console.log("Schedule Description Response  --> ", resp.data.data);
        // localStorage.setItem('remainingTime', 0);
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };


  // Timer code 

const loadThePage = ()=>{
 
  var currDate = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const mainTime= currDate.toLocaleTimeString('en-US', options).slice(0,-3)
  const year = currDate.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = (currDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = currDate.getDate().toString().padStart(2, '0'); // Get day of the month

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate, date, mainTime, currenttime);
  console.log(currDate);
  if(formattedDate == date && mainTime == currenttime)
    {
      console.log('hello');
      setHasReloaded(true);
      localStorage.setItem('hasReloaded', 'true');
    if(userData.status === false){
      toast('Please start your test')
      setTimeout(()=>{
        window.location.reload();
      },'800')
    }  
    }
    else{
      console.log('hello2 ');
    }
}

useEffect(()=>{
  // loadThePage()
  const intervalId = setInterval(loadThePage, 1000); // Adjust the interval time (1000 ms = 1 second) as needed

  // Cleanup function to clear the interval when the component unmounts
  return () => clearInterval(intervalId);
},[date, currenttime])


  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  const handleTestDescription = (id) => {
    // console.log("id", id);
    if(userData.status){
      
      return navigate("/testschedulescreen2", {
        state: { contest_id: id , token_key: tokenKey, contest_data : testData},
      });
    }
    else{
      toast('Test will start after some time')
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Toaster/>
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 mb-5">
          <div className="col-12 m-auto mt-5 pt-sm-2 pt-lg-2">
            <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-9 ">
              <div className="d-flex justify-content-around">
                <div className=" col-example text-left mt-3">
                  <div className="text-center">
                    <p
                      className="fw-bold mb-1 text-center subjectnamess"
                      style={{ color: "var(--blue)", fontSize: "20px" }}
                    >
                      {userData.subject_name}
                    </p>
                    <p
                      className="fw-normal mb-1 "
                      style={{ fontSize: "1.2rem" }}
                    >
                      {userData.name}
                    </p>
                  </div>
                </div>
                <div className="p-2 col-example text-left ">
                  <div className="d-flex bd-highlight dateAndTime">
                    <div className="p-lg-2 flex-fill bd-highlight mt-lg-2">
                      <i
                        className="bx bxs-calendar-alt calenderImage "
                        style={{ color: "var(--blue)", fontSize: "24px" }}
                      ></i>
                    </div>
                    <div className="p-lg-2 flex-fill bd-highlight col-example ">
                      <p
                        className="fw-bold mb-1 text-center mx-1 "
                        style={{ fontSize: "20px" }}
                      >
                        {/* {moment(userData.date).format("Do")} */}
                        {userData.date}
                        <p
                          className="fw-normal mb-1 mx-1"
                          style={{ fontSize: "1rem" }}
                        >
                          {/* {moment(userData.date).format("MMMM")} */}
                        </p>
                      </p>
                    </div>
                    <div
                      className="vl mt-lg-2 standingSline"
                      style={{
                        borderLeft: "0.4rem solid var(--blue)",
                        height: " 4.5rem",
                      }}
                    ></div>
                    <div className="p-2 flex-fill bd-highlight col-example startime">
                      <p
                        className="fw-bold mb-1 text-center mx-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {/* {userData.} */}
                        {/* <span>00:00 AM</span> */}
                        <span>{userData.start_time}</span>
                      </p>
                      <p
                        className="fw-normal mb-1 mx-1"
                        style={{ fontSize: "1rem" }}
                      >
                        {/* {moment(userData.date).format("dddd")} */}
                        Thursday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr
              className="container-fluid col-9 col-sm-6 col-md-6 col-lg-9"
              style={{
                color: "var(--blue)",
                border: "0.1rem solid var(--blue)",
              }}
            />
            <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-9">
              <div className="d-flex justify-content-around">
                <div className="p-2 col-example text-left">
                  <div className="text-center">
                    <p
                      className="fw-bold mb-1 text-center"
                      style={{ color: "var(--blue)", fontSize: "1.5rem" }}
                    >
                      &#x20B9; {userData.entry}/- only
                    </p>
                    <p
                      className="fw-normal mb-1"
                      style={{ color: "#FBB038", fontSize: "1.2rem" }}
                    >
                      or Rs. 80 + {userData.discount} coins
                    </p>
                  </div>
                </div>
                {/* <div className="p-1 mt-3">
                  <div className="col-12 col-sm-12 col-md-9 col-lg-12 mx-3"></div>
                </div> */}
              </div>
            </div>
            <div
              className="card bg-transparent col-12 col-sm-6 col-md-6 col-lg-9 m-auto mt-4"
              style={{ border: "2px solid var(--blue)", borderRadius: "20px" }}
            >
              <div className="col-12 col-sm-6 col-lg-12 mt-3">
                <div className="d-flex justify-content-around">
                  <div className="row-example text-left text-center">
                    <img src={Ques} alt="" style={{ width: 35, height: 35 }} />
                    <span
                      className="fw-normal mb-1 mx-3 fontSizeChange"
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "22px",
                        lineHeight: "40px",
                      }}
                    >
                      {userData.total_questions}
                      <span
                        className="mb-1 mx-2 fontSizeChange"
                        style={{
                          color: "#A199A4",
                          // fontFamily: 'Open Sans',
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "22px",
                          lineHeight: "40px",
                        }}
                      >
                        Questions
                      </span>
                    </span>
                  </div>
                  <div className="col-example text-left text-center">
                    <img src={Clock} alt="" style={{ width: 35, height: 35 }} />
                    <span
                      className="fw-normal mb-1 mx-3 fontSizeChange"
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "22px",
                        lineHeight: "40px",
                      }}
                    >
                      {userData.duration}
                      <span
                        className="mb-1 mx-2 fontSizeChange"
                        style={{
                          color: "#A199A4",
                          // fontFamily: 'Open Sans',
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "22px",
                          lineHeight: "40px",
                        }}
                      >
                        Minutes
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-12 mt-4">
                <h5 className="ml-4 mb-3 fontSizeChange">Instructions</h5>
                <ul style={{ listStyle: "none", lineHeight: "2.3rem" }}>
                  <li>
                    {testDescription.map((item, index) => (
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                          <div className="pt-2">
                            <img
                              src={Instru}
                              key={index + item.id}
                              alt=""
                              className=""
                              style={{
                                width: 40,
                                height: 40,
                                TextColor: "var(--blue)",
                              }}
                            />
                          </div>
                          <div className="p-2 m-1 pt-2">
                            <span
                              className="instru"
                              style={{
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "22px",
                                lineHeight: "1.8rem",
                              }}
                            >
                              {item}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="col-6 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 mb-5 m-auto">
          <button
            type="submit"
            className="btn btn btn-block"
            style={{
              backgroundColor: "var(--blue)",
              color: "var(--white)",
              borderRadius: "2rem",
            }}
            onClick={() => handleTestDescription()}
          >
            <b style={{ fontSize: "1rem" }}>Start Test</b>
          </button>
        </div>
      </div>
    </>
  );
};

export default TestDescription;
