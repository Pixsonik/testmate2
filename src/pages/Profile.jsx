import React, { useEffect, useState } from "react";
import "../assets/css/pages.css";
import Edit from "../assets/img/UserProfile/edit.png";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlToken, userDetailApi, userImageApi, userPackageApi, logOutApi, deleteAcount } from "../api/api";
import axios from "axios";
import PointBg from "../assets/img/UserProfile/points_bg.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageUploading from 'react-images-uploading';
import "../assets/css/pages.css"
import "../assets/css/Responsive.css"
import LoadingSpinner from "../loader/LoadingSpinner";
// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from "moment/moment";
// import { useNavigate } from "react-router-dom";


const coins = localStorage.getItem("Coins");

const Profile = (props) => {

  const [userInfo, setUserInfo] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userProfileLink, setUserProfileLink] = useState("");
  const [profileComplete, setProfileComplete] = useState(0);
  const [userPackageData, setUserPackageData] = useState([]);
  const [userPackageDetails, setUserPackageDetails] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [loader, setloader] = useState(false)
  const [show, setShow] = useState(false);
  // const [classID, setClassID]=useState('')


  console.log("41", userPackageData)
  console.log(userPackageDetails)


  // const classID = localStorage.getItem("classid")
  
  const userId = localStorage.getItem("UserId");
  const userName = localStorage.getItem("Name");
  const userEmail = localStorage.getItem("Email");
  const userContact = localStorage.getItem("Contact");
  const userSchoolName = localStorage.getItem("SchholName");
  const userBoardName = localStorage.getItem("Board Name");
  const userStandard = localStorage.getItem("Standard");

  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // console.log("image list-- ", imageList, " update== ", addUpdateIndex);
    setImages(imageList);
  };

  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    userDetail();
    userPackageList()
    setTimeout(() => {
      checkProfileComplete();
    }, 10);
  }, []);

  const checkProfileComplete = () => {
    var count = 0;
    userInfo.profile_photo_path !== "" &&
      console.log("profile");
    count = count + 1

    userName !== "" &&
      console.log("user name");
    count = count + 1

    userEmail !== "" &&
      console.log("email");
    count = count + 1

    userContact !== "" &&
      console.log("contact");
    count = count + 1

    userSchoolName !== "" &&
      console.log("school name");
    count = count + 1

    userBoardName !== "" &&
      console.log("board name");
    count = count + 1

    userStandard !== "" &&
      console.log("std");
    count = count + 1

    // userGender !== "" && setProfileComplete(profileComplete + 1);

    // userDob !== "" && setProfileComplete(profileComplete + 1);

    setTimeout(() => {
      setProfileComplete(count)
    }, 100);
    setTimeout(() => {
      // console.log("profile count ", profileComplete, profileComplete / 10, count);
    }, 1000);
  };

  const userDetail = () => {
    setloader(true)
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: userId,
    };
    console.log("All ---------------", body);
    
    // console.log(userInfo,'userinfo idddddddddddd')

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log('profile resppppppp', resp)
        localStorage.setItem('myclassid',resp.data.data[0].class_id)
        setloader(false)
        setUserInfo(resp.data.data[0]);
        // setClassID(resp.data.data[0].class_id)
        // console.log('my class iddddd', classID)
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const userPackageList = () => {
    const url = userPackageApi();
    const body = {
      token: urlToken,
      // user_id: "6",
      user_id: userId,
    };
    // console.log("------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("Transaction ---", JSON.stringify(resp.data));
        if (resp.data.status === "true") {
          console.log("user package data is ==== ", resp.data);
          setUserPackageData(resp.data.data);
          setUserPackageDetails(resp.data.package_list)
          
          // setPackageName(resp.data.data.package_list[0].package_name );
        } else {
          // alert(resp.data.message);
        }
      })
      .catch((error) => {
        // console.log("error in fetching packages: ", error);
      });
  };

  // const fileSelectedHandler = (e) => {
  //   console.log(e.target.files[0]);
  //   setSelectedFile(e.target.files[0]);
  // };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name)
    const url = userImageApi();
    axios.post(url, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        // console.log('response is ======> ', resp);
        if (resp.data.status === 1) {
          alert('Profile updated');
          setUserProfileLink(userInfo.profile_photo_path)
        } else {
          alert('Getting Error while uploading profile');
        }
      }).catch((error) => {
        // console.log("error while uploading image ====== : ", error);
      })

  };

  const handleEdit = () => {
    // console.log("first", userInfo);
    navigate("/editprofile", {
      state: { userInfo: userInfo },
    });
  };


  const logOutStatus = () => {
    const url = logOutApi();
    var body = {
      token: urlToken,
      user_id: userId,
    }
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((resp) => {
        // console.log("logout status is : ", resp.data);
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        props.history.push('/login');
      }).catch((error) => {
        // console.log("error while uploading login status: ", error);
      })
  }

  const handleSignout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    logOutStatus()
  };

  const myStyle = {
    backgroundColor: "#001C3D",
    width: "100%",
    height: "auto",
    paddingBottom: "4rem",
  };
  const pofileImg = {
    "@media screen and (min-width: 320px) and (max-width: 576px) ": {
      fontSize: "6rem",
      paddingLeft: "0"
    },

    fontSize: "10rem",
    paddingLeft: "2rem"
  }
  const handleClose = (e) => {
    e.preventDefault();

    setShow(false)

    deleteAcountFun()

  };
  const handleShow = () => setShow(true);

  const deleteAcountFun = () => {
    const url = deleteAcount()
    const Token = urlToken
    const body = {
      user_id: userId,
      token: Token
    }
    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    ).then((res) => {
      // console.log(res)
      localStorage.clear();
      navigate("/");
    }).catch(err => {
      // console.log(err)
    })
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" >
        <section className="content p-0 m-auto" style={myStyle}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your Testmate acount</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                NO
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="container-fluid">
            <div className="container-fluid col-12 col-sm-12">
              <div className="block-header">
                <div>
                  {loader ? <LoadingSpinner /> : null}
                </div>

                <div className="d-flex pp pro-head">

                  <div className="col-example">
                    <div className="myUser mt-5">
                      {/* <input
                        type="file"
                        onChange={(e) => fileSelectedHandler(e)}
                        ref={fileInput => fileInput = fileInput}
                      />
                      <button onClick={() => fileUploadHandler}>Upload</button> */}
                      <div className="pp1">
                        <ImageUploading
                          value={images}
                          onChange={onChange}
                          maxNumber={maxNumber}
                          dataURLKey='data_url'
                        >
                          {({
                            imageList,
                            onImageUpload,
                          }) => (
                            // write your building UI
                            <div className="edit-position"
                              style={{ display: "none" }}
                            // style={{
                            //   position: "absolute",
                            //   top: "63px",
                            //   left: "137px"
                            // }}
                            >
                              <button
                                onClick={onImageUpload}
                                style={{
                                  border: "none",
                                  padding: "0",
                                  margin: "0",
                                  height: "0",
                                }}
                              >
                                {/* <img src={Edit} alt='' /> */}
                                <i className='edit-icon fa-solid fa-pen-to-square'
                                //  style={{ color: "red", fontSize: "2rem" }}
                                ></i>
                              </button>
                              {/* &nbsp; */}
                              {imageList.map((image, index) => (
                                <div key={index} className='image-item'>
                                  <img src={image['data_url']} alt='' width='100' />
                                  <div className='image-item__btn-wrapper'>
                                    {/* <button onClick={() => onImageUpdate(index)}>
                                  Update
                                </button> */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </ImageUploading>
                      </div>
                      <i className='photo-icon bx bxs-user-circle '
                      // style={{ 
                      // fontSize: "10rem",
                      //  paddingLeft: "2rem" }}
                      // style={pofileImg}
                      ></i>
                    </div>
                  </div>
                  <div className="leftsidePro col-example text-left" >
                    <div className="">
                      <h1 className="heading text-center">
                        {userInfo.first_name}
                      </h1>
                      <div className="" >
                        <p
                          className="img-text-cen"
                        // style={{
                        //   position: "absolute",
                        //   top: "50%",
                        //   left: "26%",
                        //   transform: "translate(-50%, -50%)",
                        //   fontSize: "1.4rem",
                        //   color: "rgb(251, 176, 56)",
                        // }}
                        >
                          Points {userInfo.coins}
                        </p>
                        <img
                          style={{ display: "none" }}
                          src={PointBg}
                          className=" profile-img"
                          alt="points"
                        // style={{ width: "50%", height: "25%" }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className=" col-example ">
                    <div className="info 2">
                      <span></span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <form className="row g-3 justify-center">
              <div className="col-12 col-lg-11 col-md-9 col-sm-12 m-auto mt-5 pt-2">
                <div className="col-12">
                  <div style={{
                    display: "flex",
                    // justifyContent: "space-between"
                    flexDirection: 'column'
                  }}
                    className="profilprog"
                  >
                    <div className="progressText">{profileComplete * 10}% Profile completed :</div>
                    <div className="progressBar">
                      {/*  */}
                      <div className="progessPerc">
                        <ProgressBar
                          style={{ color: "red" }}
                          now={[profileComplete * 10]}
                          label={`${profileComplete * 10}%`}
                          max={100}
                          className="progress"
                        />
                      </div>
                      {/* <div className="progessNum">
                          
                        </div> */}
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-between prof-perc">
                    <div className=" col-sm-5" style={{ marginRight: "1rem" }}>
                      <p className="text-light">Profile Completion</p>
                    </div>
                    <div className=" col-sm-7" style={{ marginRight: "3rem" }}>
                      <div className="slider">
                        <div className="d-flex">
                          <div className="w-100 mt-3">
                            <ProgressBar
                              style={{ color: "red" }}
                              now={[profileComplete * 10]}
                              label={`${profileComplete * 10}%`}
                              max={100}
                            />
                          </div>
                          <div
                            className="mt-2"
                            style={{
                              marginTop: "-0.3rem",
                              marginLeft: "0.5rem",
                            }}
                          >
                            <span
                              className="text-light"
                            // style={{ top: "-2rem" }}
                            >
                              {profileComplete * 10}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* colum reverse -> entire sec

                            neeche wale sec
                  background -> down
                  disp->flex 
                  flex ->wrap 
                  flex-dir -> column 
                  row-gap -> 30px */}
                  <div
                    className=" mt-3 mb-5"
                    style={{ backgroundColor: "transparent", color: "white" }}
                  >
                    <div className="conPro d-flex">
                      <div className="currentPlan">Current Plan :</div>
                      <div className="levelPlan">
                        <div className="levelPlanOne">
                          <div className="level" style={{ color: "#FBB038" }}>{userPackageDetails == "" || null ? 0 : userPackageDetails[0]?.package_name}</div>
                          <div className="plan" style={{ color: "#FBB038" }}>Purchased on : {userPackageDetails == "" || null ? 0 : moment(userPackageDetails[0]?.purchase_date).format('DD/MM/YYYY')}</div>
                        </div>
                        <div className="levelPlanTwo">
                          <button  type="button" style={{ display:'flex',alignItems:'center',backgroundColor :"rgb(0 28 63)", border:"none", color:"white", fontSize:'20px'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Counselling"><i className="nav-icon fas fa-comment"></i>&nbsp; Counselling&nbsp;:&nbsp;<div id="csell" style={{color:"#FBB038"}}>{userPackageData == '' ? 0 : userPackageData?.remain_counselling}</div></button>

                          {/* <button type="button" style={{ backgroundColor :"rgb(0 28 63)", border:"none", color:"white"}} data-bs-toggle="tooltip" data-bs-placement="top" title="Play With friends"><i class="nav-icon fa-solid fa-user-group" style={{fontSize:"16px"}}></i> : {userPackageData == '' ? 0 : userPackageData?.remain_play_with_friend}</button> */}

                          <button type="button" style={{display:'flex',alignItems:'center', backgroundColor :"rgb(0 28 63)", border:"none", color:"white", fontSize:'20px'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Schedule Test"><i className="nav-icon fas fa-calendar-alt"></i>&nbsp; Schedule testing :&nbsp; <div style={{color:"#FBB038"}}> {userPackageData == '' ?<div style={{color:"#FBB038"}}>0</div>: userPackageData?.remain_schedule_test}</div></button>
                        </div>
                      </div>
                    </div>

                    {/* <div>
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        sx={{ backgroundColor: "none" }}
                      >
                        <AccordionSummary
                          sx={{
                            backgroundColor: "#001C3D",
                          }}
                          expandIcon={
                            <ExpandMoreIcon
                              sx={{
                                color: "white",
                              }}
                            />
                          }
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              width: "33%",
                              flexShrink: 0,
                              color: "white",
                              border: "none",
                              boxShadow: "none",
                              fontSize: "1.6rem",
                            }}
                          >
                            Current Plan
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                          <Typography>
                            <div class="d-flex justify-content-around">
                              <span className="mt-2">Counselling : {userPackageData == '' ? 0 : userPackageData.remain_counselling}</span>
                              <span className="mt-2">Play With friends : {userPackageData == '' ? 0 : userPackageData.remain_play_with_friend}</span>
                              <span className="mt-2">Schedule Test : {userPackageData == '' ? 0 : userPackageData.remain_schedule_test}</span>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div> */}
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className=" col-sm-5" style={{ marginRight: "3rem" }}>
                      <h4 className="text-light">Profile Details</h4>
                    </div>
                    <div
                      className="user-edit d-flex justify-content-end col-sm-6"
                      style={{ marginRight: "3rem" }}
                    >
                      <img
                        className="counterimg "
                        src={Edit}
                        onClick={() => handleEdit()}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="row mt-5">

                    <div className="flex-profile">
                      <div className="profile-right">

                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-user-circle user-deatil-icon"></i>
                          </div>
                          <div className=" ">
                            <span className="userDetail">{userInfo.first_name}</span>
                          </div>
                        </div>

                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-envelope user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.email}</span>
                          </div>
                        </div>

                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-phone-call user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.mobile}</span>
                          </div>
                        </div>

                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bx-male-female user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.gender}</span>
                          </div>

                        </div>

                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-cake user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.dob}</span>
                          </div>
                        </div>
                      </div>
                      <div className="profile-left">
                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-book-reader user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.board_name}</span>
                          </div>

                        </div>
                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-school user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.school_name}</span>
                          </div>
                        </div>

                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-edit-location user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.school_city}</span>
                          </div>
                        </div>

                        <div className="Pro-flx-flx">
                          <div className="">
                            <i className="bx bxs-graduation user-deatil-icon"></i>
                          </div>
                          <div className="">
                            <span className="userDetail">{userInfo.class_name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="profile-flex">


                    </div>
                    <div className="profile-flex">




                    </div>
                    <div className="profile-flex">


                    </div>
                    <div className="profile-flex">


                    </div>
                    <div className="profile-flex">



                    </div> */}
                  </div>
                </div>
              </div>
            </form>
            {/* <div className='col-3 col-sm-6 col-md-4 col-lg-3 m-auto text-center mb-5'>
              <button
                type='button'
                className='btn btn-primary btn-block signout-btn'
                onClick={handleSignout}
              > */}
            {/* <b>Sign Out</b> */}
            {/* <p className="sign-out-text">Sign Out</p>
                <i className="bx bx-log-out-circle mx-2 mt-1 sign-out-icon"></i>
              </button>
            </div> */}

          </div>
          {/* <button
            type="button"
            style={{
              display: " block",
              margin: "auto"
            }}
            className="signOutBtn"
            onClick={handleSignout}
          > */}
          {/* <p ></p> */}
          {/* <div className="sign-out-text">Sign Out <i className="bx bx-log-out-circle"
              style={{ padding: "0" }}
            ></i></div> */}
          {/* </button> */}
          <div className="delete-profile d-flex">
            <button className="delete-pro-btn d-flex align-items-center" onClick={handleSignout} style={{ backgroundColor: "#FE4F60" }}>
              Sign Out <i className="bx bx-log-out-circle"
                style={{ padding: "0" }}
              ></i>
            </button>
            <button className="delete-pro-btn" onClick={handleShow}>
              Delete acount
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
