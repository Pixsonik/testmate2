import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Bg2 from '../assets/img/Background/bg-desktop2.png';
import { ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addChapterApi,
  createSemesterListApi,
  getChapterLevelApi,
  getChaptersListApi,
  getSemesterChapterListApi,
  getSemesterListApi,
  urlToken,
} from '../api/api';
import axios from 'axios';
import semIcon from '../assets/img/semIcon/semester2.png';
const userId = localStorage.getItem('UserId');
const boardId = localStorage.getItem('BoardId');
const classId = localStorage.getItem('ClassId');
const langId = localStorage.getItem('LanguageId');

const Subject = (props) => {
  const location = useLocation();

  const [semesterLists, setSemesterLists] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [chaptersNotAdded, setChaptersNotAdded] = useState(false);
  const [selectedSem, setSelectedSem] = useState('');
  const [chapterLevel, setChapterLevel] = useState([]);
  const [chapterIndex, setChapterpIndex] = useState('');
  const [semChapterList, setSemChapterList] = useState([]);
  const [semesterId, setSemesterId] = useState('');
  const [subjectName, setSubjectName] = useState('');

  const [selectedChaptertId, setSelectedChaptertId] = useState('');
  const [addChapterRenderData, setAddChapterRenderData] = useState('')

  // const [subjectId, setSubjectId] = useState("");
  // const [subjectBackground, setSubjectBackground] = useState("");
  // const [subjectButtonColor, setSubjectButtonColor] = useState("");
  // const [subjectIcon, setSubjectIcon] = useState("");
  // const [subjectTextColor, setSubjectTextColor] = useState("");

  const [chapterNo, setChapterNo] = useState('');
  // const [chapterId, setChapterId] = useState("");
  // const [chapterName, setChapterName] = useState("");
  // const [testLevel, setTestLevel] = useState("");
  const [addChaptersData, setaddChaptersData] = useState([]);
  // const [semesterNotAdded, setSemesterNotAdded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getSemList();
  }, []);

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: '100%',
    paddingBottom: '2rem',
  };

  const progress = 40;

  // console.log(' ======---> ', location.state.subData);

  const createSemList = () => {
    const url = createSemesterListApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
    };
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        // console.log('add Semester response is : ', resp.data);
        getSemList();
      })
      .catch((err) => {
        // console.log('Error in user Adding semester List --> ', err);
      });
  };

  const getSemList = () => {
    const url = getSemesterListApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
    };

    // console.log('Semester list--- ', body);

    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if (resp.data.status === 'false') {
          // console.log('Please add sem');
        } else {
          setSemesterLists(resp.data.data);
          // console.log(resp.data.data);
        }
      })
      .catch((error) => {
        // console.log('Error -----> ', error);
      });
  };

  const handleSemester = (semId, index) => {
    setSemesterId(semId);
    getSemChapterList(semId, index);
    // console.log('Sem id :>> ', semId);
  };

  
  const subjectChapters = () => {
    const url = getChaptersListApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
    };
    axios
    .post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((resp) => {
      // console.log('Semester Chapter List--------->', resp.data.data);
      setSemChapterList(resp.data.data);
      // console.log('state Chapter List--------->', semChapterList);
      // isChapterAssigned(resp.data.status);
    })
    .catch((err) => {
      // console.log("error in user chapterlist --> ", err);
    });
  };
  

  const handleAddChapter =(id) => {
    // console.log(id);
    let renderData = [...addChapterRenderData];
    setSelectedChaptertId([...selectedChaptertId, id]);

    for(let data of renderData){
      if(data.chapter_id == id){
        data.selected = (data.selected==null)? true: !data.selected;
        break;
      }
    }
    setAddChapterRenderData(renderData);
    setTimeout(() => {
        // console.log("selected chapter arr ",selectedChaptertId);
    }, 100);
}

