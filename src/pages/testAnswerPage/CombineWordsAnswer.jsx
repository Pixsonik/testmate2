import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row } from "react-bootstrap";
import "../../assets/css/pages.css";
import { count_attempts, decr_counter, incr_counter, set_counter_zero, set_question_data, update_answer_data, update_question_data } from '../../Redux_two/Actions/ActionCreator';

var optionIndex = []


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
    set_question_data : (qdata) => {dispach(set_question_data(qdata))},
    count_attempts : (data) => {dispach(count_attempts(data))},



  }
};

var ss= [];
var showAns=[];

class CombineWordsAnswer extends Component {
    constructor(props){
      super(props);

      this.box1 = React.createRef();  
      this.box2 = React.createRef();  
      this.box3 = React.createRef();  
      this.box4 = React.createRef(); 
      this.box5 = React.createRef();  
      this.box6 = React.createRef();  

      this.state = {
          options : [
            "Dragon",
            "Wild",
            "Fly",
            "Animal",
            "King",
            "Fisher",
            "Pen",
            "Pencil",
            "Child",
          ],

          ques : [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ],
        
          noOfQ : ['1', '2','3'],
          optionblock1 : '',
          optionblock2 : '',
          optionblock3 : '',
          optionblock4 : '',
          optionblock5 : '',
          optionblock6 : '',
          
          optionblock1Id : '',
          optionblock2Id : '',
          optionblock3Id : '',
          optionblock4Id : '',
          optionblock5Id : '',
          optionblock6Id : '',

          box1Filled : false,
          box2Filled : false,
          box3Filled : false,
          box4Filled : false,
          box5Filled : false,
          box6Filled : false,

          box1border : true,
          box2border : false,
          box3border : false,
          box4border : false,
          box5border : false,
          box6border : false,

          box1Pressed : false,
          box2Pressed : false,

          selectedButton : [],

          boxIndex : 0,
          
          boxIndex0 : '',
          boxIndex1 : '',
          boxIndex2 : '',

          disableBttn1 : '',
          disableBttn2 : '',
          disableBttn3 : '',
          disableBttn4 : '',
          disableBttn5 : '',
          disableBttn6 : '',

          dontMoveBorder: false,


          question : '',
          qOptions:'',


          questionList : [props.questionList],
          questionDataResponse : props.questionDataResponse,
          button_color : props.buttonColor,            
          text_color : props.textColor,
          option_color : props.optionColor,
          selected_option_color : props.selectedOptionColor,
          answerForSubmit :'',
          currentQuestion : props.currentQuestion,

          submittedAnswers:'',
          correctAnswers:'',
      }
  
}

componentDidMount(){

  ss=[]
  showAns = []
  
  this.setState({submittedAnswers : this.state.questionList[0].submit_answer !== null ? this.state.questionList[0].submit_answer : 0, correctAnswers: this.state.questionList[0].answer})  

  setTimeout(() => {
    console.log("submitted ans===",this.state.submittedAnswers);
    console.log("correct ans===",this.state.correctAnswers);
    console.log("options are ===",this.state.questionList[0].option);
  

    for (let index = 0; index < this.state.submittedAnswers.length; index++) {
      for (let index2 = 0; index2 < this.state.questionList[0].option.length; index2++) {
        
        if (this.state.submittedAnswers[index] == this.state.questionList[0].option[index2].option_id ) {
          ss[ss.length] = this.state.questionList[0].option[index2]
        }
      }
    }
    console.log(ss);

    setTimeout(() => {
      for (let index = 0; index < this.state.correctAnswers.length; index++) {
        showAns[index] = ss[index]
        
      }
      console.log("show ans data -- ", showAns);
    }, 20);

    this.setState({ optionblock1 : ss[0].value })
    this.setState({ optionblock2 : ss[1].value })
    this.setState({ optionblock3 : ss[2].value })
    this.setState({ optionblock4 : ss[3].value })
    this.setState({ optionblock5 : ss[4].value })
    this.setState({ optionblock6 : ss[5].value })
  }, 20); 

  setTimeout(()=>{
    this.props.update_question_data(this.state.questionList[0].id)
    console.log(this.props.IncrementDecrement.currentQuestionId);

  },300);
}


getOptions = (item ,index, oid,qid,data) => {
  var ans = [];
  console.log("item is==- ",item);
  setTimeout(()=> {


    let questionDataResponse=[...this.state.questionDataResponse];

    for(let qdata of questionDataResponse){
        if(qdata.id == qid){
            console.log('selected ', qdata.id);
            qdata.selectedOptionId[0] = data;
            qdata.selectedOptionId[1] = data;
            qdata.selectedOptionId[2] = data;
            qdata.selectedOptionId[3] = data;
            qdata.selectedOptionId[4] = data;
            qdata.selectedOptionId[5] = data;
        }
    }
    this.setState({ selectedOptionId : oid })

    this.setState({questionDataResponse});
    setTimeout(() => {
        console.log("selected ans arr ",this.state.questionDataResponse);
    }, 100);

    // ans[0] = this.state.optionblock1+this.state.optionblock2.toLowerCase()
    // ans[1] = this.state.optionblock3+this.state.optionblock4.toLowerCase() 
    // ans[2] = this.state.optionblock5+this.state.optionblock6.toLowerCase()
   
    
    ans[0] = this.state.optionblock1Id 
    ans[1] = this.state.optionblock2Id
    ans[2] = this.state.optionblock3Id  
    ans[3] = this.state.optionblock4Id 
    ans[4] = this.state.optionblock5Id 
    ans[5] = this.state.optionblock6Id
    this.setState({ answerForSubmit : ans})      
    setTimeout(() => {
      
      console.log(this.state.answerForSubmit);
      this.props.update_answer_data(this.state.answerForSubmit)
      this.props.count_attempts(1);
    }, 500);
    
  },100);
    
    if(!this.state.box1Filled ){
      this.fillBox1(item,index, oid);
      this.setState({ boxIndex: this.state.dontMoveBorder ? '' : 1 , disableBttn1: item })
    }else if (!this.state.box2Filled ) {
      this.fillBox2(item,index, oid)
      this.setState({ boxIndex: this.state.dontMoveBorder ? '' : 2, disableBttn2 : item })
    }else if (!this.state.box3Filled ) {
      this.fillBox3(item,index, oid) 
      this.setState({ boxIndex: this.state.dontMoveBorder ? '' : 3, disableBttn3 : item })
    }else if (!this.state.box4Filled  ) {
      this.fillBox4(item,index, oid)
      this.setState({ boxIndex: this.state.dontMoveBorder ? '' : 4, disableBttn4 : item })
    }else if (!this.state.box5Filled ) {
      this.fillBox5(item,index, oid)
      this.setState({ boxIndex: this.state.dontMoveBorder ? '' : 5 , disableBttn5: item})
    }else if (!this.state.box6Filled ) {
      this.fillBox6(item,index, oid)
      this.setState({ boxIndex: this.state.dontMoveBorder ? '' : 6, disableBttn6: item })
    }
  
}

