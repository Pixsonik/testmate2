import React, { useState, useRef } from "react";
import "../assets/css/pages.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import Otp from "../assets/img/Register/otp.png";
import { otpVerifyApi, urlToken } from "../api/api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {userLoginApi} from "../api/api";


const OtpVerification = () => {
  const [userContact, setUserContact] = useState("");
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [otp, setOtp] = useState();
  const [otpConcat, setOtpConcat] = useState("");
  const [timer, setTimer] = useState('00:00:00');
  const [isResendOtpVisible, setIsResendOtpVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserContact(location.state.userContact);
    // console.log("====================================");
    // console.log(userContact);
    // console.log("====================================");
    setOtp(location.state.userContact);
  }, []);

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
        console.log("otp resenddddddddd ", resp.data.status);
        if (resp.data.status === "true") {
          alert("OTP Sent");
          // onClickReset()
          // setShow(true);
        } else {
          alert(resp.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };


  const verifyOtp = (e) => {
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

    setOtpConcat(finalOtp);

    // console.log("====================================");
    // console.log("otp is ", finalOtp);
    // console.log("====================================");
    // e.preventDefault();
    // console.log("------>   ", location.state.userContact);
    const url = otpVerifyApi();
    var body = {
      token: urlToken,
      mobile: userContact,
      otp: finalOtp,
    };
    // console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Register ", resp.data);
        if (resp.data.status === "true") {
          // console.log(resp.data);
          // navigate("/reg_subscription", {
          //   state: { userContact: location.state.userContact },
          // });
          navigate('/')
        } else {
          alert("Please enter valid OTP");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      // console.log("next");

      const next = elmnt.target.tabIndex;
      if (next < 5) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <section style={myStyle}>
        <div className="container-fluid">
          <div className="col-sm-12 text-center ">
            <img
              src={Otp}
              alt=""
              className="col-sm-3 col-md-2 mx-3 mt-5 otpVerify overflow-hidden"
            />
          </div>
          <div className="align-items-center">
            <form className="col-sm-12 text-black">
              <h4 className="otp-heading mb-2 pb-2 text-center">
                OTP Verification
              </h4>
              <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="p-2 text-center">
                  <h6>
                    Please enter the one time password <br /> to verify your
                    account
                  </h6>
                  <div>
                    <span>A code has been sent to </span>
                    <small>+91 {userContact}</small>
                  </div>
                  <div
                    id="form-control"
                    className="input d-flex flex-row justify-content-center mt-2"
                  >
                    <input
                      className="m-2 text-center otp"
                      type="text"
                      name="otp"
                      onChange={(e) => setOne(e.target.value)}
                      inputmode="numeric"
                      autoComplete="one-time-code"
                      onKeyPress={(e) => inputfocus(e)}
                      tabIndex="1"
                      maxLength="1"
                      onKeyUp={(e) => inputfocus(e)}
                    />
                    <input
                      className="m-2 text-center otp"
                      type="text"
                      name="otp"
                      onChange={(e) => setTwo(e.target.value)}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      tabIndex="2"
                      maxLength="1"
                      onKeyUp={(e) => inputfocus(e)}
                    />
                    <input
                      className="m-2 text-center otp"
                      type="text"
                      name="otp"
                      onChange={(e) => setThree(e.target.value)}
                      inputmode="numeric"
                      autoComplete="one-time-code"
                      tabIndex="3"
                      maxLength="1"
                      onKeyUp={(e) => inputfocus(e)}
                    />
                    <input
                      className="m-2 text-center otp"
                      type="text"
                      name="otp"
                      onChange={(e) => setFour(e.target.value)}
                      inputmode="numeric"
                      autoComplete="one-time-code"
                      tabIndex="4"
                      maxLength="1"
                      onKeyUp={(e) => inputfocus(e)}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="col-7 col-sm-6 col-md-3 col-lg-2 pb-4 mt-3 m-auto">
              <button
                onClick={verifyOtp}
                className="btn btn-warning btn-md btn-block"
                type="submit"
              >
                Verify
              </button>
              <p className="small fw-bold mt-1 ml-1 pt-1 mb-0 log-p"><span className="span-otp">
                Didn't receive OTP?
                {/* <h6 className="mt-1 ml-1"> in {timer}</h6> */}
              </span>
                <a
                  onClick={() =>ResendOtp() }
                  // style={{ opacity: isResendOtpVisible ? 1 : 0.3 }}
                  className="link-primary text-decoration-none fw-normal p-2 cursor-pointer"
                >
                  Resend
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpVerification;
