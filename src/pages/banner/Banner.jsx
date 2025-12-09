import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImg1 from "../../assets/banner-pic-1.jpg";
import bannerImg2 from "../../assets/banner-pic-2.jpg";
import bannerImg3 from "../../assets/banner-pic-3.jpg";
import bannerImg4 from "../../assets/banner-pic-1.jpg";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div>
        <img className="max-h-[650px] w-full" src={bannerImg1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img className="max-h-[650px] w-full" src={bannerImg2} alt="" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img className="max-h-[650px] w-full" src={bannerImg3} alt="" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;
