import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Typewriter from "typewriter-effect";
import "../Info/Info.css";
import {
  Stack,
  Typography,
  // LinearProgress,
  useTheme,
  Box,
  CircularProgress,
  IconButton,
  // useMediaQuery,
} from "@mui/material";
import { fetchNextQuestion } from "../../../app/questionSlice";
import { motion, AnimatePresence } from "framer-motion";
import OptionA from "./OptionA";
import OptionB from "./OptionB";
// import Button from "../../../components/Button";
// import homeIcon from "../../../assets/homeIcon.svg";
import { Navigate, useNavigate } from "react-router-dom";
// import bgQuestion from "../../../assets/bg-question.png";
import Advertisement from "../../../components/Advertisement";
import MidQuestionPopups from "./MidQuestionPopups";
import DoYouKnow from "./DoYouKnow";
import WildcardPopup from "./WildcardPopup";
import UpperTriangleBox from "../../../components/UpperTriangleBox";
import { HomeOutlined } from "@mui/icons-material";
import homeIcon from "../../../assets/icons/homeIcon.png";

const questionVariants = {
  initial: { opacity: 0, x: "100vw", scale: 0.8 },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 12,
      stiffness: 70,
    },
  },
  out: {
    opacity: 0,
    x: "-100vw",
    scale: 0.8,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 12,
      stiffness: 70,
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
  const [midQuestionsPopup, setMidQuestionsPopup] = useState({
    open: false,
    popup: null,
  });
  const [doYouKnowPopup, setDoYouKnowPopup] = useState({
    open: false,
    popup: null,
  });
  const [wildCardPopup, setWildCardPopup] = useState({
    open: false,
    alert: null,
    content: null,
  });

  // const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleQuestionsEnd = () => {
    setDoYouKnowPopup({ open: true, popup: 3 });
  };
  useEffect(() => {
    if (!currentQuestion && user) {
      dispatch(
        fetchNextQuestion({
          userId: user,
          sq: sq,
          response: "",
          quesId: "",
          handleQuestionsEnd,
          setWildCardPopup,
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
        handleQuestionsEnd,
        setDoYouKnowPopup,
        setWildCardPopup,
      })
    );
  };

  // if (answered === 30) {
  //   return <Navigate to="/completed" />;
  // }

  useEffect(() => {
    if (answered === 5 && !midQuestionsPopup.open) {
      setDoYouKnowPopup({ open: true, popup: 1 });
    } else if (answered === 10 && !midQuestionsPopup.open) {
      setDoYouKnowPopup({ open: true, popup: 2 });
    }
  }, [answered]);

  return (
    <Box
      minHeight={window.innerHeight + "px"}
      margin={"auto"}
      width={"100%"}
      maxWidth={"431px"}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"start"}
      bgcolor={theme.palette.primary.main}

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
          flex={"1"}
        >
          {doYouKnowPopup.open && (
            <DoYouKnow
              id={doYouKnowPopup.popup}
              handleClose={() =>
                setDoYouKnowPopup({ open: false, popup: null })
              }
            />
          )}
          {wildCardPopup.open && (
            <WildcardPopup
              alert={wildCardPopup.alert}
              content={wildCardPopup.content}
              handleClose={() =>
                setWildCardPopup({ open: false, alert: null, text: null })
              }
            />
          )}
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
                  fontWeight: "700",
                  fontFamily: "Red Hat Display",
                  textShadow: "0 8px 6px #00000043",
                  display: "flex",
                  flexDirection: "column",
                  flex: "1",
                }}
              >
                <UpperTriangleBox
                  sx={{
                    margin: "30px 30px 0px",
                    borderRadius: "20px",
                    flex: "1",
                    position: "relative",
                  }}
                >
                  <Stack
                    padding="0 0px"
                    maxWidth="431px"
                    width="100%"
                    height={"100%"}
                    gap={"10px"}
                    paddingBottom={"20px"}
                    // sx={{ overflowX: "hidden",overflowY:"visible" }}
                  >
                    {/* questions */}
                    <Stack
                      // margin="16px 0px"
                      display={"flex"}
                      width={"100%"}
                      maxWidth={"431px"}
                      // justifyContent={"center"}
                      // marginBottom={"20px"}
                      alignSelf={"flex-start"}
                      padding={"0 16px"}
                      minHeight={"90px"}
                    >
                      <Typography
                        fontSize={"20px"}
                        fontWeight={"700"}
                        color="#ffffff"
                      >
                        {" "}
                        {currentQuestion}
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
                  </Stack>
                </UpperTriangleBox>
                <Box
                  margin={"auto"}
                  sx={{ transform: "translateY(-50%)", zIndex: "9999" }}
                >
                  <IconButton
                  onClick={()=>navigate("/home/1")}
                    sx={{ bgcolor: "#000000", "&:hover": { bgcolor: "#000" } }}
                  >
                    <img src={homeIcon} alt="" style={{ width: "32px" }} />
                  </IconButton>
                </Box>
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
