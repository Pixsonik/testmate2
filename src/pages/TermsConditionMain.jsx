import React, { useState } from "react";
import "../assets/css/pages.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import Button from "../assets/img/Background/buttonBg.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndCondition from "./TermsAndCondition";

const TermsConditionMain = () => {
  const [isActive, setIsActive] = useState("TermsAndCondition");

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
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 m-auto">
          <div className="container-fluid">
            <div className="p-0" style={buttonBg}>
              <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                <ul className="d-flex justify-content-around">
                  <li
                    onClick={() => setIsActive("TermsAndCondition")}
                    className="scheduleBanner"
                    type="button"
                  >
                    <h6
                      className=""
                      style={{
                        borderBottom:
                          isActive === "TermsAndCondition"
                            ? "3px solid var(--blue)"
                            : null,
                        color:
                          isActive === "TermsAndCondition" ? "var(--blue)" : null,
                        marginLeft: "-1.5rem",
                      }}
                    >
                      Terms And Conditions
                    </h6>
                  </li>
                  <li
                    onClick={() => setIsActive("PrivacyPolicy")}
                    className="scheduleBanner"
                    type="button"
                  >
                    <h6
                      className=" list"
                      style={{
                        borderBottom:
                          isActive === "PrivacyPolicy"
                            ? "3px solid var(--blue)"
                            : null,
                        color: isActive === "PrivacyPolicy" ? "var(--blue)" : null,
                      }}
                    >
                      Privacy Policy
                    </h6>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-9 m-auto mt-5">
              {isActive === "TermsAndCondition" ? (
                <TermsAndCondition />
              ) : isActive === "PrivacyPolicy" ? (
                <PrivacyPolicy />
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsConditionMain;
