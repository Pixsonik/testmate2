import React, { useState, useRef } from "react";
import "../assets/css/pages.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import PackageLogo from "../assets/img/logo/testmate-logo.png";
import { mainUrl, promoCodeApi, urlToken, userDetailApi } from "../api/api";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const userId = localStorage.getItem("UserId");
const schoolId = localStorage.getItem("SchholName");

const RegisterSubscription = () => {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    userDetail();
    setShow(true);
  }, []);

  const navigate = useNavigate();

  const userDetail = () => {
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: userId,
    };
    // console.log('All ---------------', body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setUserInfo(resp.data.data);
        setSchoolId(resp.data.data[0].school_id);
        // console.log("Detail ", resp.data.data[0].school_id);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleSubmit = () => {
    // console.log("trimmed : ", promoCode.trim());
    promoCode.trim() == ""
      ? alert("Please Enter Promo code.")
      : applyPromocode();
  };

  const handleBuyPlan = () => {
    window.open(
      mainUrl +
        "package_price.php?token=" +
        urlToken +
        "&user_id=" +
        userId +
        "&code=PKG",
      "Thanks for Visiting!"
    );
  };

  const applyPromocode = () => {
    const url = promoCodeApi();
    const body = {
      token: urlToken,
      user_id: userId,
      promocode: promoCode,
      actual_price: "259",
      school_id: schoolId,
      package_id: "1",
    };
    // console.log(body);
    axios
      .post(url, body)
      .then((resp) => {
        if (resp.data.status == "true") {
          // setSchoolId(resp.data.data[0].school_id)
          // console.log(resp.data.data[0].school_id);
          setShow(false);
        }
      })
      .catch((err) => {
        // console.log("Promo Code is not valid: ", err);
      });
  };

  const handleClose = () =>
    navigate("/home", {
      state: { userInfo: userInfo },
    });

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
          <Modal
            show={show}
            // onHide={handleClose}
            backdrop="static"
            keyboard={false}
            // {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* <Modal.Header closeButton></Modal.Header> */}
            <Modal.Body>
              <div className="text-black ">
                <div className="d-flex justify-content-center align-items-center h-custom-2 px-5 ms-xl-4 mt-0 pt-1 pt-xl-0 mr-5 mt-xl-n5 m-auto">
                  <form>
                    <div className="inner mt-5 mb-3">
                      <div className="logo-package text-center">
                        <img
                          src={PackageLogo}
                          alt="package-logo"
                          width={125}
                          height={100}
                        />
                      </div>
                      <h5 className="text-center mt-4 mb-4">
                        Unlock Your Package
                      </h5>
                      <div className="col-12 col-sm-12 col-md-9 col-lg-12 m-auto">
                        <div className="form-outline">
                          <>
                            <input
                              required={true}
                              type="text"
                              name="text"
                              id="text"
                              className="form-control package"
                              placeholder="Enter Promo Code"
                              style={{ borderRadius: "3rem" }}
                              value={promoCode}
                              maxLength={10}
                              onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <h5 className="text-center mt-4" >{promoCode == "" ? "Or" : null}</h5>
                            <div className="col-12 col-sm-6 col-md-4 col-lg-12 mt-3 m-auto" onClick={()=> promoCode == "" ? handleBuyPlan() : handleSubmit()}>
                              <button
                                type="submit"
                                className="btn btn btn-block"
                                style={{
                                  backgroundColor: "var(--blue)",
                                  color: "var(--white)",
                                  marginBottom: "3rem",
                                  borderRadius: "3rem",
                                }}
                              >
                                {promoCode == "" ? "Buy Plan" : "Submit"}
                              </button>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer onClick={handleClose}>
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 mt-3 m-auto">
              <button
                type="button"
                className="btn btn btn-block"
                style={{
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                  borderRadius: "2rem",
                }}
              >
                Skip
              </button>
                </div>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default RegisterSubscription;
