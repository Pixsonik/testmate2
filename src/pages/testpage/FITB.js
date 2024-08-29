import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "../../assets/css/pages.css";

const FillinBlank = (props) => {
  const [questionList, setQuestionList] = useState([props.questionList]);
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [textColor, setTextColor] = useState(props.textColor);
  const [buttonColor, setButtonColor] = useState(props.buttonColor);
  const [optionColor, setOptionColor] = useState(props.optionColor);
  const [selectedOptionColor, setSelectedOptionColor] = useState(
    props.selectedOptionColor
  );
  const [unSelectedButtonColor, setUnSelectedButtonColor] = useState("");
  const [answerOneFilled, setAnswerOneFilled] = useState(false);
  const [questionsFullForm, setQuestionsFullForm] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionsData, setQuestionsData] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [firstAnswerId, setFirstAnswerId] = useState("");
  const [secondAnswerId, setSecondAnswerId] = useState("");
  const [questionDataResponse, setQuestionDataResponse] = useState("");
  const [answerForSubmit, setAnswerForSubmit] = useState([]);

  const qes = ["", "is the capital of", ""];

  var answers = [];

  useEffect(() => {
    setTextColor(props.textColor);
    setButtonColor(props.buttonColor);
    setOptionColor(props.optionColor);
    setSelectedOptionColor(props.selectedOptionColor);
    // console.log("question in fill i blnk == ", questionList[0]);
    setAnswerOneFilled(false);
    // console.log("question list in fill up screen =====", questionList);
    setQuestionsData(questionList[0]);
    setQuestions(questionList[0]);
    setQuestions(questionList[0].question);
    setQuestionsFullForm(questionList[0].break_question);
  }, []);

  const checkFill = (item, index, oid, qid, data) => {
    if ((questionsFullForm.length > 2) & answerOneFilled) {
      handleAnswer2(item, index, oid, qid, data);
    } else {
      handleAnswer1(item, index, oid, qid, data);
    }
  };

  const handleAnswer1 = (item, index, oid, qid, data) => {
    // console.log(" item  ---> ", item);
    answers[0] = oid;
    // console.log(answers);

    let questionDataResponse = [...questionDataResponse];

    for (let qdata of questionDataResponse) {
      if (qdata.id == qid) {
        // console.log("selected ", qdata.id);
        qdata.selectedOptionId[0] = data;
        // setTimeout(() => {
        //     answers[0] = qdata.selectedOptionId[0].option_id
        // }, 50);
      }
    }
    setQuestionDataResponse();
    setTimeout(() => {
      // console.log("selected answ arr ", questionDataResponse);
      // console.log("answer is =====", answers);
    }, 1000);

    setTimeout(() => {
      setAnswerForSubmit(answers);
      // console.log(answerForSubmit);
      // this.props.update_answer_data(answerForSubmit);
      // this.props.count_attempts(1);
    }, 100);

    if (firstAnswer === "") {
      setFirstAnswer(item);
      setFirstAnswerId(oid);
      setAnswerOneFilled(true);
    }
    if (firstAnswer !== "") {
      setFirstAnswer(item);
      setFirstAnswerId(oid);
      setAnswerOneFilled(true);
    }
  };

  const handleAnswer2 = (item, index, oid, qid, data) => {
    // console.log(" itemm  ---> ", item);

    answers[1] = oid;
    // console.log(answers);

    let questionDataResponse = [...questionDataResponse];

    for (let qdata of questionDataResponse) {
      if (qdata.id == qid) {
        // console.log("selected ", qdata.id);
        qdata.selectedOptionId[1] = data;
      }
    }

    setQuestionDataResponse();

    setTimeout(() => {
      setAnswerForSubmit(answers);
      // console.log(answerForSubmit);
      // this.props.update_answer_data(this.state.answerForSubmit);
      // this.props.count_attempts(1);
    }, 100);

    if (secondAnswer === "") {
      setSecondAnswer(item);
      setSecondAnswerId(oid);
      setAnswerOneFilled(true);
    }
    if (secondAnswer !== "") {
      setSecondAnswer(item);
      setSecondAnswerId(oid);
      setAnswerOneFilled(true);
    }
  };

  return (
    <>
      <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 mt-3 justify-content-center m-auto">
        <form className="form">
          <div className="container-fluid p-3 mb-5">
            <div className="row">
              <div className=" counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5 ">
                <label className="form-label" style={{ color: textColor }}>
                  {questionsFullForm[0] === "" ? (
                    <span>
                      <input
                        type="text"
                        className="form-control-input border-bottom"
                        style={{
                          borderColor: buttonColor,
                          borderStyle: "none",
                          backgroundColor: "transparent",
                          width: "30%",
                        }}
                      />
                    </span>
                  ) : (
                    <span>{questionsFullForm[0]}</span>
                  )}
                  {questionsFullForm[0] != "" ? (
                    <span>
                      <input
                        type="text"
                        className="form-control-input border-bottom"
                        style={{
                          borderColor: buttonColor,
                          borderStyle: "none",
                          backgroundColor: "transparent",
                          width: "30%",
                        }}
                      />
                    </span>
                  ) : null}
                  {questionsFullForm[1] === "" ? null : (
                    <span>{questionsFullForm[1]}</span>
                  )}
                  {questionsFullForm[1] != "" &&
                  questionsFullForm.length > 2 ? (
                    <span>
                      <input
                        type="text"
                        className="form-control-input border-bottom"
                        style={{
                          borderColor: buttonColor,
                          backgroundColor: "transparent",
                          borderStyle: "none",
                          width: "auto",
                        }}
                      />
                    </span>
                  ) : null}
                  {questionsFullForm[2] === "" ? null : (
                    <span>{questionsFullForm[2]}</span>
                  )}
                </label>
              </div>
              <div className="col-12">
                <Row>
                  {questionList[0].option.map((data, index) => (
                    <div sm={12} md={3} className=" col-6 mt-3" style={{}}>
                      <button
                        className="buttons col-12 col-sm-12 col-md-6 col-lg-12 p-3"
                        type="text"
                        key={data.option_id + index}
                        style={{
                          color: textColor,
                          backgroundColor: optionColor,
                          // firstAnswerId === data.option_id
                          //   ? selectedOptionColor
                          //   : secondAnswerId === data.option_id
                          //   ? selectedOptionColor
                          //   : optionColor,
                        }}
                        onClick={() =>
                          checkFill(
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
                    </div>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
export default FillinBlank;
