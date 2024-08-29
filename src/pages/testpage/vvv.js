import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  chapterTestQuestionApi,
  submitAnswerApi,
  submitTestApi,
  urlToken,
} from "../../api/api";
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";
import LoadingSpinner from "../../loader/LoadingSpinner";
import CombineWords from "./CombineWords";
import FillinBlank from "./FillinBlank";
import MatchFollowing from "./MatchFollowing";
import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";
import { useSelector, useDispatch } from "react-redux";
import Timer from "./Timer";
import "../../assets/css/pages.css"
import {
  DECREMENT_QUESTION,
  INCRMENT_QUESTION,
  SET_QUESTION,
  UPDATE_ANSWER,
  SET_COUNTER_ZERO,
  UPDATE_QUESTION,
} from "../../Redux/Action/IncreDecreSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { display, margin } from "@mui/system";

const user_Id = localStorage.getItem("UserId");

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Extra instruction</h4>
        <p>
        <span style={{fontSize: "22px"}}>  &bull; </span>You are not allowed to moveout the test (window / page). <br/>
        <span style={{fontSize: "22px"}}>&bull; </span>If you moveout the (window / page) test will be terminated.
       </p>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={props.startTest}>Start</Button>
      </Modal.Footer>
    </Modal>
  );
}

const TestScreen = ({ props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [testLevel, setTestLevel] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionDataResponse, setQuestionDataResponse] = useState({});
  const [qdata, setQdata] = useState([{}])
  const [questionsData, setQuestionsData] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState("");
  const [textColor, setTextColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [optionColor, setOptionColor] = useState("");
  const [selectedOptionColor, setSelectedOptionColor] = useState("");
  const [modalShow, setModalShow] = React.useState(true);
  const [timer,setTimer]=useState(false)

  const dispatch = useDispatch();
  const {
    currentQuestionRedux,
    currentQuestionId,
    currentQuestionAnswer,
    questions,
    noOfQuestionsAttempted,
  } = useSelector((state) => state.incrementDecrement);

  // console.log("ques----------->", questions);
  const hoursMinSecs = { minutes: location.state.duration, seconds: 0 };
  // console.log("timer",location.state.duration)

  useEffect(() => {
    chapterTestQuestion();
    // console.log("sem id", location.state.semesterId);
    // console.log("selected button color   :==== ", location.state.allInfo.subject_selected_btn);
    dispatch(SET_COUNTER_ZERO(0));
    // console.log("set counter-------", SET_COUNTER_ZERO());
  }, []);

  const enterModal=()=>{ 
    setModalShow(false)
    chapterTestQuestion()
    setTimer(true)
}

  const chapterTestQuestion = () => {
    const url = chapterTestQuestionApi();
    const body = {
      token: urlToken,
      chapter_id: location.state.id,
      level: location.state.testlevel,
      test_key: location.state.session_Key,
      status: "test",
      check: "incomplete",
    };
    // console.log("body of chapter Description------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Test response 1---", resp.data.data);
        setQuestionDataResponse(resp.data.data);

        // setQdata(resp.data.data)
        // console.log("qdata",qdata)

        setNumberOfQuestions(resp.data.data.length);
        setQuestionDataResponse(resp.data.data);
        setTextColor(location.state.allInfo.subject_text_color);
        setButtonColor(location.state.allInfo.subject_button_color);
        setOptionColor(location.state.allInfo.subject_unselected_btn);
        setSelectedOptionColor(location.state.allInfo.subject_selected_btn);
        setTimeout(() => {
          dispatch(SET_QUESTION(questionDataResponse));
        }, 10);
        setTimeout(() => {
          // console.log(
          //   "set Questions-------",
          //   SET_QUESTION(questionDataResponse)
          // );
        }, 10);

        // console.log("question response is : ", questionDataResponse);
        // console.log("number of questions  :==== ", numberOfQuestions);
        setNumberOfQuestions(resp.data.data.length);
        // console.log("question response is : ", questionDataResponse);

        getQuestionDataFun();

        setTimeout(() => {
          let questionDataResponse = [...questionDataResponse];
          questionDataResponse.slice(0, 1).selectedOptionId =
            questionDataResponse.slice(0, 1).selectedOptionId == null
              ? ""
              : questionDataResponse.slice(0, 1).selectedOptionId;
          setQuestionDataResponse();
          setTimeout(() => {
            // console.log(questionDataResponse.slice(0, 1));
          }, 2000);
        }, 100);
        // console.log(
        //   "updateQuestion  ----------",
        //   dispatch(UPDATE_QUESTION(questionDataResponse))
        // );
      })
      .catch((error) => {
        // console.log("error in fetching question list:", error);
      });
  };

  const getQuestionDataFun = () => {

    setTimeout(() => {
      // console.log("currentQuestionRedux======",currentQuestionRedux);
    }, 200);
    setQuestionsData(
      questionDataResponse.slice(
        currentQuestionRedux,
        currentQuestionRedux + 2
        )[0]
        );
        setLoaderVisible(false);
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
      token_key: location.state.session_Key,
      user_id: user_Id,
      level_id: location.state.testlevel,
      subject_id: location.state.subject_id,
      semester_id: location.state.semesterId,
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
      test_key: location.state.session_Key,
      user_id: user_Id,
      question_id: currentQuestionId,
      answer: currentQuestionAnswer,
    };
    // console.log("body of submit answer----", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Submit Answer--------", resp.data);
        // console.log(
        //   "id=== ",
        //   currentQuestionId,
        //   "answer==== ",
        //   currentQuestionAnswer
        // );
      })
      .catch((err) => {
        // console.log("error in fetching question list: ", err);
      });
  };

  const nextQuestionButtonPress = () => {
    submitAnswer();
    if (currentQuestionRedux < numberOfQuestions - 1) {
      dispatch(INCRMENT_QUESTION(1));
      setLoaderVisible(true);
      setTimeout(() => {
        getQuestionDataFun();
      }, 100);
    }
    // console.log("my2", questionDataResponse)
    // console.log("currentQuestion ----------", currentQuestionRedux);
  };

  const prevQuestionButtonPress = () => {
    submitAnswer();
    dispatch(DECREMENT_QUESTION(1));
    if (currentQuestionRedux > 0) {
      setLoaderVisible(true);
      setTimeout(() => {
        getQuestionDataFun();
      }, 50);
    }
    // console.log("currentQuestion ----------", currentQuestionRedux);
  };

  const myTestBackground = {
    backgroundImage: `url(${location.state.allInfo.subject_bg_image})`,
    width: "100%",
    height: "auto",
  };

  return (
    <>
      <div>
        <section
          className="card col-12 col-sm-12 col-md-12 col-lg-8 content p-0 m-auto"
          style={myTestBackground}
        >
          <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="d-flex flex-row m-auto">
                  <div className="p-2">
                    <img src={Logo} alt="Logo" className="brand-image img" />
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

          <div className="col-12 col-sm-12 col-md-12 col-lg-12 header mt-3 pt-3">

            <div className="mb-3">
              {/* <Button variant="primary" onClick={() => setModalShow(true)} 
              style={{padding:" 6px 38px",
                display:"block",
                margin:"auto"
              }}>
                 
              </Button> */}

              <MyVerticallyCenteredModal
                show={modalShow}
                // onHide={() =>  }
                startTest={()=>enterModal()}
              />
            </div>
            <div className="navTest">
              <div
                className=""
                style={{
                  fontSize: "1.5rem",
                  color: location.state.allInfo.subject_text_color,
                }}
              >
             <span className="QN"> Q.No: </span>{currentQuestionRedux + 1}/{numberOfQuestions}
              </div>
            {timer===true ?  <div
                className="d-flex"
                style={{
                  color: location.state.allInfo.subject_text_color,
                  fontSize: "1.5rem",
                  padding: "0.4rem",
                }}
              >
                <i
                  className="bx bxs-hourglass"
                  style={{ fontSize: "1.7rem ", padding: "0.3rem" }}
                ></i>{" "}
                &nbsp;
                <Timer hoursMinSecs={hoursMinSecs} />
              </div>
              : null
           }
             
              <div className=" p-2 mt-1">
                <button
                  onClick={() => submitButton()}
                  type="button"
                  className="btn btn-primaryTest"
                  disabled={noOfQuestionsAttempted === 0 ? true : false}
                  style={{
                  
                    backgroundColor: location.state.allInfo.subject_text_color,
                    color: location.state.allInfo.subject_button_color,
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {loaderVisible ? (
            <div className="loader" style={{ textAlign: "center" }}>
              <LoadingSpinner />
            </div>
          ) : (
            <div
              className="col-12 col-sm-12 col-lg-12 m-auto mt-5 pt-3"
              style={{ textColor: location.state.allInfo.subject_button_color }}
            >
              {questionsData.question_type === "1" ? (
                <MCQ
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestionRedux}
                  textColor={textColor}
                  buttonColor={buttonColor}
                  optionColor={optionColor}
                  selectedOptionColor={selectedOptionColor}
                />
              ) : questionsData.question_type === "2" ? (
                <TrueFalse
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestionRedux}
                  textColor={textColor}
                  buttonColor={buttonColor}
                  optionColor={optionColor}
                  selectedOptionColor={selectedOptionColor}
                />
              ) : questionsData.question_type === "3" ? (
                <MatchFollowing
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestionRedux}
                  textColor={textColor}
                  buttonColor={buttonColor}
                  optionColor={optionColor}
                  selectedOptionColor={selectedOptionColor}
                />
              ) : questionsData.question_type === "4" ? (
                <FillinBlank
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestionRedux}
                  textColor={textColor}
                  buttonColor={buttonColor}
                  optionColor={optionColor}
                  selectedOptionColor={selectedOptionColor}
                />
              ) : questionsData.question_type === "5" ? (
                <CombineWords
                  questionList={questionsData}
                  questionDataResponse={questionDataResponse}
                  currentQuestion={currentQuestionRedux}
                  textColor={textColor}
                  buttonColor={buttonColor}
                  optionColor={optionColor}
                  selectedOptionColor={selectedOptionColor}
                />
              ) : null}

              <div className="row">
                <div className="counselling-Form col-6 col-sm-9 col-md-6 col-lg-2 mb-2 mt-5 m-auto">
                  <button
                    onClick={() => prevQuestionButtonPress()}
                    type="button"
                    disabled={currentQuestionRedux > 0 ? false : true}
                    className="btn btn btn-md"
                    style={{
                      width: "100%",
                      borderRadius: "3rem",
                      boxShadow:
                        "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                      backgroundColor:
                        currentQuestionRedux > 0
                          ? location.state.allInfo.subject_text_color
                          : "gray",
                      color:
                        currentQuestionRedux > 0
                          ? location.state.allInfo.subject_button_color
                          : "white",
                      opacity: currentQuestionRedux > 0 ? 1 : 0.6,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i className="bx bx-chevrons-left"
                     style={{        
               paddingRight: "0px",
               fontSize: "17px"
                     }}
                    ></i>Prev
                  </button>
                </div>
                <div className="counselling-Form col-6 col-sm-9 col-md-6 col-lg-2 mb-2 mt-5 m-auto">
                  <button
                    onClick={() => nextQuestionButtonPress()}
                    type="button"
                    className="btn btn btn-md"
                    disabled={
                      currentQuestionRedux < numberOfQuestions - 1
                        ? false
                        : true
                    }
                    style={{
                      width: "100%",
                      borderRadius: "3rem",
                      boxShadow:
                        "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                      backgroundColor:
                        currentQuestionRedux > numberOfQuestions - 1
                          ? "gray"
                          : location.state.allInfo.subject_text_color,
                      color:
                        currentQuestionRedux > numberOfQuestions - 1
                          ? "white"
                          : location.state.allInfo.subject_button_color,
                      opacity:
                        currentQuestionRedux < numberOfQuestions - 1 ? 1 : 0.6,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                  >
                    Next<i className="bx bx-chevrons-right "></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default TestScreen;
