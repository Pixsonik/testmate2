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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../loader/LoadingSpinner';

// const boardId = localStorage.getItem('BoardId');
// const classId = localStorage.getItem('ClassId');
// const langId = localStorage.getItem('LanguageId');
const classID = localStorage.getItem("classid");

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Test status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p>
          Test created Succesful
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/playwfriend">
          <Button>OK</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

const FriendContact = () => {
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
  const [modalShow, setModalShow] = React.useState(false);
  const [loader, setLoader] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();


  // const required = friendListData != ""

  useEffect(() => {
    friendList();
    // console.log('Friend Student Name ', location.state.test_Name);
    // console.log('Friend Student Id ', location.state.student_id);
    // console.log('Friend Chapter Id ', location.state.chapter_id);
    // console.log('Friend Selected Time ', location.state.selectedTime);
    // console.log('Friend Selected Date ', location.state.selectedDate);
    // console.log('Friend Chapter Length ', location.state.chapter_count);

    // console.log("friends id @@@",friendId);
  }, [friendId]);
  const userId = localStorage.getItem('UserId');


  const friendList = () => {
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
        if (resp.data.status == 'true') {
          setFriendListData(resp.data.data);
          // console.log(friendListData)
          setFriendRenderData(resp.data.data);
          // console.log("FriendList data   --->  ", friendListData);
        } else {

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
    // console.log('friend search api');
    setSearchBar(true);
    const url = friendSearchApi();
    const body = {
      token: urlToken,
      mobile_no: searchNumber,
      class_id:classID
    };
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if (resp.data.status == 'true') {
          setSearchListData(resp.data.data);
          // console.log('friend list Search : ', resp.data.data);
        } else {
          // console.log('friend list Data no found : ', resp.data.data);
          setShowUserNotFound(true);
        }
      })
      .catch((error) => {
        // console.log('error in fetching friend list: ', error);
      });
  };

  const addFriend = (id) => {
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
        setAddFriendData(resp.data);
        setFriendRenderData(resp.data);
        setNoFriendData(true);
        // console.log('Add friend --->  ', resp.data);
      })
      .catch((err) => {
        // console.log('Add friend --> ', err);
      });
  };

  const handleFriend = (id) => {
    // console.log(id);
    let renderData = [...friendRenderData];
    setSelectedFriendId([...selectedFriendId, id]);

    // console.log('first-------', friendRenderData);
    for (let data of renderData) {
      if (data.friend_id == id) {
        data.selected = data.selected == null ? true : !data.selected;
        break;
      }
    }
    setFriendRenderData(renderData);
    // console.log('selected friends array ', friendRenderData);
  };

  const selectedFriendsId = () => {
    var data = [];
    for (let index = 0; index < friendRenderData.length; index++) {
      friendRenderData[index].selected &&
        data.push(parseInt(friendRenderData[index].friend_id));
    }
    setTimeout(() => {
      setFriendId(data);
    }, 50);
    setTimeout(() => {

      // console.log('list ', friendId, friendId.length);
    }, 1000);
    setTimeout(() => {
      if (data == '') {
        alert('Please select atleast 1 friend.');
        // testCreate(data, data.length);
      } else {

        testCreate(data, data.length);
      }
    }, 200);
  };

  const testCreate = (id, friend_length) => {
    setLoader(true)

    const url = playTestCreateApi();
    const body = {
      token: urlToken,
      test_name: location.state.test_Name,
      user_id: userId,
      subject_id: location.state.student_id,
      chapter_id: location.state.chapter_id,
      time: location.state.selectedTime,
      date: location.state.selectedDate,
      chapter_count: location.state.chapter_count,
      friend_id: id,
      friend_count: friend_length,
    };
    // console.log('test create data ------', body);
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
    setLoader(false)

        // debugger;
        // console.log('create test res is : ', resp.data);
        if (resp.data.status == 'true') {
          // console.log("Test Created --->  ", resp.data.data);
          setModalShow(true);
          // return navigate('/playwfriend');
        }
      })
      .catch((err) => {
        setFriendAdded(true);
        // console.log('Test Created Error --> ', err);
      });
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
        <section className='content p-0 container-fluid '>
          <MyVerticallyCenteredModal
            show={modalShow}
          />
          <h3 className='leaderHeading text-center mt-3 pt-5' style={{ color: "var(--blue)" }}>Your Friend</h3>
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
                    className='form-control search-form'
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
                    <tbody>
                      {searchListData.map((data, index) => (
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
                          <td>
                            <div className='d-flex justify-content-end align-items-center '>
                              <p className='fw-bold mb-1 mx-5'>{data.name}</p>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex justify-content-end align-items-center'>
                              <p
                                className='fw-bold mb-1 mx-5 '
                                style={{ fontSize: '1.5rem' }}
                              >
                                {friendAdded ? (
                                  <i className='bx bx-user-check text-success'></i>
                                ) : (
                                  <i
                                    className='bx bx-user-plus'
                                    style={{ color: 'var(--blue)' }}
                                    onClick={() => addFriend(parseInt(data.user_id))}
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
                    <tbody>
                      {friendListData.map((data, index) => (
                        <tr
                          style={{
                            border: data.selected ? '3px solid var(--blue) ' : null,
                          }}
                          onClick={() => handleFriend(data.friend_id)}
                        >
                          <td style={{}}>
                            <div className='d-flex align-items-center rounded-pill'>
                              {data.profile == '' ? (
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
                            <div className='d-flex justify-content-center align-items-center'>
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
          <div className="conatiner-fluid col-12">
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
                <div>
                {
                  loader ? <LoadingSpinner style={{display : 'block' ,margin:"auto"}} /> :
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
                }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FriendContact;
