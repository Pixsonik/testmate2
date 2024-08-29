import React, { useEffect, useState } from 'react';
import { urlToken, walletHistoryApi } from '../api/api';
import axios from 'axios';
import moment from 'moment';
import "../assets/css/pages.css"
import "../assets/css/Responsive.css"
import CircularProgress from '@mui/material/CircularProgress';


const userId = localStorage.getItem('UserId');

const Points = () => {
  const [walletData, setWalletData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    walletHistory();
  }, []);

  const walletHistory = () => {
    setIsLoading(true)
    const url = walletHistoryApi();
    const body = {
      token: urlToken,
      user_id: userId,
    };
    console.log('------', body);
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        console.log('Wallet ---', resp.data.data);
        setWalletData(resp.data.data);
        setIsLoading(false)
      })

      .catch((error) => {
        console.log('error in fetching wallet History: ', error);
      });
  };

  return (
    <>
      <div className='container-fluid' style={{textAlign:"center"}}>

        {
        isLoading ? <CircularProgress  style={{color:'white'}}/>:
        walletData == '' ? (
          <h4 className='text-white text-center'>No Transaction History</h4>
        ) : (
          <div className='col-12 col-12 col-sm-12 col-md-12 col-lg-12 m-auto'>
            {walletData?.map((data, index) => (
              <>
                <div className='card sub-header justify-content-between d-flex g-1 points-list' >
                  <div className='col-12 ' style={{lineHeight:"2rem"}}>
                    <div className='w-100'>
                      <div className='d-flex justify-content-between pt-1'>
                        <>
                          <div className='col-example col-sm-12 text-left points-com' style={{width : "auto"}}>
                            {data.description}<br/>
                            <span className=' text-center'
                            //  style={{fontSize:"1rem"}}
                             >
                              Order No.: {data.id}
                            </span>
                          </div>
                          <div className=' col-example col-sm-12 text-left points-com' style={{width : "auto"}}>
                            {moment(data.created_at).format('MMM ')}
                            {moment(data.created_at).format(' DD ')},
                            {moment(data.created_at).format(' YYYY')}
                            <p
                              className='pt-1'
                              style={{
                                color:
                                  data.transaction_status === '1'
                                    ? '#E84857'
                                    : data.transaction_status === '0'
                                    ? '#50BFA5'
                                    : 'black',
                              }}
                            >
                              {data.transaction_status === '1'
                                ? '-'
                                : data.transaction_status === '0'
                                ? '+'
                                : ' '}
                              {data.amount}
                            </p>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Points;
