import {
  Box,
  Button,
  duration,
  IconButton,
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
import { ShareOutlined } from "@mui/icons-material";

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
      alert("Website URL copied to clipboard");
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
        minHeight: window.innerHeight + "px",
        flex: "1",
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
          // paddingTop: "55px",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          gap: "30px",
          flex: "1",
        }}
      >
        {isSplashScreenOn ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.25 }}
            transition={{
              duration: 1.2,
              ease: [0.08, 0.72, 0.15, 0.62],
              delay: 0.3,
            }}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={"h3"}
              fontSize="40px"
              fontWeight="400"
              textAlign={"center"}
              zIndex={1}
              // width={"80%"}
              // maxWidth={"280px"}
              margin="auto"
              color={"#FBF9ED"}
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
          <Box paddingTop={"20px"}>
          <MySlider currentSlide={currentSlide} />
          </Box>
        )}
      </Stack>

      {!isSplashScreenOn && (
        <Stack
          position={"relative"}
          marginBottom={"0px"}
          // maxHeight={"88px"}
          maxWidth={"370px"}
          // height={"12%"}
          marginTop={"auto"}
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
            <IconButton onClick={handleShare}><ShareOutlined sx={{color:"#fff",fontSize:"28px"}}/></IconButton>
            {/* <Button onClick={handleShare}>
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
            </Button> */}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Home;
