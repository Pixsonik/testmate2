import React, { useEffect, useState } from 'react'
import "../../assets/css/scheduleAllTest.css"
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";
import { Row } from "react-bootstrap";
import { deleteContest, getContestQuestion, submitContestQuestion, submitContestTest } from '../../api/api';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";

export default function ScheduleTests() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testQuestion,setTestQuestion] = useState()
  const [loadQuestion, setLoadQuestion] = useState(false)
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [cola, setCola] = useState([])
  const [colb, setColb] = useState([])
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [orderedOptionIds, setOrderedOptionIds] = useState();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    
    console.log(orderedOptionIds);
  }, [colb]);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index,id) => {
    console.log('hello');
    // if (draggedIndex !== null) {
      const updatedColbItems = [...colb];
      const temp = updatedColbItems[draggedIndex];
      updatedColbItems[draggedIndex] = updatedColbItems[index];
      updatedColbItems[index] = temp;
      setColb(updatedColbItems);
      // setDraggedIndex(null);
      setOrderedOptionIds(updatedColbItems.map(item => item.option_id));
      submitAnswer2(id,updatedColbItems.map(item => item.option_id))
    // }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate()
  // const minuteTime = localStorage.getItem('examTime')
  // const [timerValue, setTimerValue] = useState(minuteTime);
  // const [timeLeft, setTimeLeft] = useState(minuteTime * 60);
  
    const location = useLocation();
    const {contest_data } = location.state;


  useEffect(()=>{  
    console.log( contest_data);
    deleteAllContest()
    setShow(true);
    setTimeout(() => {
      chapterQuestionApi()
    }, 300);
  },[])

  const handleClose = () =>{
    setShow(false);
  }

  const handleClose2 = () =>{
    setShow2(false);
  }
  
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

const deleteAllContest = () =>{
  const url = deleteContest()
const body =   {
  token: '6808',
    contest_id: contest_data.contest_id,
    contest_key:contest_data.contest_key,
    user_id: localStorage.getItem("UserId")
    }
    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
}

  const chapterQuestionApi = ()=>{
    const url =  getContestQuestion();
    const body = {
      token: '6808',
      contest_id: contest_data.contest_id,
      user_id: localStorage.getItem("UserId"),
      contest_key: contest_data.contest_key,
      status:"incomplete"
    }
    console.log(body);
    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response)=>{
      console.log(response.data.data[currentQuestionIndex]

      );
      setTestQuestion(response.data.data)
      setCola(response.data.data[currentQuestionIndex].cola)
      setColb(response.data.data[currentQuestionIndex].colb)
      setTimeout(() => {
        setLoadQuestion(true)
        
      }, 1500);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const minuteTime = localStorage.getItem('examTime');
const storedTimeLeft = localStorage.getItem('timeLeft');

const [timeLeft, setTimeLeft] = useState(storedTimeLeft ? parseInt(storedTimeLeft, 10) : minuteTime * 60);

useEffect(() => {
  
  const intervalId = setInterval(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
      localStorage.setItem('timeLeft', timeLeft - 1);
    } else {
      clearInterval(intervalId);
      submitTest();
    }
  }, 1000);
  return () => clearInterval(intervalId);
}, [timeLeft]);

  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const intervalId = setInterval(() => {
  //       setTimeLeft(timeLeft - 1);
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [timeLeft]);

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex <= testQuestion.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log(testQuestion[currentQuestionIndex].id);
      setCola(testQuestion[currentQuestionIndex + 1].cola)
      setColb(testQuestion[currentQuestionIndex + 1].colb)
    }  };
    
  const handlePrevQuestion = () => { 
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCola(testQuestion[currentQuestionIndex - 1].cola)
      setColb(testQuestion[currentQuestionIndex - 1].colb)
  }

  const showSubmitModal = () =>{
    setShow2(true)
  }

 const submitTest = () => {
    const url =  submitContestTest();
    const body = {
      token: '6808',
      token_key: contest_data.contest_key,
      user_id: localStorage.getItem("UserId"),
      contest_id:contest_data.contest_id,
    }
    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
    
      console.log('submit test', response.data.status);
      if(response.data.status == 'true'){
        localStorage.removeItem('timeLeft')
        toast("your test has been saved successfully")
        setTimeout(() => {
          navigate('/schedulebanner')
        }, 1500);
      }else{
        alert(response.data.status)
      }
    }).catch((error) => {
      console.log("error in fetching question list: ",error);
    })
  }

  
 const  submitAnswer =  (id, answer) => {
  console.log(id);
  
  setSelectedOption((prevOptions) => ({...prevOptions, [id]: answer }));
  console.log(Object.keys(selectedOption).length);
    const url =  submitContestQuestion();
    const body = {
      token: '6808',
      question_id: id,
      user_id: localStorage.getItem("UserId"),
      contest_id: contest_data.contest_id,
      contest_key: contest_data.contest_key,
      answer: answer,
      answer_count: 1
    }

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
        console.log("Response after submit answer---------- ", response.data);

    }).catch((error) => {
      console.log("error in fetching question list: ",error);
    })
  }


 const  submitAnswer2 =  (id, answer) => {
  console.log('hello guyzz');
  console.log(answer);
  // setSelectedOption((prevOptions) => ({...prevOptions, [id]: answer }));
  // console.log(selectedOptionValue);
    const url =  submitContestQuestion();
    const body = {
      token: '6808',
      question_id: id,
      user_id: localStorage.getItem("UserId"),
      contest_id: contest_data.contest_id,
      contest_key: contest_data.contest_key,
      answer: answer.slice(0,4).toString(),
      answer_count: 1
    }

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
        console.log("Response after submit answer---------- ", response.data);

    }).catch((error) => {
      console.log("error in fetching question list: ",error);
    })
  }

  return (
    <>
    <Toaster/>
      <div className='newTests '>
        <div className="navbar-header testHeadderSection">
          <div className="d-flex flex-row m-auto">
            <div className="p-2">
              <img src={Logo} alt="Logo" className="brand-image img" />
            </div>
            <div className="p-2">
              <img
                src={Testmate}
                alt=""
                className="brand-text d-block"
                style={{
                  width: "150px",
                  height: "20px",
                  marginTop: "5px",
                }}
              />
            </div>
          </div>
        </div>
        <div className='testAllContent'>
        {loadQuestion ? (<>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 header mt-3 pt-3">

<div className="mb-3">

</div>
<div className="navTest">
  <div
    className="QN"
    style={{
      fontSize: "",
      color: "#000084",
    }}
  >
    <span className=""> Q.No: </span>{currentQuestionIndex+1}/{testQuestion.length}
  </div>
  {<div
    className="d-flex timerStart"
    style={{
      color: "#000084",
      fontSize: "1.5rem",
      padding: "0.4rem",
    }}
  >
    <i
      className="bx bxs-hourglass"
      style={{ fontSize: "1.7rem ", padding: "0.3rem" }}
    ></i>{" "}
    &nbsp;
    {formatTime(timeLeft)}
  </div>
  }

  <div className=" p-2 mt-1">

    <button
      type="button"
      className="btn btn-primaryTest"
      style={{
        backgroundColor: "blue",
        color: "white",
      }}
      onClick={()=>showSubmitModal()}
      disabled={currentQuestionIndex !== testQuestion.length - 1} 
    >
      Submit
    </button>
  </div>
</div>
</div>
<div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 mt-3 justify-content-center m-auto">
<div className="form">
  <div className="container-fluid  p-3 mb-5">
    {testQuestion[currentQuestionIndex].question_type == "1" || testQuestion[currentQuestionIndex].question_type == "2" ? (<>
      <div className="row">
      <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-lg-5">
         <h3
          className="form-label123 questionHrading"
          style={{ color: 'black' }} >
          {/* {testQuestion[currentQuestionIndex].question.replace(/<[^>]*>?/gm, '')} */}
          {ReactHtmlParser(testQuestion[currentQuestionIndex].question)}
        </h3>
        
      
      </div>
      <div className="col-12">
        <Row>
        {
                  testQuestion[currentQuestionIndex].option.map((item, index)=>{
                    return(<>

                <div  md={3} className=" col-lg-6 col-sm-12 mt-3 d-flex ">
                 
                  <button
                    style={{ color: 'white',backgroundColor:selectedOption && selectedOption[testQuestion[currentQuestionIndex].id] === item.option_id? 'green' : '#000084', }}
                    className="buttons col-12 col-sm-12 col-md-12 col-lg-12 p-2 optionsButton"
                    type="text"
                    
                    onClick={()=>{submitAnswer(testQuestion[currentQuestionIndex].id,item.option_id );console.log('hello'); }}
                  >
                    {ReactHtmlParser(item.value)}
                  </button>
                </div>
                </>
              )
            })
          }

        </Row>
      </div>
    </div>
    </>):(<>   {
      testQuestion[currentQuestionIndex].question_type == "3" ? 
      (<>
      <div className="row">
      <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-3">
        <h3 style={{ color: "black" }} className='questionHrading'>
          {testQuestion[currentQuestionIndex].question.replace(/<[^>]*>?/gm, '')}
        </h3>
      </div>
      <div className='col-6'>
        {cola.map((item, index) => (
          <div className='col-12' key={index}>
            <button className='matchTheColumn'>
              {item.replace(/<[^>]*>?/gm, '')}
            </button>
          </div>
        ))}
      </div>
      <div className='col-6'>
        {colb.map((item, index) => (
          <div
            className='col-12'
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDrop={() => handleDrop(index,testQuestion[currentQuestionIndex].id)}
            onDragOver={handleDragOver}
          >
            <button className='matchTheColumn'>
              {item.value.replace(/<[^>]*>?/gm, '')}
            </button>
          </div>
        ))}
      </div>
    </div>
      </>)
      :
      (<>
      <div className="row">
      <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-lg-5">
         <h3
          className="form-label123 questionHrading"
          style={{ color: 'black',  }}>
          {/* {testQuestion[currentQuestionIndex].question.replace(/<[^>]*>?/gm, '') }  */}
          {ReactHtmlParser(testQuestion[currentQuestionIndex].question)}
          {/* <span><input type="text" className="form-control-input borderOffillBlank" value={selectedOptionValue?.[testQuestion[currentQuestionIndex].id]} /></span>   */}
         <span  style={{borderBottom:"1px solid blue", marginLeft:'20px'}}>{selectedOptionValue?.[testQuestion[currentQuestionIndex].id]}</span>
         {/* <p style={{ borderColor:'rgb(25, 121, 193)', borderStyle:'none', backgroundColor:'transparent', textAlign:'center', width:'30%'}} className="form-control-input borderOffillBlank">{selectedOptionValue?.[testQuestion[currentQuestionIndex].id]}</p> */}
         
        </h3>
        
      
      </div>
      <div className="col-12">
        <Row>
        {
                  testQuestion[currentQuestionIndex].option.map((item, index)=>{
                    return(<>

                <div  md={3} className=" col-lg-6 col-sm-12 mt-3 d-flex ">
                 
                  <button
                    style={{ color: 'white',backgroundColor:selectedOption && selectedOption[testQuestion[currentQuestionIndex].id] === item.option_id? 'green' : '#000084', }}
                    className="buttons col-12 col-sm-12 col-md-12 col-lg-12 p-2 optionsButton"
                    type="text"
                    
                    onClick={()=>{ setSelectedOptionValue({
                        ...selectedOptionValue,
                        [testQuestion[currentQuestionIndex].id]: item.value.replace(/<[^>]*>?/gm, ''),
                      });submitAnswer(testQuestion[currentQuestionIndex].id,item.option_id );
                      // setSelectedOptionValue((values)=>{...values, item.value.replace(/<[^>]*>?/gm, '')} );
                     
                    }}                      
                  >
                    {ReactHtmlParser(item.value)}
                  </button>
                    
                  

                </div>
                </>
              )
            })
          }

        </Row>
      </div>
    </div>
    </>)
    }
     </>)}

  </div>
</div>
</div>

<div className="row optionsMcqs">
<div className="counselling-Form col-6 col-sm-9 col-md-6 col-lg-2 mb-2 mt-5 m-auto">
  <button
    type="button"
    className="btn btn btn-md"
    style={{
      width: "100%",
      borderRadius: "3rem",
      boxShadow:
        "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
      backgroundColor:currentQuestionIndex === 0 ? 'gray' : '#000084',
      color:
        'white',
      opacity:
        0.6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={()=>handlePrevQuestion()}
    disabled={currentQuestionIndex == 0} 
  >
    <i className="bx bx-chevrons-left"
      style={{
        paddingRight: "0px",
        fontSize: "17px"
      }}
    ></i>Prev
  </button>
</div>
<div className="counselling-Form col-6 col-sm-9 col-md-6 col-lg-2 mb-2 mt-5 m-auto">
  <button
  onClick={()=>handleNextQuestion()}
    type="button"
    className="btn btn btn-md"
    style={{
      width: "100%",
      borderRadius: "3rem",
      boxShadow:
        "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
      backgroundColor: currentQuestionIndex == testQuestion.length - 1 ? 'gray' : '#000084',
      color:
        'white',
      opacity:
      0.6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    disabled={currentQuestionIndex == testQuestion.length - 1} 
  >
    Next<i className="bx bx-chevrons-right "></i>
  </button>
</div>
</div></>):(<><p>loading...</p></>)         
}
        </div>
      </div>

      <Modal
            show={show}
            // onHide={handleClose}
            backdrop="static"
            keyboard={false}
            // {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* <Modal.Header closeButton></Modal.Header> */}
            <Modal.Body>
              <div className="text-black ">
                <div className="d-flex justify-content-center align-items-center h-custom-2 px-lg-5 ms-xl-4 mt-0 pt-1 pt-xl-0 mr-5 mt-xl-n5 m-auto">
                  <form>
                    <div className="inner mt-2 mb-3">
                      
                      <h5 className="text-center">
                       Disclaimer
                      </h5>
                      <div className="col-12 col-sm-12 col-md-9 col-lg-12 m-auto">
                        <div className="form-outline">
                          <p className='text-center'>Do not refresh or go back, as this may cause loss of your saved data.</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer onClick={handleClose}>
                <div className="col-12 col-sm-6 col-md-4 col-lg-4  m-auto">
              <button
                type="button"
                className="btn btn btn-block"
                style={{
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                  borderRadius: "2rem",
                }}
              >
                
                Ok
              </button>
                </div>
            </Modal.Footer>
          </Modal>


      <Modal
            show={show2}
            // onHide={handleClose}
            backdrop="static"
            keyboard={false}
            // {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* <Modal.Header closeButton></Modal.Header> */}
            <Modal.Body>
              <div className="text-black ">
                <div className="d-flex justify-content-center align-items-center h-custom-2 px-lg-5 ms-xl-4 mt-0 pt-1 pt-xl-0 mr-5 mt-xl-n5 m-auto">
                  <form>
                    <div className="inner mt-2 mb-3">
                      
                      <h5 className="text-center">
                       Submit Test
                      </h5>
                      <div className="col-12 col-sm-12 col-md-9 col-lg-12 m-auto">
                        <div className="form-outline">
                          <p className='text-center' style={{margin:'0'}}>Are you sure you want to submit test.</p>
                          {
                            show2 && 
                          <p className='text-center' style={{margin:'0'}}>Questions Attempted : {Object.keys(selectedOption).length} / {testQuestion?.length}</p>
                          }
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer >
                <div className=" col-sm-6 col-md-4 col-lg-6  m-auto testSubmitDiv ">
              <button
                type="button"
                className="btn btn "
                style={{
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                  borderRadius: "2rem",
                }}
                onClick={()=>{submitTest()}}
              >
                
                Submit
              </button>
              <button
                type="button"
                className="btn btn "
                style={{
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                  borderRadius: "2rem",
                }}
                onClick={handleClose2}
              >
                Cancel
              </button>
                </div>
            </Modal.Footer>
          </Modal>
    </>
  )
}
