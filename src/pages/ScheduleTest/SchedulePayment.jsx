import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Bg2 from '../../assets/img/Background/bg-desktop2.png';
import { Link } from 'react-router-dom';
import Card from '../../assets/img/schedulePayment/vector.png';
import Phone from '../../assets/img/schedulePayment/phonepay.png';
import Google from '../../assets/img/schedulePayment/google.png';
import Apple from '../../assets/img/schedulePayment/apple.png';
import Paytm from '../../assets/img/schedulePayment/paytm.png';
import Coin from '../../assets/img/schedulePayment/coin.png';

// import { Link } from 'react-router-dom';

const SchedulePayment = () => {
  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: '100%',
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='content-wrapper' style={myStyle}>
        <section className='content p-0 container-fluid'>
          <div className='col-12 col-md-12 col-lg-6 col-sm-6 mt-5 m-auto'>
            <div className='row mb-0'>
            <h6 className='info'>Personal Information</h6>
              <div className='counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 g-4 mb-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Mr. Muffine'
                  style={{
                    boxShadow: '0px 1.50146px 12.0117px rgba(0, 0, 0, 0.05)',
                    borderRadius: ' 6.00583px',
                  }}
                  value=''
                  required
                />
              </div>
              <div className='counselling-Form col-12 col-sm-12 col-md-6 col-lg-6 g-4 mb-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Contact'
                  style={{
                    boxShadow: '0px 1.50146px 12.0117px rgba(0, 0, 0, 0.05)',
                    borderRadius: ' 6.00583px',
                  }}
                  value=''
                  required
                />
              </div>
              <div className='counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 g-4'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='mr.muffine@gmail.com'
                  style={{
                    boxShadow: '0px 1.50146px 12.0117px rgba(0, 0, 0, 0.05)',
                    borderRadius: ' 6.00583px',
                  }}
                  value=''
                  required
                />
              </div>
              <div className='counselling-Form col-12 col-sm-12 col-md-6 col-lg-6 g-4'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Standard'
                  style={{
                    boxShadow: '0px 1.50146px 12.0117px rgba(0, 0, 0, 0.05)',
                    borderRadius: ' 6.00583px',
                  }}
                  value=''
                  required
                />
              </div>
            </div>
            <h6 className='paymentmethod mt-5'>Select Payment Method</h6>
            <hr />
            <div className='d-flex justify-content-around mt-5 mb-5'>
              <div className='p-2 col-example text-left'>
                <img
                  src={Card}
                  alt=''
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--white)',
                    boxShadow: ' 0px 2.78689px 5.57377px rgba(0, 0, 0, 0.15)',
                    borderRadius: '76.6393px',
                  }}
                />
              </div>
              <div className='p-2 col-example text-left'>
                <img
                  src={Phone}
                  alt=''
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--white)',
                    boxShadow: ' 0px 2.78689px 5.57377px rgba(0, 0, 0, 0.15)',
                    borderRadius: '76.6393px',
                  }}
                />
              </div>
              <div className='p-2 col-example text-left'>
                <img
                  src={Google}
                  alt=''
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--white)',
                    boxShadow: ' 0px 2.78689px 5.57377px rgba(0, 0, 0, 0.15)',
                    borderRadius: '76.6393px',
                  }}
                />
              </div>
              <div className='p-2 col-example text-left'>
                <img
                  src={Apple}
                  alt=''
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--white)',
                    boxShadow: ' 0px 2.78689px 5.57377px rgba(0, 0, 0, 0.15)',
                    borderRadius: '76.6393px',
                  }}
                />
              </div>
              <div className='p-2 col-example text-left'>
                <img
                  src={Paytm}
                  alt=''
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--white)',
                    boxShadow: ' 0px 2.78689px 5.57377px rgba(0, 0, 0, 0.15)',
                    borderRadius: '76.6393px',
                  }}
                />
              </div>
            </div>
            <hr />

            <div className='d-flex justify-content-between'>
              <div className='p-2 col-example text-left'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value=''
                    id='flexCheckDefault'
                  />
                  <label className='form-check-label' for='flexCheckDefault'>
                    Select Coin
                  </label>
                </div>
              </div>
              <div className='p-2 col-example text-left'>
                <img
                  src={Coin}
                  alt=''
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                />
              </div>
            </div>

            <div className='row'>
              <div className='counselling-Form col-9 col-sm-9 col-md-6 col-lg-6 mt-5 m-auto'>
                <Link to="!#">
                <button
                  type='button'
                  className='btn btn btn-md'
                  style={{
                    width: '100%',
                    borderRadius: '4rem',
                    backgroundColor: 'var(--white)',
                    color: 'var(--blue)',
                    boxShadow:
                      '0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)',
                  }}
                >
                  Cancle
                </button>
                </Link>
              </div>
              <div className='counselling-Form col-9 col-sm-9 col-md-6 col-lg-6 mt-5 m-auto'>
              <Link to="!#">
                <button
                  type='button'
                  className='btn btn btn-md'
                  style={{
                    width: '100%',
                    borderRadius: '4rem',
                    backgroundColor: 'var(--white)',
                    color: 'var(--blue)',
                    boxShadow:
                      '0px 7.63209px 15.2642px rgba(211, 38, 38, 0.25)',
                  }}
                >
                  Save
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="homeIcon col mt-5">
            <img className="hicon mr-3" src={Home} alt="homeicon" />
          </div> */}
        </section>
      </div>
    </>
  );
};

export default SchedulePayment;
