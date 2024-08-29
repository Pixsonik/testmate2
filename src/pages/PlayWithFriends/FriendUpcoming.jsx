import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { testListApi, urlToken } from "../../api/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/css/Responsive.css"
import "../../assets/css/pages.css"
import LoadingSpinner from "../../loader/LoadingSpinner";


const FriendUpcoming = () => {
  const [upcomingTest, setUpcomingTest] = useState("");
  const [loader,setLoader]=useState(false)
  const [showText, setShowText]=useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    upcomingTestList();
  }, []);

  const userId = localStorage.getItem("UserId");

  const reverUpComing=[...upcomingTest].reverse()


  const upcomingTestList = () => {
    setLoader(true)
    const url = testListApi();
    const body = {
      token: urlToken,
      user_id: userId,
    };

    // console.log("upcoming test bode;;;",body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setLoader(false)
        // console.log("test list body : ", body);
        // console.log("test list is : ", resp.data.Schedule_test);
        setUpcomingTest(resp.data.Schedule_test);
      })
      .catch((err) => {
        setLoader(true)

        // setShowText(true)

        // console.log("Chapter--> ", err);
      });
  };

  const TestDetail = (id) => {
    // console.log("id", id);
    return navigate("/testdetail", {
      state: {
        test_id: id,
      },
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container-fluid">
        <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-12 m-auto">
          {upcomingTest == "" ? (
            <>
            {showText ?  <h4 className='text-center'>No Upcoming Test</h4> : null}
           
            {loader ? <LoadingSpinner/> : null}
            {/* <LoadingSpinner/> */}
            </>
          ) : (
            <div className="col-12 col-12 col-sm-12 col-md-12 col-lg-9 text-align-center m-auto">
              {reverUpComing.map((data, index) => (
                <div
                  className="card-friend text-center border"
                  style={{ borderRadius: "1rem", margin: "0.5rem" }}
                >
                  <div className="d-flex justify-content-around upComFriendcard" style={{alignItems:"center",padding: "18px 0"}} >
                    {/* <div className="d-flex flex-column playFriendMain" style={{width:"80%"}}>
                      <>
                        <div className="d-flex playFriendList">
                          <div
                            className=""
                            style={{ textAlign: "center" }}
                            onClick={() =>
                              TestDetail(data.test_id, data.test_data)
                            }
                          >
                            <div>
                            <h6 style={{margin:"0"}}>
                              <a className="" style={{
                                textDecoration:"none",
                                color:"black",
                                cursor:"pointer"
                              }}> {data.date} {data.time}</a>
                            </h6>
                            <h6 style={{margin :"0"}}>
                              Total Friends Submitted <br/> the test : {data.no_friends}
                            </h6>
                            </div>
                            
                          </div>
                          <div className="">
                            <div>
                            <h6 style={{ color: "var(--blue)",margin:"0" }}>
                              <a className="" style={{
                                textDecoration:"none",
                                color:"black",
                                cursor:"pointer",
                                margin:"0"
                              }}
                              > {data.test_name}</a>
                            </h6>
                            <h6 style={{margin :"0"}}>
                              Remaining Friends : {data.pending_friends}
                            </h6>
                            </div>
                            
                          </div>
                        </div>
                      </>
                    </div> */}
                    <div
                      style={{cursor:"pointer"}}
                     onClick={() =>
                              TestDetail(data.test_id, data.test_data)
                            }>
                      <h6 style={{fontSize:"18px",fontWeight:"600"}}>{data.test_name}</h6>
                      <h6>{data.date} {data.time}</h6>
                    </div>
                    <div  className="friendHead">
                      <h6>Friends</h6>
                      <hr/>
                      <div className="d-flex justify-content-around friendListgame" >
                        <p style={{margin:"0",padding :"0",width:"100px", color:"blue"}} className="friendsGame">Total <br/><span style={{fontSize:"18px",fontWeight:"600"}}>{data.no_friends}</span></p>
                        <p style={{margin:"0",padding :"0",width:"100px", color:"green"}} className="friendsGame">Submitted <br/><span style={{fontSize:"18px",fontWeight:"600"}}>{data.no_friends - data.pending_friends}</span></p>
                        <p style={{margin:"0",padding :"0",width:"100px", color:"red"}} className="friendsGame">Pending <br/> <span style={{fontSize:"18px",fontWeight:"600"}}>{data.pending_friends}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="col-7 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 m-auto">
            <button
              // onClick={() => selectedFriendsId()}
              type="submit"
              className="btn btn-primary btn-block "
              style={{
                fontSize: "1rem",
                color: "var(--white)",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            >
              Start Test
            </button>
          </div> */}
      </div>
    </>
  );
};

export default FriendUpcoming;
