import React, { useEffect } from "react";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import Left from "../assets/img/sideIcon/left.png";
import Right from "../assets/img/sideIcon/right.png";
import { useState } from "react";
import { dashboardBannerApi, urlToken } from "../api/api";
import axios from "axios";

const classId = localStorage.getItem("ClassId");

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [bannerLoading, setBannerLoading] = useState(false);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    var arrayData = bannerImages;
    const url = dashboardBannerApi();
    var body = {
      token: urlToken,
      class_id: classId,
    };
    // console.log("body  ---> ", body);
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setBanner(resp.data.data.banner);
        // console.log("banner from state ----> ", resp.data.data.banner);
        for (let index = 0; index < resp.data.data.banner.length; index++) {
          arrayData.push(resp.data.data.banner[index].image_video);
          setBannerImages(arrayData);
          // console.log("array data updated", bannerImages);
        }
      })
      .catch((error) => {
        // console.log(error.resp);
      });
  };

  var l = ["20", "50", "600"];
  l.length = 3;
  // console.log("===> ", l[0]);

  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-9 m-auto mt-5">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {banner.map((data, index) => (
              <div
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
                interval={1000}
              >
                <img
                  className="carousel img-ban d-block w-100"
                  data-ride="carousel"
                  src={data.image_video}
                  key={index + banner.id}
                  alt="banner-img"
                />
              </div>
            ))}
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-custom-icon" aria-hidden="true">
              {/* <img src={Left} alt="" className="left-icon" /> */}
              <i className='bx bx-chevron-left left-icon' style={{fontSize:"3rem"}}></i>
            </span>
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-custom-icon" aria-hidden="true">
            <i className='bx bx-chevron-right right-icon' style={{fontSize:"3rem"}}></i>
            </span>
            <span className='sr-only'>Next</span>
          </a>
        </div>
      </div>
    </>
  );
};
export default Banner;
