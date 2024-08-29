import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Bg2 from "../assets/img/Background/bg-desktop2.png";
import "../assets/css/pages.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Announcement() {
    const [announcementdata, setAnnouncementData] = useState([])
    const [announcementdata2, setAnnouncementData2] = useState([])
    const navigate = useNavigate()
    const myStyle = {
        backgroundImage: `url(${Bg2})`,
        height: "100%",
      };

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
            console.log(resp);
            setAnnouncementData(resp.data.data.branchwise)
            setAnnouncementData2(resp.data.data.All)
          })
          .catch((error)=>{
            console.log(error);
          })
      }

      const announcmentStatus = (id, index, branch)=>{
        const url = "https://school.testmate.in/api/announcement_update_status"
        const body = {
          id : id
        }
axios.post(url, body,{
  headers: {
    "Content-Type": "multipart/form-data",
  },
})
.then((response)=>{
  console.log(response);
  navigate('/announcement_detail', {
    state: { id : index, branchId: branch},
  })
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
                {
                    announcementdata2?.map((item, index)=>{
                        return(
                            <>
                               <div className='announcementDiv' style={{cursor:'pointer'}} onClick={()=>{announcmentStatus(item.status_to_change_id, index, item.branch)}}>
                                 <p className='announcementTitle' >{item.title}</p>
                              </div>
                            </>
                        )
                    })
                }
                {
                    announcementdata?.map((item, index)=>{
                        return(
                            <>
                               <div className='announcementDiv' style={{cursor:'pointer'}} onClick={()=>{announcmentStatus(item.status_to_change_id, index, item.branch)}}>
                                 <p className='announcementTitle'>{item.title}</p>
          </div>
                            </>
                        )
                    })
                }
       
            </div>
          </div>
        </>
      );
}
