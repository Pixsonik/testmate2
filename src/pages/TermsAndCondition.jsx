import axios from "axios";
import React, { useEffect, useState } from "react";
import { termsAndConditionApi } from "../api/api";
import LoadingSpinner from "../loader/LoadingSpinner";
const TermsAndCondition = () => {
  const [termsData, setTermsData] = useState("");
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    getTermsAndConditionData();
  }, []);

  const getTermsAndConditionData = () => {
    setLoaderVisible(true);
    const url = termsAndConditionApi();
    axios
      .post(url)
      .then((resp) => {
        setTermsData(resp.data);
        setLoaderVisible(false);
        // console.log("response true");
      })
      .catch((error) => {
        // console.log("error getting in T&C --", error);
      });
  };

  return (
    <>
      <div className="col-12 m-auto">
        <div className="col-12 m-auto mt-5 ">
          <div className="container-fluid col-12 col-sm-12 col-md-12 col-lg-12 overflow-auto">
            <div className="" style={{ fontWeight: "normal",maxHeight: "45rem", }}>
               {loaderVisible ? <LoadingSpinner/>:   <UnsafeComponent html={termsData} />}
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default TermsAndCondition;
