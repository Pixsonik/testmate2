import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  chapterTestQuestionApi,
  getContestQuestion,
  submitAnswerApi,
  submitContestQuestion,
  submitContestTest,
  submitTestApi,
  urlToken,
} from "../../api/api";
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";
import LoadingSpinner from "../../loader/LoadingSpinner";
import CombineWords from "../testpage/CombineWords";
import FillinBlank from "../testpage/FillinBlank";
import MatchFollowing from "../testpage/CombineWords";
import MCQ from "../testpage/MCQ";
import TrueFalse from "../testpage/TrueFalse";
import { useSelector, useDispatch, connect } from "react-redux";
// import Timer from "./Timer";
import "../../assets/css/pages.css"
import {
  DECREMENT_QUESTION,
  INCRMENT_QUESTION,
  SET_QUESTION,
  UPDATE_ANSWER,
  SET_COUNTER_ZERO,
  UPDATE_QUESTION,
} from "../../Redux/Action/IncreDecreSlice";
import { display, margin } from "@mui/system";
import { count_attempts, decr_counter, incr_counter, set_counter_zero, set_question_data } from "../../Redux_two/Actions/ActionCreator";
import { Alert } from "react-bootstrap";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from "react-hot-toast";


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
           status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p>
          Test submitted succesfully
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/schedulebanner">
          <Button>OK</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}


const Small = Component => props => {
  return <Component {...props} data={GetInfo()} />;
};

const GetInfo = () => {
  const location = useLocation();
  return location;
}


const mapStateToProps = (state) => {
  return {
    IncrementDecrement: state.IncrementDecrement,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    incr_counter: (count) => { dispatch(incr_counter(count)) },
    decr_counter: (count) => { dispatch(decr_counter(count)) },
    set_counter_zero: (count) => { dispatch(set_counter_zero(count)) },
    set_question_data: (qdata) => { dispatch(set_question_data(qdata)) },
    count_attempts: (data) => { dispatch(count_attempts(data)) },
  }

};

const user_Id = localStorage.getItem("UserId");


class TestScheduleScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      subject_id: '',
      questionsData: '',
      questionDataResponse: '',
      subject_background: '',
      text_color: '',
      button_color: '',
      option_color: '',
      selected_option_color: '',
      selectedOption: '',
      selectedOptionIndex: '',
      selectedOptionId: '',
      questionTypeArray: [],
      numberOfQuestions: 0,
      currentQuestionNo: 0,
      sessionKey: '',
      chapterId: '',
      testLevel: '',
      testTime: '',
      semester_id: '',
      level: '',

      isQuestionLoading: false,
      testStatus: '',

      loaderVisible: false,
      contestId: '',

      minutes: localStorage.getItem('examTime'),
      time: {},
      seconds: null,
      modalShow: false,
      apiCalled: false, 
    }


  }

  componentDidMount() {
    const info = this.props.data.state
    
    setTimeout(()=>{
      console.log("--->  class based ", );
    },10)



    this.setState({
      subject_background: info.contest_data.bakground_image,
      text_color: info.contest_data.text_color,
      contestId: info.contest_data.contest_id,
      option_color: info.contest_data.unselected_btn,
      selected_option_color: info.contest_data.selected_btn,
      button_color: info.contest_data.button_color,
      sessionKey: info.token_key
    })

    // setTimeout(() => {
    //   console.log(this.state);
    // }, 3000);


    // this.setState({ 
    //   chapter_id : info.id,
    //   level : info.testlevel,
    //   test_key : info.session_Key,
    //   semester_id : info.semesterId,
    //   subject_id : info.allInfo.subject_id,
    //   minutes : info.duration
    //  })

    // this.loadQuestions();

    setTimeout(() => {
      this.timer = 0;
      const storedTime = localStorage.getItem('remainingTime');
    this.state.seconds = storedTime ? parseInt(storedTime) : this.state.minutes * 60;
          this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }, 20);


    this.props.set_counter_zero(0);
    // console.log("==============current data on redux is ============= ", this.props.IncrementDecrement );
    //console.log("+++++++++++++++++increased data on redux is +++++++++++++++++ ", this.props.incr_counter(1) );

    setTimeout(() => {
      this.chapterQuestionApi()
    }, 10);

    setTimeout(() => {
      // console.log("no of question attempt = ",this.props.IncrementDecrement.noOfQuestionsAttempted)
    }, 1500);

    setTimeout(() => {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      this.startTimer();
    }, 50);

  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    var secConv = this.state.minutes * 60
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
  
    // Remove one second, set state so a re-render happens.
    var seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    localStorage.setItem('remainingTime', seconds);
    console.log(seconds);
    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.submitTest()

    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    localStorage.removeItem('remainingTime');
    // localStorage.removeItem('examTime');

  }

  chapterQuestionApi = async () => {
    if (this.state.apiCalled) return; // Check if the API has already been called

    this.setState({ apiCalled: true });
    const url = await getContestQuestion();
    const body = {
      token: urlToken,
      contest_id: this.state.contestId,
      user_id: localStorage.getItem("UserId"),
      contest_key: this.state.sessionKey,
      status:"incomplete"
    }

    console.log('bodyyyy', body)
    // setTimeout(() => {
    // console.log("question api body==== ",body);
    // }, 2000);

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log('show questionsssssssss', response)
      this.setState({isQuestionLoading: true,questionDataResponse: response.data.data, numberOfQuestions: response.data.data.length })
      
      setTimeout(() => {
        this.props.set_question_data(this.state.questionDataResponse);
      }, 200);

      // console.log("whole question res is : %%%%%%%%%%%%%%%% ", response.data);

      // console.log("number of questions  :==== ", this.state.numberOfQuestions);
      this.getQuestionDataFun();

      // console.log("resp$$$$$$$$$$$$$$$$$$$  ", this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0].question_type);
      // console.log("quest$$$$$$$$$$$$$$$$$$  ",this.state.questionsData.question_type);


    }).catch((error) => {
      // console.log("error in fetching question list: ",error);
    })
  }

  getQuestionDataFun = () => {
    // this.state.currentQuestionNo < this.state.numberOfQuestions ?
    // : null'
    setTimeout(() => {

      this.setState({
        
        questionsData: this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux, this.props.IncrementDecrement.currentQuestionRedux + 1)[0],
        isQuestionLoading: false
      })
      // console.log(" in question data func 0000<   ", this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0].question_type);
    }, 300);
  }


  handleOptionSelctionEvent = (selected, index) => {
    this.setState({ selectedOptionIndex: index, selectedOption: selected, selectedOptionId: this.state.questionsData.id })
  }

  submitButtonPress = () => {
    this.submitAnswer();
    setTimeout(() => {
      this.submitTest();
    }, 100);
  }



  submitTest = async () => {
    this.setState({ loaderVisible: true })
    const url = await submitContestTest();
    const body = {
      token: urlToken,
      token_key: this.state.sessionKey,
      user_id: localStorage.getItem("UserId"),
      contest_id: this.state.contestId
    }

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log('submit test', response.data.status);
      this.setState({ loaderVisible: false })
      // this.setState({ loaderVisible: false })
      this.setState({modalShow : true})
      if(response.data.status == 'true'){
        // localStorage.removeItem('examTime')
        // localStorage.removeItem('remainingTime');
        clearInterval(this.timer);
        // alert('Test Submitted Succesfully')
        toast('Test Submitted Succesfully')
        setTimeout(() => {
          window.location.href='https://web.testmate.in/schedulebanner'
        }, 500);
      }else{
        alert(response.data.status)
      }

      // alert(
      //   // "test status",
      //   response.data.message
      // )

    }).catch((error) => {
      this.setState({ loaderVisible: false })
      // console.log("error in fetching question list: ",error);
      this.setState({ loaderVisible: false })
    })

  }

  submitAnswer = async () => {
    const url = await submitContestQuestion();
    const body = {
      token: urlToken,
      question_id: this.props.IncrementDecrement.currentQuestionId,
      user_id: user_Id,
      contest_id: this.state.contestId,
      contest_key: this.state.sessionKey,
      answer: this.props.IncrementDecrement.currentQuestionAnswer,
      answer_count: 1
    }

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      // setTimeout(() => {
        //   console.log("submit answer vody -- ", body);
        // }, 2000);
        console.log("Response after submit answer---------- ", response.data);
        // alert(response.data.status)
        // window.

    }).catch((error) => {
      console.log("error in fetching question list: ",error);
    })
  }



  prevQuestionButtonPress = () => {

    this.submitAnswer();

    if (this.props.IncrementDecrement.currentQuestionRedux > 0)
    // if( this.state.currentQuestionNo > 0 )
    {
      this.props.decr_counter(1);
      // this.setState({ currentQuestionNo : this.state.currentQuestionNo - 1 })
      this.setState({ isQuestionLoading: true })

      // console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );

      setTimeout(() => {
        // console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );
        this.getQuestionDataFun();

      }, 100);
    }
  }

  nextQuestionButtonPress = () => {
    this.submitAnswer();

    if (this.props.IncrementDecrement.currentQuestionRedux < this.state.numberOfQuestions - 1)
    // if( this.state.currentQuestionNo < this.state.numberOfQuestions-1  )
    {
      this.props.incr_counter(1);
      // this.setState({ currentQuestionNo : this.state.currentQuestionNo + 1 })

      this.setState({ isQuestionLoading: true })
      // console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );

      setTimeout(() => {
        // console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );
        this.getQuestionDataFun();

      }, 100);
    }

  }


  render() {
    const info = this.props.data.state
    var myTestBackground = {
      backgroundImage: `url(${info.contest_data.bakground_image})`,
      width: "100%",
      height: "auto",
    };

    // console.log(" ##################  ", this.state.questionsData);

    return (
      <>
            <Toaster/>
        <div>
          <section
            className="card col-12 col-sm-12 col-md-12 col-lg-8 content p-0 m-auto testBAckground"
            style={myTestBackground}
          >
            {/* <MyVerticallyCenteredModal
            show={this.state.modalShow}
          /> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
              <div className="container-fluid">
                <div className="navbar-header">
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
              </div>
            </nav>

            <div className="col-12 col-sm-12 col-md-12 col-lg-12 header mt-3 pt-3">

              <div className="mb-3">
                {/* <Button variant="primary" onClick={() => setModalShow(true)} 
              style={{padding:" 6px 38px",
                display:"block",
                margin:"auto"
              }}>
                 
              </Button> */}

                {/* <MyVerticallyCenteredModal
                show={modalShow}
                // onHide={() =>  }
                startTest={()=>enterModal()}
              /> */}
              </div>
              <div className="navTest">
                <div
                  className=""
                  style={{
                    fontSize: "1.5rem",
                    color: this.state.text_color,
                  }}
                >
                  <span className="QN"> Q.No: </span>{this.props.IncrementDecrement.currentQuestionRedux + 1}/{this.state.numberOfQuestions}
                </div>
                {<div
                  className="d-flex"
                  style={{
                    color: this.state.text_color,
                    fontSize: "1.5rem",
                    padding: "0.4rem",
                  }}
                >
                  <i
                    className="bx bxs-hourglass"
                    style={{ fontSize: "1.7rem ", padding: "0.3rem" }}
                  ></i>{" "}
                  &nbsp;
                  {/* <Timer hoursMinSecs={hoursMinSecs} /> */}
                  {this.state.time.m}:{this.state.time.s}
                </div>
                  // : null
                }

                <div className=" p-2 mt-1">
                  {this.state.loaderVisible ?
                    <CircularProgress style={{color: this.state.button_color}} /> :
                    <button
                      onClick={() => this.submitButtonPress()}
                      type="button"
                      className="btn btn-primaryTest"
                      disabled={this.props.IncrementDecrement.noOfQuestionsAttempted === 0 ? true : false}
                      style={{

                        backgroundColor: this.state.button_color,
                        color: "white",
                      }}
                    >
                      Submit
                    </button>
                  }

                </div>
              </div>
            </div>
            {this.state.isQuestionLoading ? (
              <div className="loader" style={{ textAlign: "center" }}>
                <LoadingSpinner />
              </div>
            ) : (
              
              <div
                className="col-12 col-sm-12 col-lg-12 m-auto mt-lg-5 pt-lg-3"
                style={{ textColor: this.state.button_color }}
              >
                {this.state.questionsData.question_type == "1" ? (
                  <MCQ
                    questionList={this.state.questionsData}
                    questionDataResponse={this.state.questionDataResponse}
                    currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                    textColor={this.state.text_color}
                    buttonColor={this.state.button_color}
                    optionColor={this.state.option_color}
                    selectedOptionColor={this.state.selected_option_color}
                  />
                ) : this.state.questionsData.question_type == "2" ? (
                  <TrueFalse
                    questionList={this.state.questionsData}
                    questionDataResponse={this.state.questionDataResponse}
                    currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                    textColor={this.state.text_color}
                    buttonColor={this.state.button_color}
                    optionColor={this.state.option_color}
                    selectedOptionColor={this.state.selected_option_color}
                  />
                ) : this.state.questionsData.question_type == "3" ? (
                  <MatchFollowing
                    questionList={this.state.questionsData}
                    questionDataResponse={this.state.questionDataResponse}
                    currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                    textColor={this.state.text_color}
                    buttonColor={this.state.button_color}
                    optionColor={this.state.option_color}
                    selectedOptionColor={this.state.selected_option_color}
                  />
                ) : this.state.questionsData.question_type == "4" ? (
                  <FillinBlank
                    questionList={this.state.questionsData}
                    questionDataResponse={this.state.questionDataResponse}
                    currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                    textColor={this.state.text_color}
                    buttonColor={this.state.button_color}
                    optionColor={this.state.option_color}
                    selectedOptionColor={this.state.selected_option_color}
                  />
                ) : this.state.questionsData.question_type == "5" ? (
                  // <CombineWords
                  //   questionList={this.state.questionsData}
                  //   questionDataResponse={this.state.questionDataResponse}
                  //   currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                  //   textColor={info.allInfo.subject_text_color}
                  //   buttonColor={info.allInfo.subject_button_color}
                  //   optionColor={info.allInfo.subject_unselected_btn}
                  //   selectedOptionColor={info.allInfo.subject_selected_btn}
                  // />
                  null
                ) : null}

                <div className="row optionsMcqs">
                  <div className="counselling-Form col-6 col-sm-9 col-md-6 col-lg-2 mb-2 mt-5 m-auto">
                    <button
                      onClick={() => this.prevQuestionButtonPress()}
                      type="button"
                      disabled={this.props.IncrementDecrement.currentQuestionRedux > 0 ? false : true}
                      className="btn btn btn-md"
                      style={{
                        width: "100%",
                        borderRadius: "3rem",
                        boxShadow:
                          "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                        backgroundColor:
                          this.props.IncrementDecrement.currentQuestionRedux > 0
                            ? this.state.button_color
                            : "gray",
                        color:
                          this.props.IncrementDecrement.currentQuestionRedux > 0
                            ? "white"
                            : "white",
                        opacity: this.props.IncrementDecrement.currentQuestionRedux > 0 ? 1 : 0.6,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
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
                      onClick={() => this.nextQuestionButtonPress()}
                      type="button"
                      className="btn btn btn-md"
                      disabled={
                        this.props.IncrementDecrement.currentQuestionRedux < this.state.numberOfQuestions - 1
                          ? false
                          : true
                      }
                      style={{
                        width: "100%",
                        borderRadius: "3rem",
                        boxShadow:
                          "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                        backgroundColor:
                          this.props.IncrementDecrement.currentQuestionRedux > this.state.numberOfQuestions - 1
                            ? "gray"
                            : this.state.button_color,
                        color:
                          this.props.IncrementDecrement.currentQuestionRedux > this.state.numberOfQuestions - 1
                            ? "white"
                            : 'white',
                        opacity:
                          this.props.IncrementDecrement.currentQuestionRedux < this.state.numberOfQuestions - 1 ? 1 : 0.6,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Next<i className="bx bx-chevrons-right "></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Small(TestScheduleScreen))