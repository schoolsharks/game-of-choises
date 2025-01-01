import { Stack, Typography, IconButton, useTheme, Box } from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Typewriter from "typewriter-effect";
import person1 from "../../../assets/person1.png";
import person3 from "../../../assets/person3.png";
import person4 from "../../../assets/person4.png";
import person5 from "../../../assets/person5.png";
import person6 from "../../../assets/person6.png";
import person2 from "../../../assets/person2.png";
import SwipeBar from "../../../components/SwipeBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Padding } from "@mui/icons-material";

const Info = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleOnSwipe = () => {
    navigate("/questions");
  };

  const Infodata = [
    {
      id: 1,
      image: person1,
      content1: "",
      content2: "",
      desc1:
        "Are you the one? In the Financial Matrix, every swipe reveals your vibe— are you a planner, risk-taker, or spender? Let’s decode your financial game!",
    },
    {
      id: 2,
      image: person2,
      content1: "The",
      content2: "HUSTLER",
      desc1:
        "Just like Neo, embark on a financial journey, evolving from inexperienced to confident.Represents bold and ambitious decision-making",
    },
    {
      id: 3,
      image: person3,
      content1: "SAVER",
      content2: "DISCIPLINEO",
      desc1:
        "Just like Morpheus, a wise advisor who inspires discipline and strategic thinking to build financial security",
    },
    {
      id: 4,
      image: person4,
      content1: "BALANCEO",
      content2: "SPENDER",
      desc1:
        "Just like Trinity a supportive companion who emphasises balance between enjoying life now and planning for the future",
    },
    {
      id: 5,
      image: person5,
      content1: "HOPEFUL",
      content2: "BORROWER",
      desc1:
        " Just like Agent Smith, embodies poor financial habits and misleading shortcuts, testing your decision-making skills",
    },
    {
      id: 6,
      image: person6,
      content1: "LIVE-FOR-TODAY",
      content2: "SPENDER",
      desc1:
        "Just like the matrix system,  you symbolize societal pressure and impulsive behaviors that hinder financial stability",
    },
  ];

  const [slide, setslide] = useState(0);
  const data = Infodata[slide];

  const handlePrev = () => {
    if (slide > 0) {
      setslide(slide - 1);
    }
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
  const handleNext = () => {
    if (slide < Infodata.length - 1) {
      setslide(slide + 1);
    }
  };

  // Animation variants for text
  // const textVariants = {
  //   hidden: { x: "-100%", opacity: 0 },
  //   visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  // };
  // // First, create a new animation variant for fade effect
  const fadeVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.4, // fade duration
      },
    },
  };

  return (
    <Stack
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
        gap: "20px",
        // width: "100vw",
      }}
    >
      <Stack
        width="100%"
        maxWidth="431px"
        maxHeight="750px"
        height="85%"
        position="relative"
        // overflow="hidden"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
        sx={{
          paddingBottom: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "90%",

            objectFit: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: windowHeight > 800 ? "25px" : "10px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={data?.image}
            alt="info-person"
            loading="lazy"
            sx={{
              width: "100%",
              height: windowHeight > 900 ? "370px" : "200px",
              // maxHeight: windowHeight > 800 ? "370px" : "300px",
              opacity: "60%",
              objectFit: "center",
            }}
            alignContent={"center"}
          />

          <motion.div
            key={`content1-${data.id}`}
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
          >
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontSize: "22px",
                letterSpacing: slide !== 5 ? "20px" : "15px",
                fontFamily: "Orbitron",
                fontWeight: "600",
                transform: "rotate(90deg)",
                color: "#FFFFFF",
                position: "absolute",
                whiteSpace: "nowrap",

                top: slide > 2 ? "2%" : "15%",
                left: "84%",
                textTransform: "uppercase",
                transformOrigin: "left bottom",
                zIndex: 10,
                maxWidth: "75%",
              }}
            >
              {data.content1}
            </Typography>
          </motion.div>
          <motion.div
            key={`content2-${data.id}`}
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
          >
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontSize: "22px",
                letterSpacing: "20px",
                fontFamily: "Orbitron",
                fontWeight: "600",
                transform: "rotate(90deg)",
                color: "#FFFFFF",
                position: "absolute",
                whiteSpace: "nowrap",
                top: slide <= 2 ? "2%" : "15%",

                textTransform: "uppercase",
                transformOrigin: "left bottom",
                zIndex: 1,
                left: "92%",
              }}
            >
              {data.content2}
            </Typography>
          </motion.div>
          {/* <motion.div
            key={data.desc1} // Key ensures Framer Motion detects slide change
            initial="hidden"
            animate="visible"
            exit="hidden"
            height="50%"
            variants={textVariants}
          > */}
          <typography
            style={{
              fontSize: "20px",
              fontWeight: "400",
              color: "#FBF9ED",
              width: "80%",
              height: "100%",
              margin: "auto",
              // padding: "0px 10px 0px 20px",
              marginBottom: "15px",
              lineHeight: "30px",
              alignContent: "start",
            }}
          >
            <Typewriter
              key={data.id} // Restart animation for each slide
              options={{
                delay: 25,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(data.desc1) // Type the current slide description
                  .pauseFor(500)
                  .start();
              }}
            />
          </typography>

          {/* </motion.div> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            height: "10%",
            margin: " 10px auto",

            paddingBottom: "15px",
          }}
        >
          <IconButton
            onClick={handlePrev}
            disabled={slide === 0}
            sx={{
              color: slide === 0 ? "gray" : "primary.main",
              fontSize: "200px",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={slide === 5}
            sx={{
              color: slide === 5 ? "gray" : "primary.main",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Stack>

      <Stack
        position={"relative"}
        marginBottom={"10px"}
        maxHeight={"88px"}
        maxWidth={"361px"}
        height={"15%"}
        width={"80%"}
        alignContent={"center"}
        alignSelf={"center"}
      >
        <SwipeBar onSwipe={handleOnSwipe} text={"Play"} />
      </Stack>
    </Stack>
  );
};

export default Info;
