import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import { ProgressBar } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addBookmarkApi,
  addChapterApi,
  createSemesterListApi,
  defaultQuestionAnswer,
  getChapterLevelApi,
  getChaptersListApi,
  getSemChapterListApi,
  getSemesterLevelApi,
  getSemesterListApi,
  testSessionApi,
  urlToken,
} from "../../api/api";
import axios from "axios";
import semIcon from "../../assets/img/semIcon/semester2.png";
import Bronze from "../../assets/img/medal/bronz.png";
import Silver from "../../assets/img/medal/silver.png";
import Gold from "../../assets/img/medal/gold.png";
import "../../assets/css/Responsive.css";
import "../../assets/css/pages.css";
import "../../assets/css/style.css";
import IconNext from "../../assets/img/IconSub/angle-down-solid.svg";
import IconNext2 from "../../assets/img/IconSub/angle-up-solid.svg";



const Subject = () => {
  const location = useLocation();
  var chapterListArray=[];
  const [semesterLists, setSemesterLists] = useState([]);
  const [selectedSem, setSelectedSem] = useState("");
  const [chapterData, setChapterData] = useState([]);
  const [chapterNo, setChapterNo] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterLevel, setChapterLevel] = useState([]);
  const [isEditChapterVisible, setIsEditChapterVisible] = useState(false);
  const [isAddChapterVisible, setIsAddChapterVisible] = useState(true);
  const [chapterIndex, setChapterpIndex] = useState("");
  const [addChapterList, setAddChapterList] = useState([]);
  const [editChapterList, setEditChapterList] = useState([]);
  const [semesterId, setSemesterId] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [selectedEditChaptertId, setSelectedEditChaptertId] = useState("");
  const [addChapterRenderData, setAddChapterRenderData] = useState("");
  const [editChapterRenderData, setEditChapterRenderData] = useState("");
  const [chapterLevelVisible, setchapterLevelVisible] = useState(false);
  const [isSemesterChange, setIsSemesterChange] = useState(false);
  const [chapterBookmarked, setChapterBookmarked] = useState(false);
  const [chaptersNotAdded, setChaptersNotAdded] = useState(false);
  const [disableSemClick, setDisableSemClick] = useState(false);
  const [isChapterAssigned, setIsChapterAssigned] = useState(false);
  const [editChapterListVisible, setEditChapterListVisible] = useState(false);
  const [addChapterListVisible, setAddChapterListVisible] = useState(false);
  const [isAllSemOpen, setIsAllSemOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState('');
  const [showAllSem, setShowAllSem] = useState(false);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const userId = localStorage.getItem("UserId");
  const boardId = localStorage.getItem("BoardId");
  const classId = localStorage.getItem("ClassId");
  const langId = localStorage.getItem("langIddd");


  useEffect(() => {
    getSemList();

    setTimeout(() => {
      // console.log(location.state.subData);
    }, 3000);
   
  }, []);

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
    paddingBottom: "2rem",
  };

  const progress = location.state.subData.avg;
  const max = 100;

  const getSemesterLevel = async () => {
    const url = getSemesterLevelApi();
    const body = {
        token: urlToken,
        user_id: localStorage.getItem("UserId"),
        chapter_id: chapterListArray,
        // chapter_id: [917,918],
        chapter_count:chapterListArray.length
    }

    axios.post(url,body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
        // console.log("semester level body is --- ",body);
        // console.log("semester level response is --- ",response.data);
        if (response.data.status == 'true') {
            // this.setState({ isAllSemOpen : true })
            setIsAllSemOpen(true)
            setShowAllSem(true);
        } else {
            // this.setState({ isAllSemOpen : false , falseMessage: response.data.message })
            setIsAllSemOpen(false)
            setShowAllSem(true);
        }

    }).catch((error) => {
        // console.log("error in semester level response -- ",error);

    })
}

  const defaultchapterTestQuestion = (test_key) => {
    for (let index = 0; index < chapterData.length; index++) {
      chapterListArray[index] = chapterData[index].id
  }
    const url = defaultQuestionAnswer();
    const body = {
      token: urlToken,
      user_id : userId,
      subject_id: location.state.subData.subject_id,
      chapter_id: chapterListArray,
      level: location.state.testlevel,
      test_key: test_key,
      status: "test",
      check: "incomplete",
    };
    console.log("chapter default question anser body -== ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("defaullt qna response is ===== ",resp.data);

        return navigate("/testScreenForFullSemester", {
                  state: {
                    chapterId: chapterListArray,
                    semester_id: semesterId,
                    // levelName: level,
                    chapterName: chapterName,
                    test_level: '3',
                    allInfo: location.state.subData,                    
                    session_key: test_key,
                    test_time: '10',

                    subject_id: location.state.subData.subject_id,
                    subject_background: location.state.subData.subject_bg_image,
                    text_color: location.state.subData.subject_text_color,
                    button_color: location.state.subData.subject_button_color,
                    option_color: location.state.subData.subject_unselected_btn,
                    selected_option_color: location.state.subData.subject_selected_btn,

                  },
                });
      })
      .catch((error) => {
        console.log("error in fetching question list: ", error);
      });
  };

