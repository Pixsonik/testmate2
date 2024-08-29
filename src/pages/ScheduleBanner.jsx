import React, { useState } from "react";
import "../assets/css/pages.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import Button from "../assets/img/Background/buttonBg.png";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CompletedTest from "../pages/ScheduleTest/CompletedTest";
import SheduleTest from "../pages/ScheduleTest/SchedulePage";
import UpcomingTest from "../pages/ScheduleTest/UpcomingTest";
import "../assets/css/Responsive.css"

const ScheduleBanner = () => {
  const [isActive, setIsActive] = useState("Scheduled");

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };
  const buttonBg = { 
    backgroundImage: `url(${Button})`,
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper "
       style={myStyle}
       >
        <section className="content p-0 m-auto">
          <div className="container-fluid">
            <div className="p-0" style={buttonBg}>
              <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                <ul className="d-flex justify-content-around overflow-hidden">
                  <li
                    onClick={() => setIsActive("Scheduled")}
                    className="scheduleBanner"
                    type="button"
                  >
                    <h6
                      className="shu-list"
                      style={{
                        borderBottom:
                          isActive === "Scheduled" ? "3px solid var(--blue)" : null,
                        color: isActive === "Scheduled" ? "var(--blue)" : null,
                        marginLeft: "-1.5rem",
                      }}
                    >
                      Scheduled
                    </h6>
                  </li>
                  <li
                    onClick={() => setIsActive("Upcoming")}
                    className="scheduleBanner"
                    type="button"
                  >
                    <h6
                      className="list shu-list"
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
                    className="scheduleBanner"
                    type="button"
                  >
                    <h6
                      className="shu-list"
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
            </div>

            <div className="">
              {isActive === "Scheduled" ? (
                <SheduleTest />
              ) : isActive === "Upcoming" ? (
                <UpcomingTest />
              ) : isActive === "Completed" ? (
                <CompletedTest />
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default ScheduleBanner;
