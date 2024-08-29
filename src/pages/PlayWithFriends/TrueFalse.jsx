import axios from 'axios';
import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getChapterQuestionApi, urlToken } from '../../api/api';
import { count_attempts, decr_counter, incr_counter, set_counter_zero, set_question_data, update_answer_data, update_question_data } from '../../Redux_two/Actions/ActionCreator';

var answer ;


const mapStateToProps = (state) => {
    return {
        IncrementDecrement : state.IncrementDecrement,
        // user : state.user,
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

 class TrueFalseScreen extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
            questionsData : '',
            questionDataResponse : this.props.IncrementDecrement.questions,
            subject_background : '',
            text_color : props.textColor,
            button_color : props.buttonColor,
            option_color : props.optionColor,
            selected_option_color : props.selectedOptionColor,
            selectedOption:'',
            selectedOptionIndex:'',
            selectedOptionId:'',
            questionList :[props.questionList],
            currentQuestion : props.currentQuestion,



        }
    }

    componentDidMount(){

        let questionDataResponse=[...this.state.questionDataResponse];
        for(let qdata of questionDataResponse){
            if(qdata.id == this.state.questionList[0].id) {
                qdata.selectedOptionId=(qdata.selectedOptionId==null)? '' : qdata.selectedOptionId; 
            }
        }
        this.setState({questionDataResponse});
        // console.log("que res=== " ,this.state.currentQuestion);
        
        this.setState({ selectedOptionId : this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1)[0].selectedOptionId })
        // console.log('mahesh - ', this.state.questionDataResponse.slice(this.state.currentQuestion,this.state.currentQuestion+1));
       
        setTimeout(()=>{
            this.props.update_question_data(this.state.questionList[0].id)
            this.props.update_answer_data("")
            // console.log(this.props.IncrementDecrement.currentQuestionId);
        
        },300);
    }

    handleOptionSelctionEvent = (option, index, qid, oid) =>{
      this.setState({selectedOption: oid,selectedOptionIndex:index})
      answer = oid;

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
  
          this.setState({questionDataResponse});
          setTimeout(() => {
              // console.log("arr after selected ",this.state.questionDataResponse);
          }, 100);
  
      }, 50);
      
      setTimeout(()=>{
          // console.log(this.state.selectedOption ," ", this.state.selectedOptionIndex," ",qid);
         
          this.props.update_answer_data(oid)
          this.props.count_attempts(1);
      },100);

      setTimeout(() => {

          // console.log("updated data  ==",this.props.IncrementDecrement.currentQuestionAnswer);
      },300);
  }
    
    chapterQuestionApi = async() => {
        const url = await getChapterQuestionApi();
        const body = {
            token : urlToken,
            chapter_id : "9",
            level: "1",
            test_key:"b46sora9"
        }
    
        axios.post(url,body).then((response) => {
            // console.log("Chapter question list is : ",response.data.data[0].question);
            this.setState({ questionsData : response.data.data })
            // console.log("question is :================ ",response.data.data);
            // console.log("question is :================ ",response.data.data);
            
            // console.log("question data is :================ ",this.state.questionData);
    
        }).catch((error) =>{
            // console.log("error is fetching question list: ",error);
        })
    }

    
  render() {
    setTimeout(() => {
        this.setState({ 
            questionDataResponse : this.props.questionDataResponse,
            text_color :  this.state.text_color,
            button_color : this.state.button_color,
            questionList : [this.props.questionList],
            })

    },1500 );
    return (
      <>
      <div className="container col-12 col-sm-12 col-md-12 col-lg-12 mt-3 justify-content-center m-auto">
        <div className="form">
          <div className="container-fluid  p-3 mb-5">
            <div className="row">
              <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                <label className="form-label" style={{ color: this.state.text_color }}>
                  <UnsafeComponent html={this.state.questionList[0].question} />
                </label>
              </div>

              <div className="col-12">
                <Row>
                  {this.state.questionList[0].option.map((item, index) => (
                    <div sm={12} md={3} className=" col-6 mt-3 d-flex"
                    onClick={() => this.handleOptionSelctionEvent(item, index, this.state.questionList[0].id, item.option_id)}>
                        <button
                          className="buttons col-12 col-sm-12 col-md-6 col-lg-8 py-2"
                          type="text"
                          key={item.id}
                          // className="btn btn-primary"
                          style={{
                            color: this.state.text_color,
                            backgroundColor:
                              this.state.selectedOptionId === item.option_id
                              ? this.state.selected_option_color
                              : this.state.option_color,
                          }}
                          // onClick={() => this.handleOptionSelctionEvent(item, index, this.state.questionList[0].id, item.option_id)}
                        >
                          {item.value}
                        
                        {/* <UnsafeComponent html={item.value} /> */}
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


export default connect(mapStateToProps,mapDispatchToProps)(TrueFalseScreen)