const testSessionCreator = async () => {
    for (let index = 0; index < chapterData.length; index++) {
        chapterListArray[index] = chapterData[index].id
    }
    setTimeout(() => {
      // console.log("chaptwr array === ",chapterListArray);
            const url = testSessionApi();
            const body = {
                token: urlToken,
                userid: userId,
                chapter_id: chapterListArray,
                chapter_count: chapterListArray.length,
            }
            axios.post(url,body, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((response) => {
                // console.log("body of session creator --- ",body);
                // console.log("response of session creator----- ", response.data);
                setSessionKey(response.data.new_test_key)
                defaultchapterTestQuestion(response.data.new_test_key)

                // return navigate("/testScreenForFullSemester", {
                //   state: {
                //     chapterId: chapterListArray,
                //     semester_id: semesterId,
                //     // levelName: level,
                //     chapterName: chapterName,
                //     test_level: '3',
                //     allInfo: location.state.subData,                    
                //     session_key: response.data.new_test_key,
                //     test_time: '10',

                //     subject_id: location.state.subData.subject_id,
                //     subject_background: location.state.subData.subject_bg_image,
                //     text_color: location.state.subData.subject_text_color,
                //     button_color: location.state.subData.subject_button_color,
                //     option_color: location.state.subData.subject_unselected_btn,
                //     selected_option_color: location.state.subData.subject_selected_btn,

                //   },
                // });

               
            }).catch((error) =>{
                // console.log("error while generating session key: ",error);
            })
    }, 50);

    }

  const createSemList = () => {
    const url = createSemesterListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("add Semester response is : ", resp.data);
        getSemList();
      })
      .catch((err) => {
        // console.log("Error in user Adding semester List --> ", err);
      });
  };

  const getSemList = () => {
    setIsSemesterChange(true);
    const url = getSemesterListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
    };
    // console.log("Semester list --- ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.data.status === "false") {
          // console.log("Please add sem");
        } else {
          setSemesterLists(resp.data.data);
          // console.log("semester List ---------",resp.data.data);
        }
      })
      .catch((error) => {
        // console.log("Error -----> ", error);
      });
  };

  const handleSemester = (semId, index) => {
    setSemesterId(semId);
    getSemChapterList(semId, index);
    setIsEditChapterVisible(true);
    // console.log("Sem id :>> ", semId);
  };

   const getSemChapterList = (semId, index, chpId) => {
    chapterListArray = []
    setSelectedSem(index);
    const url = getSemChapterListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      semester_id: semId,
    };
    // console.log("Sem Chapter List Body -------------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setIsChapterAssigned(resp.data.status)
        if (resp.data.status == "true") {
          // console.log("chapter list --->   ", resp.data.data);
          setChapterData(resp.data.data);

          setTimeout(() => {
                for (let index = 0; index < resp.data.data.length; index++) {
                    chapterListArray[index] = resp.data.data[index].id
                }
            }, 50);

            setTimeout(() => {
              getSemesterLevel();
            }, 200);

            setTimeout(() => {
                // console.log(chapterListArray);
            }, 3000);


        } else {
          setChaptersNotAdded(true);
        }
        getSemList();
      })
      .catch((err) => {
        // console.log("error in user semester list --> ", err);
      });
  };


  const subjectAddChapters = () => {
    const url = getChaptersListApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      mode: "add",
    };
    console.log("Add Chapter List body --------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
       
        // console.log("Semester Chapter List--------->", resp.data.data);
        if(resp.data.status === "false"){
          alert('No chapters found')
        }else{
          setAddChapterList(resp.data.data);
          setDisableSemClick(true);
          setIsEditChapterVisible(false);
          setIsAddChapterVisible(false);
          setAddChapterListVisible(true)
        }
        // console.log('---all chapter list',resp.data.data);

        // console.log("Add Chapter List--------->", addChapterList);
      })
      .catch((err) => {
        // console.log("error in user chapterlist --> ", err);
      });
  };

  const subjectEditChapters = () => {
    const url = getChaptersListApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      mode: "edit",
    };
    // console.log("Edit Chapter List body --------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setDisableSemClick(true);
        setIsEditChapterVisible(false);
        setIsAddChapterVisible(false);
        // console.log("Edit Semester Chapter List--------->", resp.data.data);
        setEditChapterList(resp.data.data);
        setEditChapterRenderData(resp.data.data);
        setEditChapterListVisible(true)
        
        setTimeout(() => {
          // console.log("edit Chapter List--------->", editChapterList);
        }, 1000);
      })
      .catch((err) => {
        // console.log("error in user chapterlist --> ", err);
      });
  };

  //  Add Chapter Api

  const handleAddChapterId = (id) => {
    // console.log(id);
    console.log('hello');
    let renderData = [...addChapterList];
    setSelectedChapterId([...selectedChapterId, id]);

    for (let data of renderData) {
      if (data.chapter_id == id) {
        data.selected = data.selected == null ? true : !data.selected;
       
        break;
      }
    }
    setAddChapterRenderData(renderData);
    console.log('---all render data',renderData);
    // setTimeout(() => {
    //   console.log("selected Add chapter array ", selectedChapterId);
    // }, 500);
  };

  // Edit Chapter Api
  const handleEditChapterId = (id) => {
    console.log("---------", id);
    let renderData = [...editChapterRenderData];
    setSelectedEditChaptertId([...selectedEditChaptertId, id]);

    for (let data of renderData) {
      if (data.chapter_id == id) {
        data.status= !data.status ;
        break;
      }
    }
    setEditChapterRenderData(renderData);
    setTimeout(() => {
      // console.log("selected Edit chapter array ", selectedEditChaptertId);
    }, 100);
  };

  const addChapterButton = () => {
    var data = [];
    for (let index = 0; index < addChapterRenderData.length; index++) {
      addChapterRenderData[index].selected &&
        data.push(parseInt(addChapterRenderData[index].chapter_id));
    }
    // console.log("list ", data, data.length);
    addChapters(data, data.length);
  };

  const addChapters = (chpId, chp_length) => {
    const url = addChapterApi();
    const body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      chapter_id: chpId,
      mode: "add",
      chapter_count: chp_length,
    };
    // console.log("body of add Chapter --------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("add chapter response is : ", resp.data);
        setDisableSemClick(false);
        setIsEditChapterVisible(true);
        setIsAddChapterVisible(true);

        // setAddChapterListVisible(false)

        getSemChapterList(semesterId)
        setTimeout(() => {
          setAddChapterListVisible(false)
        }, 200);
      })
      .catch((error) => {
        // console.log("error while adding chapter: ", error);
      });
  };

  const editChapterButton = () => {
    var data = [];
    for (let index = 0; index < editChapterRenderData.length; index++) {
      editChapterRenderData[index].status &&
        data.push(parseInt(editChapterRenderData[index].chapter_id));
    }
    // console.log("list ", data, data.length);

    editChapters(data, data.length);
  };

  const editChapters = (chpId, chp_length) => {
    const url = addChapterApi();
    const body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      chapter_id: chpId,
      mode: "edit",
      chapter_count: chp_length,
      
    };
    // console.log(" body of edit Chapter ---> ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("add chapter response is : ", resp.data);
        setDisableSemClick(false);
        setIsEditChapterVisible(true);
        setIsAddChapterVisible(true);
        getSemChapterList(semesterId)
        setTimeout(() => {
          setEditChapterListVisible(false)
        }, 200);
      })
      .catch((error) => {
        // console.log("error while adding chapter: ", error);
      });
  };

