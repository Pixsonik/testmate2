import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import bg from "../assets/img/Background/bg-desktop2.png"
import logo from "../assets/img/logo/testmate-logo.png"
import data from "../Json/json"
// import { useEffect } from 'react'
// import { ContactSupport } from '@mui/icons-material'
import "../assets/css/pages.css"
import { useLocation } from 'react-router-dom'
import { counsellingFeedback, urlToken } from "../api/api"
import axios from 'axios'
import LoadingSpinner from '../loader/LoadingSpinner'
import { Link } from "react-router-dom"; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/css/Responsive.css'


const userId = localStorage.getItem("UserId");
const student_name = localStorage.getItem("Name");
const std = localStorage.getItem("Standard");

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
             Your feedback submited Succesfully
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/counselling">
          <Button>OK</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
  

const CounsellingFeedback = () => {
    const [question, setQuestion] = useState(data)
    const [renderData, setRenderData] = useState(data)
    const [showloader, setShowloader] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    const [color,setcolor]=useState(false)

    const location = useLocation()

    // console.log(location)

    // console.log(question)
    // console.log(renderData)
    
    const yesFunc = (id) => {
        setcolor(true)
        // console.log("yes")
        setQuestion(prevValue =>
            [...prevValue].map(el =>
                el.id === id ? ({ ...el, selected: 'Yes' }) : el)
        )
        setRenderData(question)
    }

    const noFunc = (id) => {
        setcolor(true)
        // console.log("no")
        setQuestion(prevValue =>
            [...prevValue].map(el =>
                el.id === id ? ({ ...el, selected: 'No' }) : el)
        )
        setRenderData(question)
    }

    const submitFeedback = () => {
        setShowloader(true)
        // console.log("sub")
        const url = counsellingFeedback()
        let body = {
            user_id: userId,
            token: urlToken,
            student_name: student_name,
            std: std,
            chapter_name: location.chapter_name,
            counseller_name: location.counseller_name,
            description: location.description,
            end_time: location.end_time,
            password: location.password,
            select_date: location.select_date,
            start_time: location.start_time,
            subject_name: location.subject_name,
            url: location.url,
            feedback_form: question
        };
        axios
            .post(url, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((resp) => {
                // console.log(resp)
                setShowloader(false)
                setModalShow(true)
            })
            .catch((err) => {
                // console.log(err)
                setShowloader(false)
            })
    }

    return (
        <>
            <Navbar />
            <Sidebar />

            <div className='content-wrapper' style={{ backgroundImage: `url(${bg})` }}>
                <section className='content p-0'>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                    />
                    <div style={{ padding: "50px 0 0 0" }}>
                        <img src={logo} style={{ width: "150px", display: "block", margin: "auto" }} />
                        <h2 className='feedbackTitle'
                        // style={{ textAlign: "center", marginTop: "37px" ,fontSize:"30px"}}
                        ><strong>Please Give Us a Feedback on Your Counselling Session</strong></h2>

                        {question.map((data) => {
                            return (
                                <>
                                    <div className='feebackRow'
                                    //  style={{ display: "flex", width: "914px",height:"44px", margin: 'auto' }}
                                    >
                                        <div
                                        style={{ width: "50%" }} 
                                        className="FeedbackQuestion">
                                            <p className='feedbackPara'>{data.question}</p>
                                        </div>
                                        <div 
                                        style={{ width: "50%", display: "flex", justifyContent: "space-around" }} 
                                        className="FeedbackBtn">
                                            <button className='feedbackBtn'
                                                    style={{backgroundColor: data.selected == 'No'? "#FBB03850" : "#FBB038" }}
                                                onClick={() => yesFunc(data.id)}>Yes</button>
                                            <button className='feedbackBtn'
                                              style={{backgroundColor: data.selected == 'Yes'? "#FBB03850" : "#FBB038" }}
                                                onClick={() => noFunc(data.id)}
                                            >No</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                        {
                            showloader ? <LoadingSpinner />
                                :
                                <button className='feedbacksubbtn' onClick={() => submitFeedback()}>Submit</button>
                        }


                    </div>
                </section>
            </div >
        </>
    )
}

export default CounsellingFeedback