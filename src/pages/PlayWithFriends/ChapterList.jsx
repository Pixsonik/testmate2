import React, { useEffect, useState } from "react";
import { testLeaderBoardApi, urlToken } from "../../api/api";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


const userId = localStorage.getItem("UserId");

const ChapterList = () => {
  const [testId, setTestId] = useState("");
  const [chaptersList, setChaptersList] = useState("");
  const [showChapterList, setShowChapterList] = useState(false);
  const  [showLoader,setShowLoader] = useState(false)

  const location = useLocation();

  useEffect(() => {
    setTestId(location.state.test_id);
    friendTestChapterList();
  }, []);

  const friendTestChapterList = () => {
    setShowLoader(true)
    const url = testLeaderBoardApi();
    const body = {
      token: urlToken,
      user_id: userId,
      test_id: location.state.test_id,
      mode: "upcoming",
    };

    // console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setShowLoader(false)
        if (resp.data.status == "true") {
          setChaptersList(resp.data.data.chapters);
          // console.log("friend Chapter List  --> ", resp.data.data.chapters);
        }
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  return (
    <>
      {
       showLoader ? <CircularProgress color="secondary"  style={{display:"block", margin :"auto"}}/> :
      chaptersList == "" ? 
      (
        <div className="heading text-center">
          <h5 style={{ color: "var(--blue)", fontSize: "2rem" }}>
            Chapter Not added
          </h5>
        </div>
      ) : (
        <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-8 text-align-center m-auto">
          {chaptersList.map((data, index) => (
            <div
              className="card-friend text-center border"
              style={{ borderRadius: "1rem", margin: "0.5rem" }}
            >
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <div
                    className="p-2 px-4 mx-5"
                    style={{ textAlign: "center" }}
                  >
                    <h6>{"\u2022"}</h6>
                  </div>
                  <div className="p-2">
                    <h6 style={{ color: "var(--blue)" }}>{data.chapter_name}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChapterList;
