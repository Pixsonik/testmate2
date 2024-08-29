import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/pages.css";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import Button from "../../assets/img/Background/buttonBg.png";
// import Home from "../assets/img/store.png";
import ChapterList from "./ChapterList";
import FriendList from "./FriendList";

const UpcomingTestDetails = () => {
  // const navigate = useNavigate();

  const [isActive, setIsActive] = useState("Chapter List");

  //   const handleTest = () => {
  //     return(
  //         navigate("/playfriendscreen")
  //         )
  //     }

  //     const handleFriendList = () => {
  //       return(
  //           navigate("/friendcontact")
  //           )
  //       }

  const buttonBg = {
    backgroundImage: `url(${Button})`,
    width: "100%",
    height: "100vw",
  };

  return (
    <>
      <div className="container-fluid">
        <div className="p-0 m-0" style={buttonBg}>
          <div
            className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center pb-5"
            style={{ paddingTop: "2rem" }}
          >
            <div
              className="d-flex justify-content-around "
              style={{ marginTop: "1rem" }}
            ></div>
          </div>
        </div>
        <div className="card col-12 col-12 col-sm-12 col-md-12 col-lg-9 text-center m-auto">
          <ul className="d-flex justify-content-around">
            <li
              onClick={() => setIsActive("Chapter List")}
              className="scheduleBanner pt-4 "
              type="button"
            >
              <h6
                className=" list"
                style={{
                  borderBottom:
                    isActive === "Chapter List" ? "3px solid var(--blue)" : null,
                  color: isActive === "Chapter List" ? "var(--blue)" : null,
                }}
              >
                Chapter List
              </h6>
            </li>
            <li
              onClick={() => setIsActive("Friend List")}
              className="scheduleBanner pt-4"
              type="button"
            >
              <h6
                className=""
                style={{
                  borderBottom:
                    isActive === "Friend List" ? "3px solid var(--blue)" : null,
                  color: isActive === "Friend List" ? "var(--blue)" : null,
                }}
              >
                Friend List
              </h6>
            </li>
          </ul>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-12 m-auto mt-5">
          {isActive === "Chapter List" ? (
            <ChapterList />
          ) : isActive === "Friend List" ? (
            <FriendList />
          ) : null}
        </div>
      </div>

     
    </>
  );
};

export default UpcomingTestDetails;
