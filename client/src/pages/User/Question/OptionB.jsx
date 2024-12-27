import { ArrowForward } from "@mui/icons-material";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleHaptic } from "../../../utils/haptic";
import red from "../../../assets/red.svg";

const OptionB = ({ text, onOptionSelect }) => {
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
        if (currentX > startX && !isLargeScreen) {
          setPosition(currentX - startX);
        }
      }
    };

    const handleMouseUp = () => {
      if (isActive) {
        setIsActive(false);
        const elapsedTime = Date.now() - startTime;
        const endX = position + startX;
        const distance = endX - startX;
        const velocity = distance / elapsedTime;

        if (isLargeScreen && elapsedTime < 500) {
          setPosition(-window.innerWidth);
          onOptionSelect('B')
        }

        if (distance > 150 && velocity > 0.5) {
          setPosition(window.innerWidth);
          handleHaptic();
          onOptionSelect('B');
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
    const distance = endX - startX;
    const velocity = distance / elapsedTime;

    if (distance > 150 && velocity > 0.5) {
      setPosition(window.innerWidth);
      handleHaptic();
      onOptionSelect('B');
    } else {
      setPosition(0);
    }
  };

  const handleOnTouchMove = (e) => {
    const currentX = e.targetTouches[0].clientX;
    if (currentX > startX) {
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
      // color={theme.palette.primary.main}
      color={"#FBF9ED"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      border={`2px solid #FBF9ED`}
      // padding={"20px 55px 20px 12px"}
      paddingTop={"20px"}
      paddingBottom={"20px"}
      borderRadius={"30px"}
      position={"absolute"}
      left={"2rem"}
      width={"100%"}
      top={"250px"}
      maxWidth={"900px"}
      gap={"12px"}
      sx={{
        cursor: "pointer",
        scale: isActive ? "1.05" : "1",
        transition: "scale 0.3s ease",
        userSelect: "none",
        minHeight: "4.5rem",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        transform: `translateX(${position}px)`,
        // [theme.breakpoints.up("sm")]: {
        //   left: "150px",
        // },
      }}
    >
      <Stack alignItems={"center"}>
        <img
          src={red} 
          alt="Option B"
          style={{
            //  width: "2.31rem", 
            //  height: "7.05rem", 
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
        sx={{ marginRight: "28px" }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default OptionB;
