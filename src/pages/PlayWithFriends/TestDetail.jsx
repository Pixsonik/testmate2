import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import Button from "../../assets/img/Background/buttonBg.png";
import FriendList from "./FriendList";
import ChapterList from "./ChapterList";
import { testLeaderBoardApi, urlToken } from "../../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SemIcon from "../../assets/img/semIcon/semIcon.png";
import PWFFriendList from "./PWFFriendList";
import "../../assets/css/pages.css"
import "../../assets/css/Responsive.css"

const userId = localStorage.getItem("UserId");
var quearr;

const TestDetail = () => {
  const [isActive, setIsActive] = useState("Friend List");

  const [testId, setTestId] = useState("");
  const [challengeData, setChallengeData] = useState("");
  const [testDate, setTestDate] = useState("");
  const [testStartTime, setTestStartTime] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [textColor, setTextColor] = useState("");
  const [buttonColor, setbuttonColor] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [noFriends, setNoFriends] = useState("");
  const [friendList, setFriendList] = useState("");
  const [question, setQuestion] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [challengeStatus, setChallengeStatus] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTestId(location.state.test_id);
    friendTestDetails();
  }, []);

  const friendTestDetails = () => {
    const url = testLeaderBoardApi();
    const body = {
      token: urlToken,
      user_id: userId,
      test_id: location.state.test_id,
      mode: "upcoming",
    };

    // console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("challange details === ",resp.data.data);
        if (resp.data.status == 'true') {
          setChallengeData(resp.data.data);
          
          setChallengeStatus(resp.data.data.status);
          setTestDate(resp.data.data.date);
          setTestStartTime(resp.data.data.time);
          setQuestion(resp.data.data.questions);
          setNoFriends(resp.data.data.no_friends);
          setFriendList(resp.data.data.friends);
          setChapterId(resp.data.data.chapters);
          setSubjectId(resp.data.data.subject);
          
         

        }

        // console.log(resp.data.data);
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  const handleStartTest = () => {
    quearr = challengeData.questions.split(',');
    // console.log("question array == ",quearr);
    
    setTimeout(() => {
      return navigate("/friendTestScreen", {
        state: {
          test_id: location.state.test_id,
          bakground_image: challengeData.bakground_image,
          text_color: challengeData.text_color,
          button_color: challengeData.button_color,
          option_color: challengeData.unselected_btn,
          selected_option_color: challengeData.selected_btn,
          subject_id: challengeData.subject,
          chapter_id: challengeData.chapter_id,
          questionsId: quearr,
          test_start_time: challengeData.time,
          no_friends: challengeData.no_friends,
          
        },
      });
    }, 100);
    // {bakground_image: this.state.challengeData.bakground_image,text_color: this.state.challengeData.text_color,button_color: this.state.challengeData.button_color, 
    //       option_color: this.state.challengeData.unselected_btn, selected_option_color: this.state.challengeData.selected_btn,
    //     subject_id: this.state.challengeData.subject, chapter_id: this.state.challengeData.chapter_id, test_id: this.state.testId, 
    // test_start_time: this.state.challengeData.time, no_friends: this.state.numberOfFriends, questionsId : this.state.questionsId})

  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  const buttonBg = {
    backgroundImage: `url(${Button})`,
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 container-fluid ">
          <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-9 mt-3 pt-5 mb-3">
            <h6>
              <p
                className="fw-bold mb-1 ml-5 text-center"
                style={{ color: "var(--blue)", fontSize: "1.5rem" }}
              >
                History
              </p>
            </h6>
            <div className="d-flex flex-column">
              <div className="d-flex ">
                <div className=" mt-4 mx-2">
                  <img src={SemIcon} alt="icon" />
                </div>
                <div className="float-left mt-3" style={{width :"25vw"}}>
                  <div className="text-center">
                    <div className="play-hist">
                      <div style={{width:"77px",textAlign:"left"}}>
                      Subject
                      </div>
                      <diV>
                        :
                      </diV>
                      <div style={{width:"239px",textAlign:"left"}}>
                      {challengeData.test_name}
                      </div>
                    </div>
                    <div  className="play-hist">
                      <div style={{width:"77px",textAlign:"left"}}>
                      Date
                      </div>
                      <diV>
                        :
                      </diV>
                      <div  style={{width:"239px",textAlign:"left"}}>
                      {moment(testDate).format("DD MMM YYYY ")}
                      </div>
                    </div>
                    <div className="play-hist">
                      <div style={{width:"77px", textAlign:"left"}}>
                      Time
                      </div>
                      <diV>
                        :
                      </diV>
                      <div  style={{width:"239px",textAlign:"left"}}>
                      {" "}
                      {moment(testDate + " " + testStartTime).format("HH:mm")}
                      </div>
                    </div>
                    {/* <p
                      className="fw-normal mb-1 mx-2"
                      style={{ fontSize: "1.2rem" }}
                    >
                      
                    </p> */}
                    {/* <p
                      className="d-flex fw-normal mb-1 mx-2"
                      style={{ fontSize: "1.2rem" }}
                    >
                     
                    </p> */}
                    <p
                      className="d-flex fw-normal mb-1 mx-2"
                      style={{ fontSize: "1.2rem" }}
                    >
                    
                    </p>
                  </div>
                </div>
                <div className="p-2 col-example text-left" style={{display:"none"}}>
                  <div className="d-flex bd-highlight">
                    <div className="p-2 flex-fill bd-highlight mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-0" style={buttonBg}>
            <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <ul className="d-flex justify-content-around overflow-hidden">
                <li
                  onClick={() => setIsActive("Friend List")}
                  className="scheduleBanner"
                  type="button"
                >
                  <h6
                    className=""
                    style={{
                      borderBottom:
                        isActive === "Friend List" ? "3px solid var(--blue)" : null,
                      color: isActive === "Friend List" ? "var(--blue)" : null,
                      marginLeft: "-1.5rem",
                    }}
                  >
                    Friend List
                  </h6>
                </li>
                <li
                  onClick={() => setIsActive("Chapter List")}
                  className="scheduleBanner"
                  type="button"
                >
                  <h6
                    className="list"
                    style={{
                      borderBottom:
                        isActive === "Chapter List"
                          ? "3px solid var(--blue)"
                          : null,
                      color: isActive === "Chapter List" ? "var(--blue)" : null,
                    }}
                  >
                    Chapter List
                  </h6>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-12 m-auto mt-5">
            {isActive === "Friend List" ? (
              <PWFFriendList />
            ) : isActive === "Chapter List" ? (
              <ChapterList />
            ) : null}
          </div>

          <div className="col-7 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 m-auto">
            <button
              onClick={() => handleStartTest()}
              type="submit"
              className="btn btn-primary btn-block "
              style={{
                fontSize: "1rem",
                color: "var(--white)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              Start Test
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default TestDetail;