//   const handleChapterEvent = (id, index, chapterName) => {
   
//     setChapterpIndex(index + 1);
//     setChapterNo(chapterNo);
//     setChapterName(chapterName);
//  console.log("chp id --> ", id, index + 1);
//     console.log("chp name --> ", chapterName);
//     setTimeout(() => {
//       console.log("chp id --> ", id, index + 1);
//       getChapterLevel(id);
//     }, 100);
//   };



  const handleChapterEvent = (id, index, chapterName) => {
    
    if (isDropdownOpen) {
      // If the dropdown is already open, close it
      setIsDropdownOpen(false);
    } else {
      // If the dropdown is closed, open it
      setChapterpIndex(index + 1);
      setChapterNo(chapterNo);
      setChapterName(chapterName);
      console.log("chp id --> ", id, index + 1);
      console.log("chp name --> ", chapterName);
      setTimeout(() => {
        console.log("chp id --> ", id, index + 1);
        getChapterLevel(id);
        setIsDropdownOpen(true); // Open the dropdown
      }, 100);
    }
  };


  const getChapterLevel = (chpId) => {
    const url = getChapterLevelApi();
    const body = {
      token: urlToken,
      user_id: userId,
      chapter_id: chpId,
    };
    console.log("chapter level list body ===> ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setChapterLevel(resp.data.data);
        console.log(resp.data.data);
        // setchapterLevelVisible(true);
        // console.log("chapter level List--->  ", resp.data.data);
      })
      .catch((err) => {
        console.log("Chapter Level error --> ", err);
      });
  };

  const handleChapterTestDescription = (id, level) => {
    // console.log("subjectName---", subjectName);
    var levelInfo = 0;
    if (level == "Easy") {
      levelInfo = 1;
    } else if (level == "Medium") {
      levelInfo = 2;
    } else {
      levelInfo = 3;
    }
    // console.log("level info of chapter level--", levelInfo);
    return navigate("/chapterdescription", {
      state: {
        chapter_id: id,
        semester_id: semesterId,
        levelName: level,
        chapterName: chapterName,
        testlevel: levelInfo,
        allInfo: location.state.subData,
      },
    });
  };

  const bookmark = (chpId) => {
    const url = addBookmarkApi();
    const body = {
      token: urlToken,
      chapter_id: chpId,
      user_id: userId,
      subject_id: location.state.subData.subject_id,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log("Bookmark data is : ", response.data);
        getSemChapterList(semesterId);
        // setchapterLevel(response.data.data)
      })
      .catch((err) => {
        // console.log("getting error while adding bookmark: ", err);
      });
  };

  const bookmarkPressed = (id) => {
    // console.log("bookmark ----------", id);
    setChapterBookmarked(!chapterBookmarked);
    bookmark(id);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <div className="content pt-5 overflow-hidden">
          <div className="container col-12 col-lg-10 col-sm-12 col-md-12 ">
            <div
              className="card text-center col-12 m-auto"
              style={{
                borderRadius: "16px",
                boxShadow:
                  "0px 4.51015px 9.02029px 2.25507px rgba(199, 199, 199, 0.25) ",
              }}
            >
              <div className="d-flex justify-content-around text-center mt-1">
                <div className="flex-shrink-1 col-sm-12 col-lg-1 m-auto">
                  <img
                    src={location.state.subData.subject_icon}
                    alt=""
                    className=" subject_Logo "
                  />
                </div>
                <div className="col-sm-10">
                  <h3
                    className="sub-title mx-2 mt-1"
                    style={{ textAlign: "left" }}
                  >
                    {location.state.subData.subject_name}
                  </h3>
                  <p className="mx-2" style={{ textAlign: "left" }}>
                    Chapter:

                  </p>
                  <div className="col-sm-9 ">
                    <div className="slider mb-2 mt-2">
                      <div className="d-flex">
                        <div className=" w-100  gap-3">
                          <ProgressBar
                            now={progress}
                            label={`${progress}%`}
                            // now={75}
                            // label={`${75}%`}
                            max={100}
                          />
                        </div>
                        <div
                          className="flex-shrink-1"
                          style={{ marginTop: "-0.3rem", marginLeft: "0.5rem" }}
                        >
                          <span className="" style={{ top: "-2rem" }}>
                            {/* {(progress / max) * 100}% */}
                            {progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center"
              style={{ paddingTop: "2rem" }}
            >
              <div
                className="d-flex justify-content-around sub-btn"
                style={{ marginTop: "1rem" }}
              >
                <button
                  type="button"
                  className="btn btn-primary px-5 m-1"
                  onClick={() => createSemList()}
                  disabled={isAddChapterVisible ? false : true }
                >
                  Add Semester
                </button>
                {/* { ? ( */}
                  <button
                    type="button"
                    className="btn btn-primary px-5 m-1"
                    onClick={() => subjectEditChapters()}
                    disabled={isEditChapterVisible  ? false : true }

                  >
                    Edit Chapter
                  </button>
                {/* ) : null} */}
              </div>

              {semesterLists.status === "false" ? (
                <div className="text-center">
                  <p style={{ color: "var(--blue)", fontSize: "18px" }}>
                    Please Add Semester
                  </p>
                </div>
              ) : (
                <div >
                  <div className="">
                    <div style={{    display: "flex",
                                     justifyContent: "space-around",
                                     margin: "25px 0 0 0"
                                 }}>
                      {semesterLists.map((data, index) => (
                        <>
                          <div 
                          style={{
                            padding:10,
                          }}
                            onClick={() => disableSemClick ? 
                              {} :
                              handleSemester(data.semester_id, index)
                            }
                            className=""
                          >
                            <img
                              src={semIcon}
                              alt="sem-img"
                              className="semImg semAdd mt-3 sem-img"
                              key={index}
                              style={{
                                // width: "5vw",
                                height: "auto",
                                padding:5,
                                border:
                                  data.semester_id == semesterId
                                    ? "3px solid var(--blue)"
                                    : "3px solid var(--white)",
                              }}
                            />
                            
                            <h6 className="text-center mt-3">
                              {data.semester_name}
                            </h6>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="container-fluid m-auto mt-2" >
              <div className=" col-12 col-lg-12 container-fluid pt-2 pb-2 ">
                <div className="container-fluid ">
                  {
                    addChapterListVisible ? 
                    (
                      <div>
                      <div className="d-flex justify-content-between">
                        <h5 style={{ color: "var(--blue)" }}>Add Chapter</h5>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-2 pb-4">
                          <div className="d-flex justify-content-end ">
                            <button
                              onClick={() => addChapterButton()}
                              type="submit"
                              className="btn btn btn-block"
                              style={{
                                backgroundColor: "var(--blue)",
                                color: "#ffffff",
                                borderRadius: "2rem",
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                 

                      {addChapterList.map((data, index) => (
                        <div
                          style={{
                            borderRadius: 10,
                            backgroundColor: data.selected
                              ? "var(--blue)"
                              : "#ffffff",
                            color: data.selected ? "#ffffff" : "black",
                          }}
                          className="mb-4"
                        >
                          <div className="sub-header justify-content-between p-2 d-flex mb-3 "  >
                            <div
                              className=" mt-2"
                              style={{
                                backgroundColor: data.selected
                                  ? "var(--blue)"
                                  : "#ffffff",
                              }}
                              onClick={() => handleAddChapterId(data.chapter_id)}
                            >
                              <h5>
                                Chapter: {data.chapter_no}
                                {data.selected} &nbsp; &nbsp; {data.chapter_name}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    ) :
                    isChapterAssigned == 'false' & semesterId !== '' ? (
                      <div className="col-lg-3 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 mb-5 m-auto">
                        <button
                          onClick={() => subjectAddChapters()}
                          type="submit"
                          className="btn btn btn-block"
                          style={{
                            backgroundColor: "var(--blue)",
                            color: "#ffffff",
                            borderRadius: "2rem",
                          }}
                        >
                          Add Chapters
                        </button>
                      </div>
                    ) : 
                    
                    editChapterListVisible ?
                      (
                        <div>
                        <div className="d-flex justify-content-between">
                          <h5 style={{ color: "var(--blue)" }}>Edit Chapter</h5>
                          <div className="col-6 col-sm-6 col-md-4 col-lg-2 pb-4">
                            <div className="d-flex justify-content-end ">
                              <button
                                onClick={() => editChapterButton()}
                                type="submit"
                                className="btn btn btn-block"
                                style={{
                                  backgroundColor: "var(--blue)",
                                  color: "#ffffff",
                                  borderRadius: "2rem",
                                }}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                          {editChapterList.map((data, index) => (
                          <div
                            style={{
                              borderRadius: 10,
                              backgroundColor: data.status
                                ? "var(--blue)"
                                : "#ffffff",
                              color: data.status ? "#ffffff" : "black",
                            }}
                            className="mb-4"
                          >
                            <div
                              className="sub-header justify-content-between p-2 d-flex mb-3 " onClick={() =>
                                handleEditChapterId(data.chapter_id)
                              } >
                                <div
                                className=" mt-2"
                              style={{
                                backgroundColor: data.status
                                  ? "var(--blue)"
                                  : "#ffffff",
                                // color: data.status ? "#ffffff" : "black",
                                // borderRadius: 10,
                              }}
                              
                            >
                              {/* <div
                                className="w-75 mt-2"
                                onClick={() =>
                                  handleEditChapterId(data.chapter_id)
                                }
                              > */}
                                <h5 className="edit-chap">
                                  Chapter: {data.chapter_no}
                                  {data.status} &nbsp; &nbsp; {data.chapter_name}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))}
                        </div>
                      ) :
                    (
                      <div>{
                      chapterData.map((data, index) => (
                        <>
                          <div
                            style={{  borderRadius: 10 }}
                            className="mb-4"
                          >
                            <div className="sub-header justify-content-between p-2 d-flex mb-3 borderOfText" >
                              <div className="w-100 mt-2" >
                                <div className="col-12 d-flex">
                                  <div className="w-100"
                                  style={{ cursor: "pointer", display:'flex'  }}
                                  >
                                    <h5
                                    className=" chap-home"
                                      style={{fontWeight:'600'}}
                                    >
                                      Chapter: {data.chapter_no}&nbsp;&nbsp;
                                      {data.chapter_name}
                                    </h5> 
                                     
                                   <img src={ index+1 === chapterIndex && isDropdownOpen ? IconNext2 : IconNext} onClick={() =>
                                    {handleChapterEvent(
                                      data.id,
                                      index,
                                      data.chapter_name
                                    );console.log(data.chapter_name);}
                                  } style={{width: '20px', marginLeft: '20px', marginTop: '-12px'}}/>
                                                
                                     
                                  </div>
                                  <div
                                    className="p-2 flex-shrink-1"
                                    onClick={() => bookmarkPressed(data.id)}
                                  // onClick={() => console.log("fgff   ===? ",data.chapter_id)}
                                  >
                                    <h5 className="mt-1"
                                    style={{ cursor: "pointer" }}>
                                      {data.bookmark_status ? (
                                        <i className="bx bxs-bookmark-star"></i>
                                      ) : (
                                        <i className="bx bx-bookmark"></i>
                                      )}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {isDropdownOpen && data.chapter_no == chapterIndex ? (
                              <div>
                                {chapterLevel.map((data, index) => (
                                  <div
                                    className="d-flex justify-content-between level-flex align-items-center borderOfText mt-2"
                                    onClick={() =>
                                      handleChapterTestDescription(
                                        data.chapter_id,
                                        data.level,
                                        data.chapter_name
                                      )
                                    }
                                  >
                                    <div className="col-example">
                                      <img
                                      className="ml-4 pl-2"
                                        src={semIcon}
                                        alt="semIcon"
                                        key={index + data.id}
                                        style={{ width: "35px" }}
                                      />
                                    </div>
                                    <div className="col-example">
                                      <h6 className="sub-level" style={{maxWidth:"10rem"}}>{data.level}</h6>
                                    </div>
                                    <div
                                      className="col-example"
                                      style={{ fontSize: "2rem" }}
                                    >
                                      {data.medal_type === "" ? (
                                        <div >
                                          {data.status === "true" ? (
                                            <i className="bx bx-check text-success " style={{margin:" 0 35px 0 0"
                                            }}></i>
                                          ) : (
                                            <i
                                              className="bx bxs-lock-alt mr-3 pr-3"
                                              style={{ color: "var(--blue)" }}
                                            ></i>
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
                                            width: "34px",
                                            margin: "0 33px 0 0",
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
                      ))
                    }
                    {showAllSem ? 
                    <div  style={{ backgroundColor: isAllSemOpen ? "#fff" : '#E5E5E5', borderRadius: 10 }}
                    className="sub-header justify-content-between p-2 d-flex mb-3">
                              <div className="w-100 mt-2" style={{ padding: 5 }}>
                                <div className="col-12 d-flex">
                                  <div className="w-100"
                                   style={{ cursor: "pointer" }}
                                   onClick={() => { isAllSemOpen ? testSessionCreator() : alert("please Earn Gold in all Chapters to unlock this")} }>
                                    <h5
                                    className=" chap-home"
                                     
                                    >
                                      All Semester Test
                                    </h5>
                                  </div>
                                  <div
                                    className="p-2 flex-shrink-1"
                                  >
                                    <h5 className="mt-1"
                                    style={{ cursor: "pointer" }}>
                                      {isAllSemOpen ? 
                                        <i class="fa-solid fa-chevron-right" style={{width :" 38px" ,style : "38px"}}></i>
                                        :  <i className="bx bxs-lock" style={{width :" 38px" ,style : "38px"}}></i>
                                        }
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div> : null
                            }

                    </div>)
                  }

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Subject;
