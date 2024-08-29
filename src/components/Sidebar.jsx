import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/main.css";
import Logo from "../assets/img/logo/LogoIcon.png";
import Testmate from "../assets/img/logo/Logoname.png";
import "../assets/css/Responsive.css"
import axios from "axios";


const Sidebar = (props) => {
  // const [isActive, setIsActive] = useState(true);
  const [show, setShow] = useState(false);
  const [announcementdata, setAnnouncementData] = useState(0)

  const handleClick = () => {
    // setIsActive((current) => !current);
  };

  let activeStyle = {
    borderLeft: "0.4rem solid var(--yellow)",
    height: " auto",
    backgroundColor: "var(--bgBlue)",
  };

  const CounsellingFunc=()=>{
    alert('Counselling comming soon')
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // let activeclassName = "underline";

  useEffect(() => {
    announcementData();
  }, [])
  

  const announcementData =()=>{
    const url = "https://school.testmate.in/api/announcement"
    const body ={
        user_id : localStorage.getItem("UserId"),
        branch : localStorage.getItem('branchIdd')
    }

    axios.post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp)=>{
        console.log(resp.data.unseen);
        setAnnouncementData(resp.data.unseen)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  return (
    <>
      <aside className="main-sidebar sidebar elevation-4">
        <a href="/" className="user-panel mt-1 d-flex brand-link" style={{zIndex:1}}>
          <div style={{zIndex:1}}>
          <img src={Logo} alt="Logo" className="brand-image" style={{backgroundColor:"white", width:'56px' }} />
          </div>
         <div className="testmate-img">
            <img
              src={Testmate}
              alt="/"
              className="brand-text d-block"
              style={{ width: "150px", height: "20px", marginTop: "5px" }}
            />
          </div>
        </a>
        <div className="sidebar os-host os-theme-light os-host-resize-disabled os-host-transition os-host-scrollbar-horizontal-hidden os-host-overflow os-host-overflow-y" style={{margin:"21px 0 0 0"}}><div className="os-resize-observer-host"><div className="os-resize-observer observed" style={{left: "0px",right: "auto"}}></div></div><div className="os-size-auto-observer" style={{height: "calc(100% + 1px)",float: "left"}}><div className="os-resize-observer observed"></div></div><div className="os-content-glue" style={{margin:" 0px -8px", width: "249px", height: "380px"}}></div><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible" style={{overflowY: "scroll"}}><div className="os-content" style={{padding: "0px 0px", height: "100%", width: "100%"}}>
        <nav 
        // className="sidebar"
        >
          <ul className="nav nav-pills nav-sidebar flex-column">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
              >
                <i className="nav-icon fas fa-home"></i>
                <p>Home</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/playwfriend"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                {/* <i className="nav-icon fas fa-edit"></i> */}
                <i class="nav-icon fa-solid fa-user-group" style={{fontSize:"16px"}}></i>
                <p>Play with Friends</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                 to="/schedulebanner"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleClick}
              >
                <i className="nav-icon fas fa-calendar-alt"></i>
                <p>Schedule Test</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/comingsoon"
                // to="/counselling"
                // onClick={()=>{CounsellingFunc()}}
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <i className="nav-icon fas fa-comment"></i>
                <p>Counselling</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/bookmark"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
              >
                <i className="nav-icon fas fa-bookmark"></i>
                <p>Bookmark</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/achievement"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <i className="nav-icon fas fa-medal"></i>
                <p>Achievement</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/announcement"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <i className="nav-icon fas fa-medal"></i>
                <p>Announcement</p> <span className="anseenAnnouncement">{announcementdata}</span>
              </NavLink>
            </li>
            {/* <li className='nav-item'>
                <NavLink to='/semester' className='nav-link'
                 style={({ isActive }) =>
                 isActive ? activeStyle : undefined
               }>
                  <i className='nav-icon fas fa-book'></i>
                  <p>Semester</p>
                </NavLink>
              </li> */}
           
            
            <li className="nav-item">
              <NavLink
                to="/subscription"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <i className="nav-icon fas fa-credit-card"></i>
                <p>Subscription</p>
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                to="/wallet"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <i className="nav-icon bx bxs-wallet-alt"></i>
                <p>Wallet</p>
              </NavLink>
            </li>
            
            <li className="nav-item">
              <div
                // to="/contactus"
                // style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                onClick={() =>
                  window.open("mailto:teachflyeducare@gmail.com")
                }
              >
                {/* <i className="nav-icon fas fa-edit"></i> */}
                <i class="nav-icon fa-solid fa-phone" style={{fontSize:"16px"}}></i>
                <p>Contact Us</p>
              </div>
            </li>
            <li className="nav-item">
              <NavLink
                to="/termscondition"
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                {/* <i className="nav-icon fas fa-comment"></i> */}
                {/* <i class="nav-icon fa-light fa-file-lines"  style={{fontSize:"16px"}}></i> */}
                <i class="nav-icon fa-solid fa-file-lines"  style={{fontSize:"16px"}}></i>
                <p>Terms & Condition</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <div
                // to="/contactus"
                // style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                style={{display:"flex",alignItems:"center"}}
                onClick={() =>
                  window.open("https://play.google.com/store/apps/details?id=com.teachfly")
                }
              >
                <i className="nav-icon bx bxl-play-store"></i>
                <p>Download App</p>
              </div>
            </li>
          </ul>
        </nav>
        </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{width: "100%", transform: "translate(0px, 0px)"}}></div></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track"><div className="os-scrollbar-handle" style={{height: "99.5455%", transform: "translate(0px, 0px)"}}></div></div></div><div className="os-scrollbar-corner"></div></div>
        {/* <div className='col-sm-9 mt-2 d-none d-sm-block'>
          https://play.google.com/store/apps/details?id=com.teachfly )
          </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
