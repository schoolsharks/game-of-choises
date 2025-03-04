// OptionA.jsx
import {
  Box,
  duration,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleHaptic } from "../../../utils/haptic";
import blueAA from "../../../assets/optionA.webp";
// import optionArrowLeft from "../../../assets/optionArrowLeft.svg";
import { motion, AnimatePresence, delay } from "framer-motion";

const optionVariants = {
  initial: {
    opacity: 0,
    x: -50,
    scale: 0.95,
    delay: 0.3,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "easeIn",
      // damping: 12,
      // stiffness: 100,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    transition: {
      duration: 0.6,
    },
  },
  // hover: {
  //   scale: 1.02,
  //   transition: {
  //     duration: 0.5,
  //   },
  // },
};

const OptionA = ({ text, onOptionSelect }) => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xxl"));

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
          onOptionSelect("A");
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
    <AnimatePresence>
      <motion.div
        // variants={optionVariants}
        // initial="initial"
        // animate="animate"
        // exit="exit"
        whileHover="hover"
        style={{ width: "346px" }}
      >
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
            transform: `translateX(${position}px)`,
            position: "relative",
            width: "80%",
            minHeight: "130px",
            background: `url(${blueAA})`,
            filter:"drop-shadow(0 8px 10px #0000008f)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            justifyContent: "center",
            overflow:"hidden",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            // margin={"24px"}
            margin={"12px 35px 12px 12px"}
          >
            <Typography
              variant="body1"
              fontWeight="500"
              lineHeight="25px"
              fontSize="16px"
              // fontFamily="LSC Solid"
              color="#FBF9ED"
              textAlign={"right"}
              // sx={{ width: "70%" }}
            >
              {text}
            </Typography>
            {/* <motion.img
              src={optionArrowLeft}
              alt="Option Arrow"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            /> */}
          </Stack>
          {/* <Box 
            component={"img"}
              src={blueAA}
              alt="Option A"
              loading="lazy"
              style={{
                maxWidth: "356px",
                position: "relative",
                objectFit: "fill",
                // height: "auto",
                minHeight: "175px",
                height:"100%",
                boxSizing: "border-box",
                filter:"drop-shadow(0 10px 10px #00000074)",
                position:"absolute",
                width:"100%",
                height:"100%",
                zIndex:"-1"
              }}
            />
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={"1rem"}
            sx={{
              // position: "absolute",
              // top: "50%",
              // left: "45%",
              // transform: "translate(-50%, -50%)",
              textAlign: "right",
              width: "346px",
              paddingLeft: "35px",
              margin:"48px 0 20px"
            }}
          >
            <motion.img
              src={optionArrowLeft}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            />

            <Typography
              variant="body1"
              fontWeight={"400"}
              lineHeight={"23px"}
              fontSize={"1rem"}
              fontFamily={"LSC Solid"}
              width={"100%"}
              paddingX={"10px"}
              paddingRight={"2.5rem"}
              paddingY={"10px"}
            >
              {text}
            </Typography>
          </Stack> */}
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default OptionA;
