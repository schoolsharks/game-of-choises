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
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
        gap: "15px",
      }}
    >
      <Stack
        sx={{
          height: "75%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "493px",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Typography
          variant={"h3"}
          fontSize="2.5rem"
          fontWeight="700"
          textAlign={"center"}
          zIndex={1}
          width={"80%"}
          maxWidth={"307px"}
          marginTop={"8%"}
          color={theme.palette.primary.main}
        >
          THE GAME OF CHOCIES
        </Typography>

        <MySlider />
      </Stack>

      <Stack
        position={"fixed"}
        bottom={"8%"}
        maxHeight={"88px"}
        maxWidth={"361px"}
        height={"15%"}
        width={"75%"}
        alignContent={"center"}
        alignSelf={"center"}
      >
        <SwipeBar onSwipe={handleOnSwipe} text={"Get Started"} />
      </Stack>
    </Stack>
  );
};

export default Home;
