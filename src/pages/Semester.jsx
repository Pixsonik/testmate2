import React from "react";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import Edit from "../assets/img/UserProfile/edit.png";
import Navbar from "../components/Navbar";
import SemesterIcon from "../components/SemesterIcon";
import Sidebar from "../components/Sidebar";

const Semester = () => {
  const chapter = [
    { number: "Chapter 1:", chapterName: "Playing with number" },
    { number: "Chapter 2:", chapterName: "Playing with number" },
    { number: "Chapter 3:", chapterName: "Playing with number" },
    { number: "Chapter 4:", chapterName: "Playing with number" },
    { number: "Chapter 5:", chapterName: "Playing with number" },
    { number: "Chapter 6:", chapterName: "Playing with number" },
    { number: "Chapter 7:", chapterName: "Playing with number" },
    { number: "Chapter 8:", chapterName: "Playing with number" },
  ];

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <div className="content p-0">
          <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-8 mb-5">
            <SemesterIcon />
            <div
              className="container-fluid bg-white col-12 col-sm-6 col-md-6 col-lg-8 mb-5"
              style={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                paddingBottom: "2rem",
              }}
            >
              <div className="d-flex justify-content-around">
                <div className="p-2 col-example text-left mt-3">
                  <h2>Sem 1 : Maths</h2>
                </div>
                <div className="p-2 col-example text-left">
                  <div className="mt-2">
                    <img className="semEditimg" src={Edit} alt="" />
                  </div>
                </div>
              </div>
              <div className="chapterName col-12 col-sm-12 col-md-6 col-lg-12 m-auto text-center">
                {chapter.map((item) => (
                  <div className="sem-chapter mt-3 mb-4">
                    <span className="semChapter">{item.number}</span>
                    <span
                      className="col-12 col-sm-6 col-md-6 col-lg-12 mt-5 mb-4 text-center"
                      style={{ paddingLeft: "2rem" }}
                    >
                      {item.chapterName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Semester;
