import React, { useEffect, useState } from 'react';
import '../assets/css/pages.css';
import Bg2 from '../assets/img/Background/bg-desktop2.png';
// import Home from "../assets/img/store.png";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CounsellingImg from '../assets/img/counselling.png';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { counsellingUpcomingListApi, urlToken } from '../api/api';
import axios from 'axios';
import "../assets/css/style.css"
import "../assets/css/Responsive.css"
import LoadingSpinner from '../loader/LoadingSpinner';
import LoginLoader from "../loader/LoginLoader"
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const userId = localStorage.getItem('UserId');

// const boardId = localStorage.getItem('BoardId');
// const classId = localStorage.getItem('ClassId');
// const langId = localStorage.getItem('LanguageId');

const Counselling = () => {
  const [upcomingCounsellingData, setUpcomingCounsellingData] = useState([]);
  const [completdCounsellingData, setCompletedCounsellingData] = useState([]);
  const [notifyDrawer, setNotifyDrawer] = useState({
    right: false,
  });
const [showLoader,setShowLoader]=useState(false)
const [showText,setShowText]=useState(false)
  useEffect(() => {
    upcomingCounsellingMeetings();
    completedCounsellingMeetings();
  }, []);

// console.log("array",completdCounsellingData)

const navigate = useNavigate()

  const upcomingCounsellingMeetings = () => {
    setShowLoader(true)
    const url = counsellingUpcomingListApi();
    const body = {
      token: urlToken,
      // user_id: '113',
      user_id: userId,
      mode: "upcoming"
    };

    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        // console.log(
        //   'resp in counselling list --> ',
        //   resp.data.schedule_counselling
        // );
        // console.log(
        //   'resp in counselling --> ',
        //   resp.data
        // );
        // setisLoading(false)
        setShowLoader(false)
        setUpcomingCounsellingData(resp.data.schedule_counselling);
      })
      .catch((err) => {
    setShowLoader(true)
        // setShowLoader(false)
        // console.log('err --> ', err);
      });
  };

  const completedCounsellingMeetings = () => {
    const url = counsellingUpcomingListApi();
    const body = {
      token: urlToken,
      // user_id: '113',
      user_id: userId,
    };

    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        // console.log('meeting list is : ', resp.data.other_counselling);
        setCompletedCounsellingData(resp.data.schedule_counselling);
      })
      .catch((err) => {
        // console.log('err --> ', err);
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setNotifyDrawer({ ...notifyDrawer, [anchor]: open });
  };

  const sendHistory=(data)=>{
    navigate("/counsellingFeedback",{
      state:{historyData : data}
    })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      backgroundColor={'#005A9E'}
      height={'auto'}
    >
      <List>
        <>
          <section style={{ overflowX: 'hidden' }}>
            {completdCounsellingData == '' ? (
              <div className='inner mt-5 pt-4' id='upcoming'>
                <p>No Completed Meetings </p>
              </div>
            ) : (
              <div className='container-fluid p-0 m-0' >
                {completdCounsellingData.map((item, index) => (
                  <div className='col-example mx-2' onClick={()=>sendHistory(item)}>
                    <div className='col-12 col-sm-12 col-lg-9 box bg-light mt-5 mb-5 text-center m-auto'>
                      <div className='inner d-flex justify-content-sm-center'>
                        <h6
                          className='text-center mx-3'
                          style={{ color: 'var(--blue)' }}
                        >
                          {item.select_date}
                        </h6>
                        <h6
                          className='text-center mx-3'
                          style={{ color: 'var(--blue)' }}
                        >
                          {item.start_time} - {item.end_time}
                        </h6>
                      </div>
                      <p className='text-center'>{item.subject_name}</p>
                      <p className='text-center'>{item.chapter_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      </List>
    </Box>
  );

  const openInNewTab = url => {
    // setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: '100%',
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='content-wrapper' style={myStyle}>
        <section className='content p-0  couns-meet' >
          <div
            className='container-fluid col-12 col-sm-12 col-md-12 col-lg-12 text-center '
            style={{ backgroundColor: 'var(--blue)' }}
          >
            <div className='d-flex justify-content-md-between  Fflex'>
              {/* <div className='d-flex align-items-center bd-highlight example-parent'>
                <div className='flex-shrink-1 bd-highlight col-example'>
                  <div className='inner ' id='upcoming'>
                    <p className='pt-3'>Upcoming Meetings</p>
                  </div>
                </div>
              </div> */}
               <div className='upComing'>
                <div style={{width:"110px"}}>
                  <p>Upcoming Meetings</p>
                </div>
               </div>
              <div className='col-example text-left' style={{display:"none"}}>
                <div className='cIcon pt-4 mt-5'>
                  {/* <i className='bx bx-chevron-left'></i> */}
                </div>
              </div>
              {   
              showLoader ?  <CircularProgress  style={{margin: "75px 00",color:"white"}}/> : 
              upcomingCounsellingData == '' ? (
                <div className='inner' style={{padding: "75px 00"}} id='upcoming'>
                  <p style={{margin:"0"}}>No Upcoming Meetings </p>
                  {/* <LoadingSpinner/> */}
                  
                  {/* <LoginLoader/> */}
                </div>
              ) : (
                <div className='d-flex align-items-center overflow-auto Sflex'>
                  {upcomingCounsellingData.map((item, index) => (
                    <div
                    className="visible-scrollbar coun-wid"
                    // style={{
                    //   minWidth: '345px',
                    //   padding: ".5rem",
                    //   cursor: "pointer",
                    // }}
                    >
                      <div className='col-12 col-sm-12 col-lg-12 bg-light mt-4 text-center counselling-list'>
                        <div className='inner d-flex justify-content-sm-center'>
                          <b
                            className='text-center mx-3'
                            style={{ color: 'var(--blue)' }}
                          >
                            {item.select_date}
                          </b>
                          <b
                            className='text-center mx-3 '
                            style={{ color: 'var(--blue)' }}
                          >
                            {item.start_time} - {item.end_time}
                          </b>
                        </div>
                        <h6 className='text-center text-dark mt-2' style={{width:"299px",height:"19px",overflow:"hidden",whiteSpace :"nowrap",textOverflow: "ellipsis" }}>Subject : {item.subject_name}</h6>
                        <h6 className='text-center text-dark mt-2'  style={{width:"299px",height:"19px",overflow:"hidden",whiteSpace :"nowrap",textOverflow: "ellipsis" }}>Chapter : {item.chapter_name}</h6>
                        <button
                          type='button'
                          className='btn btn-meetings btn-md mb-1 mt-1'
                          style={{ color: "white", textAlign: "left", cursor: "pointer" }} onClick={() => openInNewTab(item.url)}>Join Meetings
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className='col-example text-left' style={{display:"none"}}>
                <div className='right'>
                  {/* <i className='bx bx-chevron-right'></i> */}
                </div>
              </div>
              <div className='d-flex align-items-center col-example text-left hist-main' style={{ backgroundColor: "#075E9F" }}>
                <div
                  className='col-sm-6 d-sm-block w-100 '
                  // style={{ marginTop: '4rem', fontSize: '24px' }}
                >
                  <p className='bannerHistory text-light fw-bold '>
                    {['right'].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>
                          {
                            <p
                              className='text-light pt-1 hist-btn'
                              style={{ textTransform: 'capitalize', fontSize: '18px', }}
                            >
                              History
                            </p>
                          }
                        </Button>
                        <Drawer
                          anchor={anchor}
                          open={notifyDrawer[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                        >
                          {list(anchor)}
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className='container col-sm-8' >
            <div className='form '>
              <div className=''>
                <Link to='/counsellingschedule'>
                  <img
                    src={CounsellingImg}
                    alt=''
                    className='appointment'
                    // style={{    width: "615px",
                    //   display: "block",
                    //   margin: "auto",
                    //   marginTop: "4rem", }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Counselling;
