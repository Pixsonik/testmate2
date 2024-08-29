import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  addBookmarkApi,
  getBookmarkListApi,
  getChapterLevelApi,
  urlToken,
  userSubjectApi,
} from "../api/api";
import "../assets/css/pages.css";
import "../assets/css/Responsive.css"
import Bg2 from "../assets/img/Background/bg-desktop2.png";
// import Home from "../assets/img/store.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../loader/LoadingSpinner";
import Bronze from "../assets/img/medal/bronz.png";
import Silver from "../assets/img/medal/silver.png";
import Gold from "../assets/img/medal/gold.png";
import semIcon from "../assets/img/semIcon/semester2.png";
import { useNavigate } from "react-router-dom";
import "../assets/css/Scroll.css"

const userId = localStorage.getItem("UserId");
const classId = localStorage.getItem("ClassId");

const Bookmark = () => {
  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  useEffect(() => {
    getUserSubject();
    setIsLoadingSubject(true)
  }, []);

  const [bookmarkData, setBookmarkData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState(0);
  const [chapterLevel, setChapterLevel] = useState([]);
  const [chapterIndex, setChapterIndex] = useState("");
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
  const [isLoadingSubject, setIsLoadingSubject] = useState(false);
  const [isBookmarkChange, setIsBookmarkChange] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [subjectWiseBookmark, setSubjectWiseBookmark] = useState(false);
  const [chapterBookmarked, setChapterBookmarked] = useState(true);
  const [chapterNo, setChapterNo] = useState("");
  const [chapterLevelVisible, setchapterLevelVisible] = useState(false);
  const [chapterId, setChapterId] = useState("");

  const [subject_id, setSubject_id] = useState("");
  const [subject_name, setSubject_name] = useState("");
  const [subject_Background, setSubject_Background] = useState("");
  const [text_color, setText_color] = useState("");
  const [button_color, setButton_color] = useState("");

  const navigate = useNavigate();

  const getUserSubject = () => {
    setIsLoadingSubject(true);
    const url = userSubjectApi();
    const body = {
      token: urlToken,
      user_id: userId,
      class_id: classId,
    };

    // console.log("-------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("first", resp.data);
        setSubjectData(resp.data);
        setIsLoadingSubject(false);
        // console.log("response in user added Subjet --->  ", subjectData);
        getBookmarks(resp.data[0].subject_id);
      })
      .catch((err) => {
        // setIsLoadingSubject(true);
        // console.log("error in user added subject --> ", err);
      });
  };

  const getBookmarks = (id) => {
    setIsLoadingBookmark(true);
    const url = getBookmarkListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      subject_id: id,
      chapter_id: chapterId,
    };
    // console.log("body-------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("resp in bookmarks ----- ", chapterId);
        setBookmarkData(resp.data.data);
        setChapterId(resp.data.data);
        setSubjectWiseBookmark(
          "subjectWise Boookmark-----",
          resp.data.data,
          subjectWiseBookmark
        );
        setIsLoadingBookmark(false);
      })
      .catch((err) => {
        // console.log("err -->", err);
      });
  };

  const handleSubject = (
    index,
    id,
    sub_name,
    sub_background,
    sub_text_color,
    sub_button_color
  ) => {
    setSelectedSubjects(index);
    setSubject_id(id);
    // console.log("id for subject------", id);
    setSubject_name(sub_name);
    setSubject_Background(sub_background);
    setText_color(sub_text_color);
    setButton_color(sub_button_color);
    getBookmarks(id);
  };

  const handleBookmarkChange = (chapterId, subjectId) => {
    addBookmark(chapterId, subjectId);
    setChapterBookmarked(!chapterBookmarked);
    setSelectedChapterId(chapterId);
  };

  const addBookmark = (chpId, subjectId) => {
    setIsBookmarkChange(true);
    const url = addBookmarkApi();
    const body = {
      token: urlToken,
      user_id: userId,
      subject_id: subjectId,
      chapter_id: chpId,
    };
    // console.log("body-------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("bookmark ---> ", resp.data.message);
        getBookmarks(subjectId);

        setTimeout(() => {
          setIsBookmarkChange(false);
        }, 500);
      })
      .catch((err) => {
        // console.log("err -->", err);
      });
  };

  // const bookmarkPressed = (chapterId) => {
  //
  //   setSelectedChapterId(chapterId);
  //   addBookmark(chapterId);
  // };

  const handleChapterEvent = (id, index) => {
    setChapterIndex(index + 1);
    setChapterNo(chapterNo);
    setTimeout(() => {
      // console.log("chp id --> ", id, index + 1);
      getChapterLevel(id, index);
    }, 100);
  };

  const getChapterLevel = (id) => {
    const url = getChapterLevelApi();
    const body = {
      token: urlToken,
      user_id: userId,
      chapter_id: id,
    };
    // console.log("chapter level list body ===> ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setChapterId(resp.data);
        setChapterLevel(resp.data.data);
        setchapterLevelVisible(true);
        // console.log("chapter level List-->  ", resp.data);
      })
      .catch((err) => {
        // console.log("Chapter Level error --> ", err);
      });
  };

  const handleChapterTestDescription = (id, level) => {
    var levelInfo = 0;
    if (level == "Easy") {
      levelInfo = 1;
    } else if (level == "Medium") {
      levelInfo = 2;
    } else {
      levelInfo = 3;
    }
    // console.log("--", levelInfo);
    return navigate("/chapterdescription", {
      state: {
        chapter_id: id,
        // semester_id: semesterId,
        levelName: level,
        testlevel: levelInfo,
        // allInfo: location.state.subData,
      },
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper p-0" style={myStyle}>
        {isLoadingSubject ? (
          <div className="spinLoader">
            <LoadingSpinner />
          </div>
        ) :
          subjectData == "" ? (
            <div>
              <h3
                className="text-center"
                style={{
                  margin: "0",
                  position: "absolute",
                  top: "10%",
                  transform: "translateY(-25%)",
                  paddingLeft: "5rem",
                  color: "var(--blue)"
                }}
              >
                Please add subjects to add Bookmarks
              </h3>
            </div>
          ) :
            (
              <section className="content">
                <div class="scrollmenu" style={{display :" flex",padding:"24px 0 0 0"}}>
                 {subjectData.map((data, index) => (
                      <div >
                        <div className="book-com">
                          <img
                            src={data.subject_icon}
                            key={data.id}
                            alt="sub-img"
                            className="book-img m-2"
                            onClick={() =>
                              handleSubject(
                                index,
                                data.subject_id,
                                data.name,
                                data.background_image,
                                data.text_color,
                                data.main_color
                              )
                            }
                            style={{
                              border:
                                selectedSubjects === index
                                  ? "2px solid var(--blue)"
                                  : null,

                            }}
                          />
                          <h6
                            // className="text-center text-break text-wrap mt-2 pr-4"
                            // style={{ width: "11.7rem" }} 
                            className="book-tit text-wrap"
                          >
                            {data.subject_name}
                          </h6>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="" style={{display:"none"}}>
                  <div className="m-auto book-gap" style={{ display: 'flex', flexWrap: "wrap", padding: "38px 0 0 0" }}>
                    {subjectData.map((data, index) => (
                      <div >
                        <div className="book-com">
                          <img
                            src={data.subject_icon}
                            key={data.id}
                            alt="sub-img"
                            className="book-img m-2"
                            onClick={() =>
                              handleSubject(
                                index,
                                data.subject_id,
                                data.name,
                                data.background_image,
                                data.text_color,
                                data.main_color
                              )
                            }
                            style={{
                              border:
                                selectedSubjects === index
                                  ? "2px solid var(--blue)"
                                  : null,

                            }}
                          />
                          <h6
                            // className="text-center text-break text-wrap mt-2 pr-4"
                            // style={{ width: "11.7rem" }} 
                            className="book-tit"
                          >
                            {data.subject_name}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {isBookmarkChange ? (
                  <LoadingSpinner />
                ) : (
                  <div className="container-fluid col-12 col-sm-6 col-md-12 col-lg-10 mt-5">
                    {isLoadingBookmark ? (
                      <LoadingSpinner />
                    ): (
                      <div className="container-fluid m-auto mt-5">
                        <div className=" col-12 col-lg-12 container-fluid pt-2 pb-2 ">
                          <div className="container-fluid col-sm-12">
                            {bookmarkData.map((data, index) => (
                              <>
                                <div
                                  style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 10,
                                  }}
                                  className="mb-4"
                                >
                                  <div className="sub-header justify-content-between p-2 d-flex mb-3">
                                    <div
                                      className="w-100 mt-2"
                                      style={{ padding: 5 }}
                                    >
                                      <div className="col-12 d-flex">
                                        <div className="p-2 w-100">
                                          <h5 className="book-chap"
                                            style={{ cursor: "pointer" }}
                                            onClick={
                                              () =>
                                                handleChapterEvent(data.id, index)
                                              // console.log("first")
                                            }
                                          >
                                            Chapter: {data.chapter_no}&nbsp;&nbsp;
                                            {data.chapter_name}
                                          </h5>
                                        </div>
                                        <div
                                          className="p-2 flex-shrink-1"
                                          onClick={() =>
                                            handleBookmarkChange(
                                              data.chapter_id,
                                              data.subject_id
                                            )
                                          }
                                        >
                                          <h5 style={{ cursor: "pointer" }}>
                                            <i className="bookibatch bx bxs-bookmark-star"></i>
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {data.chapter_no == chapterIndex ? (
                                    <div>
                                      {chapterLevel.map((data, index) => (
                                        <div
                                          className="d-flex justify-content-around"
                                          onClick={() =>
                                            handleChapterTestDescription(
                                              data.chapter_id,
                                              data.level
                                            )
                                          }
                                        >
                                          <div className="p-2 col-example">
                                            <img
                                              src={semIcon}
                                              alt="semIcon"
                                              key={index + data.id}
                                              style={{ width: "50px" }}
                                            />
                                          </div>
                                          <div className="p-2 col-example">
                                            <h6>{data.level}</h6>
                                          </div>
                                          <div
                                            className="col-example"
                                            style={{ fontSize: "2rem" }}
                                          >
                                            {data.medal_type === "" ? (
                                              <div>
                                                {data.status === "true" ? (
                                                  <i className="bx bx-check text-success mr-3"></i>
                                                ) : (
                                                  <i className="bx bxs-lock-alt  mr-2"></i>
                                                )}
                                              </div>
                                            ) : (
                                              <img
                                                src={
                                                  data.medal_type === "Bronze"
                                                    ? Bronze
                                                    : data.medal_type === "Silver"
                                                      ? Silver
                                                      : data.medal_type === "Gold"
                                                        ? Gold
                                                        : null
                                                }
                                                alt="medal"
                                                key={index + data.id}
                                                style={{
                                                  width: "50px",
                                                  margin: "0.5rem",
                                                }}
                                              />
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* <div className="homeIcon col mt-5">
                  <img className="hicon mr-3" src={Home} alt="homeicon" />
                </div> */}
              </section>
            )}
      </div>
    </>
  );
};
export default Bookmark;
