import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  playTestQuestionApi,
  submitAnswerApi,
  submitTestApi,
  urlToken,
} from "../../api/api";
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";
import CombineWords from "../testpage/CombineWords";
import FillinBlank from "../testpage/FillinBlank";
import MatchFollowing from "../testpage/MatchFollowing";
import MCQ from "../testpage/MCQ";
import TrueFalse from "../testpage/TrueFalse";

const userId = localStorage.getItem("UserId");

const FriendTestScreen = () => {
  const location = useLocation();

  // console.log(location.state.chapters, location.state.subject);

  const navigate = useNavigate();

  // console.log("User Info----------->", location.state.allInfo);

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionDataResponse, setQuestionDataResponse] = useState([{}]);
  const [questionsData, setQuestionsData] = useState([]);

  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState(null);
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    setTimeout(() => {
      playTestQuestion();
    }, 20);
    // console.log("qustion data --> ", questionsData);

    // setTimeout(() => {
    //   // timer = 0;
    //   seconds = minutes * 60;
    //   startTimer = startTimer.bind(this);
    //   countDown = countDown.bind(this);
    // }, 10);

    setTimeout(() => {
      let timeLeftVar = secondsToTime(seconds);
      setTime(timeLeftVar);
      startTimer();
    }, 50);
  }, []);

  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };

  const startTimer = () => {
    var secConv = minutes * 60;
    // if (timer == 0 && seconds > 0) {
    //   timer = setInterval(countDown, 1000);
    // }
  };

  const countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = seconds - 1;
    // this.setState({
    //   time: this.secondsToTime(seconds),
    //   seconds: seconds,
    // });
    setTime(secondsToTime(seconds));
    setSeconds(seconds);

    // Check if we're at zero.
    if (seconds == 0) {
      // clearInterval(timer);
      // console.log("time out----------");
    }
  };

  const playTestQuestion = () => {
    const url = playTestQuestionApi();
    const body = {
      token: urlToken,
      chapter_id: location.state.id,
      subject_id: location.state.subject,
      status: "pending",
      check: "incomplete",
    };
    // console.log("------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Test response---", resp.data.data);
        setQuestionDataResponse(resp.data.data);
        setNumberOfQuestions(resp.data.data);

        setTimeout(() => {
          getQuestionDataFun();
        }, 2000);
      })

      .catch((error) => {
        // console.log("error in fetching question list: ", error);
      });
  };

  const getQuestionDataFun = () => {
    setQuestionsData(
      questionDataResponse.slice(currentQuestion, currentQuestion + 1)[0]
    );

    setTimeout(() => {
      // console.log("question data===", questionsData);
    }, 10);
  };

  const submitButton = () => {
    submitAnswer();
    setTimeout(() => {
      submitTest();
    }, 50);
  };

  const submitTest = () => {
    const url = submitTestApi();
    const body = {
      token: urlToken,
      user_id: userId,
      chapter_id: location.state.id,
      level: location.state.testlevel,
      test_key: location.state.session_Key,
      // semester_id : semester_id,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Submit Test", resp.data.data);

        return navigate("/testfinish", {
          state: {
            id: location.state.chapter_id,
            levelName: location.state.levelName,
            testlevel: location.state.testlevel,
            allInfo: location.state.allInfo,
            session_Key: location.state.sessionKey,
          },
        });
      });
  };

  const submitAnswer = () => {
    const url = submitAnswerApi();
    const body = {
      token: urlToken,
      user_id: userId,
      chapter_id: location.state.id,
      level: location.state.testlevel,
      test_key: location.state.session_Key,
      // semester_id : semester_id,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Submit Answer", resp.data);
      })
      .catch((err) => {
        // console.log("error in fetching question list: ", err);
      });
  };

  const nextQuestionButtonPress = () => {
    submitAnswer();

    if (currentQuestion < numberOfQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeout(() => {
        getQuestionDataFun();
      }, 100);
    }
  };

  const prevQuestionButtonPress = () => {
    submitAnswer();

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeout(() => {
        getQuestionDataFun();
      }, 50);
    }
  };

  return (
    <>
      <div>
        <section className="content p-0 mb-5">
          <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="d-flex flex-row m-auto">
                  <div className="p-2">
                    <img src={Logo} alt="Logo" className="brand-image img " />
                  </div>
                  <div className="p-2">
                    <img
                      src={Testmate}
                      alt=""
                      className="brand-text d-block"
                      style={{
                        width: "150px",
                        height: "20px",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="col-12 col-sm-12 col-md-12 col-lg-12 header mt-3">
            <div className="d-flex justify-content-around">
              <div className="p-2">
                <i
                  className="bx bx-timer"
                  style={{ fontSize: "1.5rem", top: "2rem" }}
                ></i>
                {time.m}:{time.s}
              </div>
              <div className=" p-2">
                {currentQuestion + 1}/{numberOfQuestions}
              </div>
              <div className=" p-2">
                <button
                  onClick={() => submitButton()}
                  type="button"
                  className="btn btn-primary"
                  style={{ minWidth: "15rem" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-lg-12 m-auto mt-5 pt-2">
            {questionsData.question_type == "1" ? (
              <MCQ
                questionList={questionsData}
                questionDataResponse={questionDataResponse}
                currentQuestion={currentQuestion}
              />
            ) : questionsData.question_type == "2" ? (
              <TrueFalse
                questionList={questionsData}
                questionDataResponse={questionDataResponse}
                currentQuestion={currentQuestion}
              />
            ) : questionsData.question_type == "3" ? (
              <MatchFollowing
                questionList={questionsData}
                questionDataResponse={questionDataResponse}
                currentQuestion={currentQuestion}
              />
            ) : questionsData.question_type == "4" ? (
              <FillinBlank
                questionList={questionsData}
                questionDataResponse={questionDataResponse}
                currentQuestion={currentQuestion}
              />
            ) : questionsData.question_type == "5" ? (
              <CombineWords
                questionList={questionsData}
                questionDataResponse={questionDataResponse}
                currentQuestion={currentQuestion}
              />
            ) : null}

            {/* {isLoadingQuestions ? (
                <h2>Loading Questions</h2>
              ) : questionsData.slice(0, 1)[0].question_type == '1' ? (
                <MCQ
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestion}
                />
              ) : questionsData.slice(0, 1)[0].question_type == '2' ? (
                <TrueFalse
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestion}
                />
              ) : questionsData.slice(0, 1)[0].question_type == '3' ? (
                <MatchFollowing
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestion}
                />
              ) : questionsData.slice(0, 1)[0].question_type == '4' ? (
                <FillinBlank
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestion}
                />
              ) : questionsData.slice(0, 1)[0].question_type == '5' ? (
                <CombineWords
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                />
              ) : null} */}

            <div className="row">
              <div className="counselling-Form col-9 col-sm-9 col-md-6 col-lg-3 mt-5 m-auto">
                <button
                  onClick={() => prevQuestionButtonPress()}
                  type="button"
                  className="btn btn btn-md"
                  style={{
                    width: "100%",
                    borderRadius: "4rem",
                    backgroundColor: "var(--blue)",
                    color: "var(--white)",
                    boxShadow:
                      "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                  }}
                >
                  <i className="bx bx-chevrons-left"></i>Prev
                </button>
              </div>
              <div className="counselling-Form col-9 col-sm-9 col-md-6 col-lg-3 mb-2 mt-5 m-auto ">
                <button
                  onClick={() => nextQuestionButtonPress()}
                  type="button"
                  className="btn btn btn-md"
                  style={{
                    width: "100%",
                    borderRadius: "4rem",
                    backgroundColor: "var(--blue)",
                    color: "var(--white)",
                    boxShadow:
                      "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                  }}
                >
                  Next<i className="bx bx-chevrons-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FriendTestScreen;
