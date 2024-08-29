import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "../../assets/css/pages.css";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_ANSWER,
  UPDATE_QUESTION,
} from "../../Redux/Action/IncreDecreSlice";
import { COUNT_QUESTION_ATTEMPTS } from "../../Redux/Action/ActionTypes";

const answer = [];

const MCQ = (props) => {
  const [questionList, setQuestionList] = useState([props.questionList]);
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [questionDataResponse, setQuestionDataResponse] = useState(
    props.questions
  );
  const [textColor, setTextColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [optionColor, setOptionColor] = useState("");
  const [selectedOptionColor, setSelectedOptionColor] = useState("");
  const [answer, setAnswer] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState("");

  const dispatch = useDispatch();
  const {
    currentQuestionRedux,
    currentQuestionId,
    currentQuestionAnswer,
    questions,
    noOfQuestionsAttempted,
  } = useSelector((state) => state.incrementDecrement);
  // console.log("Question  ----------",questions);

  useEffect(() => {
    // console.log("QuestionId ---", UPDATE_QUESTION(questionList[0].id));
    setTextColor(props.textColor);
    setButtonColor(props.buttonColor);
    setOptionColor(props.optionColor);
    setSelectedOptionColor(props.selectedOptionColor);
    setTimeout(() => {
      // console.log("question in mcq == ", questionList[0]);
    }, 50);

    // let questionDataResponse = [];

    // questionDataResponse = [...questionDataResponse];
    // for (let qdata of questionDataResponse) {
    //   if (qdata.id == questionList[0].id) {
    //     qdata.selectedOptionId =
    //       qdata.selectedOptionId == null ? "" : qdata.selectedOptionId;
    //   }
    // }
    // setQuestionDataResponse();
    // console.log("currr data== ", questionDataResponse);
    // setSelectedOptionId(
    //   questionDataResponse.slice(currentQuestion, currentQuestion + 1)[0]
    //     .selectedOptionId
    // );

    // setTimeout(() => {

    //   dispatch(UPDATE_QUESTION(questionList[0].id));
    //   dispatch(UPDATE_ANSWER(""));
    //   console.log("current question id ", currentQuestionId);
    //   console.log(
    //     "question resp list is ",
    //     questionDataResponse.slice(currentQuestion, currentQuestion + 1)[0]
    //   );
    //   console.log("selected option id is ", selectedOptionId);
    //   console.log("options list is ", questionList[0].option);
    // }, 300);
  }, []);

  const handleMCQSelctionEvent = (option, index, qid, oid) => {
    setSelectedOption(option);
    setSelectedOptionIndex(index);
    let questionDataResponse = [];
    questionDataResponse = [...questionDataResponse];
    for (let qdata of questionDataResponse) {
      if (qdata.id == questionList[0].id) {
        qdata.selectedOptionId =
          qdata.selectedOptionId == null ? "" : qdata.selectedOptionId;
      }
    }
    setQuestionDataResponse();
    // console.log("selected Option Id-------", selectedOptionId);

    answer[0] = oid;
    // console.log("---------", answer);

    setTimeout(() => {
      let questionDataResponse = [];
      questionDataResponse = [...questionDataResponse];
      for (let qdata of questionDataResponse) {
        if (qdata.id == qid) {
          // console.log("selected ", qdata.id);
          qdata.selectedOptionId = oid;
        }
      }
      setSelectedOptionId(oid);
      setQuestionDataResponse();
      setTimeout(() => {
        // console.log("array after selected", questionDataResponse);
      }, 100);
    }, 50);

    setTimeout(() => {
      // console.log(
      //   "selected Option",
      //   selectedOption,
      //   "selected Index ",
      //   selectedOptionIndex,
      //   "selected Option Id",
      //   qid
      // );
      dispatch(UPDATE_ANSWER(answer));
      dispatch(COUNT_QUESTION_ATTEMPTS(1));
    }, 100);
    // console.log(
    //   "updated data -----",
    //   currentQuestionAnswer,
    //   "updated answer--------",
    //   dispatch(UPDATE_ANSWER(answer))
    // );
  };

  return (
    <>
      <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 mt-3 justify-content-center m-auto">
        <div className="form">
          <div className="container-fluid  p-3 mb-5">
            <div className="row">
              <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                <label className="form-label" style={{ color: textColor }}>
                  <UnsafeComponent html={questionList[0].question} />
                </label>
              </div>
              <div className="col-12">
                <Row>
                  {questionList[0].option.map((data, index) => (
                    <div sm={12} md={3} className=" col-6 mt-3">
                      <button
                        className="buttons col-12 col-sm-12 col-md-6 col-lg-12 pt-3"
                        type="text"
                        key={data.option_id + index}
                        style={{
                          color: textColor,
                          backgroundColor:
                            selectedOptionId === data.option_id
                              ? selectedOptionColor
                              : optionColor,
                        }}
                        onClick={() =>
                          handleMCQSelctionEvent(
                            data,
                            index,
                            questionList[0].id,
                            data.option_id
                          )
                        }
                      >
                        <UnsafeComponent html={data.value} />
                      </button>
                    </div>
                  ))}
                </Row>
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

export default MCQ;
