import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import login from "../assets/img/Background/bg-desktop_login.png"
import PlySt from "../assets/img/Background/btn.png"
import Pages from "../assets/css/pages.css"
// import Link from "react-router-dom"
import { Link } from 'react-router-dom'
import { display, padding } from '@mui/system'

const ComingSoon = () => {
    const myStyle = {
        backgroundColor: "var(--blue)",
        backgroundImage: `url(${login})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // marginLeft: "-20px",
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='Com-bg'>

                <div className='content-wrapper'>
                    <section className='content p-0'>
                        <div style={myStyle}>

                            <h1 className='Com-title'><span className='comingsoons' style={{ color: "white" }}>COMING</span><br /><span style={{ color: " #FFDA56" }} className='comingsoons'>SOON</span></h1>
                            <p className='com-text' style={{ textTransform: "uppercase" }}
                            ><span style={{ color: "white" }}>to continue with test,</span><br /> <span style={{ color: " #FFDA56" }}>download the app now</span></p>
                          <a href='https://play.google.com/store/apps/details?id=com.teachfly'> 
                           <img src={PlySt}
                            alt="plyst"
                            style={{
                                height:'auto',
                                display:"block",
                                margin:"auto",
                                padding:"0 0 39PX 0"
                            }}
                           /></a>
                        </div>
                      {/* <Link>
                      </Link> */}


                    </section>
                </div>
            </div>

        </>
    )
}

export default ComingSoon