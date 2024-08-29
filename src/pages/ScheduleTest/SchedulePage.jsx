import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContestTestApi, urlToken } from "../../api/api";
import LoadingSpinner from "../../loader/LoadingSpinner";
import "../../assets/css/pages.css"
import "../../assets/css/Responsive.css"

const userId = localStorage.getItem("UserId");
// const boardId = localStorage.getItem("BoardId");
// const classId = localStorage.getItem("ClassId");
// const langId = localStorage.getItem("LanguageId");

const SchedulePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchSheduleTest();
  }, []);

  const [sheduleData, setsheduleData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchSheduleTest = () => {
    console.log('hello --->');
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("examTime");
    setisLoading(true);
    const url = getContestTestApi();
    const body = {
      token: urlToken,
      // user_id: "113",
      user_id:localStorage.getItem("UserId"),
    };

    // console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("resp  --> ", resp.data);
        console.log("resp  --> ", resp.data.Schedule_test[0]);
        console.log("resp  --> ", resp.data.Schedule_test.id);
        setsheduleData(resp.data.Schedule_test);
        setisLoading(false);
      })
      .catch((err) => {
        console.log("err --> ", err);
      });
  };

  const handleTestDescription = (id , contest_data) => {
    // console.log("id", id);
    return navigate("/testdescription", { state: { contest_id: id , contest_data: contest_data } });
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : sheduleData.length == 0 ? (
        <h3 className="text-center" style={{color:"var(--blue)"}}>No Test is Sheduled </h3>
      ) : (
        sheduleData.map((item, index) => (

          // <div
          //   className=""
          //   onClick={() => handleTestDescription(item.contest_id, item)}
          // >
          //   <img  
          //     src={item.contest_image}
          //     key={index + item.contest_id}
          //     alt=""
          //     className="sche-ban"
          //   />
          // </div>
          <div className="upcomingTest" onClick={() => handleTestDescription(item.contest_id, item)}>
            <p className="testName">{item.contest_name}</p> 
           </div>
        ))
      )}
    </div>
  );
};

export default SchedulePage;
