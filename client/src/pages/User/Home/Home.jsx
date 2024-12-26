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
      height="100vh"
      // height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      position="relative"
      overflow="hidden"
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
        color={theme.palette.primary.main}
        margin={"50px auto 22px"}
      >
        THE GAME <br></br>OF CHOCIES
      </Typography>

      <MySlider />

      <Stack
        // position={"fixed"}
        bottom={"60px"}
        maxHeight={"88px"}
        maxWidth={"900px"}
        marginBottom={"100px"}
      >
        <SwipeBar onSwipe={handleOnSwipe} />
      </Stack>
    </Stack>
  );
};

export default Home;
