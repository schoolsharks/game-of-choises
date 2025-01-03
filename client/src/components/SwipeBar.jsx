import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { handleHaptic } from "../utils/haptic";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const SwipeBar = ({ onSwipe, text }) => {
  const [isActive, setIsActive] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [side, setSide] = useState("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const handleStart = (x, type) => {
    setIsActive(true);
    setStartX(x);
    setStartTime(Date.now());
    setSide(x < window.innerWidth / 2 ? "LEFT" : "RIGHT");
    handleHaptic();
  };

  const handleEnd = (x) => {
    setIsActive(false);
    const endX = x;
    const elapsedTime = Date.now() - startTime;
    const distance = Math.abs(startX - endX);
    const velocity = distance / elapsedTime;
    if (distance > 150 && velocity > 0.5) {
      handleHaptic();
      if (onSwipe) {
        onSwipe();
      }
    }
  };

  const handleOnTouchStart = (e) => {
    handleStart(e.targetTouches[0].clientX, "touch");
  };

  const handleOnTouchEnd = (e) => {
    handleEnd(e.changedTouches[0].clientX);
  };

  const handleOnMouseDown = (e) => {
    handleStart(e.clientX, "mouse");
  };

  const handleOnMouseUp = (e) => {
    if (isLargeScreen) {
      onSwipe();
    }
    handleEnd(e.clientX);
  };

  return (
    <Stack
      direction="row"
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      sx={{
        border: "3px solid #ffffff",
        color: "#ffffff",
        cursor: "pointer",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",

        width: "100%",
        height: "100%",
        // maxHeight: "88px",
        maxWidth: "361px",
        // gap: "2.5rem",
        scale: isActive ? "1.05" : "1",
        transition: "scale 0.3s ease",
        userSelect: "none",
        position: "relative",
        padding: "18px 21px",
      }}
    >
      <Typography
        variant="body3"
        fontSize={"32px"}
        fontWeight={"400"}
        color="#F1E9DE"
        width="100%"
        sx={{
          transition: "all 0.3s ease",
          transform:
            isActive && !isLargeScreen
              ? side === "LEFT"
                ? "translateX(20px)"
                : "translateX(-20px)"
              : "none",

          fontFamily: "LSC Solid",
          lineHeight: "32.96px",
        }}
      >
        {text}
      </Typography>
      <KeyboardArrowRightIcon style={{ fontSize: "40px" }} />
    </Stack>
  );
};

export default SwipeBar;
