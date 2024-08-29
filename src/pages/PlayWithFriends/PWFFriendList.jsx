import React, { useEffect, useState } from "react";
import { testLeaderBoardApi, urlToken } from "../../api/api";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';




const userId = localStorage.getItem("UserId");

const PWFFriendList = () => {
  const [testId, setTestId] = useState("");
  const [friendsList, setFriendsList] = useState("");
 const [showChapterList, setShowChapterList] = useState(false);
 const [isLoading, setLoading]=useState(false)

  const location = useLocation();

  useEffect(() => {
    setTestId(location.state.test_id);
    friendTestfriendList();
  }, []);

  const friendTestfriendList = () => {
    setLoading(true)
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
        setLoading(false)
        if (resp.data.status == "true") {
          setFriendsList(resp.data.data.friends);
          // console.log("friend List  --> ", resp.data.data.friends);
        }
      })
      .catch((err) => {
        // console.log("err --> ", err);
      });
  };

  return (
    <>
      {
      isLoading ? <div ><CircularProgress color="secondary" style={{display: "block" , margin :"auto"}} /></div>  :
      friendsList == "" ? (
        <div className="heading text-center">
          <h5 style={{ color: "var(--blue)", fontSize: "2rem" }}>
            Friends Not added
          </h5>
        </div>
      ) : (
        <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-8 text-align-center m-auto">
          {friendsList.map((data, index) => (
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


                  <div className='d-flex align-items-center rounded-pill'>
                              {data.profile_photo == null || data.profile_photo == '' ? (
                                <i
                                  className='bx bx-user-circle'
                                  style={{
                                    color: 'var(--blue)',
                                    fontSize: '2.5rem',
                                  }}
                                ></i>
                              ) : (
                                <img
                                  src={data.profile_photo}
                                  key={index + data.id}
                                  alt='friend-list'
                                  style={{
                                    width: 45,
                                    height: 45,
                                  }}
                                  className='rounded-circle'
                                />
                              )}
                            </div>

                  

                  <div className="p-2">
                    <h6 style={{ color: "var(--blue)" }}>{data.name}</h6>
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

export default PWFFriendList;
