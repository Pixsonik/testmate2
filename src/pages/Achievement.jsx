import React, { useEffect, useState } from "react";
import "../assets/css/pages.css";
import "../assets/css/Responsive.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
// import Home from "../assets/img/store.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { achievementChapterApi, graphStudent, urlToken, userSubjectApi } from "../api/api";
import Bronze from "../assets/img/medal/bronz.png";
import Silver from "../assets/img/medal/silver.png";
import Gold from "../assets/img/medal/gold.png";
import Disable from "../assets/img/medal/disable.png";
import LoadingSpinner from "../loader/LoadingSpinner";
import "../assets/css/Scroll.css"
import { BarChart } from '@mui/x-charts/BarChart';
import { error } from "jquery";

const userId = localStorage.getItem("UserId");
const classId = localStorage.getItem("ClassId");
// const boardId = localStorage.getItem('BoardId');
// const langId = localStorage.getItem('LanguageId');

const Achievement = () => {
  useEffect(() => {
    handleGraph();
    getUserSubject();
  }, []);

  const [subjectData, setSubjectData] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState(0);
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState();
  const [chapterList, setChapterList] = useState([]);
  const [isLoadingSubject, setIsLoadingSubject] = useState(false);
  const [isLoadingSubject2, setIsLoadingSubject2] = useState(false);
  const [subjectWiseAchievement, setSubjectWiseAchievement] = useState(false);
  const [isLoadingAchievement, setIsLoadingAchievement] = useState(false);
  const [subject_id, setSubject_id] = useState("");
  const [subject_name, setSubject_name] = useState("");
  const [subject_Background, setSubject_Background] = useState("");
  const [text_color, setText_color] = useState("");
  const [button_color, setButton_color] = useState("");

  const getUserSubject = () => {
    setIsLoadingSubject(true);
    const url = userSubjectApi();
    const body = {
      token: urlToken,
      user_id: localStorage.getItem("UserId"),
      class_id: localStorage.getItem("ClassId"),
    };

    // console.log("body--------->", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setSubjectData(resp.data);
        setIsLoadingSubject(false);
        // console.log("respp in user added Subjet --->  ", subjectData);
        setSubjectId(resp.data[0].subject_id);
        achievementChapter(resp.data[0].subject_id)
      })
      .catch((err) => {
        // setIsLoadingSubject(true);
        // console.log("error in user added subject --> ", err);
      });
  };

  const handleGraph = async() =>{
    setIsLoadingSubject2(true);
    const url = await graphStudent()
    const body={
      token: urlToken,
      user_id: localStorage.getItem("UserId"),
      lang_id:localStorage.getItem("langIddd"),
      board_id:localStorage.getItem("BoardId"),
      class_id:localStorage.getItem("ClassId")
    }

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response)=>{
      setSubjectName(response.data.total_subjects)
      // setTimeout(() => {
  
        setIsLoadingSubject2(false);
      // }, 1500);
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }

  const achievementChapter = (subId) => {
    setIsLoadingAchievement(true);
    const url = achievementChapterApi();
    const body = {
      token: urlToken,
      user_id: localStorage.getItem("UserId"),
      subject_id: subId,
    };
    // console.log("body--------->", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("chapters list is : ", resp.data.data);
        setChapterList(resp.data.data);
        setSubjectWiseAchievement(
          "subjectWise Boookmark-----",
          resp.data.data,
          subjectWiseAchievement
        );
        setIsLoadingAchievement(false);
        // console.log("Level --->  ", chapterList);
      })
      .catch((err) => {
        // console.log("Achievement --> ", err);
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
    setSubjectId(id);
    // console.log("subject id is : ", id);
    setSubject_name(sub_name);
    setSubject_Background(sub_background);
    setText_color(sub_text_color);
    setButton_color(sub_button_color);
    achievementChapter(id);
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "auto",
  };

  return (
    <>

      <Navbar />
      <Sidebar />
      <div className="content-wrapper achiving" style={myStyle}>
        {isLoadingSubject ? (
          <div  className="spinLoader">
            <LoadingSpinner />
          </div>
        ) : subjectData == "" ? (
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
              Please add subjects for Achievement Data
            </h3>
          </div>
        ) : (
          <section className="content p-0">
            {isLoadingSubject2 ? (
          <div  className="spinLoader">
            <LoadingSpinner />
          </div>
        ) :(<>
          <BarChart 
  xAxis={[
    {
      id: 'barCategories',
      data: subjectName?.map((subject, index) => ` ${subject.subject_name}`),
      scaleType: 'band',
      // label: 'Subjects',
      tickLabelStyle:{
        angle: window.innerWidth < 580 ? -90 : -45,
        textAnchor:'end',
        fontSize:window.innerWidth < 580 ? 11 : 12,
        paddingInner: 10,
        paddingOuter: 10,
      }
    },
  ]}
  yAxis={[
    {
      id: 'barValues',
      type: 'linear',
      min: 0,
      max: 100,
      ticks: 10,
      // label: 'Percentage',
    },
  ]}
  series={[
    {
      data: subjectName?.map((subject, index) => ` ${subject.percentage} `),
    },
  ]}
  margin={{
    bottom: window.innerWidth < 580 ? 240 : 140, // Increase bottom margin for label space
  }}
  className="barchart"
/></>)}
          
            <div class="scrollmenu" style={{ display: " flex", padding: "24px 0 0 0" }}>
              {subjectData?.map((data, index) => (
                <>
                  <div className="achiv" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: ' center',
                  }}>
                    <img
                      src={data.subject_icon}
                      key={data.id}
                      alt="sub-img"
                      className="sub-img m-2 achv-img"
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
                        // width: "8.6rem",
                        // height: "auto",
                        // padding: "0.5rem",
                      }}
                    />
                    <h6
                      className="text-center text-break text-wrap mt-2 achvi-sub-tit achiText"
                    // style={{ width: "11.7rem" }}
                    >
                      {data.subject_name}
                    </h6>
                  </div>
                </>
              ))}
            </div>
            <div className="col-12 row" style={{
              display: "block",
              margin: "auto",
              padding: " 29px 0 0 0",
              display: "none"
            }}>
              <div className="" style={{
                display: " flex",
                justifyContent: " space-around",
                flexWrap: "wrap"
              }}>
                {subjectData?.map((data, index) => (
                  <>
                    <div className="achiv" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: ' center',
                    }}>
                      <img
                        src={data.subject_icon}
                        key={data.id}
                        alt="sub-img"
                        className="sub-img m-2 achv-img"
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
                          // width: "8.6rem",
                          // height: "auto",
                          // padding: "0.5rem",
                        }}
                      />
                      <h6
                        className="text-center text-break text-wrap mt-2 achvi-sub-tit achiText"
                      // style={{ width: "11.7rem" }}
                      >
                        {data.subject_name}
                      </h6>
                    </div>
                  </>
                ))}
              </div>
            </div>
            
            <div className="" style={{ width: " 55vw", margin: "auto", marginTop: "66px" }}>
              {isLoadingAchievement ? (
                <LoadingSpinner />
              ) : subjectWiseAchievement && chapterList == "" ? (
                <div className="justify-content-center">
                  <h4 style={{ color: "var(--blue)", textAlign: "center" }}>No Acheivement Data Found </h4>
                </div>
              ) : (
                <>
                  {chapterList.map((data, index) => (
                    <div className="header" style={{ width: " 55vw" }}>
                      <div
                        className="d-flex"
                        style={{
                          backgroundColor: "var(--blue)",
                          color: "white",
                          width: " 55vw"
                        }}
                      >
                        <div className="p-2 ">Chapter: {data.chapter_no}</div>
                        <div className="p-2 flex-fill">{data.chapter_name}</div>
                      </div>

                      <div className="card container mb-4" style={{ width: " 55vw" }}>
                        <div className="d-flex justify-content-between" style={{ flexWrap: "wrap" }}>
                          {data.level.map((item, index) => (
                            <>
                              <div className="col-12 col-md-3 col-sm-3 col-lg-3 m-auto mb-3">
                                <img
                                  src={
                                    item.medal_type === "Bronze"
                                      ? Bronze
                                      : item.medal_type === "Silver"
                                        ? Silver
                                        : item.medal_type === "Gold"
                                          ? Gold
                                          : Disable
                                  }
                                  key={item.id + index}
                                  alt=""
                                  className="semImg semAdd mt-3 mb-3"
                                  style={{ width: "100%", height: "auto" }}
                                />
                                <p
                                  className="medal-text"
                                  style={{
                                    color:
                                      item.medal_type == null
                                        ? "#9A9999"
                                        : item.medal_type == "Fail"
                                          ? "#9A9999"
                                          : "black",
                                    fontWeight: "bold",
                                    // fontSize: 17,
                                    textAlign: "center",
                                  }}
                                >
                                  {item.level == "1"
                                    ? "Easy"
                                    : item.level == "2"
                                      ? "Medium"
                                      : item.level == "3"
                                        ? "Hard"
                                        : null}
                                </p>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Achievement;
