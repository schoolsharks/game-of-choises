// OptionB.jsx
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { handleHaptic } from "../../../utils/haptic";
import redBB from "../../../assets/optionB.webp";
import optionArrowRight from "../../../assets/optionArrowRight.svg";
import { motion, AnimatePresence } from "framer-motion";

const optionVariants = {
  initial: {
    opacity: 0,
    x: 50,
    scale: 0.95,
    delay:0.6
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      delay: 0.9, // Slightly delayed after Option A
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    transition: {
      duration: 0.9,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.8,
    },
  },
};

const OptionB = ({ text, onOptionSelect }) => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xxl"));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          setPosition(window.innerWidth);
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
    <AnimatePresence>
      <motion.div
        variants={optionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
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
            minHeight: "4.5rem",
            transform: `translateX(${position}px)`,
            position: "relative",
            paddingRight: "12px",
          }}
        >
          <Stack
            sx={{
              marginRight: windowWidth < 400 ? "-2.5rem" : "-4.4rem",
            }}
            alignItems={"end"}
          >
            <motion.img
              src={redBB}
              loading="lazy"
              alt="Option B"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "354px",
                padding: "10px",
                position: "relative",
                objectFit: "fill",
                // height: "auto",
                height: "160px",
                boxSizing: "border-box",
                // paddingBottom: "20px",
                paddingTop: "10px",
                filter:"drop-shadow(0 10px 10px #00000074)"
              }}
            />
          </Stack>

          <Stack
            display={"flex"}
            alignItems={"center"}
            flexDirection={"row-reverse"}
            gap={"1rem"}
            sx={{
              position: "absolute",
              top: "50%",
              left: windowWidth < 400 ? "50%" : "60%",
              transform: "translate(-50%, -50%)",
              textAlign: "left",
              width: "346px",
            }}
          >
            <motion.img
              src={optionArrowRight}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            />

            <Typography
              variant="body1"
              fontWeight={"400"}
              lineHeight={"25px"}
              fontSize={"1rem"}
              fontFamily={"LSC Solid"}
              width={"65%"}
              // paddingLeft={"2.5rem"}
            >
              {text}
            </Typography>
          </Stack>
        </Stack>
      </motion.div>
    </AnimatePresence>
  );
};

export default OptionB;
