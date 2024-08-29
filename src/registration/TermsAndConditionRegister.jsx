import axios from "axios";
import React, { useEffect, useState } from "react";
import { termsAndConditionApi } from "../api/api";

const TermsAndConditionRegister = () => {
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
          <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-8 overflow-auto">
            <div className="" style={{ fontWeight: "normal", maxHeight:"53rem" }}>
              <UnsafeComponent html={termsData} />
              {/* <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-8 footer text-center mt-5">
                <input type="checkbox" name="" id="" />
                <span className="mx-2">I agree to Terms and Conditions</span>
                <div className="col-12 mb-3 col-sm-12 col-md-12 col-lg-12 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary btn-xl px-5"
                  >
                    Save
                  </button>
                </div>
              </div> */}
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

export default TermsAndConditionRegister;
