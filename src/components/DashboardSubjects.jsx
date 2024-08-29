import React, { useEffect, useState } from "react";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import Counselling from "../assets/img/cards/counselling.png";
import Schedule from "../assets/img/cards/schedule.png";
import Play from "../assets/img/cards/play.png";
import { Link } from "react-router-dom";
import { urlToken, userPackageApi } from "../api/api";
// import Widget from "./Widget";
// import Home from "../assets/img/store.png";
import Cards from "./Cards";
// import Banner from "./Banner";
import Banner2 from "./Banner2";
import Radium, { StyleRoot } from "radium";
import {
  addSubjectListApi,
  getEditSubjectStatusApi,
  mainUrl,
  userSubjectApi,
} from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Responsive.css"
import "../assets/css/pages.css"
import LoadingSpinner from "../loader/LoadingSpinner";


const DashboardSubjects = () => {
  const [show, setShow] = useState(false);
  const [userSubjectData, setUserSubjectData] = useState([]);
  const [editUSerSubjects, setEditUserSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState([]);
  const [hideSubjects, setHideSubjects] = useState(false);
  const [addnewSubject, setAddNewSubject] = useState(false);
  const [showSubjectError, setShowSubjectError] = useState(false);
  const [renderData, setRenderData] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [isPackageBuy, setIsPackageBuy] = useState(true);
  const [isPackageDialogVisible, setIsPackageDialogVisible] = useState(false);
  const [loader,setLoader]=useState(false)

  const navigate = useNavigate();
  
  const userId = localStorage.getItem("UserId");
  const boardId = localStorage.getItem("BoardId");
  const classId = localStorage.getItem("ClassId");
  const langId = localStorage.getItem("langIddd");

  useEffect(() => {
    setShow(true);
    getUserSubject();
    console.log('===hello',userId);
  }, []);

  const getUserSubject = () => {
    setLoader(true)
    const url = userSubjectApi();
    const body = {
      token: urlToken,
      user_id: userId,
      class_id: classId,
    };

    // console.log("body inn user subject --> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setUserSubjectData(resp.data);
        setLoader(false)
        // console.log("respp in user added Subjet --->  ", resp.data);
      })
      .catch((err) => {
        // console.log("error in user added subject --> ", err);
      });
  };

  const getEditUserSubject = () => {
    const url = getEditSubjectStatusApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      standard_id: classId,
      lang_id: langId,
      user_id: userId,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log('value',resp.data);
        setEditUserSubjects(resp.data);
        setRenderData(resp.data);
        // console.log("respp in user edit Subjet --->  ", resp.data);
      })
      .catch((err) => {
        // console.log("error in user added subject --> ", err);
      });
  };

  const handleEditSubject = () => {
    setHideSubjects(true);
    getEditUserSubject();
  };

  const handleSubjectId = (id) => {
    // console.log("---> ", id);
    let renderDat = [...renderData];
    setSelectedSubjectId([...selectedSubjectId, id]);
    for (let data of renderDat) {
      if (data.subject_id == id) {
        data.status = data.status === "true" ? "false" : "true";
      }
    }
    setRenderData(renderDat);
  };

  const selll = () => {
    var dr = [];
    for (let index = 0; index < renderData.length; index++) {
      renderData[index].status === "true" &&
        dr.push(parseInt(renderData[index].subject_id));
    }
    // console.log("list ---> ", dr.length);

    addSubjects(dr, dr.length);
  };

  const handleAddSubjectId = (id) => {
    // console.log("---> ", id);
    let renderDat = [...renderData];
    setSelectedSubjectId([...selectedSubjectId, id]);

    for (let data of renderDat) {
      if (data.subject_id == id) {
        data.selected = data.selected == null ? true : !data.selected;
        break;
      }
    }
    setRenderData(renderDat);
  };

  const selll_Add = () => {
    var dr = [];
    for (let index = 0; index < renderData.length; index++) {
      renderData[index].selected &&
        dr.push(parseInt(renderData[index].subject_id));
    }
    // console.log("list ", dr);

    addNewSubjects(dr, dr.length);
  };

  const addSubjects = (id, sub_count) => {
    const url = addSubjectListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      mode: "edit",
      subject_id: id,
      subject_count: sub_count,
    };

    setTimeout(() => {
      // console.log("sub count is-----" , sub_count);
      // console.log("body of add subject  -->  ", body);
    }, 1500);


    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("respp in user add s Subjet --->  ", resp.data);
        setHideSubjects(false);
        getUserSubject();
      })
      .catch((err) => {
        // console.log("error in user added subject --> ", err);
      });
  };

  const addNewSubjects = (id, sub_count) => {
    const url = addSubjectListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      subject_id: id,
      mode: "add",
      subject_count: sub_count,
    };

    // console.log(" body of add subject ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("respp in user added Subjet --->  ", resp.data);
        setAddNewSubject(false);
        getUserSubject();
      })
      .catch((err) => {
        // console.log("error in user added subject --> ", err);
      });
  };

  const handleAddSubject = () => {
    if (editUSerSubjects === "") {
      setShowSubjectError(true);
    } else {
      setShowSubjectError(false);
      getEditUserSubject();
      setAddNewSubject(true);
    }
  };

  const handleSubject = (data) => {
    // console.log("pres  --> ", data);
    navigate("/subjects", {
      state: { subData: data },
    });
  };

  const checkUserPackage = () => {
    const url = userPackageApi();
    const body = {
      token: urlToken,
      user_id: userId,
    };
    // console.log("body  ---> ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("user package data is ==== ", resp.data);
        if (resp.data.status == "true") {
          setIsPackageBuy(true);
          setTimeout(() => {
            navigate("/playwfriend");
          }, 50);
        } else {
          alert('Get access to all test papers with our subscription plans.')
          setIsPackageBuy(false);
          setIsPackageDialogVisible(true);
        }
      })
      .catch((error) => {
        // console.log("error in getting user package data ", error);
      });
  };

  const bg = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };

  // const subjectIcon = {
  // //   "@media (max-width: 480px )": {
  // //     width: "8rem",
  // //     height: "auto",
  // //     padding: "0.7rem",
      
  // //     // backgroundColor: "red",
  // //   },
  // //   "@media (min-width: 1080px)": {
  // //     width: "7rem",
  // //     height: "auto",
  // //     padding: "0.7rem",
  // //     // backgroundColor: "yellow",
  // //   },
  // //   "@media (min-width: 1200px  )": {
  // //     width: "9rem",
  // //     height: "auto",
  // //     padding: "0.7rem",
  // //     // backgroundColor: "green",
  // //   },
  // //  " @media screen and (min-width: 320px) and (max-width: 576px)":{
  // //         height:"80px",
  // //         width: "80px",
  // //         padding: "0 0 0 0"
  // //   },
  //   width: "8rem",
  //   height: "auto",
  //   padding: "0.5rem",
  // };

  const subjectName = {
    color: "#636363",
    "@media (min-width: 480px)": {
      maxWidth: "11rem",
      itemAlign: "center",
      color: "#636363",
      paddingRight: "3rem",
    },
    "@media (min-width: 1200px)": {
      maxWidth: "11rem",
      itemAlign: "center",
      color: "#636363",
      paddingLeft: "2rem",
    },
    "@media (max-width: 1900px)": {
      maxWidth: "11rem",
      itemAlign: "center",
      color: "#636363",
      paddingLeft: "1rem",
    },
  };
  

  const CounsellingCooming=()=>{
      // alert('Counselling comming soon')
  }
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <StyleRoot>
        <div classname="content-wrapper p-0" style={bg}>
          <section classname="content">
            <div className="container-fluid">
              <Banner2/>
            </div>
            <div className="d-flex justify-content-center">
              {userSubjectData == "" ? null : (
                <>
                  <div className="mt-5 ">
                    <button
                      type="button"
                      className="  edit-btn"
                      onClick={() => handleEditSubject()}
                    >
                      Edit Subjects
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="container-fluid mt-5">
              {userSubjectData == "" ? (
                <div className="col-9 col-sm-6 col-md-4 col-lg-3 pb-4 m-auto">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => handleAddSubject()}
                  >
                    <b>Add Subject</b>
                    {/* <i className="bx bx-plus mx-2 text-center"></i> */}
                  </button>
                </div>
              ) : hideSubjects ? null : (
                  <div className=" m-auto dashboards" style={{display: 'flex',flexWrap:"wrap", }}>
                    {loader ? <LoadingSpinner/> : null}
                    {userSubjectData.map((data, index) => {

function formatText(text) {
  if (text.length <= 12) {
    return text;
  }

  let splitIndex = 12;

  // Look for the nearest space to break the line nicely
  for (let i = 12; i >= 0; i--) {
    if (text[i] === ' ') {
      splitIndex = i;
      break;
    }
  }

  return (
    <>
      {text.substring(0, splitIndex)}
      <br />
      {text.substring(splitIndex + 1)}
    </>
  );
}

const subjectName = formatText(data.subject_name);
                      return(<>
                      <div 
                      className="img-padd"
                      // style={{padding: "0 17px"}} 
                      >
                        <img
                          src={data.subject_icon}
                          key={data.id}
                          alt="sub-img"
                          className="sub-img sub-img-img"
                          // style={subjectIcon}

                          onClick={() => handleSubject(data)}
                        />
                    
                        <h6 style={{    
                          textAlign:"center",
                          margin :"10px 0"
                      }}
                       className="sub-tit"
                      >
                        
                          {subjectName}
                        </h6>
                        
                       
                      </div>
                      </>)
})}
                  </div>
              )}

              {showSubjectError ? (
                <div classname="alert alert-primary text-center" role="alert">
                  !Oops Something went Wrong. Please try again in sometime
                  <div
                    onClick={() => setShowSubjectError(false)}
                    className="alert-link"
                  >
                    close
                  </div>
                </div>
              ) : null}
            </div>

            {hideSubjects ? (
              <div className="container col-12 row m-auto">
                <div className="d-flex flex-wrap m-auto justify-content-center">
                {editUSerSubjects.map((data, index) => (
                  <>
                    <div 
                    className="EditImgText"
                    // style={{padding : "0 35px"}}
                    // className="col-6 col-md-2 col-sm-1 col-lg-1 mt-3 m-auto sub-container"
                    >
                      <img
                        src={data.image}
                        key={data.id}
                        alt="sub-img"
                        className="EditImg"
                        style={{
                          // width: "8.6rem",
                          // height: "auto",
                          // padding: "0.5rem",
                          border:
                            data.status == "true" ? "3px solid #FBB038" : "0px",
                        }}
                        onClick={() => handleSubjectId(data.subject_id)}
                      />
                      <h6
                        className="EditText text-break text-wrap mt-2 pr-2"
                        // style={{ width: "11.7rem", textAlign: "center" }}
                        // style={{width:"auto"}}
                      >
                        {data.subject_id_name}
                      </h6>
                    </div>
                  </>
                ))}
                </div>
                <div className="conatiner-fluid col-12">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-4">
                    <div className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg "
                        onClick={() => selll()}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => setHideSubjects(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/*====== add new Subjects if not added on first time  =====*/}

            {addnewSubject ? (
              <div className="col-12 row">
                <div className="detailsSubject">
                  {editUSerSubjects.map((data, index) => (
                    <>
                      <div className="col-6 col-md-1 col-sm-1 col-lg-1 mt-3 m-auto">
                        <img
                          src={data.image}
                          key={data.id}
                          alt="sub-img"
                          className="sub-img"
                          style={{
                            width: "8.6rem",
                            height: "auto",
                            padding: "0.5rem",
                            border: data.selected ? "3px solid #FBB038" : "null",
                          }}
                          onClick={() => handleAddSubjectId(data.subject_id)}
                        />
                        <h6
                          className="text-center text-break text-wrap"
                          style={{ width: "9rem", marginTop:'' }}
                        >
                          {data.subject_id_name}
                        </h6>
                      </div>
                    </>
                  ))}
                </div>
                <div className="conatiner-fluid col-12">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-4">
                    <div className="d-flex justify-content-around updateCancel">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-5 mx-5"
                        onClick={() => selll_Add()}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-5 mx-5"
                        onClick={() =>
                          // setState({ addnewSubject: false })
                          setAddNewSubject(false)
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* <div className="homeIcon col mt-5">
                <img classname="hicon mr-3" src={Home} alt="homeicon" />
                <img classname="hicon mx-1 my-3" src={Home} alt="homeicon" />
              </div> */}
            <div className="container-fluid mt-3 mb-5 pb-5">
              <>
                <div className="d-flex m-auto mb-5">
                  <div className="row mx-5">
                    <div className="col-12 col-sm-6 col-md-3 col-lg-3 m-auto mt-5">
                      <Link to="/schedulebanner">
                        <img className="cardImg" src={Schedule} alt="" />
                      </Link>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 col-lg-3 m-auto mt-5">
                      <div onClick={() => checkUserPackage()}>
                        <img className="cardImg" src={Play} alt="" />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 col-lg-3 m-auto mt-5">
                      {/* <Link to="/counselling"> */}
                      <div onClick={() => CounsellingCooming()}>
                        <img className="cardImg" src={Counselling} alt="" />
                        </div>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </section>
        </div>
      </StyleRoot>
    </>
  );
};

export default DashboardSubjects;
