import {
  Stack,
  Typography,
  LinearProgress,
  useTheme,
  Button,
  Box,
} from "@mui/material";
import Typewriter from "typewriter-effect";
import SwipeBar from "../../../components/SwipeBar";
import React, { useEffect, useState } from "react";
import send from "../../../assets/send.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Finished.css";
import { resetState } from "../../../app/userSlice";
import idfc from "../../../assets/IDFC.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import rightArrow from "../../../assets/rightArrow.png";
import RadarChart from "../../../components/RadarChart";
import analysisBG from "../../../assets/analysisBG.svg";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const options = [
  {
    id: 1,
    text: "IDFC First Bank provides ₹6 lakh lost card liability. Do you:",
    percentage: 70,
  },
  {
    id: 2,
    text: "Do you agree with the new terms and conditions?",
    percentage: 50,
  },
  {
    id: 3,
    text: "Would you like to opt for the premium plan?",
    percentage: 90,
  },
  { id: 4, text: "Do you want to receive promotional offers?", percentage: 30 },
  {
    id: 5,
    text: "Are you interested in the new savings scheme?",
    percentage: 85,
  },
];

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);

  const [userStatic, setUserStatic] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getAnalysis = async (user) => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/users/analysis",
      {
        params: {
          userId: user,
        },
      }
    );
    setUserStatic(response.data.analyticsData);
  };

  useEffect(() => {
    getAnalysis(user);
  }, [user]);

  const handleReset = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/users/storedata`,
      { userId: user }
    );
    navigate("/home");
  };

  const handleInviteClick = () => {
    const websiteURL = window.location.origin;
    navigator.clipboard
      .writeText(websiteURL)
      .then(() => {
        alert("Website URL copied to clipboard: " + websiteURL);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };
  let str1 = "";
  let str2 = "";
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        maxWidth: "431px",
        margin: "auto",
        color: "#FFFFFF",
        background: "rgba(0,0,0,0.7)",
        position: "relative",
        overflow: "hidden", // Prevent outer scroll
      }}
    >
      {/* Sticky Header */}
      <Link
        to="#"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          textDecoration: "none",
        }}
      >
        <Stack
          backgroundColor="#A00612"
          margin="1rem"
          paddingX="20px"
          paddingY="12px"
          borderRadius="18px"
          border="1px solid #FBF9ED"
          fontWeight="600"
          fontSize="25px"
          lineHeight="26px"
          fontFamily="Oxanium"
          display="flex"
          justifyContent="center"
          flexDirection="row"
          color="#FFFFFF"
          gap="1rem"
          alignItems="center"
          marginBottom={"30px"}
        >
          <p>Open account with IDFC</p>
          <img
            src={idfc}
            alt="option A"
            style={{
              objectFit: "contain",
            }}
          />
        </Stack>
      </Link>

      {/* Scrollable Content */}
      <Stack
        sx={{
          overflowY: "auto",
          height: "calc(100vh - 80px)", // Adjust based on header height
          paddingBottom: "2rem",
          gap: "2rem",
        }}
      >
        {/* Personality Section */}
        <Stack
          paddingX="1rem"
          paddingY="1.5rem"
          justifyContent="end"
          alignItems="end"
          sx={{
            aspectRatio: "90/40",
            background: `url(${analysisBG})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Typography
            fontFamily="LSC Solid"
            fontSize="45px"
            lineHeight="36px"
            fontWeight="400"
          >
            You are {userStatic.personalityScore}%
          </Typography>
          <Typography
            fontFamily="LSC Solid"
            fontSize="30px"
            lineHeight="36px"
            fontWeight="400"
          >
            {userStatic.personalityName}
          </Typography>
        </Stack>

        {/* SubCategory Section */}
        {userStatic && userStatic.subCategory?.length > 0 && (
          <Stack
            display="flex"
            flexDirection="row"
            gap="1rem"
            justifyContent="flex-start"
            flexWrap="wrap"
            margin="1rem"
          >
            {userStatic.subCategory.map((item, index) => (
              <Typography
                key={index}
                fontFamily="LSC Solid"
                fontWeight="400"
                fontSize="25px"
                lineHeight="23px"
                fontStyle="bold"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="10px"
              >
                {item}
                <div
                  className="blinking-div"
                  style={{
                    height: "28px",
                    width: "11px",
                    backgroundColor: "white",
                    animation: "blink 1s infinite",
                  }}
                />
              </Typography>
            ))}
          </Stack>
        )}

        {/* Strengths and Challenges */}
        <Stack gap="1rem">
          {/* Strengths */}
          {userStatic && userStatic?.strengths?.length > 0 && (
            <Stack
              borderRadius="10px"
              border="2px dotted white"
              paddingX="19px"
              paddingY="11px"
              marginX="1rem"
              height="100px"
              backgroundColor="#A0061280"
            >
              <Stack
                display="flex"
                flexDirection="row"
                gap="4px"
                justifyContent="flex-start"
                flexWrap="wrap"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    fontFamily="OCR-A BT"
                    fontWeight="400"
                    width={"100%"}
                    fontSize="18px"
                    lineHeight="25px"
                    display="inline-flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typewriter
                      // key={data.id}
                      options={{
                        delay: 2,
                        cursor: "|",
                        wrapperClassName: "typewriter-wrapper",
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString(userStatic.strengths.join(" ")) // Type the current slide description

                          .pauseFor(500)
                          .start();
                      }}
                    />
                  </Typography>
                </div>
              </Stack>
            </Stack>
          )}

          {/* Challenges */}
          {userStatic && userStatic?.challenges?.length > 0 && (
            <Stack
              borderRadius="10px"
              border="2px dotted white"
              paddingX="19px"
              paddingY="11px"
              marginX="1rem"
              height="100px"
              backgroundColor="#A0061280"
            >
              <Stack
                display="flex"
                flexDirection="row"
                gap="1rem"
                justifyContent="flex-end"
                flexWrap="wrap"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    fontFamily="OCR-A BT"
                    fontWeight="400"
                    width="100%"
                    fontSize="17px"
                    lineHeight="25px"
                    text="40px"
                    alignItems="end"
                    sx={{
                      textIndent: "20px",
                    }}
                  >
                    <Typewriter
                      // key={data.id}
                      options={{
                        delay: 2,
                        cursor: "|",
                        wrapperClassName: "typewriter-wrapper",
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString(userStatic.challenges.join(" ")) // Type the current slide description

                          .pauseFor(500)
                          .start();
                      }}
                    />

                    <span
                      className="blinking-div"
                      style={{
                        height: "28px",
                        width: "11px",

                        backgroundColor: "white",
                        animation: "blink 1s infinite",
                        marginLeft: "5px", // Adds space between the text and the cursor
                      }}
                    />
                  </Typography>
                </div>
              </Stack>
            </Stack>
          )}
        </Stack>

        {/* Personality Analysis Graph */}
        <Stack
          borderRadius="10px"
          border="1px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="1rem"
        >
          <Typography
            fontFamily="LSC Solid"
            fontWeight="500"
            fontSize="1.6rem"
            sx={{
              textDecoration: "underline",
            }}
          >
            Personality Representation
          </Typography>
          <Stack>
            <RadarChart dataValues={userStatic?.scoreArray} />
          </Stack>

          {userStatic && userStatic.scoreArray && (
            <Stack display="flex" flexDirection="column" gap="1rem">
              {[
                ["A. Disciplined Saver", 0],
                ["B. Balanced Spender", 1],
                ["C. The Hustler", 2],
                ["D. Hopeful Borrower", 3],
                ["E. Live-for-today Spender", 4],
              ].map(([label, index]) => (
                <Stack
                  key={index}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography
                    fontFamily="LSC Solid"
                    fontSize="18px"
                    lineHeight="36px"
                    fontWeight="400"
                  >
                    {label}
                  </Typography>
                  <Typography
                    fontFamily="LSC Solid"
                    fontSize="18px"
                    lineHeight="36px"
                    fontWeight="400"
                  >
                    {userStatic?.scoreArray[index]}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Offerings Section */}
        <Stack
          backgroundColor="#A0061242"
          borderTop="1px solid white"
          borderBottom="1px solid white"
          paddingY="22px"
          paddingX="21px"
        >
          <Stack
            textAlign="right"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            gap="1rem"
          >
            <Typography
              fontFamily="LSC Solid"
              fontWeight={400}
              fontSize="45px"
              lineHeight="36px"
            >
              Over 70%
            </Typography>
            <Typography
              fontFamily="LSC Solid"
              fontWeight={400}
              fontSize="20px"
              lineHeight="36px"
            >
              Liked IDFC Bank offerings
            </Typography>
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              onClick={() => setToggle(!toggle)}
              sx={{
                cursor: "pointer",
              }}
            >
              <Typography
                fontFamily="LSC Solid"
                fontWeight={400}
                fontSize="15px"
                lineHeight="36px"
              >
                Preferences
              </Typography>
              <KeyboardArrowUpIcon
                sx={{
                  transition: "transform 0.3s",
                  transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Stack>
          </Stack>

          {toggle && (
            <Stack marginTop="2rem">
              {options.map((option) => (
                <Stack
                  key={option.id}
                  border="1px solid white"
                  paddingX="17px"
                  paddingY="30px"
                  borderRadius="5px"
                  gap="1rem"
                  marginBottom="1rem"
                >
                  <Typography
                    fontFamily="inter"
                    fontWeight={600}
                    fontSize="15px"
                    lineHeight="18.15px"
                  >
                    {option.text}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={option.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 2,
                      backgroundColor: "red",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "white",
                      },
                    }}
                  />
                  <Typography
                    fontFamily="inter"
                    fontWeight={600}
                    fontSize="15px"
                    lineHeight="18.15px"
                  >
                    Opt - {option.percentage}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Claim Reward Section */}
        <Stack
          borderRadius="7px"
          border="1px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="1rem"
        >
          <Typography
            fontFamily="Oxanium"
            fontWeight="400"
            fontSize="20px"
            lineHeight="20.6px"
          >
            What will make you Switch to IDFC?
          </Typography>
          <Stack borderRadius="5px" backgroundColor="#A00612">
            <Stack
              borderRadius="10px"
              paddingY="1.5rem"
              backgroundColor="#A00612"
              textAlign="left"
              gap="1rem"
              paddingX="1rem"
            >
              <Typography
                fontFamily="Oxanium"
                fontWeight="400"
                fontSize="15px"
                lineHeight="15.45px"
              >
                Submit response to claim your reward
              </Typography>

              <Stack gap={"0.8rem"}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      selectedOption === "optionA" ? "#A00620" : "#A00612",
                    textTransform: "none",
                    fontWeight: 400,
                    paddingY: "9px",
                    border: "1px solid #FFFFFF78",
                    justifyContent: "left",
                    fontFamily: "Oxanium",
                    fontSize: "1rem",
                    width: "100%",
                    color: "#ffffff",
                  }}
                  onClick={() => setSelectedOption("optionA")}
                >
                  1. Option A
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      selectedOption === "optionB" ? "#A00620" : "#A00612",
                    textTransform: "none",
                    fontWeight: 500,
                    paddingY: "9px",
                    border: "1px solid #FFFFFF78",
                    justifyContent: "left",
                    fontFamily: "Oxanium",
                    fontSize: "1rem",
                    width: "100%",
                    color: "#ffffff",
                  }}
                  onClick={() => setSelectedOption("optionB")}
                >
                  2. Option B
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor:
                      selectedOption === "optionC" ? "#A00620" : "#A00612", // Change background if selected
                    textTransform: "none",
                    fontWeight: 500,
                    paddingY: "9px",
                    border: "1px solid #FFFFFF78",
                    justifyContent: "left",
                    fontFamily: "Oxanium",
                    fontSize: "1rem",
                    width: "100%", // Make button full width
                    color: "#ffffff",
                  }}
                  onClick={() => setSelectedOption("optionC")}
                >
                  3. Option C
                </Button>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius="5px"
                border="1px solid #FFFFFF78"
                paddingX="1.2rem"
                paddingY={"0.8rem"}
                backgroundColor="rgba(0,0,0,0.4)"
                color="#F1E9DE"
                sx={{
                  opacity: "0.7",
                }}
              >
                <Typography
                  fontWeight={"400"}
                  fontFamily={"Oxanium"}
                  fontSize={"20px"}
                >
                  Claim reward
                </Typography>

                <img src={rightArrow} height={"16px"}></img>
              </Stack>
            </Stack>

            <Stack
              backgroundColor={"#ffffff"}
              height={"300px"}
              borderRadius={"5px"}
              marginBottom={"1.5rem"}
              marginX={"1px"}
            ></Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            gap: "10px",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "end",
            alignItems: "center",
            width: "100%",
            // height: "40%",
            marginTop: "30px",
            maxHeight: "300px",
            cursor: "pointer",
            paddingRight: "30px",
            paddingY: "10px",
          }}
        >
          <Typography
            variant={"body3"}
            fontSize="1.4rem"
            fontWeight="400"
            textAlign={"end"}
            zIndex={1}
            color={theme.palette.primary.main}
            onClick={handleInviteClick}
          >
            Invite friends
          </Typography>
          <Box
            component="img"
            src={send}
            alt="send"
            loading="lazy"
            sx={{
              width: "24px",
              height: "24px",

              objectFit: "center",
            }}
            alignContent={"center"}
          />
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
          <SwipeBar onSwipe={handleReset} text={"Play Again"} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Finished;
