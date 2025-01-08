import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import "./custom.css";

const MySlider = ({ currentSlide }) => {
  const sliderRef = useRef(null); // Ref for the slider
  const [content2Typing, setContent2Typing] = useState(false); // Track when content2 starts typing
  const [content1Typing, setContent1Typing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);

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

  const handleContent1Complete = () => {
    setContent2Typing(true); // Start typing content2
  };
  const handletitleComplete = () => {
    setContent1Typing(true); // Start typing content1
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
      <div
        key={slides[currentSlide].id}
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
          <Typewriter
            options={{
              delay: 60,
              cursor: "",
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(slides[currentSlide].title)
                .pauseFor(400)
                .callFunction(handletitleComplete)
                .start();
            }}
          />
        </div>

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
          {content1Typing && (
            <Typewriter
              options={{
                delay: 20,
                cursor: "",
                cursorBlinking: false,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(slides[currentSlide].content1)
                  .pauseFor(400)
                  .callFunction(
                    slides[currentSlide].content2
                      ? handleContent1Complete
                      : () => {}
                  )
                  .start();
              }}
            />
          )}
        </div>

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
          {slides[currentSlide].content2 && content2Typing && (
            <Typewriter
              options={{
                delay: 20,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter.typeString(slides[currentSlide].content2).start();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MySlider;
