import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContestTestApi, topThreeUserApi, urlToken } from "../../api/api";
import LoadingSpinner from "../../loader/LoadingSpinner";
import "../../assets/css/Responsive.css"
import "../../assets/css/pages.css"
import check from "../../assets/img/tick-mark.png"
 

const userId = localStorage.getItem("UserId");

const CompletedTest = () => {
  const [sheduleData, setsheduleData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSheduleTest();
  }, []);

  const fetchSheduleTest = () => {
    setisLoading(true);
    const url = getContestTestApi();
    const body = {
      token: urlToken,
      user_id: localStorage.getItem("UserId"),
      mode:'completed'
    };

    console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("resp in completed test --> ", resp.data);
        setsheduleData(resp.data.Complete_test);
        setisLoading(false);
      })
      .catch((err) => {
        console.log("err --> ", err);
      });
  };

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
        if (resp.data.status == 'false') {
          console.log(resp.data);
          
          alert('Please wait for the contest to end!')
        } else {
          navigate("/leaderboard", { state: { contest_id: id } });
        }
      })
      .catch((err) => {
      });
  };

  const handleLeaderBoard = (id) => {
    // console.log("id", id);
    topScoreUserApi(id)
    // return navigate("/leaderboard", { state: { contest_id: id } });
  };

  return (
    <div className="flex-upcom-schdule">
      {isLoading ? (
        <LoadingSpinner />
      ) : sheduleData == "" ? (
        <div>
          <h3 className="text-center" style={{ color: "var(--blue)" }}>You Have Not Completed Any Test</h3>
        </div>
      ) : (
        sheduleData.map((item, index) => (
          <div
            className="leaderMainDiv"
            // onClick={() => handleLeaderBoard(item.contest_id)}
            style={{ padding: "0px 0",  }}
          >
            <img id="checkbtn" src={check} />
            <img
              src={item.contest_image}
              alt=""
              className="upcom-test"
            // style={{ width: "100%", height: "auto" }}
            />
            <div style={{textAlign: 'center', fontSize: '22px'}}>
              <p>{item.contest_name}</p>
            </div>
            <div style={{}} className="leaderBtngroup">
              <button className="leaderBtn" onClick={()=>{localStorage.setItem('contestId',item.contest_id); localStorage.setItem('contestkey',item.unique_code); navigate('/testAnswercheck')}} >Check Answer</button>
              <button onClick={() => handleLeaderBoard(item.contest_id)} className="leaderBtn">Leaderboard</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedTest;
