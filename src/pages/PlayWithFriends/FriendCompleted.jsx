import React, { useEffect, useState } from "react";
import { testListApi, urlToken } from "../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/pages.css"
import LoadingSpinner from "../../loader/LoadingSpinner";
import CircularProgress from '@mui/material/CircularProgress';


const userId = localStorage.getItem("UserId");

const FriendCompleted = () => {
  const [completeTest, setCompleteTest] = useState("");
  const [showTest, setShowTest] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    completedTestList();
  }, []);

  const completedTestList = () => {
    setShowLoader(true)
    const url = testListApi();
    const body = {
      token: urlToken,
      user_id: userId,
    };
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setShowLoader(false)
        // console.log("test list is : ", resp.data.Complete_test);
        // setShowTest(false)
        setCompleteTest(resp.data.Complete_test);
      })
      .catch((err) => {
        setShowLoader(true)
        // setShowTest(true)
        // console.log("Chapter--> ", err);
      });
  };

  const testLeaderboard = (id) => {
    // console.log("id", id);
    return navigate("/testresult", {
      state: {
        test_id: id,
      },
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 m-auto">
          {
            showLoader ?
              (<CircularProgress color="secondary"  style={{display:"block",margin:"auto"}}/>)
              :
              completeTest == "" ? (
                <h4 className='text-center' style={{ color: "var(--blue)", textAlign: "center" }}>
                  No Test Completed</h4>
              ) :
               (
                <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-9 text-align-center m-auto">
                  {completeTest.map((data, index) => (
                    <div
                      className="card-friend text-center border"
                      style={{ borderRadius: "1rem", margin: "0.5rem" }}
                    >
                      <div className="d-flex justify-content-around">
                        <div className="d-flex flex-column playFriendMain">
                          <>
                            <div className="d-flex align-items-center playFriendList">
                              <div
                                className=""
                                style={{ textAlign: "center" }}
                                onClick={() => testLeaderboard(data.test_id)}
                              >
                                <h6 style={{ margin: "0" }}>
                                  {data.date} {data.time}
                                </h6>
                              </div>
                              <div className="">
                                <h6 style={{ color: "var(--blue)", margin: "0" }}>
                                  {data.test_name}
                                </h6>
                              </div>
                              <div className=" ml-5 d-flex align-items-center">
                                <i
                                  className="bx bxs-check-circle"
                                  style={{ color: "var(--blue)" }}
                                ></i>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
        </div>
      </div>
    </>
  );
};

export default FriendCompleted;
