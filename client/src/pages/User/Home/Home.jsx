import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";

import SwipeBar from "../../../components/SwipeBar";
import MySlider from "../../../components/MySlider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleOnSwipe = () => {
    navigate("/login");
  };
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
          justifyContent: "start",
          alignContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Typography
          variant={"h3"}
          fontSize="44px"
          fontWeight="400"
          textAlign={"center"}
          zIndex={1}
          width={"80%"}
          maxWidth={"280px"}
          marginTop="5%"
          color={"#FBF9ED"}
          className="lcd-font"
          sx={{
            fontFamily: "LSC Solid",
            lineHeight: "52.8px",
            letterSpacing: "5%",
          }}
        >
          THE GAME <br/>OF CHOICES
        </Typography>

        <MySlider />
      </Stack>

      <Stack
        position={"relative"}
        marginBottom={"10px"}
        maxHeight={"88px"}
        maxWidth={"370px"}
        height={"12%"}
        width={"80%"}
        alignContent={"center"}
        alignSelf={"center"}
      >
        <SwipeBar onSwipe={handleOnSwipe} text={"Get Started"} />
      </Stack>
    </Stack>
  );
};

export default Home;
