import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import "../assets/css/pages.css"

const ContactUs = () => {
  const myStyle = {
    backgroundImage: `url(${Bg2})`,
    height: "100vw",
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content-wrapper" style={myStyle}>
        <div className="content p-0 mb-5">
          <div className="col-12 m-auto mt-5 pt-5">
            <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-10 mt-5 pt-3 mb-5">
              
              <div
                className="col-sm-12 col-md-12 col-lg-10 m-auto card mt-5"
                style={{
                  borderRadius: "2rem",
                  boxShadow: "0px 2.20115px 8.8046px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h5
                  style={{
                    color: "var(--blue)",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    marginTop: "1.9rem",
                  }}
                >
                  Leave a Message
                </h5>
                <div className="col-12">
                  <div className="row">
                    
                    <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-3">
                      <div className="userContact">
                        <div className="d-flex flex-column mt-3 mr-5">
                          <div className="p-2">
                            <div className="form-outline flex-fill mb-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control border-none"
                                placeholder="Name"
                                style={{
                                  backgroundColor: "#EAEEEE",
                                  borderRadius: "1rem",
                                  // border
                                }}
                              />
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="form-outline flex-fill mb-1">
                              <input
                                type="email"
                                name="email"
                                id="name"
                                className="form-control"
                                placeholder="Email"
                                style={{
                                  backgroundColor: "#EAEEEE",
                                  borderRadius: "1rem",
                                }}
                              />
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="col-sm-6 col-md-6 col-lg-9 pb-4 mt-5 m-auto">
                              <button
                                type="submit"
                                value="Submit"
                                className="btn btn-primary btn-block "
                              >
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="counselling-Form col-12 col-sm-6 col-md-6 col-lg-6 mt-3">
                      <textarea
                        name="text"
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Leave a Message"
                        className="mt-3 p-3 border-none"
                        style={{
                          backgroundColor: "#EAEEEE",
                          borderRadius: "1rem",
                        }}
                      ></textarea>

                      
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around mb-4 mt-3">
                  <div className=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
