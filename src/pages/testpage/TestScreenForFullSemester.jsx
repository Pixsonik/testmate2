import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  allSemesterApi,
  chapterTestQuestionApi,
  submitAnswerApi,
  submitTestApi,
  urlToken,
} from "../../api/api";
import Logo from "../../assets/img/logo/LogoIcon.png";
import Testmate from "../../assets/img/logo/Logoname.png";
import LoadingSpinner from "../../loader/LoadingSpinner";
import CombineWords from "./CombineWords";
import FillinBlank from "./FillinBlank";
import MatchFollowing from "./MatchFollowing";
import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";
import { useSelector, useDispatch, connect } from "react-redux";
import Timer from "./Timer";
import "../../assets/css/pages.css"
import {
  DECREMENT_QUESTION,
  INCRMENT_QUESTION,
  SET_QUESTION,
  UPDATE_ANSWER,
  SET_COUNTER_ZERO,
  UPDATE_QUESTION,
} from "../../Redux/Action/IncreDecreSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { display, margin } from "@mui/system";
import { count_attempts, decr_counter, incr_counter, set_counter_zero, set_question_data } from "../../Redux_two/Actions/ActionCreator";
import { Alert } from "react-bootstrap";

import { withRouter } from "../../routes/withRouter";
import TestFinish from "./TestFinish";
import TestFinishForFullSem from "./TestFinishForFullSem";

// const getData = useLocation();

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
        // user : state.user
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return{

          // incrementQuestion: (qdata) => dispatch(incrementQuestion(qdata)),
          incr_counter : (count) => {dispatch(incr_counter(count))},
          decr_counter : (count) => {dispatch(decr_counter(count))},
          set_counter_zero : (count) => {dispatch(set_counter_zero(count))},
          set_question_data : (qdata) => {dispatch(set_question_data(qdata))},
          count_attempts : (data) => {dispatch(count_attempts(data))},
        }
  
  };

  const user_Id = localStorage.getItem("UserId");
  var info;
  var questionArray =[];

class TestScreenForFullSemester extends React.Component {

    constructor(){
        super();
        this.state = {
            subject_id:'',
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
            sessionKey:'',
            chapterId:'',
            testLevel:'',
            testTime : '',
            semester_id:'',
            level : '',

            isQuestionLoading : false,
            testStatus:'',

            loaderVisible: false,

            minutes : '',
            time: {}, 
            seconds: null,

            testSubmitResponse : '',
            showResult : false,

        }

        
    }
    
    

