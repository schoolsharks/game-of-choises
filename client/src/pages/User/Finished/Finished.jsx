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

import hustlerBadge from "../../../assets/badges/hustler-badge.webp";
import saverBadge from "../../../assets/badges/saver-badge.webp";
import balancedSpendorBadge from "../../../assets/badges/balanced-spendor-badge.webp";
import hopefulBorrowerBadge from "../../../assets/badges/hopeful-borrower-badge.webp";
import liveForTodaySpendorBadge from "../../../assets/badges/live-for-today-badge.webp";
import DoYouKnow from "../Question/DoYouKnow";
import { motion } from "framer-motion";
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
    content: "High-risk, high-reward financial player",
    badge: hustlerBadge,
  },
  {
    id: 2,
    heading: "BALANCED SPENDER",
    content: "Smart financial strategist",
    badge: balancedSpendorBadge,
  },
  {
    id: 3,
    heading: "DISCIPLINED SAVER",
    content: "Master of structured financial planning",
    badge: saverBadge,
  },
  {
    id: 4,
    heading: "HOPEFUL BORROWER",
    content: "Optimistic but financially unstructured",
    badge: hopefulBorrowerBadge,
  },
  {
    id: 5,
    heading: "LIVE-FOR-TODAY SPENDER",
    content: "Loves the moment, but at a cost",
    badge: liveForTodaySpendorBadge,
  },
];

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);

  const [userStatic, setUserStatic] = useState([]);
  // const [selectedOption, setSelectedOption] = useState("");
  const [toggle, setToggle] = useState(true);
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

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

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
    navigate("/questions");
    // window.location.reload();
  };

  const handleShare = () => {
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

  const yourChoicesTexts = {
    Savings_Behaviour: "Keep saving, but allow for fun too!",
    Investment_Risk_Tolerance: "Explore calculated investment opportunities.",
    Debt_Management: "Watch out for impulse spending!",
    Lifestyle_Choices: "You enjoy life! Just ensure future security.",
  };

  useEffect(() => {
    console.log(userStatic);
  }, [userStatic]);
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
      {/* <DoYouKnow id={1}/> */}
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
          <Typography fontWeight={"600"} fontSize={"1.25rem"}>
            Start banking with IDFC
          </Typography>
          <img
            src={idfc}
            alt="option A"
            style={{
              width: "31px",
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
        <Stack margin={"30px 24px 0"}>
          <motion.img
            initial={{
              rotateY: -180,
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
              scale: 1,
              z: 0,
            }}
            transition={{
              duration: 1.2,
              delay: 1,
              ease: [0.16, 1, 0.3, 1], 
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
            src={
              userStatic?.personalityName &&
              personalities.find(
                (person) =>
                  person.heading.toLocaleLowerCase().replace(" ", "") ===
                  userStatic?.personalityName
                    ?.toLocaleLowerCase()
                    .replace(" ", "")
              )?.badge
            }
            alt=""
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
              width: "130px",
              margin: "auto",
            }}
          />
          <Typography textAlign={"center"} fontSize={"24px"} fontWeight={"700"}>
            {userStatic?.personalityName}
          </Typography>
          <Typography textAlign={"center"} fontSize={"15px"} fontWeight={"300"}>
            (Your Archetype)
          </Typography>
          <Typography
            textAlign={"center"}
            fontSize={"20px"}
            marginTop={"5px"}
            fontWeight={"400"}
          >
            {
              personalities.find(
                (person) =>
                  person.heading.toLocaleLowerCase().replace(" ", "") ===
                  userStatic?.personalityName
                    ?.toLocaleLowerCase()
                    .replace(" ", "")
              )?.content
            }
          </Typography>
        </Stack>

        {/* Your Preferences */}

        <Typography
          marginTop={"50px"}
          fontSize={"24px"}
          fontWeight={"700"}
          textAlign={"center"}
        >
          Your Choices
        </Typography>
        <Stack
          borderRadius="10px"
          paddingX="1rem"
          paddingY="1.5rem"
          gap="1rem"
          margin="8px 1rem 0"
          bgcolor={theme.palette.primary.main}
        >
          <Stack gap={"20px"}>
            {userStatic?.riskTaker &&
              Object.entries(userStatic?.riskTaker).map(
                ([key, value], index) => (
                  <>
                    <Stack gap={"5px"}>
                      <Typography fontSize={"18px"} fontWeight={"600"}>
                        {key.replaceAll("_", " ")}
                      </Typography>
                      <Stack
                        borderRadius={"5px"}
                        overflow={"hidden"}
                        gap={"4px"}
                      >
                        <Stack direction={"row"} height={"100px"} gap={"4px"}>
                          <Stack
                            flex={"1"}
                            height={"100%"}
                            bgcolor={"#ffffff"}
                            color={"#000000"}
                            padding={"10px"}
                          >
                            <Typography fontSize={"15px"} fontWeight={"600"}>
                              Your Score
                            </Typography>
                            <Typography
                              marginTop={"auto"}
                              fontSize={"25px"}
                              fontWeight={"700"}
                            >
                              {value.user}%
                            </Typography>
                          </Stack>
                          <Stack
                            flex={"1"}
                            height={"100%"}
                            bgcolor={"#383838"}
                            padding={"10px"}
                          >
                            <Typography
                              fontSize={"15px"}
                              fontWeight={"600"}
                              whiteSpace={"nowrap"}
                            >
                              Community Average
                            </Typography>
                            <Typography
                              marginTop={"auto"}
                              fontSize={"25px"}
                              fontWeight={"700"}
                            >
                              {value.avg}%
                            </Typography>
                          </Stack>
                        </Stack>
                        <Box
                          bgcolor={ "#000"}
                          color={"#ffffff"}
                          padding={"22px 11px"}
                        >
                          <Typography fontSize={"15px"} fontWeight={"600"}>
                            {yourChoicesTexts[key]}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </>
                )
              )}
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
          <Stack>
            <Typography fontWeight={400} fontSize="45px" lineHeight="28px">
              Over 70%
            </Typography>

            <Typography
              fontWeight={400}
              marginTop={"12px"}
              fontSize="20px"
              lineHeight="36px"
            >
              Liked IDFC First Bank offerings
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
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography
                        fontSize="15px"
                        lineHeight="18.15px"
                        fontWeight={"600"}
                      >
                        {option.offer}
                      </Typography>
                      <Typography
                        fontSize="15px"
                        fontWeight="600"
                        lineHeight="18.15px"
                      >
                        Opt - {option.percentage}%
                      </Typography>
                    </Stack>
                    <Box
                      position={"relative"}
                      height="22px"
                      marginTop={"25px"}
                      bgcolor={"#FE7C86"}
                      borderRadius={"0 20px 20px 0"}
                      border={"2px solid #D15151"}
                      width={option.percentage + "%"}
                    >
                      <Box
                        position={"absolute"}
                        top={"0"}
                        left="0"
                        width={"calc(100% + 4px)"}
                        height={"calc(100% + 4px)"}
                        bgcolor={"red"}
                        borderRadius={"0 20px 20px 0"}
                        sx={{
                          transform: "translate(-2px, -2px)",
                          background:
                            "linear-gradient(90deg, #ffffff 0%, #ffffff19 100%)",
                        }}
                      ></Box>
                    </Box>
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
                  <Box
                    sx={{
                      bgcolor: "#fff",
                      textTransform: "none",
                      border: "1px solid #000000",
                      justifyContent: "left",
                      width: "100%",
                      color: "#000",
                      boxShadow: "none",
                      textAlign: "left",
                      padding: "12px",
                      borderRadius: "5px",
                    }}
                    // onClick={() => setSelectedOption("optionA")}
                  >
                    <Stack direction={"row"} gap={"5px"}>
                      <Typography>{index + 1}.</Typography>
                      <Typography fontSize={"15px"} fontWeight={"400"}>
                        {item}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
                <Typography
                  fontSize={"12px"}
                  fontWeight={"500"}
                  color="#0000007e"
                >
                  T&C applied
                </Typography>
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

          <img src={idfc} style={{ width: "28px" }}></img>
        </Stack>

        <Stack
          direction={"row"}
          margin={"12px 16px 16px"}
          padding="8px"
          alignItems={"center"}
          gap={"16px"}
          justifyContent={"space-between"}
        >
          <Button
            variant="outlined"
            onClick={handleReset}
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
          <IconButton onClick={handleShare} sx={{ padding: "0" }}>
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