const addChapterButton = () => {

    var data = [];
      for (let index = 0; index < addChapterRenderData.length; index++) {
          addChapterRenderData[index].selected &&
          data.push(addChapterRenderData[index].chapter_id);
        }
        // console.log("list ",data);

        addChapters(data);

  }

  const addChapters = (chpId) => {
    const url = addChapterApi();
    const body = {
      token: urlToken,
      board_id: boardId,
      lang_id: langId,
      semester_id: semesterId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      chapter_id: chpId,
      mode: 'add',
    };
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        // console.log('add chapter response is : ', resp.data);

        if (resp.data.status === 'true') {
          toast('Chapters Successfully Added', {
            position: toast.POSITION.BOTTOM_CENTER,
          });

          navigate.goBack();
        } else {
          toast(resp.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          // console.log('response after status false', resp.data);
        }
      })
      .catch((error) => {
        // console.log('error while adding chapter: ', error);
        this.setState({ loaderVisible: false });
      });
  };
  const getSemChapterList = (semId, index) => {
    setSelectedSem(index);
    const url = getSemesterChapterListApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      board_id: boardId,
      lang_id: langId,
      standard_id: classId,
      subject_id: location.state.subData.subject_id,
      semester_id: semId,
    };
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if (resp.data.status === 'false') {
          setChaptersNotAdded(true);
        } else {
          // console.log('chapter list --->   ', resp.data.data);
          setChapterData(resp.data.data);
        }
        getSemList();
      })
      .catch((err) => {
        // console.log('error in user semister list --> ', err);
      });
  };

  const handleChapterEvent = (id, index, chapterNo) => {
    setChapterpIndex(index + 1);
    setChapterNo(chapterNo);

    // console.log('chp id --> ', id, index + 1, chapterNo);
    getChapterLevel(id);
  };

  const getChapterLevel = (chpId) => {
    const url = getChapterLevelApi();
    const body = {
      token: urlToken,
      user_id: user_Id,
      chapter_id: chpId,
    };
    // console.log('sem list body ===> ', body);
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        setChapterLevel(resp.data.data);
        // console.log('chapter level Data --->  ', resp.data.data);
      })
      .catch((err) => {
        // console.log('Chapter Level error --> ', err);
      });
  };

  const handleChapterTestDescription = (id, level) => {
    // console.log('subjectName---', subjectName);
    var levelInfo = 0;
    if (level == 'Easy') {
      levelInfo = 1;
    } else if (level == 'Medium') {
      levelInfo = 2;
    } else {
      levelInfo = 3;
    }
    // console.log('--', levelInfo);
    return navigate('/chapterdescription', {
      state: {
        chapter_id: id,
        levelName: level,
        testlevel: levelInfo,
        allInfo: location.state.subData,
      },
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='content-wrapper' style={myStyle}>
        <div className='content pt-5 overflow-hidden'>
          <div className='container col-12 col-lg-12 col-sm-12 col-md-12 '>
            <div
              className='card text-center col-12 m-auto'
              style={{
                borderRadius: '16px',
                boxShadow:
                  '0px 4.51015px 9.02029px 2.25507px rgba(199, 199, 199, 0.25) ',
              }}
            >
              <div className='d-flex justify-content-around text-center mt-3'>
                <div className='flex-shrink-1 col-sm-12 col-lg-2'>
                  <img
                    src={location.state.subData.subject_icon}
                    alt=''
                    className=' subject_Logo '
                  />
                </div>
                <div className='col-sm-10'>
                  <h3 className='sub-title mx-2' style={{ textAlign: 'left' }}>
                    {location.state.subData.subject_name}
                  </h3>
                  <p className='mx-2' style={{ textAlign: 'left' }}>
                    Chapters 14
                  </p>
                  <div className='col-sm-6 progress_chapter '>
                    <div className='slider mb-2' style={{ textAlign: 'left' }}>
                      <ProgressBar now={progress} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className='col-12 col-12 col-sm-12 col-md-12 col-lg-12 text-center'
              style={{ paddingTop: '2rem' }}
            >
              <div
                className='d-flex justify-content-around'
                style={{ marginTop: '1rem' }}
              >
                <button
                  type='button'
                  className='btn btn-primary btn-xl px-5 mx-5'
                  onClick={() => createSemList()}
                >
                  Add Semester
                </button>
                <button
                  type='button'
                  className='btn btn-primary btn-xl px-5 mx-5'
                  // onClick={() => handleFriendList()}
                >
                  Edit Semester
                </button>
              </div>

              {semesterLists.status === 'false' ? (
                <div className='text-center'>
                  <p style={{ color: 'var(--blue)', fontSize: '18px' }}>
                    Please Add Semester
                  </p>
                </div>
              ) : (
                <div className='sem-Icon col-9 col-sm-6 col-md-12 col-lg-12 m-auto'>
                  <div className='d-flex flex-row mt-5'>
                    <div className='row '>
                      {semesterLists.map((item, index) => (
                        <>
                          <div
                            onClick={() =>
                              handleSemester(item.semester_id, index)
                            }
                            className='subject col-6 col-md-2 col-sm-3 col-lg-1 mb-5 m-auto'
                          >
                            <img
                              src={semIcon}
                              alt='sem-img'
                              className='semImg semAdd mt-3'
                              key={index}
                              style={{
                                width: '100%',
                                height: 'auto ',
                                border:
                                  getSemChapterList === index
                                    ? '3px solid var(--blue)'
                                    : null,
                              }}
                            />
                            <br />
                            <h6 className=' text-center mt-3 fw-bold'>
                              {item.semester_name}
                            </h6>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='container-fluid m-auto mt-5'>
              <div className=' col-12 col-lg-12 container-fluid pt-2 pb-2 '>
                <div className='container-fluid col-sm-12'>
                  {chaptersNotAdded ? (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 pb-4 mt-5 mb-5 m-auto">
                    <button
                      onClick={() => subjectChapters()}
                      type="submit"
                      className="btn btn btn-block"
                      style={{
                        backgroundColor: "var(--blue)",
                        color: "var(--white)",
                        borderRadius: "2rem",
                      }}
                    >
                      Add Chapters
                    </button>
                  </div>
                  ) : (
                    chapterData.map((data, index) => (
                      <>
                        <div
                          style={{ backgroundColor: '#fff', borderRadius: 10 }}
                          className='mb-4'
                        >
                          <div className='sub-header justify-content-between p-2 d-flex mb-3'>
                            <div
                              className='w-75 mt-2'
                              style={{ padding: 5 }}
                              onClick={() => handleChapterEvent(data.id, index)}
                            >
                              <h6 style={{}}>Chapter: {data.chapter_no}</h6>
                              <h5>{data.chapter_name}</h5>
                            </div>
                          </div>
                          {data.chapter_no == chapterIndex ? (
                            <div>
                              {chapterLevel.map((item, index) => (
                                <div
                                  className='d-flex justify-content-around'
                                  onClick={() =>
                                    handleChapterTestDescription(
                                      item.chapter_id,
                                      item.level
                                    )
                                  }
                                >
                                  <div className='p-2 col-example'>
                                    <img
                                      src={semIcon}
                                      alt='semIcon'
                                      key={index + item.id}
                                      style={{ width: '50px' }}
                                    />
                                  </div>
                                  <div className='p-2 col-example'>
                                    <h6>{item.level}</h6>
                                  </div>
                                  <div className='p-2 col-example'>
                                    <i className='bx bxs-lock-alt'></i>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </>
                    ))
                  )}

                  {semChapterList.map((data, index) => (
                    <div
                      style={{ backgroundColor: '#fff', borderRadius: 10 }}
                      className='mb-4'
                    >
                      <div className='sub-header justify-content-between p-2 d-flex mb-3'>
                        <div
                          className='w-75 mt-2'
                          style={{ padding: 5 }}
                          onClick={() => handleChapterEvent(data.id, index)}
                        >
                          <h6 style={{}}>Chapter: {data.chapter_no}</h6>
                          <h5>{data.chapter_name}</h5>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* <>
                    {addChaptersData == '' ? null : (
                      <div>
                        <div
                          style={{}}
                          className='d-flex justify-content-between'
                        >
                          <h4 className='mb-2'>Add Chapterdfgdgs</h4>
                          <button
                            style={{ width: '20%', border: 'none' }}
                            className='btn-primary '
                          >
                            Add
                          </button>
                          {addChaptersData.map((item, index) => (
                            <div
                              style={{
                                backgroundColor: '#fff',
                                borderRadius: 10,
                              }}
                              className='mb-4'
                            >
                              <div className='sub-header justify-content-between  p-2 d-flex mb-3 '>
                                <div
                                  className='w-75 mt-2'
                                  style={{ padding: 3 }}
                                >
                                  <h6 style={{}}>Chapter: {item.chapter_no}</h6>
                                  <h5>{item.chapter_name}</h5>
                                </div>
                                <div>
                                  <h3
                                    onClick={() => console.log('hello')}
                                    className='bx bx-chevron-right mt-4'
                                  ></h3>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Subject;
