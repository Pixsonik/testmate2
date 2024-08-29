import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import "../assets/css/pages.css";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";


export default function AnnouncementDetail() {
    const location = useLocation();
    const {id, branchId} = location.state;
    const [announcementdata2, setAnnouncementData2] = useState([])
    const [announcementdataImg, setAnnouncementDataImg] = useState([])
    const [announcementdataImgUrl, setAnnouncementDataImgUrl] = useState([])
    const [announcementdata, setAnnouncementData] = useState([])
    const myStyle = {
        backgroundImage: `url(${Bg2})`,
        height: "100%",
      };

      useEffect(() => {
        console.log(id, branchId);
        announcementData();
      }, [])
      

      const announcementData =()=>{
        const url = "https://school.testmate.in/api/announcement"
        const body ={
            user_id : localStorage.getItem("UserId"),
            branch : branchId
        }

        axios.post(url, body, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp)=>{
            console.log(resp);
            if(branchId == 0){
                setAnnouncementData(resp.data.data.All[id])
                setAnnouncementData2(resp.data.data.All[id].annoucement)
                setAnnouncementDataImg(resp.data.data.All[id].image)
                setAnnouncementDataImgUrl(resp.data.data.All[id].link)
            }else{
                setAnnouncementData(resp.data.data.branchwise[id])
                setAnnouncementData2(resp.data.data.branchwise[id].annoucement)
                setAnnouncementDataImg(resp.data.data.branchwise[id].image)
                setAnnouncementDataImgUrl(resp.data.data.branchwise[id].link)
            }
          })
          .catch((error)=>{
            console.log(error);
          })
      }
      

    return (
        <>
          <Navbar />
          <Sidebar />
          {/* <Toaster/> */}
          <div className="content-wrapper " style={myStyle}>
            <h3 className='announcementHeading'>Announcements</h3>
            <div className='announcementDivMain'>     
                               <div className='announcementDiv'>
                                 <p className='announcementTitle'>{announcementdata.title}</p>
                                 <p className='announcementallDetails' style={{fontSize:'18px', margin:'3px'}}>{ReactHtmlParser(announcementdata2)}</p>
                                <div className='announcementImage'>
                                  <a href={announcementdataImgUrl}><img style={{width:'100%', height:'100%'}} src={`https://school.testmate.in/${announcementdataImg}`}  className='' alt="" /></a>
                                  </div> 
                              </div> 
            </div>
          </div>
        </>
      );
}
