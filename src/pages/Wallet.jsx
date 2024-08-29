import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Points from "../assets/img/wallet/points.png";
import Store from "../assets/img/wallet/store.png";
import Timer from "../assets/img/wallet/timer.png";
import Counselling from "../assets/img/wallet/counsellingB.png";
import Voucher from "../assets/img/wallet/voucher.png";
import { Link } from "react-router-dom";
import { urlToken, userDetailApi } from "../api/api";
import axios from "axios";
import "../assets/css/Responsive.css"
import "../assets/css/pages.css"
import LoadingSpinner from "../loader/LoadingSpinner";

const userId = localStorage.getItem("UserId");


const Wallet = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = () => {
    setLoader(true)
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: userId,
    };
    // console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Detail ", resp.data.data[0].class_id);
        setLoader(false)
        setUserInfo(resp.data.data[0]);
        // console.log("userName----------", this.state.userInfo.first_name)
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const myStyle = {
    backgroundColor: "var(--blue)",
    height: "100%",
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0">
          <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 justify-content-center m-auto">
            <h3 className="text-center pt-3 text-light">Your Points</h3>
            <div className="">

              <p
                className="points"
              // style={{
              //   position: "absolute",
              //   top: "53%",
              //   left: "50%",
              //   transform: "translate(-50%, -50%)",
              //   color: "var(--blue)",
              //   fontSize: "2rem",
              //   textShadow: "1px 2px 5px var(--blue)",
              // }}
              >
                {loader ? <LoadingSpinner /> : <>{userInfo.coins}</>}

              </p>
              <img
                src={Points}
                className="rounded wallet-img"
                alt="points"

              />
            </div>

            <div
              className="col-6 col-sm-3 col-md-6 col-lg-2 m-auto"
              style={{ marginTop: "-2rem" }}
            >
              {/* <span className="fw-medium">Earn More</span> */}
                {/* <span className="fw-medium">Transaction History</span> */}
              {/* <button
                type="button"
                className="btn btn-primary bg-light btn-block"
                style={{ marginBottom: "28px" }}
              >
                
              </button> */}
              <Link to="/history">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block historyBtn"
                    style={{
                      fontSize: "1rem",
                      color: "var(--white)",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    }}
                  >
                    History
                  </button>
                </Link>
            </div>
          </div>
          {/* <div
            className="wallet"
            // style={{ borderRadius: "1rem 1rem 1rem 1rem" }}
          > */}
          {/* <div className="d-flex justify-content-around mt-4"> */}
          {/* <div className="text-center">
                <img src={Store} alt="" style={{ width: 75, height: 75 }} />
                <p className="mt-2 text-center" style={{ maxWidth: "6rem" }}>
                  Store
                </p>
              </div> */}
          {/* <div className="text-center">
                <Link to="/schedulebanner">
                <img src={Timer} alt="" style={{ width: 75, height: 75, textDecoration:"none" }} />
                <p className="mt-2 text-center" >
                  Book Test
                </p>
                </Link>
              </div> */}
          {/* <div className="text-center">
              <Link to="/counselling">
                <img
                  src={Counselling}
                  alt=""
                  style={{ width: 75, height: 75 }}
                />
                <p className="mt-2 text-center" >
                  Book Counselling
                </p>
                </Link>
              </div> */}
          {/* <div className="text-center">
                <img src={Voucher} alt="" style={{ width: 75, height: 75 }} />
                <p className="mt-2 text-center" style={{ maxWidth: "6rem" }}>
                  Voucher
                </p>
              </div> */}
          {/* </div> */}

          {/* <div className="col-6 col-sm-6 col-md-4 col-lg-3 pb-4 mt-3 m-auto">
              <Link to="/history">
            <button
              type="submit"
              className="btn btn-primary btn-block "
              style={{
                fontSize: "1rem",
                color: "var(--white)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
              >
              History
            </button>
              </Link>
          </div> */}


          {/* <div className="container-fluid col-12 col-sm-6 col-md-8 col-lg-9">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                  <div
                    className="box mt-3 mb-4"
                    style={{ backgroundColor: "#FBB038" }}
                  >
                    <div className="inner">
                      <span
                        className="position-absolute top-25 start-100 translate-middle badge text-danger"
                        type="button"
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "var(--white)",
                          borderRadius: "100px",
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          alignItems: "center",
                          fontSize: "15px",
                          top: "25px",
                          padding: "6px",
                          // right: "-10px",
                          marginLeft: "-10px",
                        }}
                      >
                        X
                      </span>
                      <h6
                        className="col-example text-light mx-4"
                        style={{ LineHeight: "30px" }}
                      >
                        1234 56XX XXXX 3456
                      </h6>
                    </div>
                    <div className="d-flex justify-content-around">
                      <div
                        className="col-example text-light"
                        style={{ marginRight: "55px" }}
                      >
                        Card Holder Name
                        <p className="col-example text-light">MM/YY</p>
                      </div>
                      <div className="col-example text-left">
                        <i
                          className="bx bxl-visa"
                          style={{ fontSize: "2.4rem" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                  <div
                    className="box mt-3 mb-4"
                    style={{ backgroundColor: "#FBB038" }}
                  >
                    <div className="inner">
                      <span
                        className="position-absolute top-25 start-100 translate-middle badge  text-danger"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "var(--white)",
                          borderRadius: "100px",
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          fontSize: "15px",
                          top: " 25px",
                          padding: "6px",
                          // right: "-21px",
                          marginLeft: "-10px",
                        }}
                      >
                        X
                      </span>
                      <h6
                        className="col-example text-light mx-4"
                        style={{ LineHeight: "20px" }}
                      >
                        1234 56XX XXXX 3456
                      </h6>
                    </div>
                    <div className="d-flex justify-content-around">
                      <div
                        className="col-example text-light"
                        style={{ marginRight: "55px" }}
                      >
                        Card Holder Name
                        <p className="col-example text-light">MM/YY</p>
                      </div>
                      <div className="col-example text-left">
                        <i
                          className="bx bxl-visa"
                          style={{ fontSize: "2.4rem" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                  <div
                    className="wallet-box mt-3 text-center mb-4"
                    style={{ Textcolor: "var(--blue)" }}
                  >
                    <div className="wallet-inner mt-4 mb-5 text-center">
                      <Link
                        to="/walletnewcard"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="bx bx-plus text-center pt-1"></i>
                        <span
                          className="text-center fw-bold mt-2"
                          style={{ marginTop: "2rem" }}
                        >
                          Add Cards
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}



          {/* <div className="col-12 mb-3 col-sm-12 col-md-12 col-lg-12 mt-4">
              <div className="d-flex justify-content-around">
                <button type="button" className="btn btn-primary btn-xl px-5 ">
                  Save
                </button>
                <button type="button" className="btn btn-primary btn-xl px-5">
                  Cancel
                </button>
              </div>
            </div> */}
          {/* </div> */}
        </section>
      </div>
    </>
  );
};

export default Wallet;
