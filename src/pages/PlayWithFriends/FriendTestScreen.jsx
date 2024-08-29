import React, { Component } from 'react'
import {
  playTestQuestionApi,
  submitAnswerApi,
  submitChallengeApi,
  submitTestApi,
  urlToken,
} from "../../api/api";
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";
import CombineWords from "./CombineWords";
import FillinBlank from "./FillinBlank";
import MatchFollowing from "./MatchFollowing";
import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";

import { count_attempts, decr_counter, incr_counter, set_counter_zero, set_question_data } from "../../Redux_two/Actions/ActionCreator";
import { Alert } from "react-bootstrap";

import { withRouter } from "../../routes/withRouter";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import LoadingSpinner from '../../loader/LoadingSpinner';
import "../../assets/css/pages.css"
import "../../assets/css/Responsive.css"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import hurry from "../../assets/img/friends/congo.jpg"
// import hurry from "..\assets\img\friends\congo.jpg"


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Booking status
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <img
        style={{display:"block",margin:"auto",width:"250px",height:"250px"}}
         src={hurry}
        />
        <h3 style={{textAlign:"center"}}>
          your test submitted <br/> successfully
        </h3>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/playwfriend">
          <Button>Go Back</Button>
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
  // console.log(" -->  ", location.state);
}


const mapStateToProps = (state) => {
  return {
      // increment_decrement : state.increment_decrement,
      IncrementDecrement : state.IncrementDecrement,
      user : state.user
  }
}

const mapDispatchToProps = (dispatch) => {
    return{

        // incrementQuestion: (qdata) => dispatch(incrementQuestion(qdata)),
        incr_counter : (count) => {dispatch(incr_counter(count))},
        decr_counter : (count) => {dispatch(decr_counter(count))},
        set_counter_zero : (count) => {dispatch(set_counter_zero(count))},
        set_question_data : (qdata) => {dispatch(set_question_data(qdata))},
      }

};

var questionArray =[];
var answerArray = [];


const user_Id = localStorage.getItem("UserId");
class FriendTestScreen extends Component {

  
  constructor(){
    super();
    this.state = {
        questionsData : '',
        questionDataResponse:'',
        subject_background : '',
        text_color : '',
        button_color : '',
        option_color:'',
        selected_option_color:'',
        selectedOption:'',
        selectedOptionIndex:'',
        selectedOptionId:'',
        questionTypeArray:[],
        numberOfQuestions: 0,
        currentQuestionNo : 0,

        isQuestionLoading : false,
        
        contestId:'',
        minutes : 50,
        time: {}, 
        seconds: null,

        subjectId:'',
        chapterId:'',
        testId:'',
        testStartTime:'',
        noFriends:'',
        questionsId:'',
        loaderVisible: false,
        modal:false,
    }

    this.timer = 0;
    this.state.seconds = this.state.minutes * 60;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
}



componentDidMount() {
    const data = this.props.data.state

    this.setState({subject_background:data.bakground_image, text_color:data.text_color, button_color:data.button_color,
        option_color: data.option_color, selected_option_color: data.selected_option_color,
        subjectId : data.subject_id, chapterId: data.chapter_id, testId: data.test_id, testStartTime: data.test_start_time, noFriends: data.no_friends, questionsId : data.questionsId })

    questionArray = []
    answerArray = []
    this.props.set_counter_zero(0);
    // console.log("==============current data on redux is ============= ", this.props.IncrementDecrement );

    setTimeout(()=>{
        this.challangeQuestion();
    },100);
    
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();

}

secondsToTime(secs){
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
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
      Alert.alert (  
        'time out',  
        'Your test time is out',
        [  
           
            { text: 'OK', 
            onPress: () => {
                this.submitChallange();
                
            }
        },  
        ]  
    );  
      // console.log("time out----------");
    }
}


