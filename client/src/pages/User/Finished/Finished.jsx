import { Stack, Typography, LinearProgress, useTheme, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Finished.css";
import { resetState } from "../../../app/userSlice";
import idfc from "../../../assets/IDFC.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import rightArrow from "../../../assets/rightArrow.png"
import RadarChart from "../../../components/RadarChart";
import analysisBG from "../../../assets/analysisBG.svg"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';;

const options = [
  { id: 1, text: "IDFC First Bank provides ₹6 lakh lost card liability. Do you:", percentage: 70 },
  { id: 2, text: "Do you agree with the new terms and conditions?", percentage: 50 },
  { id: 3, text: "Would you like to opt for the premium plan?", percentage: 90 },
  { id: 4, text: "Do you want to receive promotional offers?", percentage: 30 },
  { id: 5, text: "Are you interested in the new savings scheme?", percentage: 85 },
];

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user, name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);

  const [userStatic, setUserStatic] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [toggle, setToggle] = useState(false);

  console.log("userStatic.strenghts", userStatic.strengths
  )

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const navigate = useNavigate();

  const getAnalysis = async (user) => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/users/analysis", {
      params: {
        userId: user
      }
    }
    );
    console.log("response", response.data.analyticsData);
    setUserStatic(response.data.analyticsData);
  };

  useEffect(() => {
    console.log("Analysis", user)
    getAnalysis(user);
  }, [user])

  const handleReset = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/users/storedata`,
      { userId: user }
    );
    console.log("response", response.data.data);
    // localStorage.clear();
    // dispatch(resetState());
    navigate("/home");
  };

  return (

    <Stack style={{
      height: "100vh",
      paddingY: "3rem",
      // padding: "1rem",
      color: "#FFFFFF",
      background: "rgba(0,0,0,0.7)",
      gap: "2rem",
      width: "431px"
    }}>

      <Link to="#">
        <Stack
          backgroundColor={"#A00612"}
          margin={"1rem"}
          paddingX={"20px"}
          paddingY={"12px"}
          borderRadius={"18px"}
          border={`1px solid #FBF9ED`}
          fontWeight={"600"}
          fontSize={"25px"}
          lineHeight={"26px"}
          fontFamily={"Oxanium"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"row"}
          color={"#FFFFFF"}
          gap={"1rem"}
          alignItems={"center"}
          sx={{
            backgroundColor: "#A00612",
            textDecoration: "none"
          }}
        >
          <p>
            Open account with IDFC
          </p>
          <img
            src={idfc}
            alt="option A"
            style={{
              // width: "2.31rem", 
              // height: "7.05rem", 
              objectFit: "contain"
            }}
          />
        </Stack>
      </Link>

      {/* landing image as per personality */}
      <Stack
        paddingX="1rem"
        paddingY={"1.5rem"}
        justifyContent={"end"}
        alignItems={"end"}
        sx={{
          aspectRatio: "90/40",
          background: `url(${analysisBG})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography fontFamily={"LSC Solid"} fontSize={"45px"} lineHeight={"36px"} fontWeight={"400"} >You are {userStatic.personalityScore}%<br /></Typography>
        <Typography fontFamily={"LSC Solid"} fontSize={"30px"} lineHeight={"36px"} fontWeight={"400"} >{userStatic.personalityName}<br /></Typography>
      </Stack>

      {/* subCategory */}
      {userStatic && userStatic.subCategory?.length > 0
        &&
        (
          <Stack
            display={"flex"}
            flexDirection={"row"}
            gap={"1rem"}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
            margin={"1rem"}
          >
            {userStatic.subCategory.map((item, index) => (
              <Typography fontFamily={"LSC Solid"} frontWeight={"400"} fontSize={"25px"} lineHeight={"23px"} key={index} fontStyle={"bold"}>
                {item} |
              </Typography>
            ))}
          </Stack>
        )}


      <Stack gap={"1rem"}>
        {/* strenghts */}
        {userStatic && userStatic?.strengths?.length > 0
          &&
          (
            <Stack
              borderRadius="10px"
              border="2px dotted white"
              paddingX="19px"
              paddingY={"11px"}
              marginX={"1rem"}
              backgroundColor={"#A0061280"}
            // height="100%"
            >
              <Stack
                display={"flex"}
                flexDirection={"row"}
                gap={"4px"}
                justifyContent={"flex-start"}
                flexWrap={"wrap"}
              >
                {userStatic.strengths.map((item, index) => (
                  <Typography fontFamily={"OCR-A BT"} frontWeight={"400"} fontSize={"18px"} lineHeight={"25px"} key={index}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          )}

        {/* challenges */}
        {userStatic && userStatic?.challenges?.length > 0
          &&
          (
            <Stack
              borderRadius="10px"
              border="2px dotted white"
              paddingX="19px"
              paddingY={"11px"}
              marginX={"1rem"}
              backgroundColor={"#A0061280"}
            // height="100%"
            >
              <Stack
                display={"flex"}
                flexDirection={"row"}
                gap={"1rem"}
                justifyContent={"flex-end"}
                flexWrap={"wrap"}
              >
                {userStatic.challenges.map((item, index) => (
                  <Typography fontFamily={"OCR-A BT"} frontWeight={"400"} fontSize={"18px"} lineHeight={"25px"} key={index}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          )}

      </Stack>


      {/* analaysis graph */}
      <Stack
        borderRadius="10px"
        border="1px solid white"
        paddingX="1rem"
        paddingY={"1.5rem"}
        gap={"1rem"}
        margin={"1rem"}
      >
        <Typography
          fontFamily={"LSC Solid"}
          fontWeight={"500"}
          fontSize={"1.6rem"}
          sx={{
            textDecoration: "underline"
          }}
        >
          Personality Representation
        </Typography>
        {/* graph */}
        <Stack>
          <RadarChart dataValues={userStatic?.scoreArray} />
        </Stack>

        {/* map the value from userStatic.score */}
        {userStatic && userStatic.scoreArray
          &&
          (
            <Stack
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}>
              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  A. Disciplined Saver
                </Typography>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  {userStatic?.scoreArray[0]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  B. Balanced Spender
                </Typography>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  {userStatic?.scoreArray[1]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  C. The Hustler
                </Typography>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  {userStatic?.scoreArray[2]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  D. Hopeful Borrower
                </Typography>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  {userStatic?.scoreArray[3]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  E. Live-for-today Spender
                </Typography>
                <Typography fontFamily={"LSC Solid"} fontSize={"18px"} lineHeight={"36px"} fontWeight={"400"}>
                  {userStatic?.scoreArray[4]}%
                </Typography>
              </Stack>
            </Stack>
          )}
      </Stack>

      {/* Offering */}

      <Stack
        backgroundColor={"#A0061242"}
        borderTop={"1px solid white"}
        borderBottom={"1px solid white"}
        paddingY={"22px"}
        paddingX={"21px"}
      >

        <Stack
          textAlign={"right"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-end"}
          gap={"1rem"}

        >
          <Typography fontFamily={"LSC Solid"} fontWeight={400} fontSize={"45px"} lineHeight={"36px"}>Over 70%</Typography>
          <Typography fontFamily={"LSC Solid"} fontWeight={400} fontSize={"20px"} lineHeight={"36px"}>Liked IDFC Bank offerings</Typography>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            alignContent={"flex-end"}
            alignItems={"center"}
            onClick={() => setToggle(!toggle)}
            sx={{
              cursor: "pointer"
            }}
          >
            <Typography fontFamily={"LSC Solid"} fontWeight={400} fontSize={"15px"} lineHeight={"36px"}>Preferences</Typography>
            <KeyboardArrowUpIcon
              sx={{
                transition: 'transform 0.3s', 
                transform: toggle ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Stack>
        </Stack>

        {/* mapping values*/}
        {toggle &&
          <Stack marginTop={"2rem"} >
            {options.map((option) => (
              <Stack
                key={option.id}
                border={"1px solid white"}
                paddingX={"17px"}
                paddingY={"30px"}
                borderRadius={"5px"}
                gap={"1rem"}
                marginBottom={"1rem"}
              >
                <Typography fontFamily={"inter"} fontWeight={600} fontSize={"15px"} lineHeight={"18.15px"}>
                  {option.text}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={option.percentage}
                  sx={{
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: 'red',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <Typography fontFamily={"inter"} fontWeight={600} fontSize={"15px"} lineHeight={"18.15px"}>
                  Opt - {option.percentage}%
                </Typography>
              </Stack>
            ))}
          </Stack>}
      </Stack>

      {/* claim your reward */}
      <Stack
        borderRadius="7px"
        border="1px solid white"
        paddingX="1rem"
        paddingY={"1.5rem"}
        gap={"1rem"}
        margin={"1rem"}
      >
        <Typography fontFamily={"Oxanium"} frontWeight={"400"} fontSize={"20px"} lineHeight={"20.6px"}>
          What will make you Switch to IDFC? <br />
        </Typography>
        <Stack
          borderRadius="5px"
          backgroundColor={"#A00612"}
        >
          <Stack
            borderRadius="10px"
            paddingY={"1.5rem"}
            backgroundColor={"#A00612"}
            textAlign={"left"}
            gap={"1rem"}
            paddingX="1rem"
          >
            <Typography
              fontFamily={"Oxanium"}
              frontWeight={"400"}
              fontSize={"15px"}
              lineHeight={"15.45px"}
            >
              Submit response to claim your reward <br />
            </Typography>

            <Stack
              gap={"0.8rem"}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedOption === 'optionA' ? '#A00620' : '#A00612',
                  textTransform: "none",
                  fontWeight: 400,
                  paddingY: "9px",
                  border: "1px solid #FFFFFF78",
                  justifyContent: "left",
                  fontFamily: "Oxanium",
                  fontSize: "1rem",
                  width: '100%',
                  color: "#ffffff"
                }}
                onClick={() => setSelectedOption('optionA')}
              >
                1. Option A
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedOption === 'optionB' ? '#A00620' : '#A00612',
                  textTransform: "none",
                  fontWeight: 500,
                  paddingY: "9px",
                  border: "1px solid #FFFFFF78",
                  justifyContent: "left",
                  fontFamily: "Oxanium",
                  fontSize: "1rem",
                  width: '100%',
                  color: "#ffffff"
                }}
                onClick={() => setSelectedOption('optionB')}
              >
                2. Option B
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedOption === 'optionC' ? '#A00620' : '#A00612', // Change background if selected
                  textTransform: "none",
                  fontWeight: 500,
                  paddingY: "9px",
                  border: "1px solid #FFFFFF78",
                  justifyContent: "left",
                  fontFamily: "Oxanium",
                  fontSize: "1rem",
                  width: '100%', // Make button full width
                  color: "#ffffff"
                }}
                onClick={() => setSelectedOption('optionC')}
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
                opacity: "0.7"
              }}
            >
              <Typography
                fontWeight={"400"}
                fontFamily={"Oxanium"}
                fontSize={"20px"}
              >
                Claim reward
              </Typography>

              <img
                src={rightArrow}
                height={"16px"}
              >
              </img>

            </Stack>

          </Stack>

          <Stack
            backgroundColor={"#ffffff"}
            height={"300px"}
            borderRadius={"5px"}
            marginBottom={"1.5rem"}
            marginX={"1px"}
          >
          </Stack>

        </Stack>
      </Stack>

      <Button variant="outlined" color="#F1E9DE" sx={{ borderRadius: '15px', paddingX: "19px", paddingY: "12px", margin: "1rem", fontSize: "1.5rem", fontFamily: "LSC Solid" }}
        onClick={handleReset}
      >
        Play again
      </Button>
    </Stack>
  );
};

export default Finished;