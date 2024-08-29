import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const TestFinish = () => {

  return (
    <>
      <div className='content-wrapper'>
        <div className='content pt-5'>
          <div className='container col-12 col-lg-9 col-sm-12 col-md-12 '>
            <div className='container-fluid'>
              <div className='row card'>
                <h3 className='text-center pt-3 mb-0'>You Earned</h3>
                <h3 className='text-center pt-3 mb-0'>10 Points</h3>
                <div className='row'>
                  <div className='counselling-Form col-9 col-sm-9 col-md-6 col-lg-4 mt-5 m-auto mb-3'>
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
                      Redeem Now
                    </button>
                  </div>
                  <div className='counselling-Form col-9 col-sm-9 col-md-6 col-lg-4 mb-2 mt-5 m-auto mb-3'>
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
                  </div>
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