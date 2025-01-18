import {
  Stack,
  Typography,
  LinearProgress,
  useTheme,
  Button,
  Box,
} from "@mui/material";
// import Typewriter from "typewriter-effect";
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
import diamond from "../../../assets/diamond.svg"

import person3 from "../../../assets/person3.svg";
import person4 from "../../../assets/person4.svg";
import person5 from "../../../assets/person5.svg";
import person6 from "../../../assets/person6.svg";
import person2 from "../../../assets/person2.svg";
import rightArrow from "../../../assets/rightArrow.png";
import RadarChart from "../../../components/RadarChart";
// import analysisBG from "../../../assets//aestheticCompletedImage.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import personalitiesGrid from "../../../assets/personalities-grid.jpg";

import risk from "../../../assets/risk.svg"
import yolo from "../../../assets/yolo.svg"
import dreamer from "../../../assets/dreamer.svg"
import balances_strategist from "../../../assets/balanced_strategist.svg"
import budget_guru from "../../../assets/budget_guru.svg";

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


const riskTaker = [
  {
    id: 1,
    text: "Savings Behaviour",
    percentage: 70,
  },
  {
    id: 2,
    text: "Investment Risk Tolerance",
    percentage: 60,
  },
  {
    id: 3,
    text: "Debt Management",
    percentage: 90,
  },
  {
    id: 4,
    text: "Lifestyle Choices",
    percentage: 80
  },
];

