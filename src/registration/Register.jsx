import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import { emailVerifyApi, mobileVerifyApi, urlToken } from "../api/api";
import "../assets/css/Register/registration.css";
import axios from "axios";
import logoImg from "../assets/img/logo/testmate-logo.png"

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const navigate = useNavigate();

  const required = name != "" && email != "" && contact != "";

  // const handleSubmit = () => {
  //   // e.preventDefault(e);
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   const contactRegex =
  //     /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

  //   if (regex.test(email)) {
  //     checkEmail();
  //     if (contactRegex.test(contact)) {
  //       checkMoblieNumber();
  //       if (contactError && emailError) {
  //         navigate("/regCat", {
  //           state: { uEmail: email, uName: name, uContact: contact },
  //         });
  //       } else {
  //         alert("Something went wrong ...");
  //       }
  //       console.log("all info is valid");
  //     } else {
  //       setContactError(true);
  //     }
  //   } else {
  //     setEmailError(true);
  //   }
  // };

  const handleSubmit = () => {
    checkEmail();
    checkMoblieNumber();
    if (emailError && contactError) {
      console.log("in dhghgh  ");
      navigate("/regCat", {
        state: { uEmail: email, uName: name, uContact: contact },
      });
    }
  };

  useEffect(() => {
    // console.log(formErrors);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //   console.log(formValues);
    // }
  });

  const checkMoblieNumber = () => {
    const contactRegex =
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    if (contactRegex.test(contact)) {
      const url = mobileVerifyApi();
      var body = {
        token: urlToken,
        mobile: contact,
      };
      axios
        .post(url, body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          // console.log("Mobile number----------", resp.data);
          if (resp.data.status === "true") {
            // navigate("/regCat", {
            //   state: { uEmail: email, uName: name, uContact: contact },
            // });
            setContactError(true);
          } else {
            setContactError(false);
            alert("Phone number already exists");
          }
        })
        .catch((error) => {
          // console.log(error.resp);
        });
    } else {
      alert("Phone number is not valid");
    }
  };

  const checkEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (regex.test(email)) {
      const url = emailVerifyApi();
      var body = {
        token: urlToken,
        email: email,
      };
      // console.log("body  ---> ", body);
      axios
        .post(url, body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          // console.log("Email ----------", resp.data);
          if (resp.data.status === "true") {
            setEmailError(true);
          } else {
            setEmailError(false);
            alert("Already exists");
          }
        })
        .catch((error) => {
          // console.log(error.resp);
        });
    } else {
      alert("Email is not valid");
    }
  };

  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100vh",
    width: "100%",
  };

  return (
    <section style={myStyle}>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-lg-12">
            <div className="row justify-content-center">
              <div style={{display:'flex', justifyContent:'center', marginTop:'3rem'}}>
                <img src={logoImg} className="registerLogo" style={{width:'12%'}}/>
              </div>
              <div
                className="col-sm-9 col-md-6 col-lg-6"
                // style={{ marginTop: "8rem" }}
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-5 pt-5">
                  Register
                </p>

                {/* <form className="mx-1 mx-md-4" > */}
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-1">
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      className="form-control register"
                      placeholder="Name"
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-1">
                    <input
                      required
                      type="text"
                      name="email"
                      id="email"
                      className="form-control register"
                      placeholder="Email"
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {/* {emailError ? (
                      <div className="text-danger">Email is not valid</div>
                    ) : null} */}
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-1">
                    <input
                      required
                      type="tel"
                      name="contact"
                      id="contact"
                      className="form-control register"
                      placeholder="Phone"
                      maxLength={10}
                      minLength={10}
                      onChange={(e) => setcontact(e.target.value)}
                      // onEnded={(e) => console.log("number---------------", e)}
                    />
                    {/* {!contactError ? (
                      <div className="text-danger">
                        Phone number is not valid
                      </div>
                    ) : null} */}
                  </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-6 pb-4 mt-5 m-auto">
                  <button
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block "
                    disabled={!required}
                    onClick={() => handleSubmit()}
                  >
                    Next
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