  handleCategorySelect = (item,index) => { 

    this.selectedArray = this.state.selectedButton;
    
    if (this.selectedArray.indexOf(index) < 0) {
      this.selectedArray.push(index);
    } else {
      // this.selectedArray.splice(this.selectedArray.indexOf(index), 1)
      this.selectedArray.pop(index)
      console.log( ' splice item  --->  ' ,this.selectedArray.splice(this.selectedArray.indexOf(index), 1));
    }
    
    this.setState({ selectedButton: this.selectedArray });
    console.log("button   ---< ", this.state.selectedButton);
  };

  deSelectCategorySelect = (item,index) => {

    this.selectedArray = this.state.selectedButton;
    
    if (this.selectedArray.indexOf(index) < 0) {
      this.selectedArray.pop(index);
    } else {
      // this.selectedArray.splice(this.selectedArray.indexOf(index), 1)
      // this.selectedArray.pop(index)
      console.log( ' splice item  --->  ' ,this.selectedArray.splice(this.selectedArray.indexOf(index), 1));
    }
    
    this.setState({ selectedButton: this.selectedArray });
    console.log("button   ---< ", this.state.selectedButton);
  };

  
  fillBox1 = (item,index, oid) => {
    this.state.box1Filled ?  this.setState({ box1Filled: true,  box1border: true,box2border: false ,box3border: false, box4border: false, box5border: false, box6border: false}) : 
    this.setState({ optionblock1: item, optionblock1Id: oid,  box1Filled: true , boxIndex0 : index, box1border: false,box2border: this.state.box2Filled ? false : true ,box3border: false, box4border: false, box5border: false, box6border: false})
    // this.handleCategorySelect(item,index);
    // console.log("itemm  --->  ", this.state.boxIndex);
  }
  fillBox2 = (item,index, oid) => {
    this.state.box2Filled ? this.setState({ box2Filled:false ,box1border: false,box2border: true ,box3border: false, box4border: false, box5border: false, box6border: false})  :
    this.setState({ optionblock2: item, optionblock2Id: oid, box2Filled: true , boxIndex1 : index, box1border: false,box2border: false ,box3border: this.state.box3Filled ? false : true, box4border: false, box5border: false, box6border: false} )
    // this.handleCategorySelect(item,index);
    // console.log("itemm  --->  ", index);
  }

