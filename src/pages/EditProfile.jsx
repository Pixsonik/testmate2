import React, { useEffect, useRef, useState } from "react";
import "../assets/css/pages.css";
import User from "../assets/img/UserProfile/profile.png";
import Edit from "../assets/img/UserProfile/edit.png";
import { urlToken, userDetailApi, userEditDetailApi,userImageApi } from "../api/api";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { height, width } from "@mui/system";
import { Padding } from "@mui/icons-material";
import ImageUploading from 'react-images-uploading';



const userId = localStorage.getItem("UserId");
// console.log("UserId", userId);

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userGender, setUserGender] = useState(genderData);
  const [userBirthdate, setUserBirthdate] = useState(moment().format("YYYY-MM-DD"));
  const [userBoard, setUserBoard] = useState('');
  const [userBoardId, setUserBoardId] = useState('');
  const [userBoardName, setUserBoardName] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [userSchoolId, setUserSchoolId] = useState('');
  const [userGrade, setUserGrade] = useState('');
  const [userGradeId, setUserGradeId] = useState('');
  const [schoolData, setSchoolData] = useState('');
  const [schoolLocation, setSchoolLocation] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [images, setImages] =useState([]);
  const [nimages, setNImages] =useState("");
  const [profileImage, setprofileImage] = useState('')
  // const [userProfileLink, setUserProfileLink] = useState([]);
  const maxNumber = 1;

  const inputref =useRef(null)

  const sauChange = (e)=>{
    const file = e.target.files[0]
    console.log("saurbah file", file);
    setNImages(file)
  }

  const handleIMgClick2=()=>{
    inputref.current.click()
    handleIMgClick()
  }

  useEffect(()=>{
    handleIMgClick();
    getUserDetail(location.state.userInfo);
  },[nimages])

  const handleIMgClick = ()=>{
    console.log('picture edit')
      
    let url = userImageApi()
    
    const data = new FormData()
    data.append("token", urlToken)
    data.append("id", userId)
    data.append("file_attachment", nimages)
    // const formData = new FormData();
    // formData.append("selectedFile", 'dsfsf');

    // console.log(" from data -> ", formData );

    for (var key of data.entries()) {
      // console.log('my form dataaaaa', key[0] + ', ' + key[1]);
  }
 
    axios
      .post(url,data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        // console.log('profile picture updatedddddddddd --> ',url, data, resp);
        if (resp.data.status == 1) {
          // alert('Profile updated');
          // setNImages()
          // setUserProfileLink(userInfo.profile_photo_path)
        }else {
          // alert('Getting Error while uploading profile');
        }
      })
      .catch((err) => {
        console.log("kjkjj",err);
      });
  }
  

  

  // console.log('imagesssssssss',images)
  // console.log(userSchool)

  useEffect(() => {
    getUserDetail(location.state.userInfo);
    // console.log('first----------', location.state.userInfo.board_name);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const getUserDetail = () => {
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: location.state.userInfo.id,
    };
    console.log('All ---------------', body);

    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        // console.log('Detail ', resp.data.data[0]);
        setUserInfo(resp.data.data[0]);
        setUserName(resp.data.data[0].first_name);
        setUserEmail(resp.data.data[0].email);
        setUserContact(resp.data.data[0].mobile);
        setUserBoard(resp.data.data[0].board);
        setUserBoardId(resp.data.data[0].boards_id);
        setUserBoardName(resp.data.data[0].board_name);
        setUserSchool(resp.data.data[0].school_name);
        setUserSchoolId(resp.data.data[0].school_id);
        setSchoolLocation(resp.data.data[0].school_city);
        setUserGrade(resp.data.data[0].class_name);
        setUserGradeId(resp.data.data[0].class_id);
        setUserGender(resp.data.data[0].gender);
        setUserBirthdate(resp.data.data[0].dob);
        setNImages(resp.data.data[0].profile_photo_path)
      })
      .catch((err) => {
        // console.log(err);
      });
  };


  const editDetail = () => {
    const url = userEditDetailApi();
    var body = {
      token: urlToken,
      id: userId,
      name: userName,
      email: userEmail,
      contact: userContact,
      board: userBoardId,
      school: userSchoolId,
      schoolLocation: schoolLocation,
      grade: userGradeId,
      // gender: "Female",
      gender: userGender,
      dob: userBirthdate,
    };
    console.log(' edit profile Body -------', body);

    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        // console.log('edit profile updated --> ', resp.data);
        if (resp.data.status === "true") {
          navigate("/profile");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // const handleChange = (date) => {
  //   setStartDate(Date);
  // };

  // const onFormSubmit = (e) => {
  //   // e.preventDefault();
  //   console.log(startDate);
  // };

  // const handleShow = (value) => {
  //   setStartdate(value);
  //   setShowCalendar(true);
  // };

 


  const myStyle = {
    backgroundColor: '#001C3D',
    width: '100%',
    height: '100%',
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content p-0 m-auto" style={myStyle}>
          <div className="container-fluid col-12 col-lg-10 col-md-10 col-sm-12 m-auto">
            <div className="container-fluid m-auto mt-5">
              <div className="d-flex justify-content-start ">
                <div className="p-2 col-example text-left">
                  <div className="user mt-5 profileeditdiv">
                    {/* {userInfo.profile_photo_path === "" ? ( */}
                    <div className="myuser">
                     <img src={nimages}></img>
                      {/* <img src={User} alt="" /> */}
                    </div>
                      {/* <i
                        className="bx bxs-user-circle"
                        style={{ fontSize: "10rem", marginTop: "3rem" }}
                      ></i> */}
                    {/* ) : (
                      <img
                        src={userInfo.profile_photo_path}
                        alt=""y
                      />
                    )} */}
                    <div
                    id="editicon"
                      className="user-edit d-flex justify-content-end col-sm-6"
                      style={{ marginRight: "3rem" }}
                      onClick={handleIMgClick2}
                    >
                      {/* <ImageUploading
                          value={images}
                          onChange={onChange}
                          maxNumber={maxNumber}
                          dataURLKey='data_url'
                        >
                          {({
                            imageList,
                            onImageUpload,
                          }) => (
                            <div className="edit-position"
                              style={{ display: "block" }}
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
                                <i className='edit-icon fa-solid fa-pen-to-square'
                                ></i>
                              </button>
                              {imageList.map((image, index) => (
                                <div key={index} className='image-item'>
                                  <img src={image['data_url']} alt='' width='100' />
                                  <div className='image-item__btn-wrapper'>
                                 
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </ImageUploading> */}
                        {/* {nimages ? <img src={URL.createObjectURL(nimages)}></img>: <img src={Edit}></img>} */}
                      <img
                      id="editicon"
                        className="counterimg "
                        src={Edit}
                        // onClick={() => handleProfileEdit()}
                        alt=""
                      />
                      <input type="file" onChange={sauChange} ref={inputref} style={{display:'none'}} />
                    </div>
                  </div>
                </div>
                    {/* <i className='photo-icon bx bxs-user-circle '></i> */}
                <div className="col-example text-left">
                  <div className="info">
                    <h1 className="heading" style={{ fontSize: "3rem", marginTop: "0.8rem" }}>{userInfo.first_name}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className=" user-detail col-sm-12 mt-2">
              <h2 className="detail">Profile Edit</h2>
            </div>
            <form className="row g-3 text-dark">
              <div className="col-12 col-lg-12 col-md-10 col-sm-12 m-auto ">
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-user-circle mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-11 pb-3">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="name"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                      />
                    </div>
                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-envelope mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-5 pb-3">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setUserEmail(e.target.value)}
                        value={userEmail}
                      />
                    </div>
                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-phone-call mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-5 pb-3">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        Mobile
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        disabled
                        id="inputnumber4"
                        onChange={(e) => setUserContact(e.target.value)}
                        value={userContact}
                      />
                    </div>
                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bx-male-female mx-4 mt-4"></i>
                    </div>

                    <div className=" col-sm-5 col-md-6 col-lg-5">
                      <label
                        htmlFor="gender"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        Gender
                      </label>
                      <select
                        className="form-select shadow-none"
                        style={{ borderRadius: "13px" }}
                        id="gender"
                        onChange={(e) => setUserGender(e.target.value)}
                        value={userGender}
                      >
                        <option value="default" disabled hidden>
                          Select Gender
                        </option>
                        {genderData.map((data) => (
                          <option key={data.id} value={data.label}>
                            {data.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-cake mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-5 pb-3">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        DOB
                      </label>
                      <div className="col-8 col-sm-6 col-md-4 col-lg-12 m-auto">
                        <DatePicker
                          className="form-control "
                          dateFormat="dd/MM/yyyy"
                          value={userBirthdate}
                          onChange={(newValue) => {
                            var timeFormat =
                              moment(newValue).format("YYYY-MM-DD");
                            setUserBirthdate(timeFormat);
                          }}
                        // selected={date}
                        // onChange={(e ) => this.setState({ date: e })}
                        />
                      </div>
                    </div>

                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-book-reader mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-5">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        Board
                      </label>
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        id="inputCity"
                        onChange={(e) => setUserBoardName(e.target.value)}
                        value={userBoardName}
                      />
                    </div>

                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-school mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-5 mt-2">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        School
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputSchool"
                        disabled
                        onChange={(e) => setUserSchool(e.target.value)}
                        value={userSchool}
                      />
                    </div>
                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-edit-location mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-5 mt-2">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        School Location
                      </label>
                      <input
                        type="address"
                        className="form-control"
                        id="inputCity"
                        onChange={(e) => setSchoolLocation(e.target.value)}
                        value={schoolLocation}
                      />
                    </div>

                    <div className="col-md-1 pb-2 my-2">
                      <i className="bx bxs-graduation mx-4 mt-4"></i>
                    </div>
                    <div className="col-md-5 mt-2">
                      <label
                        htmlFor="topic"
                        className="form-label"
                        style={{ color: "var(--blue)" }}
                      >
                        Grades
                      </label>
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        id="inputCity"
                        onChange={(e) => setUserGrade(e.target.value)}
                        value={userGrade}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className='col-sm-3 pb-4 mt-5 m-auto'>
              <button
                type='button'
                className='btn btn-primary btn-block '
                onClick={() => editDetail()}
              >
                <b>Save</b>
                <i className='fas fa-arrow-right m-2'></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default EditProfile;

