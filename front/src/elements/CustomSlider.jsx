import Slider from "react-slick";
import { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { findDOMNode } from "react-dom"; // Aggiunto import
import ArrowNext from "../elements/ArrowNext";
import ArrowPrev from "../elements/ArrowPrev";
import { useMain } from "../contexts/MainContext";
const CustomSlider = ({ onClick, children }) => {
  const { isDarkMode } = useMain();
  console.log("idm", isDarkMode);
  const sliderRef = useRef(null);
  useEffect(() => {
    const slider = findDOMNode(sliderRef.current); // Utilizzo di findDOMNode
    if (slider) {
      const dots = slider.querySelectorAll(".slick-dots li button:before");
    }
  }, [isDarkMode]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    className: "dots-light  p-8 m-8 min-h-96",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} ref={sliderRef}>
        {children}
      </Slider>
    </>
  );
};

export default CustomSlider;
