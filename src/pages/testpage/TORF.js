import React, { useEffect, useState } from "react";

const TrueFalse = (props) => {
  const [questionList, setQuestionList] = useState([props.questionList]);
  const [currentQuestion, setCurrentQuestion] = useState(props.currentQuestion);
  const [textColor, setTextColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [optionColor, setOptionColor] = useState("");
  const [answer, setAnswer] = useState([]);
  const [selectedOptionColor, setSelectedOptionColor] = useState("");

  useEffect(() => {
    setTextColor(props.textColor);
    setButtonColor(props.buttonColor);
    setOptionColor(props.optionColor);
    setSelectedOptionColor(props.selectedOptionColor);
    setTimeout(() => {
      // console.log("question in truefalse == ", questionList[0]);
    }, 50);
  }, []);



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
              {questionList[0].option.map((item) => (
                <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-5">
                  <button
                    type="text"
                    key={item.id}
                    className="btn btn-primary"
                    style={{
                      borderColor:
                        item.option_id === answer ? "var(--blue)" : "var(--white)",
                      color: textColor,
                      backgroundColor: optionColor,
                    }}
                    onClick={() => setAnswer(item.option_id)}
                  >
                    {item.value}
                  </button>
                </div>
              ))}
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

export default TrueFalse;
