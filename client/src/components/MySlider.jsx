import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./custom.css";

const MySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    {
      id: 1,
      title: "Game Play:",
      content1:
        "This game is inspired by the iconic movie The Matrix and is designed to help you make the right financial decisions.",
      content2: "",
    },
    {
      id: 2,
      title: "How It Works:",
      content1:
        " You will face a series of financial scenarios where you must choose between the red pill and the blue pill.",
      content2: "Swipe left or right to make decisions.",
    },
    {
      id: 3,
      title: "Your Goal:",
      content1:
        "Navigate critical scenarios, face financial dilemmas, and uncover your true character.",
      content2:
        "At the end, see what kind of decision-maker you are and how you handle your money.",
    },
    {
      id: 4,
      title: "Disclaimer:",
      content1:
        "Inspired by The Matrix, this game reimagines its themes to focus on financial decision-making.",
      content2:
        "It is solely for educational and entertainment purposes and does not provide professional financial advice.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#000000C7",
        height: "429px",
        width: "433px",
        margin: "auto",
        // overflow: "hidden",
        padding: "54px 52px",

        fontFamily: "Oxanium",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              height: "429px",
              width: "433px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              // justifyContent: "center",

              gap: "10px",
              fontFamily: "Oxanium",
              color: "#FBF9ED",
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "700",
                color: "#FBF9ED",
              }}
            >
              {slide.title}
            </h2>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "400",
                color: "#FBF9ED",
              }}
            >
              {slide.content1}
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "400",
                color: "#FBF9ED",
              }}
              className="mt-2"
            >
              {slide?.content2}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MySlider;
