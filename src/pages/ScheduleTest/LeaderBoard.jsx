import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
import { topThreeUserApi, urlToken, userScoreListApi } from "../../api/api";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import userImage from '../../assets/img/UserProfile/istockphoto-1337144146-612x612.jpg'

const LeaderBoard = () => {
  const [leaderData1, setLeaderData1] = useState({});
  const [leaderData2, setLeaderData2] = useState({});
  const [leaderData3, setLeaderData3] = useState({});
  const [allScoreList, setAllScoreList] = useState([]);
  const [leaderBoardList, setLeaderBoardList] = useState([]);
  const [showAll, setShowAll] = useState(false);


  const location = useLocation();

  useEffect(() => {
    topScoreUserApi(location.state.contest_id);
    scoreUserList(location.state.contest_id);
  }, []);

  const topScoreUserApi = (id) => {
    const url = topThreeUserApi();
    const body = {
      token: urlToken,
      contest_id: id,
    };

    console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setLeaderData2(resp.data.data[1]);
        setLeaderData1(resp.data.data[0]);
        setLeaderData3(resp.data.data[2]);
        console.log("LeaderBoard top 3 Score list  --> ", resp.data.data);
        setLeaderBoardList();
        // console.log('LeaderBoard Date ----> ', leaderBoardList);
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  const scoreUserList = (id) => {
    const url = userScoreListApi();
    const body = {
      token: urlToken,
      contest_id: id,
    };

    // console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setAllScoreList(resp.data.data);
        console.log("LeaderBoard top Score list  --> ", resp.data.data);
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  const itemsToDisplay = showAll ? allScoreList : allScoreList.slice(0, 2);
  
  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100vw",
  };
  // allScoreList
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 mb-5">
          <h3 className="leaderHeading text-center mt-5 pt-5">LeaderBoard</h3>
          <div className="card-leaderboard col-10 m-auto mt-5 pt-2">
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
                    <h4 className="leader-sub">
                      {leaderBoardList?.contest_name}
                    </h4>
                    <p className="fw-normal mb-1">
                      {moment(leaderBoardList?.date).format("DD MMM YY hh:mm A")}
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
              <div className="d-flex justify-content-around sau2">
                <div className="p-2 col-example text-left sau">
                  <div className="text-center">
                    <img
                      src={leaderData2?.image === "https://testmate.in/api/" ?  userImage : leaderData2?.image }
                      key={leaderData2?.user_id}
                      alt=""
                      style={{ width: 70, height: 70 }}
                      className="rounded-circle"
                    />
                    <p className="fw-bold mb-1 text-center">
                      {leaderData2?.user_name}
                    </p>
                    <p className="fw-normal mb-1">{leaderData2?.score}</p>
                  </div>
                </div>
                <div className="p-2 col-example text-left sau">
                  <div className="text-center">
                    <img
                      // src={leaderData1?.image}
                      src={leaderData1?.image === "https://testmate.in/api/" ?  userImage : leaderData1?.image }
                      key={leaderData1?.user_id}
                      alt=""
                      style={{ width: 100, height: 100 }}
                      className="rounded-circle"
                    />
                    <p className="fw-bold mb-1 text-center">
                      {leaderData1?.user_name}
                    </p>
                    <p className="fw-normal mb-1">{leaderData1?.score}</p>
                  </div>
                </div>
                <div className="p-2 col-example text-left sau">
                  <div className="text-center">
                    <img
                      // src={leaderData3?.image}
                      src={leaderData3?.image === "https://testmate.in/api/" ?  userImage : leaderData3?.image }
                      key={leaderData3?.user_id}
                      alt=""
                      style={{ width: 65, height: 65 }}
                      className="rounded-circle"
                    />
                    <p className="fw-bold mb-1 text-center">
                      {leaderData3?.user_name}
                    </p>
                    <p className="fw-normal mb-1">{leaderData3?.score}</p>
                  </div>
                </div>
              </div>
            </div>
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
                    {itemsToDisplay.map((item, index) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              // src={item.image}
                              src={item?.image === "https://testmate.in/api/" ?  userImage : item?.image }
                              key={item.id}
                              alt=""
                              style={{ width: 45, height: 45 }}
                              className="rounded-circle mt-2"
                            />
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
                          <p className="fw-bold mb-1">{item.user_name}</p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">{item.score}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <Link to=""> */}
                  <div className="col-7 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 m-auto">
                  {allScoreList.length > 2 && 
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      style={{
                        fontSize: "1.3rem",
                        color: "var(--white)",
                        border: "0.1rem solid var(--white)",
                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                      }}
                      onClick={() => setShowAll(true)}
                    >
                      View All
                    </button>
}
                  </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LeaderBoard;
