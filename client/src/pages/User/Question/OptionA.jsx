import { ArrowBack } from "@mui/icons-material";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleHaptic } from "../../../utils/haptic";
import blue from "../../../assets/blue.svg"

const OptionA = ({ text, onOptionSelect }) => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"))

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isActive) {
        const currentX = e.clientX;
        if (currentX < startX && !isLargeScreen) {
          setPosition(currentX - startX);
        }
      }
    };

    const handleMouseUp = () => {
      if (isActive) {

        setIsActive(false);
        const elapsedTime = Date.now() - startTime;
        const endX = position + startX;
        const distance = startX - endX;
        const velocity = distance / elapsedTime;

        if (isLargeScreen && elapsedTime < 500) {
          setPosition(-window.innerWidth);
          onOptionSelect('A')
        }

        if (distance > 150 && velocity > 0.5) {
          setPosition(-window.innerWidth);
          onOptionSelect("A");
          handleHaptic();
        } else {
          setPosition(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isActive, startX, startTime, position, onOptionSelect]);

  const handleOnTouchStart = (e) => {
    setIsActive(true);
    setStartX(e.targetTouches[0].clientX);
    setStartTime(Date.now());
    handleHaptic();
  };

  const handleOnTouchEnd = () => {
    setIsActive(false);
    const elapsedTime = Date.now() - startTime;
    const endX = position + startX;
    const distance = startX - endX;
    const velocity = distance / elapsedTime;

    if (distance > 150 && velocity > 0.5) {
      setPosition(-window.innerWidth);
      onOptionSelect("A");
      handleHaptic();
    } else {
      setPosition(0);
    }
  };

  const handleOnTouchMove = (e) => {
    const currentX = e.targetTouches[0].clientX;
    if (currentX < startX) {
      setPosition(currentX - startX);
    }
  };

  const handleOnMouseDown = (e) => {
    setIsActive(true);
    setStartX(e.clientX);
    setStartTime(Date.now());
    handleHaptic();
  };

  return (
    <Stack
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onTouchMove={handleOnTouchMove}
      onMouseDown={handleOnMouseDown}
      direction={"row-reverse"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={theme.palette.primary.main}
      // padding={"20px 12px 20px 55px"
      paddingTop={"20px"}
      paddingBottom={"20px"}
      borderRadius={"30px"}
      border={`2px solid ${theme.palette.primary.main}`}
      position={"absolute"}
      right={`2rem`}
      maxWidth={"900px"}
      gap={"12px"}
      width={"100%"}
      sx={{
        cursor: "pointer",
        scale: isActive ? "1.05" : "1",
        transition: "scale 0.3s ease",
        userSelect: "none",
        minHeight: "4.5rem",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        transform: `translateX(${position}px)`,
        // [theme.breakpoints.up("sm")]: {
        //   right: "150px",
        // },
      }}
    >
      <Stack alignItems={"center"}>
        <img
          src={blue}
          alt="option A"
          style={{
            // width: "2.31rem", 
            // height: "7.05rem", 
            objectFit: "contain"
          }}
        />

      </Stack>
      <Typography
        variant="body1"
        fontWeight={"600"}
        fontSize={"25px"}
        lineHeight={"31.2px"}
        fontFamily={"Oxanium"}
        sx={{ 
          marginLeft: "28px", 
          [theme.breakpoints.up("sm")]: { marginLeft: "170px" } 
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default OptionA;
