import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "../../assets/css/pages.css";
import DraggableList from "react-draggable-lists";

const MatchFollowing = (props) => {
  const [testAnswer, setTestAnswer] = useState([]);
  const [testQuestion, setTestQuestion] = useState([]);
  const [questionList, setQuestionList] = useState([props.questionList]);
  const [textColor, setTextColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [optionColor, setOptionColor] = useState("");
  const [selectedOptionColor, setSelectedOptionColor] = useState("");

  useEffect(() => {
    setTextColor(props.textColor);
    setButtonColor(props.buttonColor);
    setOptionColor(props.optionColor);
    setSelectedOptionColor(props.selectedOptionColor)
    setTimeout(() => {
      // console.log("question in match the following == ", buttonColor);
    }, 50);
  }, []);

  const onMoveEnd = function (newList) {
    // console.log("newList ", newList);
  };

  return (
    <>
      <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-10 mt-3 justify-content-center m-auto">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="row" style={{ alignItems: 'center',  }}>
            <div className="col">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                <label className="form-label" style={{ color: textColor }}>
                  {questionList[0].question}
                </label>
              </div>
              <div className="d-flex flex-column mb-3 mt-3">
                <p style={{ marginLeft: "5rem", color: textColor,  }}>
                  Column A
                </p>
                {questionList[0].cola.map((data, index) => (
                  <div sm={12} md={6} className=" col-8 mt-3">
                    <button
                      className="buttons col-12 col-sm-12 col-md-12 col-lg-12 pt-3"
                      type="text"
                      id="openPopup"
                      key={data.id}
                      style={{
                        borderColor:
                          data.option_id === setTestAnswer
                            ? "var(--blue)"
                            : "var(--white)",
                        color: "#fff",
                        backgroundColor: optionColor,
                      }}
                    >
                      <UnsafeComponent html={data} />
                    </button>
                    
                  </div>
                ))}
              </div>
            </div>

            <div
              className="col-4"
              style={{ marginTop: "5rem", color: textColor }}
            >
              <div className="d-flex flex-column mt-5 pt-3 " >
                <p style={{ marginLeft: "1.5rem" }}>Column B</p>
                <div className="clob ">
                  <DraggableList
                    onMoveEnd={() => onMoveEnd()}
                    width={500}
                    height={80}
                    rowSize={1}
                    orders={[2, 1, 0]}
                    style={{
                      // border: "dotted",
                      backgroundColor: optionColor,
                      color: textColor,
                    }}
                  >
                    {questionList[0].colb &&
                      questionList[0].colb.map((data) => (
                        <div sm={12} md={3} className="col-6 mt-3">
                          <button
                            className="buttons col-12 col-sm-12 col-md-6 col-lg-12 p-2 mt-3"
                            type="text"
                            id="openPopup"
                            key={data.option_id}
                            style={{
                              // border: "dotted",
                              backgroundColor: optionColor,
                              color: textColor,
                            }}
                          >
                            <UnsafeComponent
                              html={data.value}
                              style={{ backgroundColor: optionColor }}
                            />
                          </button>
                        </div>
                      ))}
                  </DraggableList>
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

export default MatchFollowing;
