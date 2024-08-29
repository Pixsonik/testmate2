import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/pages.css";
import { Link } from "react-router-dom";
import { urlToken, userDetailApi, walletHistoryApi } from "../api/api";
import PointsImg from "../assets/img/wallet/points.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Points from "./Points";
import TransactionHistory from "./TransactionHistory";
import "../assets/css/pages.css"
import "../assets/css/Responsive.css"

const userId = localStorage.getItem("UserId");

const History = () => {
  const [isActive, setIsActive] = useState("Points");
  const [walletData, setwalletData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    userDetail();
    walletHistory();
  }, []);

  const userDetail = () => {
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
        setUserInfo(resp.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const walletHistory = () => {
    const url = walletHistoryApi();
    const body = {
      token: urlToken,
      user_id: userId,
    };
    console.log("------", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("Wallet ---", resp.data.data);
        setwalletData(resp.data.data);
      })

      .catch((error) => {
        console.log("error in fetching wallet History: ", error);
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
          <div className='d-flex justify-content-end'>
          <Link to="/wallet">
            <h6 className="">
              <button className="his-btn his-back">Back</button>
            </h6>
          </Link>
            </div>
          <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 justify-content-center m-auto">
            <h3 className="text-center text-light">Your Points</h3>
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 m-auto text-center">
              <p
              className="wallet-points"
                // style={{
                //   position: "absolute",
                //   top: "50%",
                //   left: "50%",
                //   transform: "translate(-50%, -50%)",
                //   color: "var(--blue)",
                //   fontSize: "2.2rem",
                //   textShadow: "1px 2px 5px var(--blue)",
                // }}
              >
                {userInfo.coins}
              </p>
              <img
                src={PointsImg}
                className="rounded"
                alt="points"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              className="col-6 col-sm-3 col-md-6 col-lg-2 pb-2 p-0 m-auto"
            // style={{ marginTop: "-2rem" }}
            >
              <button
                type="button"
                className="btn btn-primary bg-light btn-block"
              >
                Earn More
              </button>
            </div>
          </div>
          <div
            className="container-fluid col-12 col-sm-6 col-md-12 col-lg-9 mt-5 justify-content-center m-auto mt-2"
            style={{ borderRadius: "3rem 3rem 0rem 0rem" }}
          >
            <div
              className="wallet-history "
              style={{ minHeight: "20px"}}
            >
              <div className="conatiner-fluid col-12">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-4 m-auto">
                  <div className="d-flex justify-content-around">
                    <button
                      onClick={() => setIsActive("Points")}
                      className="buttons-Wallet"
                      type="button"
                      style={{
                        backgroundColor: isActive === "Points" ? "#E5E4E2" : "white",
                        width: "100%",
                        height: "3rem",
                      }}
                    >
                      Points
                    </button>
                    <button
                      onClick={() => setIsActive("Transaction")}
                      className="buttons-Wallet"
                      type="button"
                      style={{
                        backgroundColor: isActive === "Transaction" ? "#E5E4E2" : "white",
                        width: "100%",
                        height: "3rem",
                      }}
                    >
                      Transaction
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 m-auto mt-5">
                {/* <Points/> */}

                {isActive === "Points" ? (
                  <Points />
                ) : isActive === "Transaction" ? (
                  <TransactionHistory />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default History;
