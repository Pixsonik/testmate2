import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../assets/css/style.css'
import "../assets/css/Responsive.css"
import { getBanners } from '../api/api';
import axios from 'axios';


const Banner2 = () => {
    const boardId = localStorage.getItem("BoardId");
  const SchholName = localStorage.getItem("SchholName");
  const classId = localStorage.getItem("ClassId");
  const langId = localStorage.getItem("langIddd");
  const [bannerImage, setBannerImage] = useState([])

useEffect(() => {
    console.log(SchholName , classId, boardId, '6808');
bannerSlider()
}, []);


const bannerSlider = ()=>{
    const url = getBanners()
    const body = {
        token:'6808',
        school_id:SchholName,
        // class_id:classId,
        board_id:boardId,
        lang_id:langId
    }
    axios.post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    .then((resp)=>{
        console.log('resp banner',resp.data.data);
        setBannerImage(resp.data.data);
    })
    .catch((error)=>{
        console.log('eror banner',error);
    })
}

    return (
        <div 
         className='banner'
        style={{
            // width: "60vw",
            display: "block",
            margin: "auto",
            padding: "20px 0 0 0"
            
        }}>
            <Carousel 
            className='img-style'
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}           
>
    {
        bannerImage.map((item)=> {
            console.log('banner item',item);
            return(<>
              <div >
                <img src={item.image_video}
                 style={{borderRadius: "20px"}} className='bannerImagesss' />
            </div>
            </>)
          
        })
    }
            
            {/* <div>
                <img src="https://admin.testmate.in/storage/Ads/plans_INTERMEDIATE-1664780753.jpg"
                style={{    borderRadius: "20px"}}
                />

            </div>
            <div>
                <img src="https://admin.testmate.in/storage/Ads/plans_ADVANCED-1664780781.jpg"
                style={{    borderRadius: "20px"}}
                />

            </div> */}
        </Carousel>
        </div>
    )
}

export default Banner2






// <Carousel 
// className='img-style'
// showThumbs={false}
// autoPlay={true}
// transitionTime={3}
// infiniteLoop={true}
// showStatus={false}           
// >
// <div>
//     <img src="https://admin.testmate.in/storage/Ads/plans_BEGINNER-1664780716.jpg"
//      style={{    borderRadius: "20px"}} />

// </div>
// <div>
//     <img src="https://admin.testmate.in/storage/Ads/plans_INTERMEDIATE-1664780753.jpg"
//     style={{    borderRadius: "20px"}}
//     />

// </div>
// <div>
//     <img src="https://admin.testmate.in/storage/Ads/plans_ADVANCED-1664780781.jpg"
//     style={{    borderRadius: "20px"}}
//     />

// </div>
// </Carousel>