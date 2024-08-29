import React, { useEffect, useState } from "react";
import "../assets/css/pages.css";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
// import Home from "../assets/img/store.png";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  mainUrl,
  promoCodeApi,
  urlToken,
  userPackgesListApi,
} from "../api/api";
import useRazorpay from "react-razorpay";
import axios from "axios";
import PackageLogo from "../assets/img/logo/testmate-logo.png";
import "../assets/css/Responsive.css";
import LoadingSpinner from "../loader/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";


const userId = localStorage.getItem("UserId");
const schoolId = localStorage.getItem("SchholName");

const Subscription = () => {
  const [packagesList, setPackagesList] = useState([]);
  const [packageDescription, setPackageDescription] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [loader,setLoader]=useState(false);

  useEffect(() => {
    // getPackgaes();
  });

  const getPackgaes = () => {
    // const url = userPackgesListApi();
    // const body = {
    //   token: "6808",
    //   package: true,
    //   code: "PKG",
    // };
    // console.log("first---", body, url);
    // axios
    //   .post(url, body, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((resp) => {
    //     console.log("packages list is ----> ", resp);
    //     // setPackagesList(resp.data.data);
    //     // setPackageDescription(resp.data.data.description);
    //   })
    //   .catch((error) => {
    //     console.log("error found in getting packages list ---->", error);
    //   });

    var url = userPackgesListApi();
    // setLoader(true)
    const body = {
      token: "6808",
      package: true,
      code: "PKG",
    };

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        // console.log("aaa----", resp);
      })
      .catch((err) => {
        // console.log("err -------", err);
      });
  };

  const handleSubmit = () => {
    // console.log("trimmed : ", promoCode.trim());
    promoCode.trim() !== "" ?
       applyPromocode()
      : alert("Please Enter Promo code.")
      // setLoader(true)
  };

  const handleBuyPlan = () => {
    window.open(
      mainUrl +
        "package_price.php?token=" +
        urlToken +
        "&user_id=" +
        localStorage.getItem("UserId") +
        "&code=PKG",
      "Thanks for Visiting!"
    );
  };

  const applyPromocode = () => {
    setLoader(true)
    const url = promoCodeApi();
    const body = {
      token: urlToken,
      user_id: localStorage.getItem("UserId"),
      promocode: promoCode,
      // actual_price: "259",
      school_id: localStorage.getItem("SchholName"),
      // package_id: "1",
    };
    console.log(body);
    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      console.log('hello',response);
        if (response.data.status == 'true') {
          setLoader(false)
          // alert(response.data.message);
          toast(response.data.message)
          console.log('==response if true', response.data.message);
          // this.props.navigation.reset({
          //     index: 0,
          //     routes: [{name: 'MainScreen'}],
          // });
          setLoader(false)
        } else{
          toast(response.data.message)
          // alert(response.data.message);
          console.log('==response if false', response.data.message);
          setLoader(false)
        }
      })
      .catch((err) => {
        console.log("Promo Code is not valid: ", err);
      });
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100%",
  };
  return (
    <>
      <Navbar />
      <Sidebar />
      <Toaster/>
      <div className="content-wrapper" style={myStyle}>
        <section className="content p-0 m-auto mt-5">
          <h6
            className="text-center fw-medium mt-5 pt-5 pb-5 mb-5"
            style={{ color: "var(--blue)", fontSize: "2rem" }}
          >
            Subscription Plan
          </h6>

          <div
            className=" subscription"
            style={{ borderRadius: "3rem" }}
          >
            <div className="inner mt-5 mb-3">
              <div className="logo-package text-center">
                <img
                  src={PackageLogo}
                  alt="package-logo"
                  width={125}
                  height={100}
                />
              </div>
              <h5 className="text-center mt-4 mb-4">Unlock Your Package</h5>
              <div className="col-12 col-sm-12 col-md-9 col-lg-8 m-auto">
                <div className="form-outline">
                  <input
                    required={true}
                    type="text"
                    name="text"
                    id="text"
                    className="form-control package"
                    placeholder="Enter Promo Code"
                    style={{ borderRadius: "3rem" }}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
              </div>
              <h5 className="text-center mt-4">
              {loader ? <LoadingSpinner/> : null}
                {promoCode == "" ? "Or" : null}
              </h5>
              <div
                className="col-12 col-sm-6 col-md-9 col-lg-8 mt-3 m-auto"
                onClick={() =>
                  promoCode == "" ? handleBuyPlan() : handleSubmit()
                }
              >
                
                  <button
                    type="button"
                    className="btn btn btn-block"
                    style={{
                      backgroundColor: "var(--blue)",
                      color: "var(--white)",
                      marginBottom: "3rem",
                      borderRadius: "3rem",
                    }}
                    //   disabled={!required}
                  >
                    {promoCode == "" ? "Buy Plan" : "Submit"}
                  </button>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Subscription;







