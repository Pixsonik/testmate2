import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import { privacyAndPolicyApi } from '../api/api';
import axios from 'axios';
import LoadingSpinner from '../loader/LoadingSpinner';

const PrivacyPolicy = () => {

  const [privacyData, setPrivacyData] = useState("");
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    getPrivacyAndPolicyData()
  }, [])

  const getPrivacyAndPolicyData = () => {
    setLoaderVisible(true);
    const url = privacyAndPolicyApi();
    axios
      .post(url)
      .then((resp) => {
        setPrivacyData(resp.data);
        setLoaderVisible(false);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log("error getting in T&C --", error);
      });
  };


  return (
    <>
      <Navbar/>
      <Sidebar/>
      <div className="col-12 m-auto ">
        <div className="col-12 m-auto ">
          <div className="container-fluid col-12 col-sm-12 col-md-12 col-lg-12 overflow-auto">
            <div className="" style={{ fontWeight: "normal",maxHeight: "45rem", }}>
              {loaderVisible ? <LoadingSpinner/> :  <UnsafeComponent html={privacyData}  /> }
           
            {/* {termsData} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default PrivacyPolicy