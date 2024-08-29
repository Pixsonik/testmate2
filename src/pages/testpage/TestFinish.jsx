import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import Bronze from "../../assets/img/medal/bronz.png";
import Silver from "../../assets/img/medal/silver.png";
import Gold from "../../assets/img/medal/gold.png";
import Disable from "../../assets/img/medal/disable.png";
import { useNavigate } from 'react-router-dom';
import "../../assets/css/pages.css"

const TestFinish = (props) => {

  const navigate = useNavigate();
  var info = props.info
  const [testSubmitData, setTestSubmitData] = useState(props.testSubmitData)
  const [points, setPoints] = useState(props.testSubmitData.data.points_earn)
  const [medalType, setMedalType] = useState(props.testSubmitData.data.medal_type)

  useEffect(() => {
    // console.log("testSubmitData==== ",testSubmitData , medalType);
    setTimeout(() => {
      console.log("info data --- ",info);
    }, 3000);
  }, []);

  const navigateToHome = () => {
    console.log("navitafefef");
    navigate("/ ")
  }
  const navigateToShowAnswer = () => {
    navigate("/testscreenforanswer", {
      state: {
        id: info.id,
        levelName: info.levelName,
        testlevel: info.testlevel,
        allInfo: info.allInfo,
        session_Key: info.session_Key,
        duration: info.duration,
        semesterId: info.semesterId,
      },
    });
  }
  
  return (
    <>
      <div className='bg-light'>
        <div className='pt-5'>
          <div className='container col-12 col-lg-5 col-sm-12 col-md-12 '>
            <div className='container-fluid'>
              <div>

                <img 
                  src={
                    medalType == "Bronze"
                    ? Bronze
                    : medalType == "Silver"
                    ? Silver
                    : medalType == "Gold"
                    ? Gold
                    : Disable
                  }
                  
                  alt=""
                  className="semImg semAdd mt-3 mb-3 finishimg"
                  // style={{ width: "100%", height: "auto" }}
                />
                <h3 className='text-center pt-3 mb-0'>You Earned</h3>
                <h3 className='text-center pt-3 mb-0'>{points} Points</h3>
                <div className='row'>
                  <div className='counselling-Form col-9 col-sm-9 col-md-6 col-lg-6 mt-5 m-auto mb-3'>
                    <button
                      type='button'
                      className='btn btn btn-md'
                      onClick={() => navigateToHome()}
                      style={{
                        width: '100%',
                        borderRadius: '4rem',
                        backgroundColor: 'var(--blue)',
                        color: 'var(--white)',
                        boxShadow:
                          '0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)',
                      }}
                    >
                      Go Back
                    </button>
                  </div>

                  <div className='counselling-Form col-9 col-sm-9 col-md-6 col-lg-6 mt-5 m-auto mb-3'>
                    <button
                      type='button'
                      className='btn btn btn-md'
                      onClick={() => navigateToShowAnswer()}
                      style={{
                        width: '100%',
                        borderRadius: '4rem',
                        backgroundColor: 'var(--blue)',
                        color: 'var(--white)',
                        boxShadow:
                          '0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)',
                      }}
                    >
                      Check Answers
                    </button>
                  </div>
                  {/* <div className='counselling-Form col-9 col-sm-9 col-md-6 col-lg-4 mb-2 mt-5 m-auto mb-3'>
                    <button
                      type='button'
                      className='btn btn btn-md'
                      style={{
                        width: '100%',
                        borderRadius: '4rem',
                        backgroundColor: 'var(--blue)',
                        color: 'var(--white)',
                        boxShadow:
                          '0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)',
                      }}
                    >
                      Share with friends
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// function UnsafeComponent({ html }) {
//   return <div dangerouslySetInnerHTML={{ __html: html }} />;
// }

export default TestFinish;
