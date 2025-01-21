import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typewriter from "typewriter-effect";
import "../Info/Info.css";
import {
  Stack,
  Typography,
  LinearProgress,
  useTheme,
  Box,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { fetchNextQuestion } from "../../../app/questionSlice";
import { motion, AnimatePresence } from "framer-motion";
import OptionA from "./OptionA";
import OptionB from "./OptionB";
import Button from "../../../components/Button";
// import homeIcon from "../../../assets/homeIcon.svg";
import { Navigate, useNavigate } from "react-router-dom";
// import bgQuestion from "../../../assets/bg-question.png";
import Advertisement from "../../../components/Advertisement";

const questionVariants = {
  initial: { opacity: 0, x: "100vw", scale: 0.8 },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 90,
    },
  },
  out: {
    opacity: 0,
    x: "-100vw",
    scale: 0.8,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 90,
    },
  },
};

// Remove the separate transition object since we're defining transitions in variants
const questionTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const Question = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const { currentQuestion, status, options, quesId, year } = useSelector(
    (state) => state.question
  );
  const { user, sq, wealth, investment, answered } = useSelector(
    (state) => state.user
  );
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!currentQuestion && user) {
      dispatch(
        fetchNextQuestion({
          userId: user,
          sq: sq,
          response: "",
          quesId: "",
          navigate,
        })
      );
    }
  }, [currentQuestion, dispatch, user]);

  const handleOptionSelect = (response) => {
    dispatch(
      fetchNextQuestion({
        userId: user,
        sq: sq,
        response,
        quesId: quesId,
        navigate,
      })
    );
  };

  if (answered === 25) {
    return <Navigate to="/completed" />;
  }

  return (
    <Box
      minHeight="100vh"
      margin={"auto"}
      width={"100%"}
      maxWidth={"431px"}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"start"}
      sx={{
        background: "linear-gradient(360deg, #A00612 0%, #000000 100%)",
      }}

      // sx={{
      //   // aspectRatio: "116/45",
      //   background: `url(${bgQuestion})`,
      //   backgroundSize: "contain",
      //   backgroundRepeat: "repeat",
      //   // opacity: "0.6",
      // }}
    >
      {status === "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            // left: isLargeScreen ? "-100%" : "0",
            width: "100vw",
            height: `${window.innerHeight < 616 ? 616 : window.innerHeight}px`,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.079)",
            clipPath: "-20px -20px -20px -50px",
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </motion.div>
      )}

      {toggle ? (
        <Stack
          minHeight={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
          // height="auto"
          width="100%"
          maxWidth={"431px"}
          position="relative"
          alignItems={"center"}
        >
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion}
                initial="initial"
                animate="in"
                exit="out"
                variants={questionVariants}
                style={{
                  position: "relative",
                  zIndex: 0,
                  width: "100%",
                  height: "100%",
                  maxWidth: "100%",
                }}
              >
                <Stack
                  padding="0 0px"
                  // height={`${
                  //   window.innerHeight < 616 ? 616 : window.innerHeight
                  // }px`}
                  maxWidth="431px"
                  width="100%"
                  height={"100%"}
                  gap={"10px"}
                  // sx={{ overflowX: "hidden",overflowY:"visible" }}
                >
                  {/* <Stack
                    direction="row"
                    marginTop="24px"
                    justifyContent="space-around"
                    color={theme.palette.primary.main}
                  >
                    <Stack alignItems="center" flex={1}>
                      <Typography fontWeight={"500"}>
                        Bank Balance
                      </Typography>
                      <Typography variant="h6" fontWeight={"700"}>
                        {wealth}
                      </Typography>
                    </Stack>
                    <Stack alignItems="center" flex={1} fontWeight={"500"}>
                      <Typography >Investments</Typography>
                      <Typography variant="h6" fontWeight={"700"}>
                        {investment}
                      </Typography>
                    </Stack>
                    <Stack alignItems="center" flex={1} fontWeight={"500"}>
                      <Typography >Year</Typography>
                      <Typography variant="h6" fontWeight={"700"}>
                        {year}
                      </Typography>
                    </Stack>
                  </Stack> */}

                  {/* <LinearProgress
                    variant="determinate"
                    value={(answered * 100) / 25}
                    sx={{
                      margin: "16px 0 8px",
                      borderRadius: "2px",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: theme.palette.primary.main,
                      },
                      backgroundColor: "#7793AF",
                      boxShadow: "0 0 10px #ffffff"
                    }}
                  /> */}

                  {/* questions */}
                  <Stack
                    // margin="16px 0px"
                    display={"flex"}
                    width={"100%"}
                    maxWidth={"431px"}
                    marginTop={"100px"}
                    // marginBottom={"20px"}
                    alignSelf={"flex-start"}
                    sx={{
                      minHeight: window.innerWidth < 500 ? "180px" : "180px",
                    }}
                  >
                    <Typography
                      variant="typ"
                      sx={{
                        width: "90%",
                        height: "100%",
                        color: "#FFFFFF",
                        position: "relative",
                        marginLeft: "25px",
                        display: "inline-block",
                        wordWrap: "break-word",
                        "& .Typewriter": {
                          "& *": {
                            fontSize: "inherit",
                            wordBreak: "break-word",
                          },
                        },
                      }}
                    >
                      <span
                        id="typewriter-text"
                        style={{
                          display: "inline-block",
                          fontSize: "20px",
                          width: "100%",
                          marginRight: "25px",
                          whiteSpace: "pre-wrap", // Changed from pre to pre-wrap for wrapping
                          lineHeight: "35px",
                          textAlign: "start",
                          position: "relative",
                          overflowWrap: "break-word",
                        }}
                      >
                        {currentQuestion}
                        {/* <Typewriter
                          // key={data.id}
                          options={{
                            delay: 20,
                            cursor: "|",
                            wrapperClassName: "typewriter-wrapper",
                          }}
                          onInit={(typewriter) => {
                            typewriter
                              .typeString(currentQuestion) // Type the current slide description

                              .pauseFor(500)
                              .start();
                          }}
                        /> */}
                      </span>
                    </Typography>
                  </Stack>

                  {/* options */}
                  {options && (
                    <Stack
                      marginTop="10px"
                      display={"flex"}
                      flexDirection={"column"}
                      maxWidth={"380px"}
                      width={"95%"}
                      sx={{
                        // gap: window.innerWidth < 400 ? "0" : "3rem",
                      }}
                    >
                      <OptionA
                        text={options["A"]}
                        onOptionSelect={handleOptionSelect}
                      />
                      <OptionB
                        text={options["B"]}
                        onOptionSelect={handleOptionSelect}
                      />
                    </Stack>
                  )}
                  {/* <Stack marginTop="16px" position="relative" direction="column" columnGap={"2.5rem"}>
                    {options && (
                      <>
                        <OptionA
                          text={options["A"]}
                          onOptionSelect={handleOptionSelect}
                        />
                        <OptionB
                          text={options["B"]}
                          onOptionSelect={handleOptionSelect}
                        />
                      </>
                    )}
                  </Stack> */}

                  {/* <Stack
                    alignItems="center"
                    position="relative"
                    margin="auto 0 35px"
                    left="0"
                    width="100%"
                  >
                    <Box
                      width="80%"
                      height="4px"
                      bgcolor="#fff"
                      borderRadius="4px"
                    />
                    <Box
                      position="absolute"
                      onClick={() => navigate("/home")}
                      left="50%"
                      sx={{
                        top: "50%",
                        transform: "translateX(-50%) translateY(-50%)",
                      }}
                    >
                      <Button>
                        <img src={homeIcon} alt="" style={{ width: "32px", objectFit: "contain" }} />
                      </Button>
                    </Box>
                  </Stack> */}
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>
      ) : (
        <Advertisement />
      )}
    </Box>
  );
};

export default Question;
