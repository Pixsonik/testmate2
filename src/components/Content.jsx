import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import Banner from "./Banner";
import Cards from "./Cards";
import axios from "axios";
import {
  addSubjectList,
  editSubjectList,
  selectSubjectList,
  urlToken,
  userSubject,
} from "../api/api";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
// import { useLocation } from 'react-router-dom';
// import Home from "../assets/img/store.png";

const userId = sessionStorage.getItem("UserId");
const boardId = sessionStorage.getItem("BoardId");
const classId = sessionStorage.getItem("ClassId");
const langId = sessionStorage.getItem("LanguageId");

const Content = () => {
  const [userSubjects, setUserSubjects] = useState([]);
  const [editSubjects, setEditSubjects] = useState(false);
  const [addSubList, setAddSubList] = useState(false);
  const [edit_SubjectList, setEdit_SubjectList] = useState([]);
  const [subjectId, setSubjectId] = useState([]);
  const [addSubject, setAddSubject] = useState([]);

  useEffect(() => {
    userSubjectApi();
  }, []);

  const handleAddSubject = () => {
    addSubjectApi();
    // setEditSubjects(false);
    setAddSubList(true);
  };

  const handleEditSubject = () => {
    editSubjectApi();
    setAddSubList(false);
    setEditSubjects(true);
  };

  const handleUpdateSubject = () => {
    updateSubjectApi();
    setEditSubjects(false);
  };

  const handleUpdateCancle = () => {
    editSubjectApi();
    setEditSubjects(false);
  };

  const handleSubject = () => {
    addSubjectApi();
    setEditSubjects(false);
  };

  const handleCancle = () => {
    addSubjectApi();
    setAddSubList(false);
  };

  const handleAddClick = () => {
    setSubjectId([subjectId]);
    // console.log("subject Id ----", subjectId);
  };

  const handleUpdateClick = () => {};

  const userSubjectApi = () => {
    const url = userSubject();
    var body = {
      token: urlToken,
      user_id: userId,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setUserSubjects(resp.data);
        // console.log("user Subject", subjects);
      })
      .catch((error) => {
        // console.log(error.resp);
      });
  };

  const selectSubjectApi = () => {
    const url = selectSubjectList();
    var body = {
      token: urlToken,
      board_id: boardId,
      standard_id: classId,
      lang_id: langId,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        user_id: userId,
      })
      .then((resp) => {
        // console.log("Select subject --->", resp.data);
        setAddSubject(resp.data);
        // console.log("Selected subjectlist -----------", addSubject);
      })
      .catch((error) => {
        // console.log(error.resp);
      });
  };

  const addSubjectApi = () => {
    const url = addSubjectList();
    var body = {
      token: urlToken,
      user_id: userId,
      subject_id: subjectId,
      mode: "add",
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        selectSubjectApi();
      })
      .catch((error) => {
        // console.log(error.resp);
      });
  };

  const updateSubjectApi = () => {
    const url = addSubjectList();
    var body = {
      token: urlToken,
      user_id: userId,
      subject_id: subjectId,
      mode: "edit",
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        selectSubjectApi();
        // console.log("Edit subject ---", resp.data);
      })
      .catch((error) => {
        // console.log(error.resp);
      });
  };

  const editSubjectApi = () => {
    const url = editSubjectList();
    var body = {
      token: urlToken,
      user_id: userId,
      board_id: boardId,
      standard_id: classId,
      lang_id: langId,
      subject_id: subjectId,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Edit subject ---", resp.data);
        setEdit_SubjectList(resp.data);
        // console.log("Edit list -----------", edit_SubjectList);
        // }
      })
      .catch((error) => {
        // console.log(error.resp);
      });
  };


  return (
    <>
      <div className="content-wrapper">
        <section className="content p-0">
          <div className="container-fluid">{/* <Banner /> */}</div>

          <div className="container-fluid mt-1">
            <div className="m-auto container-fluid">
              <div className="d-flex justify-content-end">
                {userSubjects === "" ? null : (
                  <>
                    <div className="mt-5 mr-5">
                      <p type="button" onClick={handleEditSubject}>
                        Edit Subjects
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* <div className="col-9 col-sm-4 col-md-4 col-lg-4 pb-4 m-auto">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleAddSubject}
                >
                  <b>Add Subject</b>
                  <i className="bx bx-plus mx-2 text-center"></i>
                </button>
              </div>
              <div className="col-12 row ">
                <div className="d-flex">
                  {addSubject.map((data, index) => (
                    <div className="subject col-12 col-md-2 col-sm-2 col-lg-2 g-3">
                      <img
                        src={data.image}
                        key={index + data.subject_id}
                        className="sub-img"
                        alt="sub-img"
                        style={{
                          width: "60%",
                          height: "80px",
                          padding: "1.2rem",
                        }}
                        onClick={() => handleAddClick(data.subject_id)}
                      />
                      <br />
                      <h6
                        className="text-center mt-2 m-auto pr-5"
                        style={{ maxWidth: "11rem" }}
                      >
                        {data.subject_id_name}
                      </h6>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="col-12 row">
                <div className="d-flex">
                  {userSubjects == "" && !editSubjects ? (
                    <>
                      <div className="col-9 col-sm-6 col-md-4 col-lg-3 pb-4 m-auto">
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          onClick={handleAddSubject}
                        >
                          <b>Add Subject</b>
                          <i className="bx bx-plus mx-2 text-center"></i>
                        </button>
                      </div>
                      <div className="col-12 row">
                        <div className="d-flex">
                          {addSubject.map((data, index) => (
                            <div className="subject col-6 col-md-2 col-sm-2 col-lg-2 g-3 mt-3">
                              <img
                                src={data.image}
                                key={index + data.subject_id}
                                className="sub-img"
                                alt="sub-img"
                                style={{
                                  width: "80%",
                                  height: "120px",
                                  padding: "1.2rem",
                                  // border:"1px solid red"
                                  //     borderColor:
                                  // data.subject_id === subjectId ? "red" : "yellow",
                                }}
                                onClick={() => handleAddClick(data.subject_id)}
                              />
                              <br />
                              <h6
                                className="text-center mt-2 m-auto pr-5"
                                style={{ maxWidth: "11rem" }}
                              >
                                {data.subject_id_name}
                              </h6>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : !editSubjects ? null : (
                    <>
                      {userSubjects.map((subject, index) => (
                        <>
                          <div className="subject col-6 col-md-2 col-sm-2 col-lg-2 g-3 mt-3">
                            <img
                              src={subject.subject_icon}
                              key={index + subject.subject_id}
                              alt="sub-imgErr"
                              style={{
                                width: "20%",
                                height: "120px",
                                padding: "1.2rem",
                              }}
                              className="sub-img"
                            />
                            <br />
                            <h6
                              className="text-center mt-2 m-auto pr-5"
                              style={{ maxWidth: "11rem" }}
                            >
                              {subject.subject_name}
                            </h6>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>

                <div className="col-12 row">
                  <div className="d-flex">
                    {editSubjects ? (
                      <>
                        {edit_SubjectList.map((data, index) => (
                          <>
                            <div className="subject col-6 col-md-2 col-sm-2 col-lg-2 g-3 mt-3">
                              <img
                                src={data.image}
                                key={index + data.subject_id}
                                alt="sub-img"
                                className="sub-img"
                                style={{
                                  width: "80%",
                                  height: "120px",
                                  padding: "1.2rem",
                                  border:
                                    data.subject_id === subjectId
                                      ? "1px solid var(--blue)"
                                      : "null",
                                }}
                                onClick={() =>
                                  handleUpdateClick(data.subject_id)
                                }
                              />
                              <br />
                              <h6
                                className="text-center mt-2 m-auto pr-5"
                                style={{ maxWidth: "11rem" }}
                              >
                                {data.subject_id_name}
                              </h6>
                            </div>
                          </>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              {addSubList && !editSubjects ? (
                <div className="conatiner-fluid col-12">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-4">
                    <div className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-5 mx-5"
                        onClick={handleCancle}
                      >
                        Cancle
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-5 mx-5"
                        onClick={handleSubject}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {editSubjects ? (
                <div className="conatiner-fluid col-12">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-4">
                    <div className="d-flex justify-content-around">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-5 mx-5"
                        onClick={handleUpdateCancle}
                      >
                        Cancle
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg px-5 mx-5"
                        onClick={handleUpdateSubject}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {/* <div className="homeIcon col mt-5">
              <img className="hicon mx-1 my-3" src={Home} alt="homeicon" />
            </div> */}
          </div>
          <div className="container-fluid mt-5">
            <Cards />
          </div>
        </section>
      </div>
    </>
  );
};
export default Content;
