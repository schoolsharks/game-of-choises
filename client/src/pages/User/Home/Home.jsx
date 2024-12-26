import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

import SwipeBar from "../../../components/SwipeBar";
import MySlider from "../../../components/MySlider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleOnSwipe = () => {
    navigate("/login");
  };
  return (
    <Stack
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      position="relative"
    >
      <Typography
        variant={"h3"}
        fontSize="2.5rem"
        fontWeight="700"
        textAlign={"center"}
        zIndex={1}
        maxWidth={"307px"}
        // top={"150px"}
        maxHeight={"117px"}
        color={"#FBF9ED"}
        margin={"100px auto 22px"}
        fontFamily = "Oxanium"
      >
        THE GAME <br></br>OF CHOCIES
      </Typography>

      <MySlider />
      <div>
        <Stack
          // position={"fixed"}
          bottom={"60px"}
          maxHeight={"88px"}
          maxWidth={"900px"}
          marginBottom={"100px"}
        >
          <SwipeBar onSwipe={handleOnSwipe} />
        </Stack>
      </div>
    </Stack>
  );
};

export default Home;
