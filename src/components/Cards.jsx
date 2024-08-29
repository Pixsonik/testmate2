import React from "react";
import "../assets/css/style.css";
import Counselling from "../assets/img/cards/counselling.png";
import Schedule from "../assets/img/cards/schedule.png";
import Play from "../assets/img/cards/play.png";
import { Link } from "react-router-dom";
import { urlToken, userPackageApi } from "../api/api";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const userId = sessionStorage.getItem("UserId");

const Cards = () => {
  const [isPackageBuy, setIsPackageBuy] = useState(true);
  const [isPackageDialogVisible, setIsPackageDialogVisible] = useState(false);

  const navigate = useNavigate();

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
          setIsPackageBuy(false);
          setIsPackageDialogVisible(true);
        }
      })
      .catch((error) => {
        // console.log("error in getting user package data ", error);
      });
  };
  return (
    <>
      <div className="d-flex m-auto">
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
            <Link to="/counsellingschedule">
              <img className="cardImg" src={Counselling} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cards;
