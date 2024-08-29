import { Send } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { urlToken, userSubjectApi } from "../api/api";
import "../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import Subject from "../assets/img/IconSub/subject-01.png"

const userId = localStorage.getItem("UserId");
const boardId = localStorage.getItem("BoardId");
const classId = localStorage.getItem("ClassId");
const langId = localStorage.getItem("LanguageId");

const Widget = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getUserSubject();
  }, []);

  const [subjectData, setsubjectData] = useState([]);

  const getUserSubject = () => {
    const url = userSubjectApi();
    const body = {
      token: urlToken,
      user_id: userId,
      class_id: classId,
    };

    // console.log("body--------->", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setsubjectData(resp.data);
        // console.log("respp in user added Subjet --->  ", subjectData);
      })
      .catch((err) => {
        // console.log("error in user added subject --> ", err);
      });
  };

  const handleSubject = () => {
    navigate("../subjects");
  };

  return (
    <>
      <div className="d-flex align-content-around flex-wrap">
        <div className="col-9 row m-auto">
          {subjectData.map((data, index) => (
            <>
              <div className="subject col-6 col-md-2 col-sm-2 col-lg-2 g-4 mt-3">
                <img
                  src={data.subject_icon}
                  key={data.id}
                  alt="sub-img"
                  className="sub-img mx-2"
                  style={{
                    width: "8rem",
                    height: "auto",
                    padding: "0.3rem",
                  }}
                  onClick={() => handleSubject}
                />
                {/* <img src={Subject} alt="" srcset=""  className="sub-img m-2" /> */}
                <br />
                <h6
                  className="text-center mt-2 m-auto pr-3"
                  style={{ maxWidth: "11rem" }}
                >
                  {data.subject_name}
                </h6>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
export default Widget;