const personalities = [
  {
    id: 1,
    heading: "THE HUSTLER ",
    content: "start as a hustler, making bold choices in your financial journey. Over time, you evolve into someone empowered, learning from your mistakes and striving for success."
  },
  {
    id: 2,
    heading: "BALANCED SPENDER",
    content: "start as a hustler, making bold choices in your financial journey. Over time, you evolve into someone empowered, learning from your mistakes and striving for success."
  },
  {
    id: 3,
    heading: "DISCIPLINED SAVER",
    content: "start as a hustler, making bold choices in your financial journey. Over time, you evolve into someone empowered, learning from your mistakes and striving for success."
  },
  {
    id: 4,
    heading: "HOPEFUL BORROWER",
    content: "start as a hustler, making bold choices in your financial journey. Over time, you evolve into someone empowered, learning from your mistakes and striving for success."
  },
  {
    id: 5,
    heading: "LIVE-FOR-TODAY SPENDER",
    content: "start as a hustler, making bold choices in your financial journey. Over time, you evolve into someone empowered, learning from your mistakes and striving for success."
  }
]

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);

  const [userStatic, setUserStatic] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [toggle, setToggle] = useState(false);
  const [personlityToggle, setPersonalityToggle] = useState(false);

  const data1 = [
    "Disciplined Saver",
    "Balanced Spender",
    "The Hustler",
    "Hopeful Borrower",
    "Live for today Spender",
  ];
  const data2 = [person3, person4, person2, person5, person6];
  const index = data1.findIndex((item) => item === userStatic?.personalityName);
  // console.log(index);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(userStatic);
  // if (localStorage.getItem("dataValues")) {
  //   localStorage.removeItem("dataValues");
  // }
  // localStorage.setItem("dataValues", userStatic?.scoreArray);
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
    // const response = await axios.post(
    //   `${import.meta.env.VITE_SERVER_URL}/users/storedata`,
    //   { userId: user }
    // );
    localStorage.clear();
    window.location.reload();
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
  console.log(userStatic?.personalityName);
  const personalityImage = data2[index];
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "431px",
        margin: "auto",
        color: "#FFFFFF",
        background: "rgba(0,0,0,0.7)",
        position: "relative",

        overflowX: "hidden", // Prevent outer scroll
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
          fontSize="1.25rem"
          lineHeight="26px"
          fontFamily="OCR-A BT"
          display="flex"
          justifyContent="space-between"
          direction={"row"}
          color="#FFFFFF"
          gap="1rem"
          alignItems="center"
          marginBottom={"30px"}
        >
          <p>Start banking with IDFC</p>
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
          overflowX: "auto",
          height: "calc(100vh - 80px)",
          paddingBottom: "2rem",
          width: "100%",
        }}
      >
        <Stack
          margin={"30px"}
          gap="1rem">
          <Typography
            fontFamily="LSC Solid"
            fontSize="34px"
            lineHeight="25px"
            fontWeight="400"
          >
            Congratulations!
          </Typography>
          <Typography
            fontFamily="OCR-A BT"
            fontSize="20px"
            lineHeight="25px"
            fontWeight="400">
            You’ve completed the Financial Matrix
          </Typography>
        </Stack>
        {/* <img src={personalitiesGrid} alt="" style={{ opacity: "0.5" }} /> */}

        <div style={{ position: "relative", display: "inline-block", height: "156px" }}>
          <img src={personalitiesGrid} alt="" style={{ opacity: "0.5", width: "100%", height: "156px" }} />
          <Typography
            fontFamily="LSC Solid"
            fontSize="30px"
            lineHeight="36px"
            fontWeight="400"
            whiteSpace={"nowrap"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              zIndex: 1,
            }}
          >
            {userStatic.personalityName}
          </Typography>
        </div>

        <Stack
          sx={{
            padding: "40px 16px",
            background: " linear-gradient(180deg, #000000 0%, #A00612 100%)",
          }}

          borderBottom={"1px solid white"}
        >
          {/* <Typography
            fontFamily="LSC Solid"
            fontSize="45px"
            lineHeight="36px"
            fontWeight="400"
          >
            You are {userStatic.personalityScore}%
          </Typography> */}
          {/* <Typography
            fontFamily="OCR-A BT"
            fontSize="30px"
            lineHeight="36px"
            fontWeight="400"
            marginTop={"14px"}
            textTransform={"uppercase"}
          >
            {userStatic.personalityName}
          </Typography> */}

          {/* SubCategory Section */}
          {userStatic && userStatic.subCategory?.length > 0 && (
            <Stack
              display="flex"
              flexDirection="row"
              gap="1rem"
              justifyContent="flex-start"
              flexWrap="wrap"
              margin="2rem 0"
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

          <Typography fontFamily={"OCR-A BT"} fontSize={"1.25rem"}>{userStatic.insights}</Typography>
        </Stack>


        {/* <Stack gap="1rem">
          {userStatic && userStatic?.strengths?.length > 0 && (
            <Stack
              borderRadius="10px"
              border="2px dotted white"
              paddingRight="50px"
              paddingTop="11px"
              paddingLeft={"14px"}
              marginX="1rem"
              minHeight="100px"
              backgroundColor="#A0061280"
            >
              <Stack
                display="flex"
                flexDirection="row"
                gap="4px"
                // justifyContent="flex-start"s
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
                        delay: 20,
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



          {userStatic && userStatic?.challenges?.length > 0 && (
            <Stack
              borderRadius="10px"
              border="2px dotted white"
              paddingLeft="50px"
              paddingTop="11px"
              marginX="1rem"
              minHeight="100px"
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
                    fontSize="16px"
                    lineHeight="25px"
                    text="10px"
                    alignItems="end"
                    sx={{
                      textIndent: "70px",
                    }}
                  >
                    <Typewriter
                      // key={data.id}
                      options={{
                        delay: 20,
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
        </Stack> */}

        {/* Risk taker */}
        <Stack
          borderRadius="10px"
          border="1px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="3rem 1rem 0"
          sx={{
            background: "linear-gradient(180deg, #A00612 0%, #000000 100%)"
          }}
        >
          <Stack
            display={"flex"}
            gap={"1rem"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack
              sx={{
                width: "88px",
                height: "79px",
                display: "flex",
                justifyContent: "center",
                color:"white"
              }}>
              <img src={
                userStatic.badge === "The Dreamer in Debt" ? dreamer :
                  userStatic.badge === "The Risk-Taker" ? risk :
                    userStatic.badge === "The Balanced Strategist" ? balances_strategist :
                      userStatic.badge === "The Budget Guru" ? budget_guru :
                        yolo
              }
                style={{ maxWidth: "none" }} />
            </Stack>
            <Stack
              display={"flex"}
              flexDirection={"column"}
              gap={"2px"}>
              <Typography
                fontFamily="OCR-A BT"
                fontWeight="400"
                fontSize="12px"
                lineHeight={"25px"}
              >
                WOW! You have earned a badge.
              </Typography>
              <Typography
                fontFamily="OCR-A BT"
                fontWeight="400"
                fontSize="25px"
                lineHeight={"25px"}
              >
                {userStatic.badge}
              </Typography>
              <Typography
                fontFamily="OCR-A BT"
                fontWeight="400"
                fontSize="15px"
                lineHeight={"17px"}
              >
                {userStatic.badge_tagline}
              </Typography>
            </Stack>
          </Stack>

          <Stack marginTop="2rem" gap={"2rem"}>
            {riskTaker.map((option) => (
              <Stack
                key={option.id}
                gap={"0.5rem"}
              >
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    fontFamily="OCR-A BT"
                    fontSize="18px"
                    lineHeight="25px"
                    fontWeight={"400"}
                  >
                    {option.text}
                  </Typography>
                  <Typography
                    fontFamily="OCR-A BT"
                    fontSize="18px"
                    lineHeight="25px"
                    fontWeight={"400"}
                  >
                    {option.percentage}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={option.percentage}
                  sx={{
                    height: "22px",
                    background: "transparent",
                    position: "relative",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: "15px",
                      // border: `2px solid ${option.percentage > 0 ? "#D15151" : "transparent"}`,
                      background: `linear-gradient(90deg, transparent ${100 - (option.percentage > 50 ? option.percentage : 2 * option.percentage)}%, #FE7C86 ${option.percentage}%)`
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1, // To ensure the border is above the progress bar
                    }
                  }}
                />
              </Stack>
            ))}
          </Stack>


        </Stack>

        {/* Personality Analysis Graph */}
        <Stack
          borderRadius="10px"
          border="1px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="3rem 1rem 0"
          sx={{
            background: "linear-gradient(180deg, #000000 0%, #A00612 100%)"
          }}
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
          <Stack
            sx={{
              width: "100%",
              margin: "auto",
              transform:
                window.innerWidth > 500
                  ? "translateX(-3.5rem)"
                  : window.innerWidth > 400
                    ? "translateX(-0.2rem)"
                    : "translateX(-1rem)",
              objectFit: "cove",
            }}
          >
            <RadarChart dataValues={userStatic?.scoreArray} />
          </Stack>

          {userStatic && userStatic.scoreArray && (
            <Stack display="flex" flexDirection="column" gap="1rem">
              {[
                ["Disciplined Saver", 0],
                ["Balanced Spender", 1],
                ["The Hustler", 2],
                ["Hopeful Borrower", 3],
                ["Live-for-today Spender", 4],
              ].map(([label, index]) => (
                <Stack
                  key={index}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={"8px"}>
                    <Stack
                      sx={{
                        width: "19px",
                        height: "19px"
                      }}>
                      <img src={diamond} style={{ maxWidth: "none" }} />
                    </Stack>
                    <Typography
                      fontFamily="OCR-A BT"
                      fontSize="18px"
                      lineHeight="36px"
                      fontWeight="400"
                    >
                      {label}
                    </Typography>
                  </Stack>
                  <Typography
                    fontFamily="OCR-A BT"
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

        {/* personalities */}
        <Stack
          borderRadius="10px"
          border="1px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="3rem 1rem 0"
          sx={{
            background: "linear-gradient(180deg, #000000 0%, #A00612 100%)"
          }}
        >
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontFamily={'OCR-A BT'}
              fontWeight={"400"}
              fontSize={"25px"}
              lineHeight={"30px"}
            >
              Personalities
            </Typography>
            <KeyboardArrowUpIcon
              onClick={() => setPersonalityToggle(!personlityToggle)}
              cursor={"pointer"}
              sx={{
                transition: "transform 0.3s",
                transform: personlityToggle ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Stack>

          {personlityToggle && (
            <Stack marginTop={"2rem"} gap={"2rem"}>
              {personalities.map((option) => (
                <Stack
                  key={option.in}
                  marginBottom={"1rem"}
                  gap={"0.5rem"}
                >
                  <Typography
                    fontFamily="OCR-A BT"
                    fontSize="25px"
                    lineHeight="25px"
                    fontWeight={"400"}
                    textTransform={"uppercase"}
                  >
                    {option.heading}
                  </Typography>
                  <Typography
                    fontFamily="OCR-A BT"
                    fontSize="20px"
                    lineHeight="25px"
                    fontWeight={"400"}
                  >
                    {option.content}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}


        </Stack>

        {/* Offerings Section */}
        <Stack
          borderTop="1px solid white"
          borderBottom="1px solid white"
          paddingY="22px"
          paddingX="21px"
          margin={"3rem 0 0"}
          sx={{
            background: "linear-gradient(180deg, #000000 0%, #A00612 100%)"
          }}
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
                  paddingY="24px"
                  borderRadius="5px"
                  marginBottom="1rem"
                >
                  <Typography
                    fontFamily="OCR-A BT"
                    fontSize="15px"
                    lineHeight="18.15px"
                    fontWeight={"400"}
                  >
                    {option.text}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={option.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 2,
                      marginTop: "24px",
                      backgroundColor: "#A00612",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "white",
                      },
                    }}
                  />
                  <Typography
                    fontFamily="Roboto"
                    fontWeight={500}
                    fontSize="15px"
                    lineHeight="18.15px"
                    marginTop={"12px"}
                  >
                    Opt - {option.percentage}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Lifestyle Benefits Section */}
        <Stack
          borderRadius="7px"
          border="1px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="2rem 1rem 0"
        >
          <Typography
            fontFamily="OCR-A BT"
            fontWeight="400"
            fontSize="20px"
            lineHeight="20.6px"
          >
            Lifestyle Benefits
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
                fontFamily="OCR-A BT"
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
                    fontFamily: "OCR-A BT",
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
                    fontFamily: "OCR-A BT",
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
                    fontFamily: "OCR-A BT",
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
                  fontFamily={"OCR-A BT"}
                  fontSize={"20px"}
                >
                  Claim reward
                </Typography>

                <img src={rightArrow} height={"16px"}></img>
              </Stack>
            </Stack>
          </Stack>
        </Stack>


        {/* Claim Reward Section */}
        <Stack
          borderRadius="7px"
          border="1px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="2rem 1rem 0"
        >
          <Typography
            fontFamily="OCR-A BT"
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
                fontFamily="OCR-A BT"
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
                    fontFamily: "OCR-A BT",
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
                    fontFamily: "OCR-A BT",
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
                    fontFamily: "OCR-A BT",
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
                  fontFamily={"OCR-A BT"}
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
          position={"relative"}
          marginTop={"48px"}
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
        <Stack
          sx={{
            gap: "10px",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "end",
            alignItems: "center",
            width: "88%",
            // height: "40%",
            marginTop: "2px",
            maxHeight: "300px",
            cursor: "pointer",
            // paddingRight: "30px",
          }}
        >
          <Typography
            variant={"body3"}
            fontSize="1.4rem"
            fontWeight="400"
            textAlign={"end"}
            zIndex={1}
            fontFamily={"OCR-A BT"}
            color={theme.palette.primary.main}
            onClick={handleInviteClick}
          >
            Share
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

      </Stack>
    </Stack>
  );
};

export default Finished;
