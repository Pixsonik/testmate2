import React, { Component } from 'react'
import "../../assets/css/pages.css";
import DraggableList from "react-draggable-lists";
import { count_attempts, decr_counter, incr_counter, set_counter_zero, update_answer_data, update_question_data } from '../../Redux_two/Actions/ActionCreator';
import { connect } from 'react-redux';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Draggable } from "react-drag-reorder";
import { data } from 'jquery';
// import Draggable from 'react-draggable';
import { ReactSortable } from "react-sortablejs";


let answer = [];
var anss = [];
var ansss = [];

const NUM_ITEMS =["option 1","option 2","option 3","option 4","option 5"];



const mapStateToProps = (state) => {
    return {
        IncrementDecrement : state.IncrementDecrement,
        user : state.user,
    }
}

const mapDispatchToProps = (dispach) => {
  return{

      incr_counter : (count) => {dispach(incr_counter(count))},
      decr_counter : (count) => {dispach(decr_counter(count))},
      set_counter_zero : (count) => {dispach(set_counter_zero(count))},
      update_question_data : (qData) => {dispach(update_question_data(qData))},
      update_answer_data : (data) => {dispach(update_answer_data(data))},
      count_attempts : (data) => {dispach(count_attempts(data))},

    }
};

var ss=[]
var sss = []
var showAns = [];
class MatchTheFollowingAnswer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            QuestionsColumn : [],
            
            showQuestionHilightColor : false,
            answers : [],
         
            aQuestions: [],
            bQuestions: [],
           
            startTouchX: 0,
            startTouchY: 0,

            endTouchX: 0,
            endTouchY: 0,

            questionsData : '',
            questionDataResponse : props.questionDataResponse,
            subject_background : '',
            text_color : props.textColor,
            button_color : props.buttonColor,
            option_color : props.optionColor,
            selected_option_color : props.selectedOptionColor,
            selectedOption:'',
            selectedOptionIndex:'',
            selectedOptionId:'',
            questionList : [props.questionList],
            colAQuestionNumber:'',
           
            data: NUM_ITEMS.map((d, index) => ({
              key: `item-${d}`,
              label: d,
              // backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
              backgroundColor: 'grey',
            })),

            submittedAnswers:'',
            correctAnswers:'',
        }
      
    }

    componentDidMount(){
        ss=[]
        sss = []
        showAns = [];
        this.setState({aQuestions : this.state.questionList[0].cola, colAQuestionNumber : this.state.questionList[0].cola.length,
             bQuestions: this.state.questionList[0].colb})
        this.setState({submittedAnswers : this.state.questionList[0].submit_answer !== null ? this.state.questionList[0].submit_answer : this.state.questionList[0].answer, correctAnswers: this.state.questionList[0].answer})  
        
        // this.getMatchTheColumn()

        // console.log("length of col A is === " , this.state.questionList[0].cola.length );ZZ

        setTimeout(() => {
            console.log("submitted ans===",this.state.submittedAnswers);
            console.log("correct ans===",this.state.correctAnswers);
            console.log("options are ===",this.state.questionList[0].colb);

            for (let index = 0; index < this.state.submittedAnswers.length; index++) {
                for (let index2 = 0; index2 < this.state.questionList[0].colb.length; index2++) {
                  if(this.state.submittedAnswers[index] == this.state.questionList[0].colb[index2].option_id ){
                    ss[ss.length] = this.state.questionList[0].colb[index2]
                  }
                  
                  if (this.state.submittedAnswers[index] == this.state.correctAnswers[index2]) {
                    sss[sss.length] = this.state.submittedAnswers[index] == this.state.correctAnswers[index2]
                  }
                   
                }
              }
              setTimeout(() => {
                for (let index = 0; index < this.state.questionList[0].cola.length; index++) {
                  showAns[index] = ss[index]
                  
                }
                console.log("show ans data -- ", showAns);
              }, 20);

              console.log("ss values----",ss);
              console.log("sss values----",sss);

        }, 10);

        setTimeout(()=>{
            this.props.update_question_data(this.state.questionList[0].id)
            // this.props.update_answer_data("")
            // console.log(this.props.IncrementDecrement.currentQuestionId);
        
        },300);

    }

  
    handleA_Answers  = (name, index,evt) => {
        this.setState({ showQuestionHilightColor : true })
        // console.log("state -->  ", name , index, evt.nativeEvent.locationX ,  evt.nativeEvent.locationY);
        // switch (index) {
        //     case 0:
        //         this.setState({ bAnswer1 : answers[0] })
        //         break;
        //     case 1:
        //         this.setState({  bAnswer2 : answers[1]})
        //         break;
        //     case 2:
        //         this.setState({  bAnswer2 : answers[2]})
        //         break;
        //     case 3:
        //         this.setState({  bAnswer2 : answers[3]})
        //         break;
        //     case 4:
        //         this.setState({  bAnswer2 : answers[4]})
        //         break;
        //     default : 
        //         null;
        // }
            
        }
        
    handelBAnswer = (answer, answerIndex, ) => {
        // var  answerObject  = []
        // answerObject.concat(answer)
        // answers.push(answer)
        // console.log("answer of questions --->  ", answer, answerIndex, );  
    }
   
      // console.log("newList ", newList);
    getChangedPos = (currntPos, newPos) => {
      console.log("]]=====  >   ",currntPos, newPos);
    };

    setRef = (ref) => {
      // keep a reference to the dom ref as an instance property
      this.ref = ref;
      // give the dom ref to react-beautiful-dnd
      this.props.innerRef(ref);
    };

    handleAnswers = () => {
      anss = []
      console.log('in check answer   ', this.state.bQuestions);
        for (let i = 0; i < this.state.questionList[0].cola.length ; i++) {
          console.log("dcddccd", this.state.bQuestions[i].option_id );
          anss[i] = this.state.bQuestions[i].option_id;
          // this.state.answers.push(this.state.bQuestions[i].label.option_id)
        }
        console.log(" final answer ===> ", anss);
        this.props.update_answer_data(anss)
        
    }
  
    
    
  render() {

    console.log("======  ?>  b wuestion  ", this.state.bQuestions);
    console.log("====== answer list ====>    ", this.state.bQuestions);

    return (
      <>
      <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-10 mt-3 justify-content-center m-auto">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="row" style={{ alignItems: 'center',  }}>
            <div className="col">
              <div className="">
                <label className="form-label" style={{ color: this.state.text_color }}>
                  {this.state.questionList[0].question}
                </label>
                <label className="form-label pl-2" style={{ color: this.state.text_color, }}>
                   (Re-Arrange Column B Answer)
                </label>
              </div>
              <div className="d-flex flex-column  mb-3 mt-3">
                <p style={{ marginLeft: "5rem", color: this.state.text_color,  }}>
                  Column A
                </p>
                {this.state.questionList[0].cola.map((data, index) => (
                  <div sm={12} md={6} className=" col-8 mt-3 d-flex flex-row">
                    <button
                      className="buttons col-12 col-sm-12 col-md-12 col-lg-12 pt-3"
                      type="text"
                      id="openPopup"
                      key={data.id}
                      style={{
                        // borderColor:
                        //   data.option_id === 
                        //     ? "var(--blue)"
                        //     : "var(--white)",
                        color: "#fff",
                        backgroundColor: this.state.option_color,
                      }}
                    >
                      <UnsafeComponent html={data} />
                    </button>
                    {/* <h6 style={{ color : this.state.text_color, marginTop: '1.5rem', paddingLeft: 50 }}>======</h6> */}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="col-4"
              style={{ marginTop: "5rem", color: this.state.text_color }}
            >
              <div className="d-flex flex-column " >
                <p style={{ marginLeft: "1.5rem" }}>Column B</p>
                <div className="clob ">
                  {/* <ReactSortable
                    list={this.state.bQuestions}
                    setList={(newState) => this.setState({ bQuestions : newState })}
                  > */}
                    {showAns.map((data,index) => (
                        <div sm={12} md={3} className="">
                          <div
                            className="buttons col-12 col-sm-12 col-md-12 col-lg-12 p-2 mt-4"
                            type="text"
                            id="openPopup"
                            key={data.option_id}
                            style={{ 
                              backgroundColor: this.state.correctAnswers[index] == data.option_id ? '#0f9d58' : '#db4437',
                              color: this.state.text_color,
                            }}
                          >
                            {data.value}
                          </div>
                        </div>
                      ))}
                  {/* </ReactSortable> */}
                </div>
                {/* <button onClick={() => this.handleAnswers()}>
                  Done
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
  }
}

function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}


export default connect(mapStateToProps,mapDispatchToProps)(MatchTheFollowingAnswer)