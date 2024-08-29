import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getUserSchoolApi,
  urlToken,
  userBoardApi,
  userClassApi,
  userLanguageApi,
  userRegisterApi,
} from "../api/api";
import "../assets/css/pages.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import imgLogo from '../assets/img/logo/testmate-logo.png'

const categories = [
  {
    id: 1,
    value: "School",
  },
  // {
  //   id: 2,
  //   value: "College",
  // },
  // {
  //   id: 3,
  //   value: "Entrance Exam",
  // },
];

const RegistrationCat = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [category, setCategory] = useState([{ name: 'School' },]);
  const [checked, setChecked] = useState(false);
  const [board, setBoard] = useState([]);
  const [language, setLanguage] = useState([]);
  const [school, setSchool] = useState([]);
  const [standard, setStandard] = useState([]);
  const [boardId, setBoardId] = useState("");
  const [standardId, setStandardId] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [select, setSelect] = useState("default");
  const [schoolname, setSchoolname] = useState("")
  const [schoolCheck, setSchoolcheck] = useState(true);
  const [sBranch, setSBranch] = useState([]);
  const [schoolID, setSchoolID] = useState("");
  const [showBranch, setShowBranch]= useState(false)
  const [branchId, setBranchId]=useState("")

  // console.log(school)
  localStorage.setItem('langIddd', languageId)

  const required =
    category != "" &&
    boardId != "" &&
    languageId != "" &&
    schoolname != "" &&
    standardId != "" &&
    checked != false;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserName(location.state.uName);
    setUserEmail(location.state.uEmail);
    setUserContact(location.state.uContact);
    setSchoolcheck(false)
    // console.log("------> contact  ", location.state.uContact);
    userBoard();
  }, []);

  const schoolCheckdiv = (e) => {
    console.log('school', schoolCheck)
    setSchoolcheck(e.target.checked)
  }

  const userBoard = () => {
    const url = userBoardApi();
    var body = {
      token: urlToken,
    };

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("board data ---", resp.data);
        setBoard(resp.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  
  // schoolBranch()

  const userLanguge = (id) => {
    const url = userLanguageApi();
    var body = {
      token: urlToken,
      board_id: id,
    };

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Language-----", resp.data);
        setLanguage(resp.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const userClass = (id) => {
    const url = userClassApi();
    var body = {
      token: urlToken,
      board_id: boardId,
      lang_id: id,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Standard------------", resp.data);
        setStandard(resp.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };


  const userSchool = () => {
    const url = getUserSchoolApi();
    const body = {
      token: urlToken,
      board_id: boardId,
    };
    // console.log("user school------------", body)
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setSchool(resp.data.data);
        console.log("school list is ---->", resp.data.data);
        // userClass();
      })
      .catch((error) => {
        // console.log("error while fetching school", error);
      });
  };

  const userRegister = () => {
    const url = userRegisterApi();
    var body = {
      token: urlToken,
      fname: location.state.uName,
      lname: "lname",
      email: location.state.uEmail,
      mobile: location.state.uContact,
      branch_id:branchId,
      school_id: schoolname,
      boards_id: boardId,
      class_id: standardId,
      lang_id:languageId,
      state: "state",
      city: "city",
      pincode: "pincode",
      friends_code: "friends_code",
    };
    console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("Register ", resp.data);
        localStorage.setItem('UserId',resp.data.user_id)
         localStorage.setItem("BoardId",boardId)
        localStorage.setItem("langIddd",languageId)
        localStorage.setItem("ClassId",standardId)
        localStorage.setItem("SchholName",schoolname)
        localStorage.setItem("branchIdd",branchId)
        if (resp.data.status === "true") {
          navigate("/otpVerify", {
            state: { userContact: userContact },
          });
        } else {  
          alert("Already exists");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const schoolBranch = (schoolId) => {
    const url = "https://testmate.in/api/get_branch_list.php"
    var body = {
      token: urlToken,
      // school_id: localStorage.getItem('schoolSelectId')
      school_id: schoolId
      // school_id: schoolID
    };
    console.log("branch bodyyyyyyyyy", body)
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("branchhhhhhhhh data ---", resp.data);
        if (resp.data.status=='false') {
        // if (resp.data.data==[]) {
          console.log("my branch idddd found")
          setBranchId(0)
          setShowBranch(false)
        } else {
          setShowBranch(true)
          console.log("my branch idddd", resp.data.data[0].id)
          setBranchId(resp.data.data[0].id)
          localStorage.setItem("branchIdd", resp.data.data[0].id)
          setSBranch(resp.data.data);
        }
        // setSBranch(resp.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleBoard = (id) => {
    setBoardId(id);
    userLanguge(id);
  };

  const handleLanguage = (langid) => {
    setLanguageId(langid);
    // console.log("LangObject :>> ");
    userClass(langid);
    userSchool();
    // schoolBranch();
  };

  const handleSchool = (e) => {
    localStorage.setItem('schoolSelectId',e)
    // setSchool(e);
    // console.log("SchoolObject :>> ", e  );
    setSchoolname(e)
    console.log(schoolname, "schoollllllllll")
    schoolBranch(e)
  };

  const handleStandard = (e) => {
    setStandardId(e);
    // console.log("Standobject :>> ", e);
  };
  const handleBranch = (e) => {
    setSchoolID(e);
    // console.log('new branch iddd',schoolID)
    // console.log("Standobject :>> ", e);
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100vh",
    width: "100%",
  };

  return (
    <>
      <section style={myStyle}>
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-12 col-lg-9">
              <div style={{display:'flex', justifyContent:'center', marginTop:'3rem'}}>
                <img src={imgLogo} className="registerLogo" style={{width:'12%'}}/>
              </div>
                <form className="row justify-center mt-1">
                  <div className="col-sm-6" style={{ marginTop: "2rem" }}>
                    <div className="label">
                      <label htmlFor="category" className="meet-time mt-5">
                        Select Category
                      </label>
                    </div>
                    <div className="col-12 col-lg-12 col-md-9 col-sm-12">
                      {categories.map((data) => (
                        <>
                          <button
                            type="button"
                            style={{
                              backgroundColor:
                                data.value === category ? "var(--blue)" : "white",
                              color:
                                data.value === category ? "white" : "black",
                            }}
                            onClick={() => setCategory(data.value)}
                            key={data.id}
                            className="reg-Buttons col-sm-12 col-md-9 col-lg-6 mt-2 ml-lg-5"
                          >
                            {data.value}
                          </button>
                        </>
                      ))}
                    </div>
                  </div>

                  <div className="col-sm-6" style={{ marginTop: "2rem" }}>
                    <div className="label">
                      <label htmlFor="board" className="meet-time mt-5">
                        Select Board
                      </label>
                    </div>
                    <div className="col-12 col-lg-12 col-md-9 col-sm-12">
                      {board.map((data) => (
                        <button
                          style={{
                            backgroundColor:
                              data.board_id === boardId ? "var(--blue)" : "white",
                            color:
                              data.board_id === boardId ? "white" : "black",
                          }}
                          type="button"
                          onClick={() => handleBoard(data.board_id)}
                          key={data.board_id}
                          className="reg-Buttons col-sm-12 col-md-9 col-lg-6 mt-2 ml-lg-5"
                        >
                          {data.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="label">
                      <label htmlFor="language" className="meet-time mt-5">
                        Select Language
                      </label>
                    </div>
                    <div className="col-12 col-lg-12 col-md-9 col-sm-12">
                      {language.map((data) => (

                        // console.log('english langggg', data)
                        <button
                          type="button"
                          style={{
                            backgroundColor:
                              data.lang_id === languageId ? "var(--blue)" : "white",
                            color:
                              data.lang_id === languageId ? "white" : "black",
                          }}
                          onClick={() => handleLanguage(data.lang_id)}
                          key={data.lang_id}
                          className="reg-Buttons col-sm-12 col-md-9 col-lg-6 mt-2 ml-lg-5"
                        >
                          {data.language}
                        </button>

                      ))}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="label">
                      <label htmlFor="school" className="meet-time mt-5">
                        Select School
                      </label>
                    </div>
                    <div className="col-12 col-lg-10 col-md-12 col-sm-12">
                      {/* <input
                        type="text"
                        className="form-control register"
                        value={school}
                        onChange={(e) => handleSchool(e.target.value)}
                        required
                      /> */}
                      {!schoolCheck ? (<select
                        defaultValue={select}
                        className="form-select register"
                        id="topic"
                        onChange={(e) => handleSchool(e.target.value)}
                        required
                      >
                        <option value="default" disabled hidden>
                          Select School
                        </option>



                        {school.map((data) => (
                          <option
                            key={data.id}
                            value={data.id}
                            className="text-dark optionss"
                          >
                            {data.name}
                          </option>
                        ))}
                      </select>) : (<input className="selectSchoolinput" type="text" placeholder="Enter school name" />)}
                      {/* {schoolCheck? <in put className="selectSchoolinput" type="text" placeholder="Enter school name" />:null} */}
                      <div className="selectSchool">
                        <input type="checkbox" onChange={schoolCheckdiv} />
                        <p>Others school</p>
                      </div>
                    </div>
                  </div>
                  {showBranch && !schoolCheck ?
                  <div className="col-sm-6">
                    <div className="label">
                      <label htmlFor="standard" className="meet-time mt-5">
                        Select School Branch
                      </label>
                    </div>
                    <div className="col-12 col-lg-10 col-md-12 col-sm-12">
                      <select
                        defaultValue={select}
                        className="form-select register"
                        id="topic"
                        onChange={(e) => handleBranch(e.target.value)}
                        required
                      >
                        <option value="default" disabled hidden>
                          Select School Branch
                        </option>

                        {showBranch && sBranch?.map((data) => (
                          <option
                            key={data.id}
                            value={data.name}
                            className="text-dark "
                          >
                            {data.name}
                            {/* rkptest */}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>: null}

                  
                  <div className="col-sm-6">
                    <div className="label">
                      <label htmlFor="standard" className="meet-time mt-5">
                        Select Standard
                      </label>
                    </div>
                    <div className="col-12 col-lg-10 col-md-12 col-sm-12">
                      <select
                        defaultValue={select}
                        className="form-select register"
                        id="topic"
                        onChange={(e) => handleStandard(e.target.value)}
                        required
                      >
                        <option value="default" disabled hidden>
                          Select Class
                        </option>

                        {standard.map((data) => (
                          <option
                            key={data.id}
                            value={data.standard_id}
                            className="text-dark "
                          >
                            {data.standard_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </form>
                <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-8 text-center mt-5">
                  <input
                    type="checkbox"
                    checked={checked}
                    id="checkbox"
                    onClick={() => setChecked(!checked)}
                  />
                  <span className="mx-2"> I agree to </span> <Link to="/reg_terms" className="nav-item">Terms and Conditions</Link>
                </div>
                <div className="col-7 col-sm-6 col-md-4 col-lg-3 mt-5 m-auto">
                  <button
                    onClick={() => userRegister()}
                    type="submit"
                    disabled={!required}
                    className="btn btn-primaryReg btn-block "
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--white)",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                      backgroundColor: "var(--blue)",
                      boxShadow:
                        "0px 5.66667px 11.3333px rgba(211, 38, 38, 0.25)",
                      borderRadius: "2rem",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default RegistrationCat;