    componentDidMount() {
      questionArray =[];
        info = this.props.data.state
        // setTimeout(() => {
        //   console.log(info);
        //   console.log(this.state);
          
        // }, 3000);
        // console.log("--->  class based ", info);
        // this.setState({subject_id: info.subject_id, subject_background:info.subject_background, text_color:info.text_color, button_color:info.button_color,
        //     option_color: info.option_color, selected_option_color: info.selected_option_color,semester_id:info.semester_id,
        //     sessionKey:info.session_key, chapterId : info.chapterId, testLevel : info.test_level, testTime: info.test_time, minutes: info.test_time,
        this.setState({ 
          chapterId : info.chapterId,
          level : info.test_level,
          sessionKey : info.session_key,
          semester_id : info.semester_id,
          subject_id : info.allInfo.subject_id,
          minutes : info.test_time,

          subject_background : info.allInfo.subject_bg_image ,
          text_color: info.allInfo.subject_text_color,
          button_color: info.allInfo.subject_button_color,
          option_color: info.allInfo.subject_unselected_btn,
          selected_option_color: info.allInfo.subject_selected_btn,
          // semester_id:,
          // sessionKey:,
          // chapterId:,
          // testLevel:,
          // testTime:,
          // minutes:,
          loaderVisible:true,



         })

        //  this.setState({subject_id: data.subject_id, subject_background:data.subject_background, text_color:data.text_color, button_color:data.button_color,
        //   option_color: data.option_color, selected_option_color: data.selected_option_color,semester_id:data.semester_id,
        //   sessionKey:data.session_key, chapterId : data.chapterId, testLevel : data.test_level, testTime: data.test_time, minutes: data.test_time,
        //   loaderVisible: true })

          // console.log(" =((((((((((((((((((((((((((   --> ", this.state.chapterId);
          // this.loadQuestions();

        setTimeout(() => {
            this.timer = 0;
            this.state.seconds = this.state.minutes * 60;
            this.startTimer = this.startTimer.bind(this);
            this.countDown = this.countDown.bind(this);
        }, 20);

        
        this.props.set_counter_zero(0);
        // console.log("==============current data on redux is ============= ", this.props.IncrementDecrement );
        //console.log("+++++++++++++++++increased data on redux is +++++++++++++++++ ", this.props.incr_counter(1) );

        setTimeout(()=>{
            this.chapterQuestionApi()
        },10);

        setTimeout(() => {
            // console.log("no of question attempt = ",this.props.IncrementDecrement.noOfQuestionsAttempted)
        }, 1500);

        setTimeout(() => {
            let timeLeftVar = this.secondsToTime(this.state.seconds);
            this.setState({ time: timeLeftVar });
            this.startTimer();
        }, 50);

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
                    this.submitTest();
                    
                }
            },  
            ]  
        );  
          // console.log("time out----------");
        }
    }

    chapterQuestionApi = async() => {
      const info = this.props.data.state

        // console.log(this.state.chapterId,this.state.testLevel,this.state.sessionKey);
            const url = await allSemesterApi();
            const body = {
              token: urlToken,
              chapter_id : this.state.chapterId,
              level: this.state.level,
              test_key:this.state.sessionKey,
              chapter_count: this.state.chapterId.length,
              status:"test",
              check:"incomplete"
            }
           
        
            axios.post(url,body, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((response) => {
              setTimeout(() => {
                console.log(" chapter q api body ", body);
                console.log("Chapter question list is : ",response.data);
            }, 2000);
                this.setState({ questionDataResponse : response.data.data , numberOfQuestions : response.data.data.length })
                this.setState({ loaderVisible:false })

                setTimeout(() => {
                    this.props.set_question_data( this.state.questionDataResponse );
                    for (let index = 0; index < this.state.questionDataResponse.length; index++) {
                      questionArray[index] = this.state.questionDataResponse[index].id
                  }
                }, 10);

                // console.log("whole question res is : %%%%%%%%%%%%%%%% ", this.state.questionDataResponse);
                // console.log("number of questions  :==== ", this.state.numberOfQuestions);
                this.getQuestionDataFun();
                

               setTimeout(() => {
                    let questionDataResponse=[...this.state.questionDataResponse];
                    questionDataResponse.slice(0,1).selectedOptionId=(questionDataResponse.slice(0,1).selectedOptionId==null)? '' 
                    : questionDataResponse.slice(0,1).selectedOptionId;
                    this.setState({questionDataResponse});
                    setTimeout(() => {
                        // console.log(questionDataResponse.slice(0,1));
                    }, 2000);
               }, 100);
                
                // for(let qdata of questionDataResponse){
                //     if(qdata.id == this.state.qdata[0].id) {
                //         // qdata.selectedOptionIndex=(qdata.selectedOptionIndex==null) && '' ;
                //         qdata.selectedOptionId=(qdata.selectedOptionId==null)? '' : qdata.selectedOptionId;
                //     }
                // }
               
               

                // console.log("resp$$$$$$$$$$$$$$$$$$$  ", this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0].question_type);
                // console.log("quest$$$$$$$$$$$$$$$$$$  ",this.state.questionsData.question_type);
            
        
            }).catch((error) =>{
                // console.log("error in fetching question list: ",error);
            })
        }

    getQuestionDataFun = () => {
        // this.state.currentQuestionNo < this.state.numberOfQuestions ?
        // : null'
        setTimeout(() => {
          
          this.setState({ questionsData : this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0] , 
              isQuestionLoading : false }) 
          // console.log(" in question data func 0000<   ", this.state.questionDataResponse.slice(this.props.IncrementDecrement.currentQuestionRedux,this.props.IncrementDecrement.currentQuestionRedux+1)[0].question_type);
        }, 300);
    }

 
    handleOptionSelctionEvent = (selected,index) => {
        this.setState({ selectedOptionIndex : index, selectedOption : selected, selectedOptionId : this.state.questionsData.id })
    }

    submitButtonPress = () => {
        this.submitAnswer();
        setTimeout(() => {
            this.submitTest();
        }, 100);
    }
    

    submitTest = async () => { 
      this.setState({ loaderVisible: true })
      const info = this.props.data.state
      const url = await submitTestApi();
      const body = {
        token : urlToken,
        token_key:this.state.sessionKey, 
        user_id : user_Id,
        level_id : this.state.level,
        subject_id: this.state.subject_id,
        semester_id : this.state.semester_id,
      }
      const body2 = {
        level_id: "1", 
        semester_id: "111", 
        subject_id: "18", 
        token: "6808", 
        token_key: "f62yx34m", 
        user_id: "56"
    }

      
      axios.post(url,body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
          setTimeout(() => {
              console.log("submit test body --- ", body);
              console.log("Response after submit test ---------- ", response.data); 
          }, 3000);
          this.setState({ loaderVisible: false })
          if (response.data.status == 'true') {
            this.setState({testSubmitResponse : response.data , showResult : true})
            // this.props.navigate('/testfinish', {
            //   subject_background:this.state.subject_background, text_color:this.state.text_color, button_color:this.state.button_color,
            //   option_color: this.state.option_color, selected_option_color: this.state.selected_option_color,
            //   session_key: this.state.sessionKey, chapterId: this.state.chapterId, test_level: this.state.testLevel, testSubmitData : response.data})
            
              // this.props.navigation.navigate('TestFinishScreen',
              // {subject_background:this.state.subject_background, text_color:this.state.text_color, button_color:this.state.button_color,
              //     option_color: this.state.option_color, selected_option_color: this.state.selected_option_color,
              //     session_key: this.state.sessionKey, chapterId: this.state.chapterId, test_level: this.state.testLevel, testSubmitData : response.data} )
          } else{
              // console.log("not able to submit test--", response.data);
          }
      }).catch((error) =>{
          // console.log("error in fetching question list: ",error);
          this.setState({ loaderVisible: false })
      })

    }


    submitAnswer = async () => { 
      const info = this.props.data.state

      const url = await submitAnswerApi();
          const body = {
              token : urlToken,
              test_key: this.state.sessionKey,
              user_id : user_Id,
              question_id: this.props.IncrementDecrement.currentQuestionId,
              // answer : [2],
              answer_count: this.props.IncrementDecrement.currentQuestionAnswer.length,
              answer : this.props.IncrementDecrement.currentQuestionAnswer
          }

          
          axios.post(url,body, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((response) => {
            setTimeout(() => {
              console.log("req body of submit answer --- ", body);
              console.log("Response after submit answer ---------- ", response.data);
            }, 1000);
      
          }).catch((error) =>{
              console.log("error in fetching question list: ",error);
          })

    }

        prevQuestionButtonPress = () => {

            this.submitAnswer();
            
            if( this.props.IncrementDecrement.currentQuestionRedux > 0 )
            // if( this.state.currentQuestionNo > 0 )
            {            
                this.props.decr_counter(1);
                // this.setState({ currentQuestionNo : this.state.currentQuestionNo - 1 })
                this.setState({ isQuestionLoading : true })

                console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );
            
                setTimeout(()=>{
                    console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );
                    this.getQuestionDataFun();
                
                },100);
            }
        }

        nextQuestionButtonPress = () => {
            this.submitAnswer();
            
            if(this.props.IncrementDecrement.currentQuestionRedux < this.state.numberOfQuestions-1  )
            // if( this.state.currentQuestionNo < this.state.numberOfQuestions-1  )
            {
                this.props.incr_counter(1);
                // this.setState({ currentQuestionNo : this.state.currentQuestionNo + 1 })

                this.setState({ isQuestionLoading : true })
                console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );
           
                setTimeout(()=>{
                    console.log("==============current data on redux is ============= ", this.state.currentQuestionNo );
                    this.getQuestionDataFun();
                
                },100);
        }

        }

        
    render() {
      const info = this.props.data.state
      var myTestBackground = {
        backgroundImage: `url(${info.allInfo.subject_bg_image})`,
        width: "100%",
        height: "auto",
      };

      // console.log(" ##################  ", this.state.questionsData);

    return (
      <>
      <div>
        <section
          className="card col-12 col-sm-12 col-md-12 col-lg-8 content p-0 m-auto"
          style={myTestBackground}
        >
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
          {
            !this.state.showResult ?
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
                    color: info.allInfo.subject_text_color,
                  }}
                >
              <span className="QN"> Q.No: </span>{this.props.IncrementDecrement.currentQuestionRedux+1}/{this.state.numberOfQuestions}
                </div>
              {  <div
                  className="d-flex"
                  style={{
                    color: info.allInfo.subject_text_color,
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
                  <button
                    onClick={() => this.submitButtonPress()}
                    type="button"
                    className="btn btn-primaryTest"
                    disabled={this.props.IncrementDecrement.noOfQuestionsAttempted === 0 ? true : false}
                    style={{
                    
                      backgroundColor: info.allInfo.subject_text_color,
                      color: info.allInfo.subject_button_color,
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div> : null
          }
          {this.state.isQuestionLoading ? (
            <div className="loader" style={{ textAlign: "center" }}>
              <LoadingSpinner />
            </div>
          ) : (
            <div
              className="col-12 col-sm-12 col-lg-12 m-auto mt-5 pt-3"
              style={{ textColor: info.allInfo.subject_button_color }}
            >
              {
              this.state.questionsData.question_type == "1" & !this.state.showResult ? (
                <MCQ
                  questionList={this.state.questionsData}
                  questionDataResponse={this.state.questionDataResponse}
                  currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                  textColor={info.allInfo.subject_text_color}
                  buttonColor={info.allInfo.subject_button_color}
                  optionColor={info.allInfo.subject_unselected_btn}
                  selectedOptionColor={info.allInfo.subject_selected_btn}
                />
              ) : this.state.questionsData.question_type == "2" & !this.state.showResult ? (
                <TrueFalse
                  questionList={this.state.questionsData}
                  questionDataResponse={this.state.questionDataResponse}
                  currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                  textColor={info.allInfo.subject_text_color}
                  buttonColor={info.allInfo.subject_button_color}
                  optionColor={info.allInfo.subject_unselected_btn}
                  selectedOptionColor={info.allInfo.subject_selected_btn}
                />
              ) : this.state.questionsData.question_type == "3" & !this.state.showResult ? (
                <MatchFollowing
                  questionList={this.state.questionsData}
                  questionDataResponse={this.state.questionDataResponse}
                  currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                  textColor={info.allInfo.subject_text_color}
                  buttonColor={info.allInfo.subject_button_color}
                  optionColor={info.allInfo.subject_unselected_btn}
                  selectedOptionColor={info.allInfo.subject_selected_btn}
                />
              ) : this.state.questionsData.question_type == "4" & !this.state.showResult ? (
                <FillinBlank
                  questionList={this.state.questionsData}
                  questionDataResponse={this.state.questionDataResponse}
                  currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                  textColor={info.allInfo.subject_text_color}
                  buttonColor={info.allInfo.subject_button_color}
                  optionColor={info.allInfo.subject_unselected_btn}
                  selectedOptionColor={info.allInfo.subject_selected_btn}
                />
              ) : this.state.questionsData.question_type == "5" & !this.state.showResult ? (
                <CombineWords
                  questionList={this.state.questionsData}
                  questionDataResponse={this.state.questionDataResponse}
                  currentQuestion={this.props.IncrementDecrement.currentQuestionRedux}
                  textColor={info.allInfo.subject_text_color}
                  buttonColor={info.allInfo.subject_button_color}
                  optionColor={info.allInfo.subject_unselected_btn}
                  selectedOptionColor={info.allInfo.subject_selected_btn}
                />
                
              ) : null}

              { this.state.showResult &&
                <TestFinishForFullSem
                  testSubmitData ={this.state.testSubmitResponse} 
                  info ={info}
                  questionArray = {questionArray}
                />
              }

              {
                !this.state.showResult ? 
                <div className="row">
                  <div className="counselling-Form col-6 col-sm-9 col-md-2 col-lg-2 mb-2 mt-5 m-auto">
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
                            ? info.allInfo.subject_text_color
                            : "gray",
                        color:
                        this.props.IncrementDecrement.currentQuestionRedux > 0
                            ? info.allInfo.subject_button_color
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
                  <div className="counselling-Form col-6 col-sm-9 col-md-2 col-lg-2 mb-2 mt-5 m-auto">
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
                            : info.allInfo.subject_text_color,
                        color:
                        this.props.IncrementDecrement.currentQuestionRedux > this.state.numberOfQuestions - 1
                            ? "white"
                            : info.allInfo.subject_button_color,
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
                </div> : null
              }
            </div>
          )}
        </section>
      </div>
      </>
    )
  }
}

  
  export default connect(mapStateToProps,mapDispatchToProps) (Small(withRouter(TestScreenForFullSemester)))