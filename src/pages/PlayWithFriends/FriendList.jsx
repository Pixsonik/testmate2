import React, { useState, useEffect } from 'react';
import '../../assets/css/pages.css';
import '../../assets/css/style.css';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Bg2 from '../../assets/img/Background/bg-desktop2.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addFriendListApi,
  friendListApi,
  friendSearchApi,
  playTestCreateApi,
  urlToken,
} from '../../api/api';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../assets/css/Responsive.css"
import CircularProgress from '@mui/material/CircularProgress';

// const boardId = localStorage.getItem('BoardId');
// const classId = localStorage.getItem('ClassId');
// const langId = localStorage.getItem('LanguageId');

const FriendList = () => {
  const [friendId, setFriendId] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState([]);
  const [friendRenderData, setFriendRenderData] = useState('');
  const [friendUpdatedList, setFriendUpdatedList] = useState([]);
  const [friendListData, setFriendListData] = useState([]);
  const [searchBar, setSearchBar] = useState(false);
  const [addFriendData, setAddFriendData] = useState([]);
  const [friendAdded, setFriendAdded] = useState(false);
  const [searchListData, setSearchListData] = useState([]);
  const [showUserNotFound, setShowUserNotFound] = useState(false);
  const [searchNumber, setSearchNumber] = useState('');
  const [NoFriendData, setNoFriendData] = useState(false);
  const [noFriendAdded, setNoFriendAdded] = useState(false);
  const [sessionKey, setSessionKey] = useState('');
  const [load, setLoad]=useState(false)
  const [fAdded,setFadded]=useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const classID = localStorage.getItem("ClassId");
  const userId = localStorage.getItem('UserId');

  // const required = friendListData != ""

  useEffect(() => {
    console.log(classID)
    friendList();
  }, []);

  const friendList = () => {
    setLoad(true)
    const url = friendListApi();
    const body = {
      token: urlToken,
      user_id: userId,
    };
    // console.log('friend-----', body);
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        setLoad(false)
        if (resp.data.status == 'true') {
          setFriendListData(resp.data.data);
          setFriendRenderData(resp.data.data);
          // console.log("FriendList data   --->  ", friendListData);
        } else{
          // setFriendListData(resp.data);
          // setFriendRenderData(resp.data);
          // console.log('err while loading  ', resp.data);
        }
      })
      .catch((err) => {
        // console.log('err while loading --> ', err);
      });
  };

 


  const friendSearch = () => {
    setLoad(true)
    setSearchBar(true);
    const url = friendSearchApi();
    const body = {
      token: urlToken,
      mobile_no: searchNumber,
      class_id:classID
    };
    console.log('--body--',body);
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        setLoad(false)
        if (resp.data.status == 'true') {
          setSearchListData(resp.data.data);
          // console.log('friend list Search : ', resp.data.data);
          
          setShowUserNotFound(false);
        } else {
          // console.log('friend list Data no found : ', resp.data);
          setShowUserNotFound(true);
        }
      })
      .catch((error) => {
        // console.log('error in fetching friend list: ', error);
      });
  };

  const addFriend = (id) => {
    setSearchBar(false)
    var fid = [id]
    const url = addFriendListApi();
    const body = {
      token: urlToken,
      user_id: userId,
      mode: 'add',
      friend_id: fid,
      friend_count: fid.length
    };

    // console.log('--------', body);
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if(resp.data.status == "true" ){
          friendList()
        }else{
          setFadded(false)
        }
        // setNoFriendData(true);
        console.log('Add friend --->  ', resp.data);
      })
      .catch((err) => {
        // console.log('Add friend --> ', err);
      });
  };


  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: '100vh',
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='content-wrapper' style={myStyle}>
        <section className='content p-0 container-fluid '>
          <h3 className='leaderHeading text-center mt-3 pt-5' style={{color:"var(--blue)"}}>Your Friend</h3>
          <div className='container-fluid search text-center'>
            <div className='col-12 col-sm-12 col-md-9 col-lg-6 m-auto mt-5 ml-5'></div>
            <div className='d-flex justify-content-center'>
              <div className='p-2 w-50'>
                <div className='form-outline flex-fill mb-1'>
                  <input
                    required={true}
                    type='text'
                    name='contact'
                    id='contact'
                    maxLength={10}
                    className=' search-form'
                    placeholder='Search Friends'
                    onChange={(e) => setSearchNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className='p-2 flex-shrink-1'>
                <button
                  className='pr-3'
                  type='submit'
                  style={{ border: 'none', backgroundColor: 'transparent' }}
                  onClick={() => friendSearch()}
                >
                  <i className='bx bx-search bg-light pt-1'></i>
                </button>
              </div>
            </div>
          </div>
          <div className='container-fluid col-12 col-sm-6 col-md-9 col-lg-8'>
            {searchBar ? (
              <>
                {showUserNotFound ? (
                  <div className='text-center'>
                    <p style={{ color: 'var(--blue)', fontSize: '18px' }}>
                      User Not Found
                    </p>
                  </div>
                ) : (
                  <table
                    className='table table-borderless mb-5 mt-5 p-3'
                    style={{ cursor: 'pointer' }}
                  >
                    <tbody style={{textAlign : "center"}}>
                      {
                       load ? <CircularProgress color="secondary" style={{width : "55px" ,height :"55px"}} /> : 
                      searchListData.map((data, index) => (
                        <tr>
                          <td>
                            <div className='d-flex align-items-center'>
                              <img
                                src={data.profile}
                                key={index + data.id}
                                alt='friend-profile'
                                style={{ width: 45, height: 45 }}
                                className='rounded-circle'
                              />
                            </div>
                          </td>
                          <td style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "18px 0 0 0"
                          }}>
                            <div className='d-flex justify-content-end align-items-center'>
                              <p className='fw-bold mb-1 mx-5'>{data.name}</p>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex justify-content-end align-items-center'>
                              <p
                                className='fw-bold mb-1 '
                                style={{ fontSize: '1.5rem' }}
                              >
                                {friendAdded ? (
                                  <i className='bx bx-user-check text-success'></i>
                                ) : (
                                  <i
                                    className='bx bx-user-plus'
                                    style={{ color: 'var(--blue)' }}
                                    onClick={() => addFriend( parseInt(data.user_id))}
                                  ></i>
                                )}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            ) : (
              // null
              <>
                {NoFriendData ? (
                  <div className='text-center'>
                    <p style={{ color: 'var(--blue)', fontSize: '18px' }}>
                      No Data Found
                    </p>
                  </div>
                ) : (
                  <table
                    className='table table-borderless mb-5 mt-5 p-4'
                    style={{
                      cursor: 'pointer',
                      borderRadius: '2rem!important',
                    }}
                  >
                    <tbody style={{textAlign : "center"}}>
                      {
                      load ?  <CircularProgress color="secondary" style={{width : "55px" ,height :"55px"}} /> :
                      friendListData.map((data, index) => (
                        <tr>
                          <td style={{}}>
                            <div className='d-flex align-items-center rounded-pill'>
                              {data.profile === "" ? (
                                <i
                                  className='bx bx-user-circle'
                                  style={{
                                    color: 'var(--blue)',
                                    fontSize: '2.5rem',
                                  }}
                                ></i>
                              ) : (
                                <img
                                  src={data.profile}
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
                          </td>
                          <td>
                            <div className='d-flex justify-content-center align-items-center'>
                              <p className='fw-bold mb-1'>{data.name}</p>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex justify-content-end align-items-center'>
                              <p
                                className='fw-bold mb-1'
                                style={{ fontSize: '1rem' }}
                              >
                                {friendAdded ? (
                                  <i
                                    className='bx bx-user-check'
                                    style={{ color: '#198754' }}
                                  ></i>
                                ) : (
                                  <h6
                                    style={{
                                      color: 'var(--blue)',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    Added
                                  </h6>
                                )}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
          {/* <div className="conatiner-fluid col-12">
            <div className="col-3 col-sm-12 col-md-12 col-lg-10 mt-4 m-auto">
              <div className="d-flex justify-content-around">
              <Link to={"/playfriendscreen"}>
                <button
                  type="button"
                  className="btn btn-primary btn-xl px-5 mx-5"
                  style={{
                    fontSize: '1rem',
                    color: 'var(--white)',
                    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                  }} 
                >
                 Back
                </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 mx-5"
                  style={{
                    fontSize: '1rem',
                    color: 'var(--white)',
                    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                    backgroundColor:
                    friendAdded
                          ? "grey" : "var(--blue)"
                  }}
                  // disabled={
                  //   friendListData === 0 
                  //     ? false
                  //     : true
                  // }
                  onClick={() => selectedFriendsId()}
                >
                  Create Test
                </button>
              </div>
            </div>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default FriendList;
