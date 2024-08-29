import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Bg2 from "../../assets/img/Background/bg-desktop2.png";
// import "../../assets/css/style.css"
import {
  contestStartApi,
  contestStatus,
  mainUrl,
  urlToken,
  userDetailApi,
  userPackageApi,
} from "../../api/api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import "../../assets/css/pages.css"
import "../../assets/css/Responsive.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import LoadingSpinner from "../../loader/LoadingSpinner"
import toast, { Toaster } from "react-hot-toast";

function MyVerticallyCenteredModal(props, showStatus) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          showStatus ? (<p>
            Test Given Already
          </p>):(<p>
          Registration Successful
        </p>)
        }
        
      </Modal.Body>
      <Modal.Footer>
        <Link to="/schedulebanner">
          <Button>OK</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}


const TestRegister = () => {
  const [userData, setUserData] = useState("");
  const [getUserScheduleTest, setGetUserScheduleTest] = useState("");
  const [testData, setTestData] = useState("");
  const [contest_id, setContest_id] = useState("");
  const [contestStatusData, setContestStatusData] = useState("");
  const [token_key, setToken_key] = useState("");
  const [contestData, setContestData] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [loader, setLoader] = useState(false)
  const [regErrMasshow, setRegErrMasshow] = useState(false);
  const [regErrMassage,setRegErrMassage] =useState("");
  const [status, setStatus]=useState(false);

  const navigate = useNavigate()
  // console.log(regErrMassage)


  const userId = localStorage.getItem("UserId");
  const boardId = localStorage.getItem("BoardId");
  const classId = localStorage.getItem("ClassId");
  const langId = localStorage.getItem("LanguageId");

  const location = useLocation();
  const Razorpay = useRazorpay();

  useEffect(() => {
    userDetail();
    checkUserPackage();
    // console.log("------------------>", location.state.contest_id);
    // console.log("------------------>", location.state.userData);
    setContest_id(location.state.contest_id)
    getContestStatus()

  }, []);

  const userDetail = () => {
    const url = userDetailApi();
    var body = {
      token: urlToken,
      id: userId,
    };
    // console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("Detail ", resp.data.data[0].class_id);
        setUserData(resp.data.data[0]);
        // console.log("userName----------", resp.data.data[0].first_name);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const getContestStatus=()=>{
    const url = contestStatus()
    const body = {
      token:'6808',
      contest_id:location.state.contest_id,
      user_id:userId
    }
    console.log('==body==>',body);
    axios.post(url,body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp)=>{
      console.log('==',resp.data.status);
      setStatus(resp.data.status)
    })
    .catch((error)=>{
      console.log('==error==',error);
    })
  }


  const checkUserPackage = () => {
    const url = userPackageApi();
    var body = {
      token: urlToken,
      user_id: userId,
    };
    // console.log("All ---------------", body);

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("User Package Data ", location.state.userData.discount);
        if (resp.data.status == "true") {
          setGetUserScheduleTest(resp.data.data.remain_schedule_test);
          // console.log("package response -- ",resp.data.data);
        } else {
          setGetUserScheduleTest(0);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const payForTest = () => {
    getUserScheduleTest > 0
      ? registerForTest()
      : window.open(mainUrl + "/package_price.php?token=" + urlToken + "&user_id=" + userId + "&code=SCH&actual_price=" + location.state.userData.entry + "&selling_price=" + (location.state.userData.entry - location.state.userData.discount) + "&discount_price=" + location.state.userData.discount);
    // console.log( window.open(mainUrl +"/package_price.php?token=" +urlToken +"&user_id=" +userId +"&code=SCH&actual_price=" +location.state.userData.entry +"&selling_price=" +(location.state.userData.entry - location.state.userData.discount) +"&discount_price=" +location.state.userData.discount));
  };

  const registerForTest = () => {
    setLoader(true)
    const url = contestStartApi();
    const body = {
      token: urlToken,
      contest_id: contest_id,
      userid: userId,
    };

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("response of reg test is -- ", resp.data);
        if (resp.data.message != "Contest is Completed") {
          if(resp.data.message != "Already Registered!!"){
            setToken_key(resp.data.data[0].token_key);
            setContestStatusData(resp.data.data);
            toast('Registered Successfully')
            setTimeout(() => {
              navigate('/schedulebanner')
              // window.location.href('https://web.testmate.in/schedulebanner')
              // console.log("cont id---", resp.data.data[0].contest_id);
            }, 1000);
          }
          else{
            toast(resp.data.message)
          }
        } else {
          alert(resp.data.message);
          // setRegErrMasshow(true)
          // setRegErrMassage(resp.data.message)
          setLoader(false)
        }
        setTimeout(() => {
          if (contest_id === resp.data.data[0].contest_id) {
            setTimeout(() => {
              // alert(
              //     // "Contest registration",
              //     "Contest registration successfull !",
              //   );
              setModalShow(true)
              setLoader(false)
            }, 300);
          } else {
            alert("Getting error while registration");
          }
        }, 100);

      })
      .catch((error) => {
        // console.log("error found ---->", error);
      });
  };

  const handlePayment = useCallback((price = 50, package_id, order_id) => {
    var options = {
      description: "Book counselling.",
      image: userData.profile_photo_path,
      currency: "INR",
      key: "rzp_test_iNvUrkMVV4drdT",
      amount: price * 100,
      name: userData.first_name,
      prefill: {
        name: userData.first_name,
        email: userData.email,
        contact: userData.mobile,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay
      .open(options)
      .then((data) => {
        // console.log(data);
        alert(`Success: ${data.razorpay_payment_id}`);
        registerForTest();
      })
      .catch((error) => {
        // console.log(error.description);
        alert(`Error: ${error.code}  ${error.description}`);
      });
  });

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    // height: "100vw",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Toaster/>
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 m-auto">
          {/* <MyVerticallyCenteredModal
            show={modalShow} showStatus={status}
          /> */}
            <Modal
            show={regErrMasshow}
            onHide={()=>setRegErrMasshow(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{regErrMassage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setRegErrMasshow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> 
          
          <div className="container-fluid m-auto ">
            <div className="col-lg-9 m-auto ">
              <div className="col-12 ">
                <div className="row TestRest">
                  <div className="counselling-Form col-12  col-md-6 col-lg-6 mt-4">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="exampleFormControlInput1"
                      className="form-control shadow-none"
                      style={{ borderRadius: "13px", outlineColor: " none" }}
                      value={userData.first_name}
                      required
                    />
                  </div>

                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
                    <label htmlFor="lastName" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      style={{ borderRadius: "13px" }}
                      value={userData.email}
                      required
                    />
                  </div>

                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
                    <label htmlFor="category">Mobile</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      style={{ borderRadius: "13px" }}
                      value={userData.mobile}
                      required
                    />
                  </div>

                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
                    <label htmlFor="topic">Select Standard</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      style={{ borderRadius: "13px" }}
                      value={userData.class_name}
                      required
                    />
                  </div>

                  <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-4">
                    <label htmlFor="board" className="form-label">
                      Select Board
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      style={{ borderRadius: "13px" }}
                      value={userData.board_name}
                      required
                    />
                  </div>
                </div>
                <div>


                </div>
                <div className="col-7 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 m-auto">
                  {loader ? <LoadingSpinner /> : <button
                    type="button"
                    className="btn btn-primary btn-block TestResBtn"
                    onClick={() => payForTest()}
                  >
                    Register<i className="fas fa-arrow-right mx-2"></i>
                  </button>}

                </div>
              </div>
            </div>
          </div>
          {/* <div className="homeIcon col mt-5">
            <img className="hicon mr-3" src={Home} alt="homeicon" />
          </div> */}
        </section>
      </div>
    </>
  );
};

export default TestRegister;