challangeQuestion = async() => {
        const url = await playTestQuestionApi();
        const body = {
            token : urlToken,
            user_id : user_Id,
            test_id : this.state.testId,
            subject_id : this.state.subjectId,
            question_id : this.state.questionsId,
            chapter_id : this.state.chapterId,
            chapter_count : this.state.chapterId.length,
            question_count : this.state.questionsId.length,
        }


        setTimeout(() => {
            // console.log("question body is == ",body);
        }, 2000);
    
        axios.post(url,body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response) => {
            this.setState({ questionDataResponse : response.data.data , 
              numberOfQuestions : response.data.data.length
             })

            setTimeout(() => {
                this.props.set_question_data( this.state.questionDataResponse );
            }, 200);

            // console.log("whole question res is : %%%%%%%%%%%%%%%% ", response.data);

            // console.log("number of questions  :==== ", this.state.numberOfQuestions);
            setTimeout(() => {
              
              this.getQuestionDataFun();
            }, 100);

            // console.log("resp$$$$$$$$$$$$$$$$$$$  ", this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0].question_type);
            // console.log("quest$$$$$$$$$$$$$$$$$$  ",this.state.questionsData.question_type);
        
    
        }).catch((error) =>{
            // console.log("error in fetching question list: ",error);
        })
}


    // getQuestionDataFun = () => {
    //   console.log("currentQuestionRedux ", this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0]);
    //     this.props.IncrementDecrement.currentQuestionRedux < this.state.numberOfQuestions ?
    //     this.setState({ questionsData : this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0] , 
    //         isQuestionLoading : false })
    //     :null
    // }


    getQuestionDataFun = () => {
      // this.state.currentQuestionNo < this.state.numberOfQuestions ?
      // : null'
      setTimeout(() => {
        
        this.setState({ questionsData : this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0] , 
            isQuestionLoading : false }) 
        // console.log(" in question data func 0000<   ", this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0].question_type);
      }, 300);
  }

    createArrayOfAnswers = () => {
      // console.log("$$$$$$$$$$$$$$ crete answer array $$$$$$$$$$$$ " , questionArray.length , this.props.IncrementDecrement.currentQuestionAnswer);

        if(this.props.IncrementDecrement.currentQuestionAnswer !== ''){
            if(questionArray.length == 0){
                    // setTimeout(() => {
                        // console.log("in if condition");
                    // }, 4000);
                    questionArray[questionArray.length] = this.props.IncrementDecrement.currentQuestionId;
                    answerArray[answerArray.length] = this.props.IncrementDecrement.currentQuestionAnswer;
                } else{

                    if(questionArray.some(item => item == this.props.IncrementDecrement.currentQuestionId )){
                        // setTimeout(() => {
                          //  console.log("for loop if condition");
                           // }, 4000);
                           answerArray[questionArray.indexOf(this.props.IncrementDecrement.currentQuestionId )] = this.props.IncrementDecrement.currentQuestionAnswer;
                    } else{
                        // setTimeout(() => {
                            // console.log("for loop else condition");
                        // }, 4000);
                        questionArray[questionArray.length] = this.props.IncrementDecrement.currentQuestionId;
                        answerArray[answerArray.length] = this.props.IncrementDecrement.currentQuestionAnswer; 
                    }
                }
        }
        setTimeout(() => {
          // console.log("question array == ",questionArray);
          // console.log("answer array == ",answerArray);
        }, 3000);
        
    }

    submitChallange = async() => {
      this.setState({loaderVisible: true})
      this.setState({ modal : true})
        this.createArrayOfAnswers();

    this.setState({ loaderVisible: true })
    const url = await submitChallengeApi();
    const body = {
      token: urlToken,
      friend_id: user_Id,
      no_friends: this.state.noFriends,
      test_id: this.state.testId,
      test_start_time: this.state.testStartTime,
      test_submit_time: moment(new Date).format('HH:mm:ss'),
      question_id: questionArray,
      question_count: questionArray.length,
      answer: answerArray,
      answer_count: answerArray.length
    }
    setTimeout(() => {
      // console.log("req body is ", body);
    }, 3000);

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      this.setState({loaderVisible: false})

      // console.log("Response after submit ---------- ", response.data);
      this.setState({ loaderVisible: false })
      if (response.data.status == 'true') {
        this.setState({ modal: true })

        // Toast.showWithGravity('Challenge submitted successfully!',Toast.SHORT,Toast.BOTTOM)
        // alert(
        //   "Test status",
        //   'Thank you for completing this test. Your results have been updated in your profile. ',
        //   [
        //     {
        //       text: "OK",
        //       onPress: () => this.props.navigation.pop(2)
        //     }
        //   ]
        // );
      } else {
        // Toast.showWithGravity('Challenge not submitted!',Toast.SHORT,Toast.BOTTOM);
        // alert(
        //   // "Test status",
        //   response.data.message,)
        }
        }).catch((error) =>{
            // console.log("error in fetching question list: ",error);
            this.setState({ loaderVisible: false })
        })
    }

    prevQuestionButtonPress = () => {
        this.createArrayOfAnswers();
        
        if( this.props.IncrementDecrement.currentQuestionRedux > 0 )
        {
            this.props.decr_counter(1);
            this.setState({ isQuestionLoading : true })
        
            setTimeout(()=>{
                // console.log("==============current data on redux is ============= ", this.props.IncrementDecrement.currentQuestionRedux );
                this.getQuestionDataFun();
            
            },100);
        }
    }

    nextQuestionButtonPress = () => {
        this.createArrayOfAnswers();
        
        if(this.props.IncrementDecrement.currentQuestionRedux < this.state.numberOfQuestions-1  )
        {
            this.props.incr_counter(1);
            this.setState({ isQuestionLoading : true })
       
            setTimeout(()=>{
                // console.log("==============current data on redux is ============= ", this.props.IncrementDecrement.currentQuestionRedux );
                this.getQuestionDataFun();
            
            },100);
        }
    }

  render() {
    const info = this.props.data.state
      var myTestBackground = {
        backgroundImage: `url(${info.bakground_image})`,
        width: "100%",
        height: "auto",
      };


    return (
       <>
      <div>
        <section className="content p-0 mb-5" 
        style={myTestBackground}>
          <MyVerticallyCenteredModal
            show={this.state.modal}
          />
          <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <div className="container-fluid">
              <div className="navbar-header">
                <div className="d-flex flex-row m-auto">
                  <div className="p-2">
                    <img src={Logo} alt="Logo" className="brand-image img " />
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

          <div className="col-12 col-sm-12 col-md-12 col-lg-12 header mt-3">
            <div className="d-flex justify-content-around align-items-center">
              <div className="d-flex align-items-center" style={{color:"white"}}>
                <i
                  className="bx bx-timer"
                  style={{ fontSize: "1.5rem", top: "2rem" }}
                ></i>
                {this.state.time.m}:{this.state.time.s}
              </div> 
              <div className=" p-2"  style={{color:"white"}}>
                {this.props.IncrementDecrement.currentQuestionRedux + 1}/{this.state.numberOfQuestions}
              </div>
              <div className=" p-2">
                {
                  this.state.loaderVisible ? <LoadingSpinner/> :
                  <button
                  onClick={() => this.submitChallange()}
                  type="button"
                  className="btn btn-primary"
                  disabled={this.props.IncrementDecrement.noOfQuestionsAttempted === 0 ? true : false}
                  style={{ width:"142px"}}
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
          // className="col-12 col-sm-12 col-lg-12 m-auto mt-5 pt-2"
          >
            {this.state.questionsData.question_type == "1" ? (
              <MCQ
                questionList = {this.state.questionsData} 
                questionDataResponse = {this.state.questionDataResponse}
                textColor = {this.state.text_color} 
                buttonColor = {this.state.button_color} 
                optionColor = {this.state.option_color} 
                selectedOptionColor={this.state.selected_option_color} 
                currentQuestion = {this.props.IncrementDecrement.currentQuestionRedux}
              />
            ) : this.state.questionsData.question_type == "2" ? (
              <TrueFalse
                questionList = {this.state.questionsData} 
                questionDataResponse = {this.state.questionDataResponse}
                textColor = {this.state.text_color} 
                buttonColor = {this.state.button_color} 
                optionColor = {this.state.option_color} 
                selectedOptionColor={this.state.selected_option_color} 
                currentQuestion = {this.props.IncrementDecrement.currentQuestionRedux}
              />
            ) : this.state.questionsData.question_type == "3" ? (
              <MatchFollowing
                questionList = {this.state.questionsData} 
                questionDataResponse = {this.state.questionDataResponse}
                textColor = {this.state.text_color} 
                buttonColor = {this.state.button_color} 
                optionColor = {this.state.option_color} 
                selectedOptionColor={this.state.selected_option_color} 
                currentQuestion = {this.props.IncrementDecrement.currentQuestionRedux}
              />
            ) : this.state.questionsData.question_type == "4" ? (
              <FillinBlank
                questionList = {this.state.questionsData} 
                questionDataResponse = {this.state.questionDataResponse}
                textColor = {this.state.text_color} 
                buttonColor = {this.state.button_color} 
                optionColor = {this.state.option_color} 
                selectedOptionColor={this.state.selected_option_color} 
                currentQuestion = {this.props.IncrementDecrement.currentQuestionRedux}
              />
            ) : this.state.questionsData.question_type == "5" ? (
              <CombineWords
                questionList = {this.state.questionsData} 
                questionDataResponse = {this.state.questionDataResponse}
                textColor = {this.state.text_color} 
                buttonColor = {this.state.button_color} 
                optionColor = {this.state.option_color} 
                selectedOptionColor={this.state.selected_option_color} 
                currentQuestion = {this.props.IncrementDecrement.currentQuestionRedux}
              />
            ) : null}

            

            <div style={{padding: "0 0 23px 0", display:"flex", justifyContent:"space-around"}}>
              {/* <div className="counselling-Form col-9 col-sm-9 col-md-6 col-lg-3 mt-5 m-auto"> */}
                <button
                  onClick={() => this.prevQuestionButtonPress()}
                  type="button"
                  className="NextPev btn btn btn-md"
                  disabled={this.props.IncrementDecrement.currentQuestionRedux > 0 ? false : true}
                  style={{
                    // width: "142px",
                    borderRadius: "4rem",
                    backgroundColor: "var(--blue)",
                    color: "var(--white)",
                    boxShadow:
                      "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                  }}
                >
                  <i className="playFriendsPrevIc bx bx-chevrons-left"></i>Prev
                </button>
              {/* </div> */}
              {/* <div className="counselling-Form col-9 col-sm-9 col-md-6 col-lg-3 mb-2 mt-5 m-auto "> */}
                <button
                  onClick={() => this.nextQuestionButtonPress()}
                  type="button"
                  className="NextPev btn btn btn-md"
                  disabled={
                    this.props.IncrementDecrement.currentQuestionRedux < this.state.numberOfQuestions - 1
                      ? false
                      : true
                  }
                  style={{
                    // width: "142px",
                    borderRadius: "4rem",
                    backgroundColor: "var(--blue)",
                    color: "var(--white)",
                    boxShadow:
                      "0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)",
                  }}
                >
                  Next<i className="bx bx-chevrons-right"></i>
                </button>
              </div>
            </div>
          // </div>
          )}
        </section>
      </div>
    </>
    )
  }
}


export default connect(mapStateToProps,mapDispatchToProps) (Small(withRouter(FriendTestScreen)))