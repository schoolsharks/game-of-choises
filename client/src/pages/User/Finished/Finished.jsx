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
import { ArrowBack, ShareOutlined } from "@mui/icons-material";

import hustlerBadge from "../../../assets/badges/hustler-badge.png";
import saverBadge from "../../../assets/badges/saver-badge.png";
import balancedSpendorBadge from "../../../assets/badges/balanced-spendor-badge.png";
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
    percentage: 30,
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
      "The Player is ambitious and risk-tolerant. His bold moves can lead to great rewards, but should watch out for overconfidence!",
  },
  {
    id: 2,
    heading: "BALANCED SPENDER",
    content:
      "The player has mastered the art of balance! While he prioritize his financial goals, he also ensures life is enjoyable in the moment.",
  },
  {
    id: 3,
    heading: "DISCIPLINED SAVER",
    content:
      "The Player is strategist of the financial world. His meticulous planning ensures a secure future, but should not forget to enjoy the present once in a while.",
  },
  {
    id: 4,
    heading: "HOPEFUL BORROWER",
    content:
      "The player is optimistic and rely on external support, but learning to plan better will ease his financial journey.",
  },
  {
    id: 5,
    heading: "LIVE-FOR-TODAY SPENDER",
    content:
      "The player knows how to enjoy life to the fullest, but in future-he must appreciate a bit more financial foresight.",
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

  const lifestyleBenefits = [
    "Complimentary 1-year Times Prime Membership with 20+ Exclusive Brand Benefits",
    "Swiggy One Lite Quarterly Membership: Access Free Delivery & Extra Discounts on Instamart & Restaurants",
    "Amazon Prime Quarterly Membership: Prime Video, Shopping Deals & Free 1-day Delivery",
  ];
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
          backgroundColor={theme.palette.primary.main}
          margin="1rem"
          paddingX="20px"
          paddingY="12px"
          borderRadius="42px"
          border="1px solid #FBF9ED"
          fontWeight="600"
          fontSize="1.1rem"
          lineHeight="26px"
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
              width: "24px",
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
          <img
            src={hustlerBadge}
            alt=""
            style={{ width: "170px", margin: "auto" }}
          />
          <Typography textAlign={"center"} fontSize={"24px"} fontWeight={"700"}>
            <span style={{ fontSize: "40px", fontWeight: "500" }}>90%</span> The
            Hustler
          </Typography>
          <Typography fontSize={"12px"} marginTop={"5px"} fontWeight={"400"}>
            You start as a hustler, making bold choices in your financial
            journey. Over time, you evolve into someone empowered, learning from
            your mistakes and striving for success.
          </Typography>

          <Stack
            direction={"row"}
            marginTop={"18px"}
            justifyContent={"space-between"}
            gap={"8px"}
          >
            {["Bold", "Calculated", "Visionary", "Ambitious"].map(
              (item, index) => (
                <Typography fontSize={"15px"} fontWeight={"800"} key={index}>
                  {item}
                </Typography>
              )
            )}
          </Stack>
        </Stack>

        {/* Your Preferences */}

        <Typography
          marginTop={"50px"}
          fontSize={"24px"}
          fontWeight={"700"}
          textAlign={"center"}
        >
          Your Preferences
        </Typography>
        <Stack
          borderRadius="10px"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="8px 1rem 0"
          bgcolor={theme.palette.primary.main}
        >
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
                      fontSize="18px"
                      lineHeight="25px"
                      fontWeight={"400"}
                    >
                      {key}
                    </Typography>
                    <Typography
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

        {/* Personality Analysis Graph
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
                      fontSize="18px"
                      lineHeight="36px"
                      fontWeight="400"
                    >
                      {label}
                    </Typography>
                  </Stack>
                  <Typography
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
        </Stack> */}

        {/* personalities */}
        {/* <Stack
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
                    fontSize="24px"
                    lineHeight="25px"
                    fontWeight={"400"}
                    textTransform={"uppercase"}
                  >
                    {option.heading}
                  </Typography>
                  <Typography
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
        </Stack> */}

        {/* Offerings Section */}
        <Stack
          borderRadius="10px"
          paddingX="1rem"
          paddingY="40px"
          margin="50px 1rem 0"
          bgcolor={theme.palette.primary.main}
          borderBottom="0.5px solid white"
        >
          <Stack display="flex" flexDirection="column">
            <Typography fontWeight={400} fontSize="45px" lineHeight="28px">
              Over 70%
            </Typography>
            <Typography
              fontWeight={400}
              marginTop={"12px"}
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
              <Typography fontWeight={400} fontSize="15px" lineHeight="36px">
                Find out why?
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
              {userStatic.offers &&
                userStatic.offers.map((option) => (
                  <Stack
                    key={option.id}
                    // border="0.5px solid white"
                    bgcolor={"#fff"}
                    color={"#000"}
                    paddingX="17px"
                    paddingY="24px"
                    borderRadius="5px"
                    marginBottom="1rem"
                  >
                    <Typography
                      fontSize="15px"
                      lineHeight="18.15px"
                      fontWeight={"500"}
                    >
                      {option.offer}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={option.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 2,
                        marginTop: "20px",
                        backgroundColor: "#A00612",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "black",
                        },
                      }}
                    />
                    <Typography
                      fontSize="12px"
                      fontWeight="600"
                      lineHeight="18.15px"
                      marginTop={"5px"}
                    >
                      Opt - {option.percentage}%
                    </Typography>
                  </Stack>
                ))}
            </Stack>
          )}
        </Stack>

        {/* Lifestyle Benefits Section */}
        <Stack borderRadius="7px" paddingX="1rem" marginTop={"50px"} gap="1rem">
          <Typography
            textAlign={"center"}
            fontWeight="700"
            fontSize="20px"
            lineHeight="20.6px"
          >
            Lifestyle Benefits
          </Typography>
          <Stack
            borderRadius="5px"
            backgroundColor={theme.palette.primary.main}
          >
            <Stack
              borderRadius="10px"
              paddingY="1.5rem"
              textAlign="left"
              gap="1rem"
              paddingX="1rem"
            >
              <Stack
                gap={"0.8rem"}
                bgcolor={"#fff"}
                padding={"12px"}
                borderRadius={"5px"}
              >
                {lifestyleBenefits.map((item, index) => (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#fff",
                      textTransform: "none",
                      border: "1px solid #000000",
                      justifyContent: "left",
                      width: "100%",
                      color: "#000",
                      boxShadow: "none",
                      textAlign: "left",
                    }}
                    onClick={() => setSelectedOption("optionA")}
                  >
                    <Stack direction={"row"} gap={"5px"}>
                      <Typography>{index + 1}.</Typography>
                      <Typography fontSize={"15px"} fontWeight={"400"}>
                        {item}
                      </Typography>
                    </Stack>
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          backgroundColor={theme.palette.primary.main}
          margin="1rem"
          paddingX="20px"
          paddingY="12px"
          borderRadius="42px"
          border="1px solid #FBF9ED"
          fontWeight="600"
          fontSize="1.1rem"
          lineHeight="26px"
          justifyContent="space-between"
          color="#FFFFFF"
          gap="1rem"
          alignItems="center"
          whiteSpace={"nowrap"}
        >
          <Typography fontWeight={"400"} fontSize={"20px"}>
            Claim reward
          </Typography>

          <img src={idfc} style={{width:"28px"}}></img>
        </Stack>

        <Stack
          direction={"row"}
          margin={"50px 16px 16px"}
          padding="8px"
          alignItems={"center"}
          gap={"16px"}
          justifyContent={"space-between"}
        >
          <Button
            variant="outlined"
            sx={{
              width: "max-content",
              textTransform: "none",
              borderRadius: "48px",
              fontSize: "18px",
              padding: "0 18px",
              height: "40px",
              border: "2px solid #fff",
              color: "#fff",
            }}
          >
            Play Again
          </Button>
          <IconButton
            onClick={() => navigate("/onboarding/1")}
            sx={{ padding: "0" }}
          >
            <ShareOutlined
              sx={{
                fontSize: "28px",
                color: "#ffffff",
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Finished;
