import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getContestQuestion, urlToken } from "../../api/api";
import "../../assets/css/pages.css";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo/testmate-logo.png'

export default function TestAnswerCheck() {

    const navigate = useNavigate()

    const user_Id = localStorage.getItem("UserId");
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(()=>{
        checkAnswers();
    },[])

    const checkAnswers = () =>{
        const url = getContestQuestion();
        const body = {
          token: urlToken,
          contest_id: localStorage.getItem('contestId'),
          user_id: user_Id,
          contest_key: localStorage.getItem('contestkey'),
          status: "check"
        }
        axios.post(url, body, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        .then((resp)=>{
            console.log(resp.data);
            setAnswers(resp.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleNext = () => {
        if (currentQuestionIndex < answers.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }
    const handlePrev = () => {
        if (currentQuestionIndex != 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }

    return (
        <>
        
            <div className='testAnswers'>
                <div style={{width:'150px'}} className='mainLogo'>
                    <img src={logo} style={{width:'100%', height:'100%'}} alt="" />
                </div>
                <div className='testsubAnswers'>
                <div className='questionlength'>
                              <p  style={{margin:'0', fontSize:'18px',color:'black', fontWeight:'500'}}> Q : {currentQuestionIndex + 1} / {answers.length}</p>
                              <button className='nextAnsCheck' onClick={()=>{navigate('/schedulebanner')}}>Back</button>
                            </div>
                    {
                        answers.length > 0 &&
                        <div className='mcqSection'>
                            <p className='mcqQuestionss' style={{ margin: '0', fontSize:'20px', color:'black',
    fontWeight: '600'}}>{ReactHtmlParser(answers[currentQuestionIndex].question)}
   
{
answers[currentQuestionIndex].question_type == "4" && (<>
   <span><input type="text" className="form-control-input borderOffillBlank"
     value={
        answers[currentQuestionIndex].submit_answer[0] ===  answers[currentQuestionIndex].option[0].option_id
         ? 
         answers[currentQuestionIndex].option[0].value 
         :
          answers[currentQuestionIndex].submit_answer[0] === answers[currentQuestionIndex].option[1].option_id
           ? 
           answers[currentQuestionIndex].option[1].value 
           : 
           answers[currentQuestionIndex].submit_answer[0] ===  answers[currentQuestionIndex].option[2].option_id
            ?
             answers[currentQuestionIndex].option[2].value
            :
            answers[currentQuestionIndex].option[3].value
         } style={{ borderColor:'rgb(25, 121, 193)', borderStyle:'none', padding:'0', backgroundColor:'transparent', textAlign:'center', width:'30%'}}/></span>
</>)
} 

         </p>
                            <div className='mcqOptions'>
                                {
                                    answers[currentQuestionIndex].option.map((items) => {
                                        return (
                                            <div
                                              className='answerPara optionsButton'
                                                key={items.option_id}
                                                style={{
                                                    border: 'none',
                                                    padding:'8px ',
                                                    fontSize:'18px',
                                                    fontWeight:'500',
                                                    borderRadius:'30px',
                                                   
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    color:'white',
                                                    background: answers[currentQuestionIndex].answer[0] === items.option_id ? 'green' : answers[currentQuestionIndex].submit_answer[0] === items.option_id ? 'red': '#000084'
                                                }}
                                            >
                                                {ReactHtmlParser(items.value)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='explanationOfAns'>{
                                answers[currentQuestionIndex].note != null && 
                              <h5 style={{color:'black'}}>Explanation</h5>
                                }
                              <div style={{color:'black'}}>
                              {ReactHtmlParser(answers[currentQuestionIndex].note)}
                              </div>
                            </div>
                        </div>
                    }
                    <div className='backAndNextAns'>
                        <button className='nextAnsCheck' onClick={handlePrev}>Prev</button>
                        <button className='nextAnsCheck' onClick={handleNext}>Next</button>

                    </div>
                </div>
            </div>
        </>
    )
}
