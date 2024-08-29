import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "../../assets/css/pages.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  UPDATE_ANSWER,
  UPDATE_QUESTION,
} from "../../Redux/Action/IncreDecreSlice";
import { COUNT_QUESTION_ATTEMPTS } from "../../Redux/Action/ActionTypes";
import { count_attempts, decr_counter, incr_counter, set_counter_zero, set_question_data, update_answer_data, update_question_data } from "../../Redux_two/Actions/ActionCreator";


var answer = [];

const mapStateToProps = (state) => {
    return {
        IncrementDecrement : state.IncrementDecrement,
        // user : state.user,
    }
  }
  
  const mapDispatchToProps = (dispach) => {
      return{

          // incrementQuestion: (qdata) => dispatch(incrementQuestion(qdata)),
          incr_counter : (count) => {dispach(incr_counter(count))},
          decr_counter : (count) => {dispach(decr_counter(count))},
          set_counter_zero : (count) => {dispach(set_counter_zero(count))},
          update_question_data : (qData) => {dispach(update_question_data(qData))},
          update_answer_data : (data) => {dispach(update_answer_data(data))},
          set_question_data : (qdata) => {dispach(set_question_data(qdata))},
          count_attempts : (data) => {dispach(count_attempts(data))},

          
        }
  
  };

class MultipleChoiceQuestionScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            questionsData : null,
            questionDataResponse : this.props.IncrementDecrement.questions,
            subject_background : '',
            text_color : props.textColor,
            button_color : props.buttonColor,
            option_color : props.optionColor,
            selected_option_color : props.selectedOptionColor,
            selectedOption:'',
            selectedOptionIndex:'',
            selectedOptionId:'',
            questionList : [props.questionList],
            currentQuestion : props.currentQuestion,
            sample:'',
            // imageOption:[
            //     {image: require('../../assets/image/maths_option1.jpg')},
            //     {image: require('../../assets/image/maths_option2.jpg')},
            //     {image: require('../../assets/image/maths_option3.jpg')},
            //     {image: require('../../assets/image/maths_option4.jpg')},  
            //   ]
        }
    }

    componentDidMount(){
        let questionDataResponse=[...this.state.questionDataResponse];
        for(let qdata of questionDataResponse){
            if(qdata.id == this.state.questionList[0].id) {
                // qdata.selectedOptionIndex=(qdata.selectedOptionIndex==null) && '' ;
                qdata.selectedOptionId=(qdata.selectedOptionId==null)? '' : qdata.selectedOptionId;
            }
        }
        this.setState({questionDataResponse});
        // console.log("currr data== ",this.state.currentQuestion);

        this.setState({selectedOptionId : this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1)[0].selectedOptionId,})  
        // console.log('mahesh - ', this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1)[0].selectedOptionId);
        // console.log("currentQuestionRedux ////////////// : ", this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1));
        this.setState({ selectedOptionId : this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1)[0].selectedOptionId })

             
        setTimeout(()=>{
            // this.setState({ sample : this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1)[0] })
            // console.log("question=======", this.state.sample );

            
            this.props.update_question_data(this.state.questionList[0].id)
            this.props.update_answer_data("")
            // console.log("current question id ", this.props.IncrementDecrement.currentQuestionId);
            // console.log('question resp list is ', this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1)[0]);
            // console.log('selected option id is ', this.state.selectedOptionId);
            // console.log('options list is ', this.state.questionList[0].option);
            
        },300);

      
    }

    handleOptionSelctionEvent = (option, index, qid, oid) =>{
      console.log(index, qid, oid);
        this.setState({selectedOption: oid,selectedOptionIndex:index}, ()=> {
            let questionDataResponse=[...this.state.questionDataResponse];
            for(let qdata of questionDataResponse){
                if(qdata.id == this.state.questionList[0].id) {
                    // qdata.selectedOptionIndex=(qdata.selectedOptionIndex==null) && '' ;
                    qdata.selectedOptionId=(qdata.selectedOptionId==null)? '' : qdata.selectedOptionId;
                }
            }
            this.setState({questionDataResponse});
        } )
        answer[0] = oid;

        setTimeout(() => {
            let questionDataResponse=[...this.state.questionDataResponse];
            // this.setState({ selectedOptionIndex : [...this.state.selectedOptionIndex, index] })
    
            for(let qdata of questionDataResponse){
                if(qdata.id == qid){
                    // console.log('selected ', qdata.id);
                    qdata.selectedOptionId = oid;
                    // qdata.selected=(qdata.selected==null)? index : index;
                }
            }
            this.setState({ selectedOptionId : oid })
    
            // for(let data of renderData){
            //   if(data.subject_id==id){
            //     data.selected=(data.selected==null)?true:!data.selected;
            //     break;
            //   }
            // }
            this.setState({questionDataResponse});
            setTimeout(() => {
                // console.log("arr after selected",this.state.questionDataResponse);
            }, 100);
    
        }, 50);

       

        
        setTimeout(()=>{
            // console.log(this.state.selectedOption ," ", this.state.selectedOptionIndex," ",qid);
           
            this.props.update_answer_data(answer)
            this.props.count_attempts(1);
        },100);

        setTimeout(() => {

            // console.log("updated data  ==",this.props.IncrementDecrement.currentQuestionAnswer);
        },300);

       

    }
    

  render() {  
    // setTimeout(() => {
    //     this.setState({ 
    //         questionDataResponse : this.props.questionDataResponse,
    //         text_color :  this.props.text_color,
    //         button_color : this.props.button_color,
    //         questionList : [this.props.questionList],
            
    //     })

    // },1500 );
    // console.log("---> state  in MCQ  ", this.state.text_color);
   

    return (
      <>
      <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 mt-3 justify-content-center m-auto">
        <div className="form">
          <div className="container-fluid  p-3 mb-5">
            <div className="row">
              <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                <h3
                 className="form-label123" 
                 style={{
                   color: "black"
                  //  color: this.state.text_color
                    }}>
                  <UnsafeComponent html={this.state.questionList[0].question} />
                </h3>
              </div>
              <div className="col-12">
                <Row>
                  {this.state.questionList[0].option.map((data, index) => (
                    <div  md={3} className=" col-lg-6 col-sm-12 mt-3">
                      <button
                        className="buttons col-12 col-sm-12 col-md-12 col-lg-12 pt-3"
                        type="text"
                        key={data.option_id + index}
                        style={{
                          color: this.state.text_color,
                          backgroundColor:
                            this.state.selectedOptionId === data.option_id
                              ? this.state.selected_option_color
                              : "#000084",
                        }}
                        onClick={() =>
                          this.handleOptionSelctionEvent(
                            data,
                            index,
                            this.state.questionList[0].id,
                            data.option_id
                          )
                        }
                      >
                        <UnsafeComponent html={data.value} />
                      </button>
                    </div>
                  ))}
                </Row>
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

export default connect(mapStateToProps,mapDispatchToProps)(MultipleChoiceQuestionScreen)
