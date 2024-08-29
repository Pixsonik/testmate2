import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/pages.css";
import login from "../assets/img/Background/newLoging.png.png";
import {
  urlToken,
  userLoginApi,
  loginOtpVerifyApi,
  userDetailApi,
  usernameLogin,
} from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import OTPInput from "otp-input-react";
import { createBrowserHistory } from "history";
import Logo from "../assets/img/logo/testmate-logo.png";
import "../assets/css/pages.css";
import "../assets/css/Responsive.css";
import LoadingSpinner from "../loader/LoadingSpinner";
import LoginLoadingSpinner from "../loader/LoginLoader";
import { useDispatch } from "react-redux";
import { userDetail } from "../Redux_three/Reducer";
import Bg2 from "../assets/img/Background/bg-desktop2.png";

const Login = () => {
  const [userContact, setUserContact] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userLoginError, setUserLoginError] = useState(false);
  const [show, setShow] = useState(false);
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [loginOtpConcat, setLoginOtpConcat] = useState("");
  const [OTP, setOTP] = useState("");
  const [isResendOtpVisible, setIsResendOtpVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [verLoading, setVerLoading] = useState(false);
  const [boldClicked, setBoldClicked] = useState("mobile");
  const [showMobile, setShowMobile] = useState(true);
  const [showUsername, setShowUsername] = useState(false);

  const navigate = useNavigate();
  let history = createBrowserHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
    if (seconds == "01") {
      setTimeout(() => {
        setIsResendOtpVisible(true);
      }, 1000);
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:01:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  useEffect(() => {
    // console.log(userContact);
    // clearTimer(getDeadTime());
    history.push(null, null, location.href);
    window.onpop = function () {
      history.go(1);
    };
  }, []);

  const onClickReset = () => {
    setIsResendOtpVisible(false);
    clearTimer(getDeadTime());
  };

  const required = userContact !== "";

  const handleSubmit = (e) => {
    const contactRegex =
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    if (contactRegex.test(userContact)) {
      setUserLoginError(false);
      checkLoginNumber();

      // console.log("all info is valid");
    } else {
      setUserLoginError(true);
    }
  };

  const checkLoginNumber = () => {
    setLoader(true);
    const url = userLoginApi();
    var body = {
      token: urlToken,
      mobile: userContact,
    };
    // console.log("All ---------------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setLoader(false);
        // console.log("Status Login----", resp.data);
        if (resp.data.status === "true") {
          // console.log("you can login");
          setShow(true);
          onClickReset();
        } else {
          alert("Please Register");
        }
      })
      .catch((error) => {
        // console.log("Error--------", error);
      });
  };

  const checkUserName = (id) => {
    setLoader(true);
    const url = usernameLogin();
    var body = {
      email: userEmail,
      password: userPassword,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setLoader(false);
        console.log("Status Login----", resp.data);
        if (resp.data.status === "true") {
          console.log("you can login");
          userInfo(resp.data.data.id);
          console.log("--userInfo--", userInfo);
          // setShow(true);
          // onClickReset()
          navigate("/");
        } else {
          console.log("you can login");
          alert("Email not found");
        }
      })
      .catch((error) => {
        console.log("Error--------", error);
      });
  };

  const LoginVerify = (e) => {
    setVerLoading(true);
    var enterOtpOne = one;
    var enterOtptwo = two;
    var enterOtpthree = three;
    var enterOtpfour = four;

    var finalOtp = "".concat(
      enterOtpOne,
      enterOtptwo,
      enterOtpthree,
      enterOtpfour
    );

    setLoginOtpConcat(finalOtp);
    // console.log("====================================");
    // console.log("otp is ", finalOtp);
    // console.log("====================================");
    e.preventDefault(e);

    const url = loginOtpVerifyApi();
    var body = {
      token: urlToken,
      mobile: userContact,
      form: "manual",
      otp: OTP,
    };
    // console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setVerLoading(false);
        // console.log("Login ", resp.data);
        if (resp.data.status === "true") {
          userInfo(resp.data.data[0].id);
          // console.log("user Detail------------", resp.data.data[0].id);
        } else {
          alert("Please enter valid OTP");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const userInfo = (id) => {
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: id,
    };
    // console.log("All ---------------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("user all info ----", resp.data.data);
        // dispatch(userDetail(resp.data.data))
        localStorage.setItem("UserId", resp.data.data[0].id);
        localStorage.setItem("Name", resp.data.data[0].first_name);
        localStorage.setItem("Email", resp.data.data[0].email);
        localStorage.setItem("BoardId", resp.data.data[0].boards_id);
        localStorage.setItem("ClassId", resp.data.data[0].class_id);
        localStorage.setItem("langIddd", resp.data.data[0].lang_id);
        localStorage.setItem("SchholName", resp.data.data[0].school_id);
        localStorage.setItem("Contact", resp.data.data[0].mobile);
        localStorage.setItem("UserName", resp.data.data[0].user_name);
        localStorage.setItem("Board Name", resp.data.data[0].board_name);
        localStorage.setItem("Standard", resp.data.data[0].class_name);
        localStorage.setItem("Coins", resp.data.data[0].coins);
        localStorage.setItem('branchIdd',resp.data.data[0].branch_id)
        setTimeout(() => {
          navigate("/");
        }, 50);
      })
      .catch((error) => {
        // console.log("Error--------", error);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const myStyle = {
    // backgroundColor: "var(--blue)",
    backgroundImage: `url(${login})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginLeft: "-20px",
  };

  const ResendOtp = () => {
    const url = userLoginApi();
    var body = {
      token: urlToken,
      mobile: userContact,
    };
    // console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Login ", resp.data.status);
        if (resp.data.status === "true") {
          alert("OTP Sent");
          onClickReset();
          setShow(true);
        } else {
          alert(resp.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const newLogin = {
    width: "884px",
    height: "100vh",
    "@media screen and (min-width: 1400px)": {
      width: "820px",
      height: "90vh",
    },
  };
  const loginR = {
    width: "auto",
    margin: "auto",
  };
  const loginSection = {
    "@media screen and (min-width: 769px) and (max-width: 1024px)": {
      height: "100vh",
      display: "flex",
      alignItems: "center",
    },
  };
  const emailRegex = /\S+@\S+\.\S+/;
  const handleUsername = () => {
    if (!emailRegex.test(userEmail)) {
      setUserLoginError(true);
    } else {
      // alert('Enter valid email')

      checkUserName();
      setUserLoginError(false);
    }
  };
  // const myStyle2 = {
  //   backgroundImage: `url(${Bg2})`,
  //   height: "100vh",
  //   width: "100%",
  // };

  return (
    <>
      <section className="loginSection">
        <div className="container-fluid">
          {/* {loader ? <LoginLoadingSpinner/> : null} */}

          <div className="row" >
            <div
              // className="col-sm-6 d-none d-sm-block"
              style={{ width: "auto" }}
            >
              {/* <div className="img" style={myStyle}></div> */}
              <img src={login} className="newlogin" />
            </div>
            <div style={loginR}>
              <div
                className="d-flex justify-content-center align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5"
                style={{ width: "auto", margin: "auto" }}
              >
                <form
                // style={{ marginTop: "20rem" }}
                >
                  <img
                    src={Logo}
                    alt="brand-image"
                    className="brand-imageLogin login-heading mb-3"
                  />
                  <h4 className="login-heading mb-0 pb-3 px-3  ml-3 pl-3 text-center ">
                    LOGIN
                  </h4>

                  <span
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <p
                      className={
                        boldClicked === "mobile" ? "bold-text" : "mobile-no"
                      }
                      onClick={() => {
                        setShowMobile(true);
                        setShowUsername(false);
                        setBoldClicked("mobile");
                      }}
                      style={{
                        color: "#1979c1",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Mobile no
                    </p>{" "}
                    |
                    <p
                      className={
                        boldClicked === "username" ? "bold-text" : "user-name"
                      }
                      onClick={() => {
                        setShowMobile(false);
                        setShowUsername(true);
                        setBoldClicked("username");
                      }}
                      style={{
                        color: "#1979c1",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Username
                    </p>
                  </span>
                  {showMobile && (
                    <div className="mobile-class form-outline mb-4">
                      <input
                        type="tel"
                        name="userContact"
                        id="userContact"
                        autoComplete="off"
                        className="form-control-login form-control-md"
                        placeholder="+91-98765-43210"
                        value={userContact}
                        maxLength={10}
                        minLength={10}
                        onChange={(e) => setUserContact(e.target.value)}
                        required={true}
                      />
                      {userLoginError ? (
                        <div className="text-danger">
                          Phone number is not valid
                        </div>
                      ) : null}
                    </div>
                  )}
                  {showUsername && (
                    <div className="username-class form-outline mb-4">
                      <input
                        type="text"
                        name="userContact"
                        id="userContact"
                        autoComplete="off"
                        className="form-control-login form-control-md"
                        placeholder="username"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required={true}
                      />
                      {userLoginError ? (
                        <div className="text-danger">email is not valid</div>
                      ) : null}
                    </div>
                  )}
                  {showUsername && (
                    <div className="username-class form-outline mb-4">
                      <input
                        type="password"
                        name="userPassword"
                        id="userPassword"
                        autoComplete="off"
                        className="form-control-login form-control-md"
                        placeholder="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required={true}
                      />
                    </div>
                  )}

                  {showUsername && (
                    <>
                      <button
                        onClick={() => handleUsername()}
                        className="btn btn-warning btn-lg btn-block "
                        type="button"
                      >
                        Login
                      </button>
                      <p className="small fw-bold mt-2 ml-4 pt-1 mb-0 pt-2 ">
                        Don't have an account?
                        <a
                          href="/register"
                          className="link-danger text-decoration-none p-2 fw-normal"
                        >
                          Register
                        </a>
                      </p>
                    </>
                  )}

                  {showMobile && (
                    <div className="pt-1 mb-4">
                      {loader ? (
                        <LoadingSpinner />
                      ) : (
                        <button
                          disabled={!required}
                          onClick={handleSubmit}
                          // onClick={handle}
                          // onClick={handleStorage}
                          className="btn btn-warning btn-lg btn-block"
                          type="button"
                        >
                          Login
                        </button>
                      )}

                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                          <div className="text-black ">
                            <div className="d-flex justify-content-center align-items-center h-custom-2 px-5 ms-xl-4 mt-0 pt-1 pt-xl-0 mr-5 mt-xl-n5 m-auto">
                              <form>
                                <h4 className="otp-heading mb-3 pb-3 px-4 ms-xl-4 me-3 pt-4 mt-xl-4 text-center">
                                  OTP Verification
                                </h4>
                                <div className="container-fluid d-flex justify-content-center align-items-center">
                                  <div className="p-2 text-center">
                                    <h6>
                                      Please enter the one time password <br />{" "}
                                      to verify your account
                                    </h6>
                                    <div>
                                      <span>A code has been sent to </span>
                                      <small>+91{userContact}</small>
                                    </div>
                                    <OTPInput
                                      value={OTP}
                                      onChange={setOTP}
                                      autoFocus
                                      OTPLength={4}
                                      otpType="number"
                                      disabled={false}
                                      className="inputs d-flex flex-row justify-content-center mt-2"
                                      inputClassName="m-2 text-center otp"
                                    />
                                  </div>
                                </div>

                                <div className="pt-1 mb-4">
                                  {verLoading ? (
                                    <LoadingSpinner />
                                  ) : (
                                    <button
                                      className="btn btn-warning btn-lg btn-block"
                                      type="button"
                                      onClick={LoginVerify}
                                    >
                                      Verify
                                    </button>
                                  )}

                                  <p className="small fw-bold mt-1 ml-1 pt-1 mb-0 log-p">
                                    <span className="span-otp">
                                      Didn't get code?
                                      <h6 className="mt-1 ml-1"> in {timer}</h6>
                                    </span>
                                    <a
                                      onClick={() =>
                                        isResendOtpVisible ? ResendOtp() : null
                                      }
                                      style={{
                                        opacity: isResendOtpVisible ? 1 : 0.3,
                                      }}
                                      className="link-primary text-decoration-none fw-normal p-2 cursor-pointer"
                                    >
                                      Resend
                                    </a>
                                  </p>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                      <p className="small fw-bold mt-2 ml-4 pt-1 mb-0 pt-2">
                        Don't have an account?
                        <a
                          href="/register"
                          className="link-danger text-decoration-none p-2 fw-normal"
                        >
                          Register
                        </a>
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
