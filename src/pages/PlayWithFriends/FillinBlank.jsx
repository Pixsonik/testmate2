import React, { Component } from 'react'
import { Row } from "react-bootstrap";
import "../../assets/css/pages.css";
import { connect } from 'react-redux';
import { count_attempts, decr_counter, incr_counter, set_counter_zero, update_answer_data, update_question_data } from "../../Redux_two/Actions/ActionCreator";


var answers = [];


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

class FillinBlank extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            Questions : [],
            questionsFullForm : '',
            firstAnswer : '',
            secondAnswer : '',
            firstAnswerId : '',
            secondAnswerId : '',
            question : '',
            AnswerOneFilled : false,
            questionsData:'',
    
            questionsData : '',
            questionDataResponse : this.props.IncrementDecrement.questions,
            subject_background : '',
            text_color : props.textColor,
            button_color : props.buttonColor,
            option_color : props.optionColor,
            selected_option_color : props.selectedOptionColor,

            questionList : [props.questionList],
    
            answerForSubmit :[]
          }
        }
      
        componentDidMount(){
                  // console.log("qusion((())) " , this.state.questionDataResponse);
                  this.setState({ AnswerOneFilled : false })
                  
          
                  let questionDataResponse=[...this.state.questionDataResponse];
                  
                  for(let qdata of questionDataResponse){
                      if(qdata.id == this.state.questionList[0].id) {
                          qdata.selectedOptionId=(qdata.selectedOptionId==null)? ['',''] : qdata.selectedOptionId; 
                          this.setState({ firstAnswerId : qdata.selectedOptionId[0].option_id, firstAnswer: qdata.selectedOptionId[0].value})
                          this.setState({ secondAnswerId : qdata.selectedOptionId[1].option_id, secondAnswer: qdata.selectedOptionId[1].value})
                      }
                  }
                  this.setState({questionDataResponse});
          
                  // console.log("question list in fill up screen =====",this.state.questionList);
                  this.setState({ questionsData : this.state.questionList[0],Questions :this.state.questionList[0], 
                      question : this.state.questionList[0].question , questionsFullForm:this.state.questionList[0].break_question})
          
                  setTimeout(()=>{
                      this.props.update_question_data(this.state.questionList[0].id)
                      this.props.update_answer_data("")
                      // console.log(this.props.IncrementDecrement.currentQuestionId);
          
                      // console.log("lenth of array : ", this.state.questionsFullForm.length);
                  
                  },300);
              }

              handleAnswe = (item, index,oid,qid,data) => {
                        // console.log(" iitemmm  ---> ", item);
                        answers[0] = oid;
                        // console.log(answers);
                
                
                        let questionDataResponse=[...this.state.questionDataResponse];
                
                        for(let qdata of questionDataResponse){
                            if(qdata.id == qid){
                                // console.log('selected ', qdata.id);
                                qdata.selectedOptionId[0] = data;
                                // setTimeout(() => {
                                //     answers[0] = qdata.selectedOptionId[0].option_id
                                // }, 50);
                            }
                        }
                        // this.setState({ selectedOptionId : oid })
                        
                
                        this.setState({questionDataResponse});
                        setTimeout(() => {
                            // console.log("selected answ arr ",this.state.questionDataResponse);
                            // console.log("answer is =====",answers);
                        }, 1000);
                        
                
                        
                        setTimeout(()=>{
                            this.setState({answerForSubmit : answers})
                            // console.log(this.state.answerForSubmit);
                            this.props.update_answer_data(answers.toString())
                            this.props.count_attempts(1);
                        },100);
                        
                            
                            if (this.state.firstAnswer === '' ) {
                                this.setState({ firstAnswer : item,firstAnswerId: oid, AnswerOneFilled : true })
                            }if(this.state.firstAnswer !== '' ){
                                this.setState({ firstAnswer : item,firstAnswerId: oid, AnswerOneFilled: true })
                            }
                
                           
                    }
                
                    handleAnswer2 = (item,index,oid,qid,data) => {
                        // console.log(" iitemmm 2 ---> ", item);
                        
                        answers[1] = oid;
                        // console.log(answers);
                
                
                        let questionDataResponse=[...this.state.questionDataResponse];
                
                        for(let qdata of questionDataResponse){
                            if(qdata.id == qid){
                                // console.log('selected ', qdata.id);
                                qdata.selectedOptionId[1] = data;
                            }
                        }        
                
                        this.setState({questionDataResponse});
                        // setTimeout(() => {
                        //     console.log("selected answ arr ",this.state.questionDataResponse);
                        // }, 100);
                        
                        
                        setTimeout(()=>{
                            this.setState({answerForSubmit : answers})
                            // console.log(this.state.answerForSubmit);
                            this.props.update_answer_data(answers.toString())
                            this.props.count_attempts(1);
                        },100); 
                
                        if (this.state.secondAnswer === '' ) {
                            this.setState({ secondAnswer : item, secondAnswerId: oid, AnswerOneFilled : true })
                        }if(this.state.secondAnswer !== '' ){
                            this.setState({ secondAnswer : item, secondAnswerId: oid, AnswerOneFilled : true })
                        }
                    }
  clickFunction = () => {
    // console.log("fsddgg");
  }

  checkFill = (item,index,oid,qid,data) => {
    if(this.state.questionsFullForm.length > 2 &  this.state.AnswerOneFilled ){
    // if ( ) {
            this.handleAnswer2(item,index,oid,qid,data)
        // }
    }else{
        this.handleAnswe(item,index,oid,qid,data)
    }
}

  render() {
    return (
      // <div>
      //   {/* <button type='button' onClick={() =>this.clickFunction() } >
      //     csds
      //   </button> */}
      // </div>
      <div className="container col-12 col-sm-12 col-md-12 col-lg-12 mt-3 justify-content-center m-auto">
<form className="form">
  <div className="container-fluid p-3 mb-5">
    <div className="row">
     <div className=" counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5 ">
        <label className="form-label" style={{ color: this.state.text_color }}>
          {this.state.questionsFullForm[0] === "" ? 
          (
            <span>
              <input
                type="text"
                value={this.state.firstAnswer}
                className="form-control-input border-bottom"
                style={{
                  borderColor: this.state.button_color,
                  borderStyle: "none",
                  backgroundColor: "transparent",
                  textAlign:'center',
                  width: "30%",
                }}
              />
            </span>
          ) 
          // <h2>dcdc</h2>
          : (
            <span>{this.state.questionsFullForm[0]}</span>
          )}
          {this.state.questionsFullForm[0] != "" ?
           (
            <span>
              <input
                type="text"
                value={this.state.firstAnswer}
                className="form-control-input border-bottom"
                style={{
                  borderColor: this.state.button_color,
                  borderStyle: "none",
                  backgroundColor: "transparent",
                  textAlign:'center',
                  width: "30%",
                }}
              />
            </span>
          ) 
          // <h2>dcdc</h2>
          : null}
          {this.state.questionsFullForm[1] === "" ? null : (
            <span>{this.state.questionsFullForm[1]}</span>
          )}
          {this.state.questionsFullForm[1] != "" && this.state.questionsFullForm.length > 2 ?
          (
            <span>
              <input
                type="text"
                value={this.state.secondAnswer}
                className="form-control-input border-bottom"
                style={{
                  borderColor: this.state.button_color,
                  backgroundColor: "transparent",
                  textAlign:'center',
                  borderStyle: "none",
                  width: "auto",
                }}
              />
            </span>
          ) 
          // <h2>dcdc</h2>
          : null}
          {this.state.questionsFullForm[2] === "" ? null : (
            <span>{this.state.questionsFullForm[2]}</span>
          )}
        </label>
      </div> 

          {/* <button
            type="button"
            
            onClick={() => this.clickFunction() }
           >
            dsdsd
          </button> */}

      <div className="col-12">
        <Row>
          {this.state.questionList[0].option.map((data, index) => (
            <div sm={12} md={3} className=" col-6 mt-3"
            onClick={() => this.checkFill(data.value, index, data.option_id, this.state.questionList[0].id,data)}>

              <button
                // onClick={() => this.checkFill(data.value, index, data.option_id, this.state.questionList[0].id,data)}
                className="buttons col-12 col-sm-12 col-md-12 col-lg-12 p-3"
                type="button"
                // key={data.option_id + index}
                style={{
                  color: this.state.text_color,
                  backgroundColor: 
                  this.state.firstAnswerId === data.option_id
                    ? this.state.selected_option_color
                    : this.state.secondAnswerId === data.option_id
                    ? this.state.selected_option_color
                    : this.state.option_color,
                }}
                // onClick={() => console.log(data.value) }
                // onClick={() => console.log(data.value,index,data.option_id,this.state.questionList[0].id,data) }
                // onClick={() => this.checkFill(data.value,index,data.option_id,this.state.questionList[0].id,data) }
              >
                
                <UnsafeComponent html={data.value} />
              </button>
            </div>
          ))}
        </Row>
      </div>
    </div>
  </div>
</form>
       </div> 
    )
  }
}

function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default connect(mapStateToProps,mapDispatchToProps)(FillinBlank)
