import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assets/css/pages.css";
import { useNavigate } from "react-router-dom";
import { getSheduleTestApi, urlToken } from "../../api/api";
import LoadingSpinner from "../../loader/LoadingSpinner";
import "../../assets/css/Responsive.css"
import { useSelector } from "react-redux";

const userId = localStorage.getItem("UserId");
const boardId = localStorage.getItem("BoardId");
const classId = localStorage.getItem("ClassId");
// const langId = localStorage.getItem("LanguageId");
const langId = localStorage.getItem("langIddd");
const schoolId = localStorage.getItem("SchholName");
const branchId = localStorage.getItem("branchIdd");
const UpcomingTest = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchSheduleTest();
    console.log('---full---',branchId);
  }, []);

  const [sheduleData, setsheduleData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchSheduleTest = () => {
    // setisLoading(true);
    const url = getSheduleTestApi();
    const body = {
      token: urlToken,
      board_id: localStorage.getItem("BoardId"),
      lang_id: localStorage.getItem("langIddd"),
      class_id: localStorage.getItem("ClassId"),
      school_id:localStorage.getItem("SchholName"),
      branch_id:localStorage.getItem("branchIdd"),
    };

    console.log("body  ---> ", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("Upcoming Response  --> ", resp.data);
        setsheduleData(resp.data.data);
        // setisLoading(false);
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  const handleClick = (id) => {
    // console.log("id", id);
    return navigate("/scheduletest", { state: { contest_id: id } });
  };

  return (
    <div className="">
      {isLoading ? (
        <LoadingSpinner /> 
      ) : sheduleData == "" ? (
        <div>
          <h3 className="text-center" style={{color:"var(--blue)",}}>No Data Found</h3>
        </div>
      ) : (
        sheduleData?.map((item, index) => (
          <div
            // className="col-12 col-sm-12 col-md-12 col-lg-9 m-auto mt-5"
           
            onClick={() => handleClick(item.id)}
          >
           <div className="upcomingTest">
            <p className="testName">{item.name}</p>
           </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingTest;
