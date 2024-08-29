import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/pages.css';
import Bg2 from '../../assets/img/Background/bg-desktop2.png';
import Button from "../../assets/img/Background/buttonBg.png";
// import Home from "../assets/img/store.png";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FriendCompleted from './FriendCompleted';
import FriendUpcoming from './FriendUpcoming';
import "../../assets/css/Responsive.css"
import "../../assets/css/Responsive.css"

const PlayWithFriend = () => {

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState("Upcoming");


  const handleTest = () => {
    return(
        navigate("/playfriendscreen")
        )
    }

    const handleFriendList = () => {
      return(
          navigate("/friendlist")
          )
      }

  const buttonBg = {
    backgroundImage: `url(${Button})`,
    width: "100%",
    height: "100%",
  };
    const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: '100%',
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 m-auto">
          <div className="container-fluid">
            <div className="p-0 m-0" style={buttonBg}>
              <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center pb-5" style={{paddingTop:"2rem"}} >
              <div className="d-flex justify-content-around play-btn-btn" >
                <button
                  type="button"
                  className="btn-primary btn-xl px-5 mx-5 play-btn"
                  style={{    padding: "5px 0"}}
                  onClick={() => handleTest()}
                >
                  Create Test
                </button>
                <button
                  type="button"
                  className="btn-primary btn-xl px-5 mx-5 play-btn1"
                  style={{    padding: "5px 0"}}
                  onClick={() => handleFriendList()}
                >
                  Friend List
                </button>
              </div>
              </div>
            </div>
            <div className="card col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center m-auto">
                <ul className="d-flex justify-content-around">
                  <li
                    onClick={() => setIsActive("Upcoming")}
                    className="scheduleBanner pt-4 "
                    type="button"
                  >
                    <h6
                      className="list"
                      style={{
                        borderBottom:
                          isActive === "Upcoming" ? "3px solid var(--blue)" : null,
                        color: isActive === "Upcoming" ? "var(--blue)" : null,
                      }}
                    >
                      Upcoming
                    </h6>
                  </li>
                  <li
                    onClick={() => setIsActive("Completed")}
                    className="scheduleBanner pt-4"
                    type="button"
                  >
                    <h6
                      className=""
                      style={{
                        borderBottom:
                          isActive === "Completed" ? "3px solid var(--blue)" : null,
                        color: isActive === "Completed" ? "var(--blue)" : null,
                      }}
                    >
                      Completed
                    </h6>
                  </li>
                </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 m-auto mt-5">
              {isActive === "Upcoming" ? (
                <FriendUpcoming />
              ) : isActive === "Completed" ? (
                <FriendCompleted />
              
              ) : null}
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default PlayWithFriend;
