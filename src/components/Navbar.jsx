import React, { useState } from "react";
import Profile from "../pages/Profile";
import User from "../assets/img/UserProfile/profile.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Notify from "../assets/img/notify/notify.png";
import { Link } from "react-router-dom";
import "../assets/css/style.css"
import { notification, urlToken } from "../api/api"
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import "../assets/css/pages.css"
// import {Link}  from "react-router-dom"
import { useNavigate } from "react-router-dom";


const user_Id = localStorage.getItem("UserId");
// console.log('userId', user_Id);


const Navbar = () => {
  const [show, setShow] = useState(true);
  const [userData, setUserData] = useState([]);
  const [notificationData, setNotificationData]= useState([])
  const [shouldFetchData, setShouldFetchData] = useState(false);


  const [notifyDrawer, setNotifyDrawer] = useState({
    right: false,
  });

  // const handleShow = () => {
  //   setShow(true);
  // };

  // const handleClose = () => {
  //   setShow(false);
  // };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNotifyDrawer({ ...notifyDrawer, [anchor]: open });
  };

  useEffect(() => {
   if(shouldFetchData){
    // getNotification()
   }
  },[0])
  const getNotification = () => {
    const url = notification()
    // console.log("Noti URL",url)
    const body = {
      token: urlToken,
      user_id: user_Id,
    }
    // console.log("tag noti" ,body)

    axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then((resp) => {
      setNotificationData(resp.data.data)
      //  console.log("notification", resp.data.data)
    }
    
    ).catch((err)=>{
      // console.log(err)
    })
  }

const navigate = useNavigate()

const notiNavFun=(e)=>{
   if(e=="Friend Added"){
    navigate("/friendlist")
   }else if(e == "Play with Friends Test Created"){
    navigate("/playwfriend")
   }
}

const mywidth ={
  width : "500px",
  "@media screen and (min-width: 320px) and (max-width: 576px)":{
    width : "250px"
  }

}
  

  const newNotification= [...notificationData].reverse()

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : mywidth }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <>
          <section style={{ overflowX: "hidden" }}>
            <div className="container-fluid p-0 m-0 overflow-x-hidden">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 px-4 text-black">
                  {
                    newNotification.map((data,index)=>{
                      return(
                        <div
                    className="card mt-2 p-2 m-2"
                    style={{ border: "1px solid #D9D9D9" }}>
                    <div onClick={()=>{notiNavFun(data.title)}}>
                      <div className="d-flex bd-highlight example-parent m-auto" style={{flexDirection:"column"}}>
                        <div className="p-2 flex-shrink-1 bd-highlight col-example m-auto">
                       
                        </div>
                        
                          <h2 style={{color:"#6363bd"}}
                             className="notificationTile"
                          >{data.title}</h2>
                          <p className="notiMessage">
                           {data.message}
                          </p>
                          <p className="notifTime">
                          <i class="fa-regular fa-clock"></i> {moment(data.created_at).format('DD-MM-YYYY')}
                            </p>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </section>
        </>
      </List>
    </Box>
  );

  const notiFunc=()=>{
    // console.log("hello")
    // console.log(shouldFetchData)
  }

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-light bg-white overflow-hidden">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/"
              role="button"
            >
              {/* <i class="fa-solid fa-bars"></i> */}
              <i class='fa-solid fa-bars' style={{ color: "var(--blue)", fontSize: "2rem" }}></i>
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item" onClick={() => { setShow(!show) }} style={{display:"none"}}>
            {show ? <a
              className="nav-link"
              data-widget="navbar-search"
              href="/home"
              role="button"
              style={{ padding: "8px 0 0 0" }}
            >
              <i className="bx bx-search" style={{ padding: "0 5px 0 0" }}></i>
            </a> :
              <div className="navbar-search-block">
                <form className="form-inline float-end" style={{ position: "relative", right: "65px" }}>
                  <div className="input-group input-group-md m-5" >

                    <input
                      className="form-control shadow-none form-control-navbar"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{ height: "38px" }}
                    />
                    <div className="input-group-append shadow-none">
                      <button
                        className="btn btn-navbar bg-light"
                        type="button"
                        data-widget="navbar-search"
                        onClick={() => { setShow(!show) }}
                      >
                        <i className="fas fa-times text-danger"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            }
          </li>

          <li className="nav-item" type="button">
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={()=> getNotification()}>
                  {
                    <i className="notiIcon bx bxs-bell position-relative" 
                    style={{color: "#c6a9a9"}}
                    onClick= {toggleDrawer(anchor, true)}>
                      <span
                        className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{
                          fontSize: "10px",
                          top: " -2px",
                          padding: "6px",
                          right: "-11px",
                          marginLeft: "-13px",
                        }}
                      >
                        0
                        {/* 9+ */}
                      </span>
                    </i>
                  }
                </Button>
                <Drawer
                  anchor={anchor}
                  open={notifyDrawer[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </li>

          <li className="nav-item">
            <Link to="/friendcontact">
              <i className="navAddFri bx bx-user-plus"  style={{color: "#c6a9a9"}}></i>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/profile">
              <img
                src={User}
                className="user-img"
                alt="user-profile"
                // onClick={handleShow}
                style={{
                  width: 39,
                  height: 42,
                  marginRight: 24,
                  cursor: "pointer",
                }}
              />
            </Link>
          </li>

          {/* <Profile
            show={show}
            data={userData}
            onClick={handleClose}
            onHide={handleClose}
          /> */}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
