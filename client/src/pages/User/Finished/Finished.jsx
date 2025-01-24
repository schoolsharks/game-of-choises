import {
  Stack,
  Typography,
  LinearProgress,
  useTheme,
  Button,
  Box,
  IconButton,
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
import diamond from "../../../assets/diamond.svg";

// import person3 from "../../../assets/person3.svg";
// import person4 from "../../../assets/person4.svg";
// import person5 from "../../../assets/person5.svg";
// import person6 from "../../../assets/person6.svg";
// import person2 from "../../../assets/person2.svg";
import rightArrow from "../../../assets/rightArrow.png";
import RadarChart from "../../../components/RadarChart";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import personalitiesGrid from "../../../assets/personalities-grid.png";

import risk from "../../../assets/risk.webp";
import yolo from "../../../assets/yolo.webp";
import dreamer from "../../../assets/dreamer.webp";
import balances_strategist from "../../../assets/balanced_strategist.webp";
import budget_guru from "../../../assets/budget_guru.webp";
import { ShareOutlined } from "@mui/icons-material";
// import personalityGrid2 from "../../../assets/personalityGrid2.svg";
// import personalityGrid3 from "../../../assets/personalityGrid3.jpg";

const options = [
  {
    id: 1,
    text: "Savings & Investments",
    percentage: 70,
  },
  {
    id: 2,
    text: "Travel & Lifestyle Perks",
    percentage: 50,
  },
  {
    id: 3,
    text: "Protection & Security",
    percentage: 90,
  },
  {
    id: 4,
    text: "Technology & Convenience",
    percentage: 30
  },
];

// const riskTaker = [
//   {
//     id: 1,
//     text: "Savings Behaviour",
//     percentage: 70,
//   },
//   {
//     id: 2,
//     text: "Investment Risk Tolerance",
//     percentage: 60,
//   },
//   {
//     id: 3,
//     text: "Debt Management",
//     percentage: 90,
//   },
//   {
//     id: 4,
//     text: "Lifestyle Choices",
//     percentage: 80,
//   },
// ];

const personalities = [
  {
    id: 1,
    heading: "THE HUSTLER ",
    content:
      "You're ambitious and risk-tolerant. Your bold moves can lead to great rewards, but watch out for overconfidence!",
  },
  {
    id: 2,
    heading: "BALANCED SPENDER",
    content:
      "You’ve mastered the art of balance! While you prioritize your financial goals, you also ensure life is enjoyable in the moment.",
  },
  {
    id: 3,
    heading: "DISCIPLINED SAVER",
    content:
      "You're the strategist of the financial world. Your meticulous planning ensures a secure future, but don’t forget to enjoy the present once in a while.",
  },
  {
    id: 4,
    heading: "HOPEFUL BORROWER",
    content:
      "You’re optimistic and rely on external support, but learning to plan better will ease your financial journey.",
  },
  {
    id: 5,
    heading: "LIVE-FOR-TODAY SPENDER",
    content:
      "You know how to enjoy life to the fullest, but future-you might appreciate a bit more financial foresight.",
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
  const [personlityToggle, setPersonalityToggle] = useState(false);

  // const data1 = [
  //   "Disciplined Saver",
  //   "Balanced Spender",
  //   "The Hustler",
  //   "Hopeful Borrower",
  //   "Live for today Spender",
  // ];
  // const data2 = [person3, person4, person2, person5, person6];
  // const index = data1.findIndex((item) => item === userStatic?.personalityName);
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
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/users/storedata`,
      { userId: user }
    );
    // localStorage.clear();
    navigate("/home");
    window.location.reload();
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
  // const personalityImage = data2[index];
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "431px",
        margin: "auto",
        color: "#FFFFFF",
        // background: "rgba(0, 0, 0, 0.589)",
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
          fontSize="1.1rem"
          lineHeight="26px"
          fontFamily="OCR-A BT"
          display="flex"
          justifyContent="space-between"
          direction={"row"}
          color="#FFFFFF"
          gap="1rem"
          alignItems="center"
          whiteSpace={"nowrap"}
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
        <Stack margin={"30px 24px 45px"}>
          <Typography fontFamily="LSC Solid" fontSize="30px" fontWeight="400">
            Congratulations!
          </Typography>
          <Typography fontFamily="OCR-A BT" fontSize="1.25rem" fontWeight="400">
            You’ve completed the Financial Matrix
          </Typography>
        </Stack>
        {/* <img src={personalitiesGrid} alt="" style={{ opacity: "0.5" }} /> */}

        <Stack sx={{ borderTop:"1px solid white",borderBottom:"1px solid white"}}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              height: "156px",
            }}
          >
            <img
              src={personalitiesGrid}
              alt=""
              style={{
                opacity: "0.8",
                width: "100%",
                height: "156px",
                objectFit: "cover",
              }}
            />
            <Stack
              sx={{
                position: "absolute",
                top: "50%",
                // left: "50%",
                transform: "translate(0,-50%)",
                padding:"36px 24px"
              }}
            >
              <Typography
                fontFamily="LSC Solid"
                fontSize="2.2rem"
                lineHeight="42px"
                fontWeight="400"
                // whiteSpace={"nowrap"}
                sx={{
                  color: "white",
                  zIndex: 1,
                }}
              >
                {/* Live for today spendor */}
                {userStatic.personalityName}
              </Typography>
              <Typography
                fontFamily="OCR-A BT"
                fontSize="20px"
                lineHeight="36px"
                fontWeight="400"
                whiteSpace={"nowrap"}
                sx={{
                  color: "white",
                  zIndex: 1,
                }}
              >
                Your Dominent Archetype
              </Typography>
            </Stack>
          </div>

          <Stack
            sx={{
              padding: "56px 24px 35px",
              background: " linear-gradient(180deg, #000000 0%, #A00612 100%)",
            }}
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
              >
                {userStatic.subCategory.map((item, index) => (
                  <Typography
                    key={index}
                    fontFamily="LSC Solid"
                    fontWeight="400"
                    fontSize="22px"
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
                        height: "22px",
                        width: "11px",
                        backgroundColor: "white",
                        animation: "blink 1s infinite",
                      }}
                    />
                  </Typography>
                ))}
              </Stack>
            )}

            <Typography
              fontFamily={"OCR-A BT"}
              fontSize={"1.25rem"}
              marginTop={"28px"}
            >
              {userStatic.insights}
            </Typography>
          </Stack>
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
          border="0.5px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="3rem 1rem 0"
          sx={{
            background: "linear-gradient(180deg, #A00612 0%, #000000 100%)",
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
                color: "white",
              }}
            >
              <img
                src={
                  userStatic.badge === "The Dreamer in Debt"
                    ? dreamer
                    : userStatic.badge === "The Risk-Taker"
                    ? risk
                    : userStatic.badge === "The Balanced Strategist"
                    ? balances_strategist
                    : userStatic.badge === "The Budget Guru"
                    ? budget_guru
                    : yolo
                }
                style={{ maxWidth: "none" }}
              />
            </Stack>
            <Stack display={"flex"} flexDirection={"column"}>
              <Typography
                fontFamily="OCR-A BT"
                fontWeight="400"
                fontSize="12px"
              >
                WOW! You have earned a badge.
              </Typography>
              <Typography
                fontFamily="OCR-A BT"
                fontWeight="400"
                fontSize="25px"
                margin={"4px 0"}
                lineHeight={"27px"}
              >
                The Balanced Strategist
                {/* {userStatic.badge} */}
              </Typography>
              <Typography
                fontFamily="OCR-A BT"
                fontWeight="400"
                fontSize="14px"
              >
                {userStatic.badge_tagline}
              </Typography>
            </Stack>
          </Stack>

          <Stack marginTop="2rem" gap={"2rem"}>
            {userStatic.riskTaker &&
              Object.entries(userStatic.riskTaker).map(([key, percentage]) => (
                <Stack key={key} gap={"0.5rem"}>
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
                      {key}
                    </Typography>
                    <Typography
                      fontFamily="OCR-A BT"
                      fontSize="18px"
                      lineHeight="25px"
                      fontWeight={"400"}
                    >
                      {percentage}%
                    </Typography>
                  </Stack>
                  <Box
                    height={"22px"}
                    width={`${percentage}%`}
                    sx={{
                      background:
                        "linear-gradient(270deg, #FE7C86 21.5%, rgba(152, 74, 80, 0) 100%)",
                      borderRadius: "0 12px 12px 0",
                    }}
                  />
                </Stack>
              ))}
          </Stack>
        </Stack>

        {/* Personality Analysis Graph */}
        <Stack
          borderRadius="10px"
          border="0.5px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="3rem 1rem 0"
          sx={{
            background: "linear-gradient(180deg, #000000 0%, #A00612 100%)",
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
            display={"flex"}
            justifyContent={"center"}
            sx={{
              width: "100%",
              margin: "auto",
              // transform:
              //   window.innerWidth > 500
              //     ? "translateX(-3.5rem)"
              //     : window.innerWidth > 400
              //     ? "translateX(-0.2rem)"
              //     : "translateX(-1rem)",
              // objectFit: "cove",
            }}
          >
            <RadarChart dataValues={userStatic?.scoreArray} />
          </Stack>

          {userStatic && userStatic.scoreArray && (
            <Stack display="flex" flexDirection="column" marginTop={"32px"}>
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
                    gap={"8px"}
                  >
                    <Stack
                      sx={{
                        width: "19px",
                        height: "19px",
                      }}
                    >
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
          border="0.5px solid white"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="3rem 1rem 0"
          sx={{
            background: "linear-gradient(180deg, #000000 0%, #A00612 100%)",
          }}
        >
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontFamily={"OCR-A BT"}
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
            <Stack marginTop={"2rem"} gap={"1rem"}>
              {personalities.map((option) => (
                <Stack key={option.in} marginBottom={"1rem"} gap={"0.5rem"}>
                  <Typography
                    fontFamily="OCR-A BT"
                    fontSize="24px"
                    lineHeight="25px"
                    fontWeight={"400"}
                    textTransform={"uppercase"}
                  >
                    {option.heading}
                  </Typography>
                  <Typography
                    fontFamily="OCR-A BT"
                    fontSize="18px"
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
          borderTop="0.5px solid white"
          borderBottom="0.5px solid white"
          paddingY="22px"
          paddingX="21px"
          margin={"3rem 0 0"}
          sx={{
            background: "linear-gradient(180deg, #000000 0%, #A00612 100%)",
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
              {userStatic.offers && userStatic.offers.map((option) => (
                <Stack
                  key={option.id}
                  border="0.5px solid white"
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
                    {option.offer}
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
          border="0.5px solid white"
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
          border="0.5px solid white"
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
            <IconButton onClick={handleInviteClick}><ShareOutlined sx={{color:"#fff",fontSize:"28px"}}/></IconButton>

          {/* <Typography
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
          /> */}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Finished;
