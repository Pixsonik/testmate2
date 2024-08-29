import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "../../assets/css/pages.css";
import { useLocation, useNavigate } from "react-router-dom";
import { contestStatus, scheduleTestDescApi, urlToken } from "../../api/api";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import Clock from "../../assets/img/schedule/clock.png";
import Instru from "../../assets/img/schedule/instru.png";
import Ques from "../../assets/img/schedule/ques.png";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { height } from "@mui/system";
import "../../assets/css/Responsive.css";
import toast, { Toaster } from "react-hot-toast";
const ScheduleTest = () => {
  const [userData, setUserdata] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState("");
  const [testData, setTestData] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    descriptionApi(location.state.contest_id);
  }, []);


  

  const descriptionApi = (id) => {
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
        console.log('resp of userdata isss', resp.data.data)
        setUserdata(resp.data.data);
        setDescription(resp.data.data.description);
        setTestData(resp.data.data);
        console.log("Schedule Description Response  --> ", resp.data.data);
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  const handleNext = () => {
    return navigate("/testreg", {
      state: {
        contest_id: location.state.contest_id,
        userData: userData,
      },
    });
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    // height: "100vh",
    height:"auto"
  };

  
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 mb-5 ">
          <div 
          // className="col-12 m-auto mt-5 pt-2"
          style={{margin:"0 12px" , padding: "18px 0"}}
          >
            <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-9  ">
              <div className="d-flex justify-content-around align-items-center schuduleTestFirst">
                <div className=" col-example text-left schul-test-mT">
                  <div className="text-center">
                    <p
                      className="fw-bold mb-1 text-center"
                      style={{ color: "var(--blue)", fontSize: "1.5rem" }}
                    >
                      {/* <img
                        src={userData.image}
                        alt=""
                        style={{ width: 30, height: 30 }}
                      /> */}
                      {userData.subject_name}
                    </p>
                    <p
                      className="fw-normal mb-1"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {userData.name}
                    </p>
                  </div>
                </div>
                <div className=" col-example text-left schul-test-mT">
                  <div className="d-flex bd-highlight align-items-center">
                    <div className=" flex-fill bd-highlight mt-2"></div>
                    <div className="p-2 flex-fill bd-highlight col-example">
                      <p
                        className="fw-bold mb-1 text-center mx-2 "
                        style={{ fontSize: "20px" }}
                      >
                        <i
                          className="bx bxs-calendar-alt px-2 pt-2"
                          style={{ color: "var(--blue)", fontSize: "24px" }}
                        ></i>
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
                      className="vl mt-2"
                      style={{
                        borderLeft: "0.4rem solid var(--blue)",
                        height: " 4.5rem",
                      }}
                    ></div>
                    <div className="p-2 flex-fill bd-highlight col-example">
                      <p
                        className="fw-bold mb-1 text-center mx-1 mt-2"
                        style={{ fontSize: "1rem" }}
                      >
                        {/* {userData.} */}
                        {/* 00:00 AM */}
                        {userData.start_time }
                      </p>
                      <p
                        className="fw-normal mb-1 mx-1"
                        style={{ fontSize: "1rem" }}
                      >
                        Thursday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr
              className="container-fluid col-9 col-sm-9 col-md-9 col-lg-9"
              style={{
                color: "var(--blue)",
                border: "0.1rem solid var(--blue)",
              }}
            />
            <div className="container-fluid col-12 col-sm-9 col-md-12 col-lg-12">
              <div className="d-flex justify-content-around align-items-center scheduleTestSec">
                <div className="p-2 col-example text-left schul-test-mT">
                  <div className="text-center">
                    <p
                      className="fw-bold mb-1 text-center"
                      style={{ color: "var(--blue)", fontSize: "1.6rem" }}
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
                <div className="p-1 schul-test-mT">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-12  m-auto">
                    <button
                      type="button"
                      style={{
                        backgroundColor: "var(--blue)",
                        color: "var(--white)",
                        borderRadius: "2rem",
                      }}
                      className="btn btn-primary btn-xl px-5"
                      onClick={() => handleNext()}
                    >
                      <b style={{ fontSize: "1rem" }}>Proceed</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card bg-transparent col-12 col-sm-6 col-md-12 col-lg-9 m-auto mt-4"
              style={{ border: "2px solid var(--blue)", borderRadius: "20px" }}
            >
              <div className="col-12 col-sm-6 col-lg-12 col-md-12 mt-3">
                <div className="d-flex justify-content-around ques-min">
                  <div 
                  // className="row-example text-left text-center"
                  className="schdule-ques-min"
                  style={{display:"flex",
                alignContent:"center"}}
 
                  >
                    <img src={Ques} alt="" style={{ width: 30, height: 30 }} />
                    <span
                      className="fw-normal  mx-3 fontSizeChange"
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "40px",
                      }}
                    >
                      {userData.total_questions}
                      <span
                        className=" mx-2 fontSizeChange"
                        style={{
                          color: "#A199A4",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "24px",
                          lineHeight: "40px",
                        }}
                      >
                        Questions
                      </span>
                    </span>
                  </div>
                  <div 
                  // className="col-example text-left text-center"
                  style={{display:"flex",
                  alignContent:"center"}}
                  className="schdule-ques-min"
                  >
                    <img src={Clock} alt="" style={{ width: 30, height: 30 }} />
                    <span
                      className="fw-normal  mx-3  fontSizeChange"
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "40px",
                      }}
                    >
                      {userData.duration}
                      <span
                        className=" mx-2 fontSizeChange"
                        style={{
                          color: "#A199A4",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "24px",
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
                    {description.map((data, index) => (
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                          <div className="pt-2">
                            <img
                              src={Instru}
                              key={index + data.id}
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
                                fontSize: "16px",
                                lineHeight: "1.8rem",
                              }}
                            >
                              {data}
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
      </div>
    </>
  );
};

export default ScheduleTest;
