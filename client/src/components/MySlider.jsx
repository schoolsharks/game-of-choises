import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import "./custom.css";

const MySlider = () => {
  const sliderRef = useRef(null); // Ref for the slider
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide
  const [content2Typing, setContent2Typing] = useState(false); // Track when content2 starts typing
  const [content1Typing, setContent1Typing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight); // Track window width for responsive styles

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setwindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Game Play",
      content1:
        "Welcome to the Financial Matrix! You’re trapped in a world of financial choices. Your mission? Make smart moves, break free, and uncover who you really are in the money game.",
      content2: "",
    },
    {
      id: 2,
      title: "How It Works",
      content1:
        "Every decision—Red Pill or Blue Pill—takes you closer to financial freedom or keeps you stuck in the loop.",
      content2: " Swipe left or right to make decisions.",
    },
    {
      id: 3,
      title: "Your Goal",
      content1:
        "Break out of the Financial Matrix. Crush bad habits, unlock your financial superpower, and discover your true money personality!",
      content2: "",
    },
    {
      id: 4,
      title: "Disclaimer",
      content1:
        "Inspired by The Matrix, this game reimagines its themes to focus on financial decision-making. It is solely for educational and entertainment purposes and does not provide professional financial advice.",
      content2: "",
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    beforeChange: (_, next) => {
      setCurrentSlide(next);
      setContent2Typing(false);
      setContent1Typing(false);
      // Reset content2 typing flag for the next slide
    },
    appendDots: (dots) => {
      const dotPositionStyle =
        windowWidth > 768
          ? windowHeight > 800
            ? { bottom: "30%", left: "75%" }
            : { bottom: "15%", left: "75%" }
          : windowWidth > 600
          ? { bottom: "30%", left: "80%" }
          : { bottom: "18%", left: "80%" };

      return (
        <div style={{ position: "fixed", ...dotPositionStyle }}>
          <ul style={{ margin: "0px" }}>{dots}</ul>
        </div>
      );
    },
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: currentSlide === i ? "white" : "#888",
          borderRadius: "50%",
        }}
      ></div>
    ),
  };

  const handleContent1Complete = () => {
    setContent2Typing(true); // Start typing content2
  };
  const handletitleComplete = () => {
    setContent1Typing(true); // Start typing content2
  };

  const handleTypingComplete = () => {
    if (sliderRef.current) {
      const nextSlideIndex = currentSlide > 2 ? 0 : currentSlide + 1;
      if (nextSlideIndex < slides.length) {
        sliderRef.current.slickGoTo(nextSlideIndex); // Move to the next slide
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "431px",
        width: "100%",
        height: "70%",
        margin: "auto",
        padding: "0px 30px",
        position: "relative",
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              width: "80%",
              maxWidth: "329px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              position: "relative",
              color: "#FBF9ED",
            }}
          >
            {/* <div className="flex   gap-3  w-fit justify-start  items-start">
              <h2
                style={{
                  fontSize: windowWidth < 400 ? "25px" : "30px",
                  fontWeight: "400",
                  color: "#FBF9ED",
                  marginBottom: "20px",
                  lineHeight: "30px",
                }}
              >
                {slide.title}
              </h2>
              <div
                className="blinking-div"
                style={{
                  height: "30px",
                  width: "15px",
                  backgroundColor: "white",
                  animation: "blink 1s infinite", 
                }}
              ></div>
            </div> */}
            <div
              style={{
                fontSize: windowWidth < 400 ? "25px" : "30px",
                fontWeight: "400",
                color: "#FBF9ED",
                width: "100%",
                marginBottom: "20px",
                lineHeight: "30px",
              }}
            >
              {index === currentSlide && (
                <Typewriter
                  options={{
                    delay: 60,
                    cursor: "",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(slide.title)
                      .pauseFor(400)
                      .callFunction(handletitleComplete)
                      .start();
                  }}
                />
              )}
            </div>

            {/* Typewriter Animation for content1 */}
            <div
              style={{
                fontSize: windowWidth < 400 ? "15px" : "20px",
                fontWeight: "400",
                color: "#FBF9ED",
                width: "100%",
                marginBottom: "15px",
                lineHeight: "30px",
              }}
            >
              {index === currentSlide && content1Typing && (
                <Typewriter
                  options={{
                    delay: 20,
                    cursor: "",
                    cursorBlinking: false,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(slide.content1)
                      .pauseFor(400)
                      .callFunction(
                        slide.content2
                          ? handleContent1Complete
                          : handleTypingComplete
                      )
                      .start();
                  }}
                  className="hide-cursor"
                />
              )}
            </div>

            {/* Typewriter Animation for content2 */}
            <div
              style={{
                fontSize: windowWidth < 400 ? "15px" : "20px",
                fontWeight: "400",
                color: "#FBF9ED",
                width: "100%",
                marginBottom: "15px",
                lineHeight: "30px",
              }}
            >
              {slide?.content2 && index === currentSlide && content2Typing && (
                <Typewriter
                  options={{
                    delay: 20,
                    cursor: "",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(slide.content2)
                      .pauseFor(500)
                      .callFunction(handleTypingComplete)
                      .start();
                  }}
                  className="hide-cursor"
                />
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MySlider;
