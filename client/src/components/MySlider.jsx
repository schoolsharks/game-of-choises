import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typewriter from "typewriter-effect";
import "./custom.css";
import gemIcon from "../assets/gemIcon.svg";
import { Stack, Typography } from "@mui/material";

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
      title: "Welcome",
      content1:
        "Just like in The Matrix, The Game Of Choices challenges you to make decisions that shape your path.",
      content2:
        "Each choice tests your financial instincts, driving you toward freedom or keeping you trapped in the system.",
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

  if (currentSlide == 0) {
    return (
      <div
        key={0}
        style={{
          maxWidth: "431px",
          width: "100%",
          height: "80%",
          margin: "auto",
          padding: "0px 30px",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: windowWidth < 400 ? "40px" : "45px",
            fontWeight: "200",
            color: "#FBF9ED",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <Typewriter
            options={{
              delay: 60,
              cursor: "",
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("WELCOME")
                .pauseFor(400)
                .callFunction(handletitleComplete)
                .start();
            }}
          />
        </div>

        <div
          style={{
            fontSize: windowWidth < 400 ? "13px" : "15px",
            fontWeight: "100",
            color: "#FBF9ED",
            width: "100%",
          }}
        >
          <div
            style={{
              margin: "20px 0px",
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "Just like in The Matrix, The Game Of Choices challenges you to make decisions that shape your path."
                  )
                  .pauseFor(400)
                  .callFunction(handletitleComplete)
                  .start();
              }}
            />
          </div>
          <div
            style={{
              margin: "20px 0px",
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "Each choice tests your financial instincts, driving you toward freedom or keeping you trapped in the system."
                  )
                  .pauseFor(400)
                  .callFunction(handletitleComplete)
                  .start();
              }}
            />
          </div>
          <div
            style={{
              margin: "30px 0px",
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Your journey, your decisions —Choose wisely.")
                  .pauseFor(400)
                  .callFunction(handletitleComplete)
                  .start();
              }}
            />
          </div>
        </div>
      </div>
    );
  } else if (currentSlide == 1) {
    return (
      <div
        key={2}
        style={{
          maxWidth: "431px",
          width: "100%",
          height: "80%",
          margin: "auto",
          padding: "0px 30px",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: windowWidth < 400 ? "40px" : "45px",
            fontWeight: "200",
            color: "#FBF9ED",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <Typewriter
            options={{
              delay: 60,
              cursor: "",
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("GAME PLAY")
                .pauseFor(400)
                .callFunction(handletitleComplete)
                .start();
            }}
          />
        </div>

        <div
          style={{
            fontSize: windowWidth < 400 ? "13px" : "15px",
            fontWeight: "100",
            color: "#FBF9ED",
            width: "100%",
          }}
        >
          <div
            style={{
              margin: "20px 0px",
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "Swipe left or right to build good habits, unlock your financial strengths, and uncover your financial personality."
                  )
                  .pauseFor(400)
                  .callFunction(handletitleComplete)
                  .start();
              }}
            />
          </div>
          <div
            style={{
              paddingBottom: "20px",
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Discover who you are:")
                  .pauseFor(400)
                  .callFunction(handletitleComplete)
                  .start();
              }}
            />
            <div
              style={{
                paddingLeft: "10px",
                marginTop: "10px",
                flexDirection: "column",
              }}
            >
              {[
                "The Hustler",
                "Disciplined Saver",
                "Balanced Spender",
                "Hopeful Borrower",
                "Live-for-today Spender",
              ].map((point, index) => (
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  gap={2}
                  key={"point" + index}
                >
                  <img
                    src={gemIcon}
                    alt="gem icon"
                    style={{
                      height: "15px",
                      width: "15px",
                      objectFit: "contain",
                      verticalAlign: "middle",
                    }}
                  />
                  <Typography
                    variant={"caption"}
                    fontSize={"15px"}
                    fontWeight="100"
                    textAlign={"center"}
                    zIndex={1}
                    color={"#FBF9ED"}
                    className="lcd-font"
                    sx={{
                      fontFamily: "LSC Solid",
                      letterSpacing: "5%",
                    }}
                  >
                    {point}
                  </Typography>
                </Stack>
              ))}
            </div>
          </div>

          <div
            style={{
              margin: "10px 0px",
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Make smart moves to break free!")
                  .pauseFor(400)
                  .callFunction(handletitleComplete)
                  .start();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default MySlider;
