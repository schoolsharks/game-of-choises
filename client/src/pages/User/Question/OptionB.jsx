import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleHaptic } from "../../../utils/haptic";
import redBB from "../../../assets/redBB.webp";
import optionArrowRight from "../../../assets/optionArrowRight.svg";
const OptionB = ({ text, onOptionSelect }) => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
          onOptionSelect("B");
        }

        if (distance > 150 && velocity > 0.5) {
          setPosition(window.innerWidth);
          handleHaptic();
          onOptionSelect("B");
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
      onOptionSelect("B");
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
    // <Stack
    //   onTouchStart={handleOnTouchStart}
    //   onTouchEnd={handleOnTouchEnd}
    //   onTouchMove={handleOnTouchMove}
    //   onMouseDown={handleOnMouseDown}
    //   // color={theme.palette.primary.main}
    //   color={"#FBF9ED"}
    //   direction={"row"}
    //   justifyContent={"space-between"}
    //   alignItems={"center"}
    //   border={`2px solid #FBF9ED`}
    //   // padding={"20px 55px 20px 12px"}
    //   paddingTop={"20px"}
    //   paddingBottom={"20px"}
    //   borderRadius={"30px"}
    //   position={"absolute"}
    //   left={"2rem"}
    //   width={"100%"}
    //   top={"250px"}
    //   maxWidth={"900px"}
    //   gap={"12px"}
    //   sx={{
    //     cursor: "pointer",
    //     scale: isActive ? "1.05" : "1",
    //     transition: "scale 0.3s ease",
    //     userSelect: "none",
    //     minHeight: "4.5rem",
    //     backgroundColor: "rgba(0, 0, 0, 0.4)",
    //     transform: `translateX(${position}px)`,
    //     // [theme.breakpoints.up("sm")]: {
    //     //   left: "150px",
    //     // },
    //   }}
    // >
    //   <Stack alignItems={"center"}>
    //     <img
    //       src={red}
    //       alt="Option B"
    //       style={{
    //         //  width: "2.31rem",
    //         //  height: "7.05rem",
    //          objectFit: "contain"
    //         }}
    //     />
    //   </Stack>
    //   <Typography
    //     variant="body1"
    //     fontWeight={"600"}
    //     fontSize={"25px"}
    //     lineHeight={"31.2px"}
    //     fontFamily={"Oxanium"}
    //     sx={{ marginRight: "28px" }}
    //   >
    //     {text}
    //   </Typography>
    // </Stack>

    <Stack
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
      onTouchMove={handleOnTouchMove}
      onMouseDown={handleOnMouseDown}
      color={"#FBF9ED"}
      sx={{
        cursor: "pointer",
        scale: isActive ? "1.05" : "1",
        transition: "scale 0.3s ease",
        userSelect: "none",
        minHeight: "4.5rem",
        transform: `translateX(${position}px)`,
        position: "realtive",
        paddingRight: "12px",
        // marginLeft: "auto",
        // marginRight: "0",
        // marginBottom: "200px",
        // width: "431px",
      }}
    >
      <Stack
        sx={{
          marginRight: windowWidth < 400 ? "-2.5rem" : "-4rem",
        }}
        alignItems={"end"}
      >
        <img
          src={redBB}
          alt="Option B"
          style={{
            width: "354px",
            // height: "500px", // Adjusted width
            padding: "10px", // Add padding around the content
            position: "relative",
            objectFit: "contain", // Ensures the image content fits inside
            height: "auto", // Automatically adjusts height based on content
            boxSizing: "border-box",
            paddingBottom: "20px",
            paddingTop: "10px",

            // paddingRight: "25px", // Ensures padding is included in the element's dimensions
          }}
        />
      </Stack>

      <Stack
        display={"flex"}
        alignItems={"center"}
        flexDirection={"row-reverse"}
        gap={"2rem"}
        sx={{
          position: "absolute",
          top: "50%",
          left: windowWidth < 400 ? "50%" : "60%",

          transform: "translate(-50%, -50%)",
          textAlign: "left",
          width: "346px",
        }}
      >
        <img src={optionArrowRight} />

        <Typography
          variant="body1"
          fontWeight={"400"}
          lineHeight={"25px"}
          fontSize={"18px"}
          fontFamily={"LSC Solid"}
          width={"65%"}
          // paddingLeft={"10px"}
          // paddingRight={"10px"}
          // marginY={"30px"}
          // paddingY={"30px"}
        >
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OptionB;