  fillBox3 = (item,index, oid) => {
    this.state.box3Filled ? this.setState({ box3Filled:false, box1border: false,box2border: false ,box3border: true, box4border: false, box5border: false, box6border: false})  :
    this.setState({ optionblock3: item, optionblock3Id: oid, box3Filled: true , boxIndex2 : index, box1border: false,box2border: false ,box3border: false, box4border: this.state.box4Filled ? false : true, box5border: false, box6border: false })
  }
  fillBox4 = (item,index, oid) => {
    this.state.box4Filled ? this.setState({ box4Filled:false, box1border: false,box2border: false ,box3border: false, box4border: true, box5border: false, box6border: false}) :
    this.setState({ optionblock4: item, optionblock4Id: oid, box4Filled: true , boxIndex : item , box1border: false,box2border: false ,box3border: false, box4border: false, box5border: this.state.box5Filled ? false : true, box6border: false})
  }

  fillBox5 = (item,index, oid) => {
    this.state.box5Filled ? this.setState({box5Filled:false, box1border: false,box2border: false ,box3border: false, box4border: false, box5border: true, box6border: false}) :
    this.setState({ optionblock5: item, optionblock5Id: oid, box5Filled: true , boxIndex : item , box1border: false,box2border: false ,box3border: false, box4border: false, box5border: false, box6border: this.state.box6Filled ? false : true})
  }
  fillBox6 = (item,index, oid) => {
    this.state.box6Filled ? this.setState({box6Filled:false, box1border: false,box2border: false ,box3border: false, box4border: false, box5border: false, box6border: true}) :
    this.setState({ optionblock6: item, optionblock6Id: oid, box6Filled: true , boxIndex : item, box6border: false })
  }

  
  handleBoxSelect = (item,index) => {
    console.log("itemmsas  --->  ",item,index);
    switch (index) {
      case 0:
        this.setState({ box1Filled : false, boxIndex : 0, dontMoveBorder : true })
        break;
      case 1:
        this.setState({ box2Filled : false, boxIndex: 1, dontMoveBorder : true })
        break;
      case 2:
        this.setState({ box3Filled : false, boxIndex: 2 , dontMoveBorder : true})
        break;
      case 3:
        this.setState({ box4Filled : false , boxIndex: 3 , dontMoveBorder : true});
        break;
      case 4:
        this.setState({ box5Filled : false , boxIndex: 4 , dontMoveBorder : true});
        break;
      case 5:
        this.setState({ box6Filled: false , boxIndex: 5, dontMoveBorder : true});
        break;
      default: 
      this.setState({ box6Filled: true , boxIndex: ''});
        break;
    }
  }

