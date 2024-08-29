/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ANSWER, UPDATE_QUESTION } from "../../Redux/Action/IncreDecreSlice";
import "../../assets/css/pages.css";

const CombineWords = (props) => {
  const [questionList, setQuestionList] = useState([props.questionList]);
  const [ques, setQues] = useState(["1", "2", "3", "4", "5", "6"]);
  const [noOfQ, setNoOfQ] = useState(["1", "2", "3"]);
  const [textColor, setTextColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [optionColor, setOptionColor] = useState("");
  const [selectedOptionColor, setSelectedOptionColor] = useState("");
  const [answerForSubmit, setAnswerForSubmit] = useState("");

  const [optionBlock1, setOptionBlock1] = useState("");
  const [optionBlock2, setOptionBlock2] = useState("");
  const [optionBlock3, setOptionBlock3] = useState("");
  const [optionBlock4, setOptionBlock4] = useState("");
  const [optionBlock5, setOptionBlock5] = useState("");
  const [optionBlock6, setOptionBlock6] = useState("");

  const [optionBlock1Id, setOptionBlock1Id] = useState("");
  const [optionBlock2Id, setOptionBlock2Id] = useState("");
  const [optionBlock3Id, setOptionBlock3Id] = useState("");
  const [optionBlock4Id, setOptionBlock4Id] = useState("");
  const [optionBlock5Id, setOptionBlock5Id] = useState("");
  const [optionBlock6Id, setOptionBlock6Id] = useState("");

  const [box1Filled, setBox1Filled] = useState(false);
  const [box2Filled, setBox2Filled] = useState(false);
  const [box3Filled, setBox3Filled] = useState(false);
  const [box4Filled, setBox4Filled] = useState(false);
  const [box5Filled, setBox5Filled] = useState(false);
  const [box6Filled, setBox6Filled] = useState(false);

  const [box1Border, setBox1Border] = useState(true);
  const [box2Border, setBox2Border] = useState(false);
  const [box3Border, setBox3Border] = useState(false);
  const [box4Border, setBox4Border] = useState(false);
  const [box5Border, setBox5Border] = useState(false);
  const [box6Border, setBox6Border] = useState(false);

  const [box1Pressed, setBox1Pressed] = useState(false);
  const [box2Pressed, setBox2Pressed] = useState(false);

  const [selectedButton, setSelectedButton] = useState([]);

  const [boxIndex, setBoxIndex] = useState(0);

  const [boxIndex0, setBoxIndex0] = useState("");
  const [boxIndex1, setBoxIndex1] = useState("");
  const [boxIndex2, setBoxIndex2] = useState("");

  const [disableBtn1, setDisableBtn1] = useState("");
  const [disableBtn2, setDisableBtn2] = useState("");
  const [disableBtn3, setDisableBtn3] = useState("");
  const [disableBtn4, setDisableBtn4] = useState("");
  const [disableBtn5, setDisableBtn5] = useState("");
  const [disableBtn6, setDisableBtn6] = useState("");

  const [dontMoveBorder, setDontMoveBorder] = useState(false);

  const [question, setQuestion] = useState("");
  const [qOptions, setQOptions] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [questionDataResponse, setQuestionDataResponse] = useState(
    props.questions
  );

  const dispatch = useDispatch();
  const {
    currentQuestionRedux,
    currentQuestionId,
    currentQuestionAnswer,
    questions,
    noOfQuestionsAttempted,
  } = useSelector((state) => state.incrementDecrement);
  console.log("currentQuestion  ----------", currentQuestionRedux);

  useEffect(() => {
    console.log("QuestionId ---", UPDATE_QUESTION(questionList[0].id));
    setTextColor(props.textColor);
    setButtonColor(props.buttonColor);
    setOptionColor(props.optionColor);
    setSelectedOptionColor(props.selectedOptionColor);


    let questionDataResponse = [...questionDataResponse];
    for (let qdata of questionDataResponse) {
      if (qdata.id == questionList[0].id) {
        qdata.selectedOptionId =
          qdata.selectedOptionId == null
            ? ["", "", "", "", "", ""]
            : qdata.selectedOptionId;
        setOptionBlock1(qdata.selectedOptionId[0].value);
        setOptionBlock2(qdata.selectedOptionId[1].value);
        setOptionBlock3(qdata.selectedOptionId[2].value);
        setOptionBlock4(qdata.selectedOptionId[3].value);
        setOptionBlock5(qdata.selectedOptionId[4].value);
        setOptionBlock6(qdata.selectedOptionId[5].value);
      }
    }
    setQuestionDataResponse();
  }, []);

  const fillBox1 = (item, index, oid) => {
    box1Filled
      ? (setBox1Filled(true),
        setBox1Border(true),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock1(item),
        setOptionBlock1Id(oid),
        setBox1Filled(true),
        setBoxIndex0(index),
        setBox1Border(false),
        setBox2Border(box2Filled ? false : true),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false));
  };
  const fillBox2 = (item, index, oid) => {
    box2Filled
      ? (setBox2Filled(false),
        setBox1Border(false),
        setBox2Border(true),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock2(item),
        setOptionBlock2Id(oid),
        setBox2Filled(true),
        setBoxIndex1(index),
        setBox2Border(false),
        setBox2Border(false),
        setBox3Border(box3Filled ? false : true),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false));
  };

  const fillBox3 = (item, index, oid) => {
    box3Filled
      ? (setBox3Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(true),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock3(item),
        setOptionBlock3Id(oid),
        setBox3Filled(true),
        setBoxIndex2(index),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(box4Filled ? false : true),
        setBox5Border(false),
        setBox6Border(false));
  };

  const fillBox4 = (item, index, oid) => {
    box4Filled
      ? (setBox4Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(true),
        setBox5Border(false),
        setBox6Border(false))
      : (setOptionBlock4(item),
        setOptionBlock4Id(oid),
        setBox4Filled(true),
        setBoxIndex(item),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(box5Filled ? false : true),
        setBox6Border(false));
  };

  const fillBox5 = (item, index, oid) => {
    box5Filled
      ? (setBox5Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(true),
        setBox6Border(false))
      : (setOptionBlock5(item),
        setOptionBlock5Id(oid),
        setBox5Filled(true),
        setBoxIndex(item),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(true),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(box6Filled ? false : true));
  };

  const fillBox6 = (item, index, oid) => {
    box6Filled
      ? (setBox6Filled(false),
        setBox1Border(false),
        setBox2Border(false),
        setBox3Border(false),
        setBox4Border(false),
        setBox5Border(false),
        setBox6Border(true))
      : (setOptionBlock6(item),
        setOptionBlock6Id(oid),
        setBox6Filled(true),
        setBoxIndex(item),
        setBox6Border(false));
  };

  const handleBoxSelect = (data, index) => {
    console.log("item  --->  ", data, index);
    switch (index) {
      case 0:
        setBox1Filled(false);
        setBoxIndex(0);
        setDontMoveBorder(true);
        break;
      case 1:
        setBox2Filled(false);
        setBoxIndex(1);
        setDontMoveBorder(true);
        break;
      case 2:
        setBox2Filled(false);
        setBoxIndex(2);
        setDontMoveBorder(true);
        break;
      case 3:
        setBox3Filled(false);
        setBoxIndex(3);
        setDontMoveBorder(true);
        break;
      case 4:
        setBox4Filled(false);
        setBoxIndex(4);
        setDontMoveBorder(true);
        break;
      case 5:
        setBox5Filled(false);
        setBoxIndex(5);
        setDontMoveBorder(true);
        break;
      default:
        setBox6Filled(true);
        setBoxIndex("");
        break;
    }
  };

  const getOptions = (item, index, oid, qid, data) => {
    var ans = [];
    console.log("item ------ ", item);
    let questionDataResponse = [...questionDataResponse];

    for (let qdata of questionDataResponse) {
      if (qdata.id == qid) {
        console.log("selected ", qdata.id);
        qdata.selectedOptionId[0] = data;
        qdata.selectedOptionId[1] = data;
        qdata.selectedOptionId[2] = data;
        qdata.selectedOptionId[3] = data;
        qdata.selectedOptionId[4] = data;
        qdata.selectedOptionId[5] = data;
      }
    }
    // setSelectedOptionId(oid);

    setQuestionDataResponse();
    setTimeout(() => {
      dispatch(UPDATE_QUESTION(questionList[0].id));
      dispatch(UPDATE_ANSWER(""));
      console.log("QuestionId ---", UPDATE_QUESTION(questionList[0].id));
      console.log("QuestionId ---",currentQuestionId);
    }, 100);

    ans[0] = optionBlock1Id;
    ans[1] = optionBlock2Id;
    ans[2] = optionBlock3Id;
    ans[3] = optionBlock4Id;
    ans[4] = optionBlock5Id;
    ans[5] = optionBlock6Id;

    setAnswerForSubmit(ans);
    console.log(answerForSubmit);

    // update_answer_data(answerForSubmit)
    // count_attempts(1);

    if (!box1Filled) {
      fillBox1(item, index, oid);
      setBoxIndex(dontMoveBorder ? "" : 1);
      setDisableBtn1(item);
    } else if (!box2Filled) {
      fillBox2(item, index, oid);
      setBoxIndex(dontMoveBorder ? "" : 2);
      setDisableBtn2(item);
    } else if (!box3Filled) {
      fillBox3(item, index, oid);
      setBoxIndex(dontMoveBorder ? "" : 3);
      setDisableBtn3(item);
    } else if (!box4Filled) {
      fillBox4(item, index, oid);
      setBoxIndex(dontMoveBorder ? "" : 4);
      setDisableBtn4(item);
    } else if (!box5Filled) {
      fillBox5(item, index, oid);
      setBoxIndex(dontMoveBorder ? "" : 5);
      setDisableBtn5(item);
    } else if (!box6Filled) {
      fillBox6(item, index, oid);
      setBoxIndex(dontMoveBorder ? "" : 6);
      setDisableBtn6(item);
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-10 mt-3 justify-content-center m-auto">
          <div className="form">
            <div className="container-fluid">
              <div className="row">
                <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-3">
                  <label className="form-label" style={{ color: textColor }}>
                    <UnsafeComponent html={questionList[0].question} />
                  </label>
                </div>
                <div className="col-8">
                  <Row>
                    {ques.map((data, index) => {
                      return (
                        <div sm={12} md={6} className=" col-6 mt-3">
                          <button
                            className="combinebuttons col-12 col-sm-12 col-md-12 col-lg-12 mt-4"
                            style={{
                              borderColor:
                                boxIndex == index ? textColor : buttonColor,
                              borderStyle: "dotted",
                              color: textColor,
                              backgroundColor: buttonColor,
                            }}
                            onClick={() => handleBoxSelect(data, index)}
                          >
                            <UnsafeComponent
                              html={
                                index === 0
                                  ? optionBlock1
                                  : index === 1
                                  ? optionBlock2
                                  : index === 2
                                  ? optionBlock3
                                  : index === 3
                                  ? optionBlock4
                                  : index === 4
                                  ? optionBlock5
                                  : index === 5
                                  ? optionBlock6
                                  : ""
                              }
                            />
                          </button>
                        </div>
                      );
                    })}
                  </Row>
                </div>
                <div className="col-4">
                  {noOfQ.map((data, index) => (
                    <div className="d-flex mt-3">
                      <span className="mt-4 p-2 text-white fw-bold">
                        =&nbsp;&nbsp;
                      </span>
                      <button
                        className="combinebuttons col-12 col-sm-12 col-md-12 col-lg-12 mt-4 p-1 p-auto"
                        style={{
                          borderColor:
                            boxIndex === index ? textColor : buttonColor,
                          // borderStyle: "dotted",
                          color: textColor,
                          backgroundColor: buttonColor,
                        }}
                      >
                        <UnsafeComponent
                          html={
                            index === 0 && optionBlock1 && optionBlock2
                              ? optionBlock1 + optionBlock2.toLowerCase()
                              : index === 1 && optionBlock3 && optionBlock4
                              ? optionBlock3 + optionBlock4.toLowerCase()
                              : index === 2 && optionBlock5 && optionBlock6
                              ? optionBlock5 + optionBlock6.toLowerCase()
                              : ""
                          }
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-around text-center mt-5 ">
                  <div className="col-12">
                    {questionList[0].option.map((data, index) => {
                      return (
                        <button
                          className="combinebuttons col-12 col-sm-12 col-md-6 col-lg-3 mt-4 mx-2"
                          style={{
                            color: buttonColor,
                            backgroundColor:
                              disableBtn1 === data.value
                                ? "#858585"
                                : disableBtn2 === data.value
                                ? "#858585"
                                : disableBtn3 === data.value
                                ? "#858585"
                                : disableBtn4 === data.value
                                ? "#858585"
                                : disableBtn5 === data.value
                                ? "#858585"
                                : disableBtn6 === data.value
                                ? "#858585"
                                : optionColor,
                          }}
                          disabled={
                            disableBtn1 === data.value
                              ? true
                              : disableBtn2 === data.value
                              ? true
                              : disableBtn3 === data.value
                              ? true
                              : disableBtn4 === data.value
                              ? true
                              : disableBtn5 === data.value
                              ? true
                              : disableBtn6 === data.value
                              ? true
                              : false
                          }
                          onClick={() =>
                            getOptions(
                              data.value,
                              index,
                              data.option_id,
                              questionList[0].id,
                              data
                            )
                          }
                        >
                          <UnsafeComponent html={data.value} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default CombineWords;
