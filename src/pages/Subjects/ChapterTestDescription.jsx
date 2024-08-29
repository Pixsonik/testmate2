import React, { useEffect, useState } from "react";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
// import Home from "../assets/img/store.png";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Ques from "../../assets/img/schedule/ques.png";
import Clock from "../../assets/img/schedule/clock.png";
import Instru from "../../assets/img/schedule/instru.png";
import semIcon from "../../assets/img/semIcon/semester2.png";
import {
  chapterTestPreviewApi,
  chapterTestQuestionApi,
  defaultQuestionAnswer,
  testSessionApi,
  urlToken,
} from "../../api/api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Bronze from "../../assets/img/medal/bronz.png";
import Silver from "../../assets/img/medal/silver.png";
import Gold from "../../assets/img/medal/gold.png";
import { data } from "jquery";
import TestScreen from "../testpage/TestScreen";
import "../../assets/css/Responsive.css"
import LoadingSpinner from "../../loader/LoadingSpinner";

const userId = localStorage.getItem("UserId");

const ChapterTestDescription = () => {
  const [chapterId, setChapterId] = useState("");
  const [levelId, setLevelId] = useState("");
  const [semesterId, setsemesterId] = useState("")
  const [testDescription, setTestDescription] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [sessionKey, setSessionKey] = useState("");
  const [isSessionCreated, setIsSessionCreated] = useState(false);
  const [duration, setDuration] = useState("");
  const [loading,setLoading]=useState(false)
  const [startLoading,setStartLoading]=useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  // console.log("subject info-------",location.state.allInfo,location.state.levelName,location.state.chapterName);

  useEffect(() => {
    
    setChapterId(location.state.chapter_id);
    setSubjectId(location.state.allInfo.subject_id);
    setLevelId(location.state.testlevel);
    // console.log("level for test---", location.state.allInfo);
    setTimeout(() => {
      chapterTestDescription(location.state.chapter_id,location.state.subject_id);
    }, 500);
  }, []);

  const testSessionCreator = async (id) => {
    setStartLoading(true)
    const url = testSessionApi();
    const body = {
      token: urlToken,
      userid: userId,
      chapter_id: id,
      chapter_count: 1,
    };

    // console.log("session creator bodyyy --- ", body);
    await axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setStartLoading(false)
        setSessionKey(resp.data.new_test_key);
        // console.log("Session Creator", resp.data);
        setIsSessionCreated(true);
        setTimeout(() => {
          chapterTestQuestion(resp.data.new_test_key)
          defaultchapterTestQuestion(resp.data.new_test_key)
        }, 50);
      })
      .catch((err) => {
        setStartLoading(false)

        // console.log("Error in Description", err);
      });
  };

  const chapterTestDescription = (id) => {
    setLoading(true)
    const url = chapterTestPreviewApi();
    const body = {
      token: urlToken,
      subject_id: location.state.allInfo.subject_id,
      chapter_id: id,
      level_id: location.state.testlevel,
    };
    // console.log("test description body-----------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
    setLoading(false)

        setUserInfo(resp.data.data);
        setTestDescription(resp.data.data.description);
        // console.log("chapter Description", resp.data.data);
        setDuration(resp.data.data.duration);
      })
      .catch((err) => {
    setLoading(false)

        // console.log("Error in Description", err);
      });
  };

  const startTestPress = () => {
    testSessionCreator(location.state.chapter_id);
  }

  const chapterTestQuestion = (test_key) => {
    const url = chapterTestQuestionApi();
    const body = {
      token: urlToken,
      user_id : userId,
      subject_id: subjectId,
      chapter_id: chapterId,
      level: location.state.testlevel,
      test_key: test_key,
      status: "test",
      check: "incomplete",
    };
    // console.log("chapter quest bodyyy -== ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("question List", resp.data.data);
        return navigate("/testscreen", {
          state: {
            id: location.state.chapter_id,
            levelName: location.state.levelName,
            testlevel: location.state.testlevel,
            allInfo: location.state.allInfo,
            session_Key: test_key,
            duration: duration,
            semesterId: location.state.semester_id,
          },
        });
        // return <TestScreen data={location.state.chapter_id} />
      })
      .catch((error) => {
        // console.log("error in fetching question list: ", error);
      });
  };

  const defaultchapterTestQuestion = (test_key) => {
    const url = defaultQuestionAnswer();
    const body = {
      token: urlToken,
      user_id : userId,
      subject_id: subjectId,
      chapter_id: chapterId,
      level: location.state.testlevel,
      test_key: test_key,
      status: "test",
      check: "incomplete",
    };
    console.log("chapter default question anser body -== ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("defaullt qna response is ===== ",resp.data);
      })
      .catch((error) => {
        console.log("error in fetching question list: ", error);
      });
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 mb-5">
          <div className="col-12 m-auto ">
            <div className="container-fluid col-12 col-sm-12 col-md-12 col-lg-9 ">
              <div className="d-flex justify-content-between chapter-level">
                <div className="p-2">
                  <div className="d-flex justify-content-center">
                    <img
                      src={semIcon}
                      alt="semIcon mt-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginTop: "20px",
                      }}
                    />
                    <div className=" col-example text-left mt-3 ">
                      <div className="text-center">
                        <p
                          className="fw-bold mb-1 text-center ml-4"
                          style={{ color: "var(--blue)", fontSize: "1.5rem" }}
                        >
                          {location.state.chapterName}
                        </p>
                        <span className="text-center ml-3">
                          Level: {location.state.levelName}
                        </span>
                        <p
                          className="fw-normal mb-1"
                          style={{ fontSize: "1.2rem" }}
                        >
                          {userInfo.level_id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-12 mt-4  m-auto">
                    {
                      startLoading ? <LoadingSpinner/> :
                      <button
                      type="button"
                      style={{
                        backgroundColor: "var(--blue)",
                        color: "var(--white)",
                        borderRadius: "2rem",
                      }}
                      className="btn btn-primary btn-xl px-5 mx-5"
                      onClick={() => startTestPress()}
                    >
                      <b style={{ fontSize: "1rem" }}>Start Test</b>
                    </button>
                    }
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid col-12 col-sm-12 col-md-12 col-lg-10 mt-3">
              <div className="d-flex justify-content-around" style={{flexWrap:"wrap", marginLeft:'-20px'}}>
                <div className="p-2 col-example">
                  <div className="box chapterLevel text-center">
                    <div className="mx-2">
                      <img src={Bronze} alt="level" />
                      <br />
                    </div>
                    <span className="text-center">60% - 70%</span>
                  </div>
                </div>
                <div className="p-2 col-example">
                  <div className="box chapterLevel text-center">
                    <div className="mx-2">
                      <img src={Silver} alt="level" />
                      <br />
                    </div>
                    <span className="text-center">70% - 85%</span>
                  </div>
                </div>
                <div className="p-2 col-example">
                  <div className="box chapterLevel text-center">
                    <div className="mx-2">
                      <img src={Gold} alt="level" />
                      <br />
                    </div>
                    <span className="text-center">85% - 100%</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card bg-transparent col-12 col-sm-6 col-md-12 col-lg-9 m-auto mt-4"
              style={{ border: "2px solid var(--blue)", borderRadius: "20px" }}
            >
              <div className="col-12 col-sm-6 col-md-12 col-lg-12 mt-3">
                <div className="d-flex justify-content-around text-center descrp-Flx">
                  <div className="row-example text-left text-center">
                    <img src={Ques} alt="" style={{ width: 30, height: 30, marginTop:'-7px' }} />
                    <span
                      className="fw-normal mb-1 mx-3 "
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "40px",
                      }}
                    >
                      {userInfo.total_question}
                      <span
                        className="mb-1 mx-2"
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
                  <div className="col-example text-left text-center ">
                    <img src={Clock} alt="" style={{ width: 30, height: 30, marginTop:'-7px' }} />
                    <span
                      className="fw-normal mb-1 mx-2 "
                      style={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "40px",
                      }}
                    >
                      {duration}
                      <span
                        className="mb-1 mx-2 pt-1"
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
              <div className="col-12 col-sm-6 col-md-12 col-lg-12 mt-4">
                <h5 className="ml-4 mb-3">Instructions</h5>
                <ul style={{ listStyle: "none", lineHeight: "2.3rem" }}>
                  <li>

                    {
                      loading ? <LoadingSpinner/> : 
                    testDescription.map((data, index) => (
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                          <div className="descrp-pad">
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
                                fontSize: "1rem",
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

export default ChapterTestDescription;
