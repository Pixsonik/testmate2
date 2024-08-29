import React, { useEffect, useState } from "react";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import {
  testLeaderBoardApi,
  testTopfriendListApi,
  topThreeUserApi,
  urlToken,
  userScoreListApi,
} from "../../api/api";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../assets/css/pages.css"
import "../../assets/css/Responsive.css"

const userId = localStorage.getItem("UserId");

const TestResult = () => {
  const [leaderBoardList, setLeaderBoardList] = useState([]);
  const [leaderList1, setLeaderList1] = useState({});
  const [leaderList2, setLeaderList2] = useState({});
  const [leaderList3, setLeaderList3] = useState({});
  const [testId, setTestId] = useState("");
  const [challengeData, setChallengeData] = useState([]);
  const [details, setDetails] = useState("");
  const [userRankData, setUserRankData] = useState("");
  const [isRankMorethan10, setIsRankMorethan10] = useState(false);

  const location = useLocation();

  // console.log("leaderList3", leaderList3)

  // console.log(leaderBoardList)
  // console.log("Chan", challengeData)

  useEffect(() => {
    setTestId(location.state.test_id);
    // console.log("test id", location.state.test_id);
    friendTestResult();
    topThreeList();
  }, []);

  const friendTestResult = () => {
    const url = testLeaderBoardApi();
    const body = {
      token: urlToken,
      user_id: userId,
      test_id: location.state.test_id,
      mode: "completed",
    };

    // console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setChallengeData(resp.data.data.results);
        // setDetails(resp.data.data);
        // console.log("friend LeaderBoard List  --> ", resp.data.data.results);
        // console.log("friend Result Details --> ", resp.data.data);
        setDetails(resp.data.data)

      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  const topThreeList = () => {
    const url = testTopfriendListApi();
    const body = {
      token: urlToken,
      test_id: location.state.test_id,
    };

    // console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setLeaderBoardList(resp.data.data);
        setLeaderList1(resp.data.data[0]);
        setLeaderList2(resp.data.data[1]);
        setLeaderList3(resp.data.data[2]);
        // console.log("top 3 list is ----> ", leaderBoardList, leaderList3);
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };



  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100vw",
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 mb-5">
          <h3 className="leaderHeading text-center mt-5 pt-5">LeaderBoard</h3>
          <div className="card-leaderboard col-10 m-auto mt-5" style={{ padding: " 48px 18px" }}>
            <div className="card-champ col-12">
              <div className="d-flex justify-content-between">
                <div className="p-2 col-example text-left">
                  <i
                    className="bx bx-chevron-left"
                    style={{ fontSize: "3.2rem" }}
                  ></i>
                </div>
                <div className="p-2 col-example text-left">
                  <div className="leader-sub_title text-center mt-2">
                    <h4 className="leader-sub">{details.subject_name}</h4>
                    <p className="fw-normal mb-1">
                      {moment(details.date + " " + details.time).format(
                        "DD MMM YY hh:mm A"
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-2 col-example text-left">
                  <i
                    className="bx bx-chevron-right"
                    style={{ fontSize: "3.2rem" }}
                  ></i>
                </div>
              </div>

              <div className="std-rank">
                <h3 className="text-center mt-3">Top Rank</h3>
              </div>
              <div className="d-flex justify-content-around RankTopList">
                {
                  leaderList2 === undefined ? <div style={{ width: "158px" }}> </div> :
                    <div className="p-2 col-example text-left">
                      <div className="text-center">
                        <img
                          src={leaderList2.profile_photo}
                          key={leaderList2.user_id}
                          alt=""
                          style={{ width: 70, height: 70 }}
                          className="rounded-circle"
                        />
                        <p className="fw-bold mb-1 text-center">
                          {leaderList2.user_id == userId
                            ? "You"
                            : leaderList2.name}
                        </p>
                        <p className="fw-normal mb-1">{leaderList2.score}</p>
                      </div>
                    </div>
                }

                 {
                  leaderList1 === undefined ?  <div style={{ width: "158px" }}> </div> :
                  <div className="p-2 col-example text-left">
                  <div className="text-center">
                    {
                      leaderList1.profile_photo === "https://testmate.in/api/" ?
                        <>
                          <i className="defaulIcon1 bx bxs-user-circle"></i>
                        </> :
                        <img
                          src={leaderList1.profile_photo}
                          key={leaderList1.user_id}
                          alt=""
                          style={{ width: 70, height: 70 }}
                          className="rounded-circle"
                        />
                    }

                    <p className="fw-bold mb-1 text-center FirstRanktitle">
                      {leaderList1.user_id == userId
                        ? "You"
                        : leaderList1.name}
                    </p>
                    <p className="fw-normal mb-1 FirstRankScore">{leaderList1.score}</p>
                  </div>
                </div>
                 }
                

                {
                  leaderList3 === undefined ? <div style={{ width: "158px" }}> </div> :
                    <div className="p-2 col-example text-left">
                      <div className="text-center">
                        <img
                          src={leaderList3.profile_photo}
                          key={leaderList3.user_id}
                          alt=""
                          style={{ width: 70, height: 70 }}
                          className="rounded-circle"
                        />
                        <p className="fw-bold mb-1 text-center">
                          {leaderList3.user_id == userId
                            ? "You"
                            : leaderList3.name}
                        </p>
                        <p className="fw-normal mb-1">{leaderList3.score}</p>
                      </div>
                    </div>
                }



              </div>
            </div>
            {
              challengeData.length === 0 ? null :
                <>
                  <hr />
                  <div className="col-12">
                    <div className="col-12 col-lg-12 col-sm-6">
                      <table className="container-fluid table-borderless align-middle mb-5 mt-5">
                        <tr>
                          <th>Rank</th>
                          <th></th>
                          <th>Name</th>
                          <th>Score</th>
                        </tr>

                        <tbody>
                          {challengeData.map((item, index) => (
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">

                                  {
                                    item.profile_photo === "" ? <i className=" bx bxs-user-circle"></i> :
                                      <img
                                        src={item.profile_photo}
                                        // key={item.id}
                                        alt=""
                                        style={{ width: 45, height: 45 }}
                                        className="rounded-circle mt-2"
                                      />
                                  }

                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-1">
                                    <p className="fw-normal mb-1">{item.rank}</p>
                                  </div>
                                  <i className="bx bx-up-arrow-alt mx-3"></i>
                                </div>
                              </td>
                              <td>
                                <p className="fw-bold mb-1">{item.name}</p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">{item.score}</p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Link to="">
                        <div className="col-7 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 m-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            style={{
                              fontSize: "1.3rem",
                              color: "var(--white)",
                              border: "0.1rem solid var(--white)",
                              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                            }}
                          >
                            View All
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
            }

          </div>
        </section>
      </div>
    </>
  );
};

export default TestResult;