  render() {

    return (
      <>
      <div>
        <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-10 mt-3 justify-content-center m-auto">
          <div className="form">
            <div className="container-fluid">
              <div className="row">
                <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-3">
                  <label className="form-label" style={{ color: this.state.text_color }}>
                    <UnsafeComponent html={this.state.questionList[0].question} />
                  </label>
                </div>
                <div className="col-8">
                  <Row>
                    {showAns.map((data, index) => {
                      return (
                        <div sm={12} md={6} className=" col-6 mt-3">
                          <button
                            className="combinebuttons col-12 col-sm-12 col-md-12 col-lg-12 mt-4"
                            style={{
                              // borderColor:
                              //   this.state.boxIndex == index ? this.state.text_color : this.state.button_color,
                              // borderStyle: "dotted",
                              color: this.state.text_color,
                              backgroundColor: this.state.correctAnswers[0] == data.option_id ? '#0f9d58' : 
                                            this.state.correctAnswers[1] == data.option_id ? '#0f9d58' : 
                                            this.state.correctAnswers[2] == data.option_id ? '#0f9d58' : 
                                            this.state.correctAnswers[3] == data.option_id ? '#0f9d58' : 
                                            this.state.correctAnswers[4] == data.option_id ? '#0f9d58' : 
                                            this.state.correctAnswers[5] == data.option_id ? '#0f9d58' : 
                                            '#db4437', 
                            }}
                            // onClick={() => this.handleBoxSelect(data, index)}
                          >
                            <UnsafeComponent
                              html={
                                index === 0
                                  ? this.state.optionblock1
                                  : index === 1
                                  ? this.state.optionblock2
                                  : index === 2
                                  ? this.state.optionblock3
                                  : index === 3
                                  ? this.state.optionblock4
                                  : index === 4
                                  ? this.state.optionblock5
                                  : index === 5
                                  ? this.state.optionblock6
                                  : ""
                              }
                            />
                          </button>
                        </div>
                      );
                    })}
                  </Row>
                </div>
                <div className="col-4">
                  {this.state.noOfQ.map((data, index) => (
                    <div className="d-flex mt-3">
                      <span className="mt-4 p-2 text-white fw-bold">
                        =&nbsp;&nbsp;
                      </span>
                      <button
                        className="combinebuttons col-12 col-sm-12 col-md-12 col-lg-12 mt-4 p-1 p-auto"
                        style={{
                          borderColor:
                            this.state.boxIndex === index ? this.state.text_color : this.state.button_color,
                          // borderStyle: "dotted",
                          color: this.state.text_color,
                          backgroundColor: this.state.button_color,
                        }}
                      >
                        <UnsafeComponent
                          html={
                            index === 0 && this.state.optionblock1 && this.state.optionblock2
                              ? this.state.optionblock1 + this.state.optionblock2.toLowerCase()
                              : index === 1 && this.state.optionblock3 && this.state.optionblock4
                              ? this.state.optionblock3 + this.state.optionblock4.toLowerCase()
                              : index === 2 && this.state.optionblock5 && this.state.optionblock6
                              ? this.state.optionblock5 + this.state.optionblock6.toLowerCase()
                              : ""
                          }
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-around text-center mt-5 ">
                  <div className="col-12">
                    {this.state.questionList[0].option.map((data, index) => {
                      return (
                        <button
                          className="combinebuttons col-12 col-sm-12 col-md-6 col-lg-3 mt-4 mx-2"
                          style={{
                            color: this.state.button_color,
                            backgroundColor:
                              this.state.disableBttn1 === data.value
                                ? "#858585"
                                : this.state.disableBttn2 === data.value
                                ? "#858585"
                                : this.state.disableBttn3 === data.value
                                ? "#858585"
                                : this.state.disableBttn4 === data.value
                                ? "#858585"
                                : this.state.disableBttn5 === data.value
                                ? "#858585"
                                : this.state.disableBttn6 === data.value
                                ? "#858585"
                                : this.state.option_color,
                          }}
                          disabled={
                            this.state.disableBttn1 === data.value
                              ? true
                              : this.state.disableBttn2 === data.value
                              ? true
                              : this.state.disableBttn3 === data.value
                              ? true
                              : this.state.disableBttn4 === data.value
                              ? true
                              : this.state.disableBttn5 === data.value
                              ? true
                              : this.state.disableBttn6 === data.value
                              ? true
                              : false
                          }
                          onClick={() =>
                            this.getOptions(
                              data.value,
                              index,
                              data.option_id,
                              this.state.questionList[0].id,
                              data
                            )
                          }
                        >
                          <UnsafeComponent html={data.value} />
                        </button>
                      );
                    })}
                  </div>
                </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(CombineWordsAnswer)