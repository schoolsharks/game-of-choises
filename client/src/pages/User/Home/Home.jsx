import {
  Box,
  Button,
  duration,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";

import SwipeBar from "../../../components/SwipeBar";
import MySlider from "../../../components/MySlider";
import { useNavigate } from "react-router-dom";
import sendIcon from "../../../assets/send.png";
import { motion } from "framer-motion";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleOnSwipe = () => {
    navigate("/login");
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight); // Track window width for responsive styles

  const [isSplashScreenOn, setIsSplashScreenOn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashScreenOn(false);
    }, 1400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setwindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        url: location.href,
      });
    } else {
      navigator.clipboard.writeText(location.href);
      alert("Website URL copied to clipboard")
    }
  };

  const handleNext = () => {
    console.log(currentSlide);
    if (currentSlide + 1 == 2) {
      navigate("/login");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <Stack
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
        gap: "15px",
      }}
    >
      <Stack
        sx={{
          height: "85%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "431px",
          paddingBottom: "3%",
          // paddingTop: windowHeight > 600 ? "17%" : "3%",
          paddingTop: "55px",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {isSplashScreenOn ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.25 }}
            transition={{ duration: 1.2 , ease: [.08,.72,.15,.62], delay:0.3}}
          >
            <Typography
              variant={"h3"}
              fontSize="44px"
              fontWeight="400"
              textAlign={"center"}
              zIndex={1}
              // width={"80%"}
              // maxWidth={"280px"}
              marginTop="5%"
              color={"#FBF9ED"}
              className="lcd-font"
              sx={{
                fontFamily: "LSC Solid",
                lineHeight: "52.8px",
                letterSpacing: "5%",
              }}
            >
              THE GAME <br />
              OF CHOICES
            </Typography>
          </motion.div>
        ) : (
          <MySlider currentSlide={currentSlide} />
        )}
      </Stack>

      {!isSplashScreenOn && (
        <Stack
          position={"relative"}
          marginBottom={"50px"}
          maxHeight={"88px"}
          maxWidth={"370px"}
          height={"12%"}
          width={"80%"}
          alignContent={"center"}
          alignSelf={"center"}
        >
          <SwipeBar onSwipe={handleNext} text={"Next"} />
          {/* <SwipeBar onSwipe={handleOnSwipe} text={"Get Started"} /> */}
          <Stack
            alignContent={"center"}
            justifyContent={"end"}
            flexDirection={"row"}
            marginTop={"8px"}
          >
            <Button onClick={handleShare}>
              <Typography
                variant={"button"}
                fontSize="20px"
                fontWeight="400"
                textAlign={"center"}
                zIndex={1}
                // width={"80%"}
                // maxWidth={"280px"}
                color={"#FBF9ED"}
                className="lcd-font"
                sx={{
                  fontFamily: "LSC Solid",
                  letterSpacing: "5%",
                }}
              >
                Share
              </Typography>
              <Box>
                <img src={sendIcon} alt="send icon" />
              </Box>
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Home;
