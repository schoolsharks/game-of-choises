import { Stack, Typography, useTheme, Button } from "@mui/material";
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

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user, name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);

  const [userStatic, setUserStatic] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

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
      gap: "2rem"
    }}>

      <Link to="#">
        <Stack
          backgroundColor={"#A00612"}
          margin={"1rem"}
          paddingX={"0.75rem"}
          paddingY={"1.16rem"}
          borderRadius={"18px"}
          border={`1px solid #FBF9ED`}
          fontWeight={"600"}
          fontSize={"1.6rem"}
          lineHeight={"2.2rem"}
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
          aspectRatio: "110/40",
          background: `url(${analysisBG})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography fontFamily={"Oxanium"} fontSize={"3rem"} fontWeight={"500"} >You are {userStatic.personalityScore}%<br /></Typography>
        <Typography fontFamily={"Oxanium"} fontSize={"3rem"} fontWeight={"500"} >{userStatic.personalityName}<br /></Typography>
        <Typography fontFamily={"Oxanium"} fontSize={"1rem"} fontWeight={"400"} >know more<br /></Typography>
      </Stack>

      {/* subCategory */}
      {userStatic && userStatic.subCategory?.length > 0
        &&
        (
          <Stack
            display={"flex"}
            flexDirection={"row"}
            gap={"1rem"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            margin={"1rem"}
          >
            {userStatic.subCategory.map((item, index) => (
              <Typography fontFamily={"Oxanium"} frontWeight={"600"} fontSize={"1.6rem"} lineHeight={"1.5rem"} key={index} fontStyle={"bold"}>
                {item} |
              </Typography>
            ))}
          </Stack>
        )}


      {/* strenghts */}
      {userStatic && userStatic?.strengths?.length > 0
        &&
        (
          <Stack
            borderRadius="10px"
            border="1px solid white"
            paddingX="1rem"
            paddingY={"1.5rem"}
            margin={"1rem"}
          // height="100%"
          >
            <Stack
              display={"flex"}
              flexDirection={"row"}
              gap={"1rem"}
              justifyContent={"flex-start"}
              flexWrap={"wrap"}
            >
              {userStatic.strengths.map((item, index) => (
                <Typography fontFamily={"Oxanium"} frontWeight={"500"} fontSize={"1.1rem"} lineHeight={"1.5rem"} key={index}>
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
            border="1px solid white"
            paddingX="1rem"
            paddingY={"1.5rem"}
            margin={"1rem"}
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
                <Typography fontFamily={"Oxanium"} frontWeight={"500"} fontSize={"1.1rem"} lineHeight={"1.5rem"} key={index}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Stack>
        )}


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
          fontFamily={"Oxanium"}
          fontWeight={"500"}
          fontSize={"1.6rem"}
          sx={{
            textDecoration: "underline"
          }}
        >
          Analysis
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
                <Typography>
                  A. Disciplined Saver
                </Typography>
                <Typography>
                  {userStatic?.scoreArray[0]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography>
                  B. Balanced Spender
                </Typography>
                <Typography>
                  {userStatic?.scoreArray[1]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography>
                  C. The Hustler
                </Typography>
                <Typography>
                  {userStatic?.scoreArray[2]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography>
                  D. Hopeful Borrower
                </Typography>
                <Typography>
                  {userStatic?.scoreArray[3]}%
                </Typography>
              </Stack>

              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}>
                <Typography>
                  E. Live-for-today Spender
                </Typography>
                <Typography>
                  {userStatic?.scoreArray[4]}%
                </Typography>
              </Stack>
            </Stack>
          )}
      </Stack>

      {/* claim your reward */}
      <Stack
        borderRadius="10px"
        border="1px solid white"
        paddingX="1rem"
        paddingY={"1.5rem"}
        gap={"1rem"}
        margin={"1rem"}
      >
        <Typography fontFamily={"Oxanium"} frontWeight={"700"} fontSize={"1.8rem"} lineHeight={"2.1rem"}>
          Claim your reward <br />
        </Typography>
        <Stack
          borderRadius="10px"
          border="2px solid white"

          backgroundColor={"#A00612"}
        >

          <Stack
            backgroundColor={"#ffffff"}
            height={"300px"}
            borderRadius={"5px"}
          >
          </Stack>
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
              frontWeight={"500"}
              fontSize={"1.2rem"}
              lineHeight={"1.2rem"}
            >
              What will make you Switch to IDFC? <br />
            </Typography>

            <Stack
              gap={"0.8rem"}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: selectedOption === 'optionA' ? '#A00620' : '#A00612',
                  textTransform: "none",
                  fontWeight: 500,
                  paddingY: "9px",
                  border: "1px solid white",
                  justifyContent: "left",
                  fontFamily: "Oxanium",
                  fontWeight: "500",
                  fontSize: "1rem",
                  width: '100%',
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
                  border: "1px solid white",
                  justifyContent: "left",
                  fontFamily: "Oxanium",
                  fontWeight: "500",
                  fontSize: "1rem",
                  width: '100%',
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
                  border: "1px solid white",
                  justifyContent: "left",
                  fontFamily: "Oxanium",
                  fontWeight: "500",
                  fontSize: "1rem",
                  width: '100%', // Make button full width
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
              border="1px solid white"
              paddingX="1.2rem"
              paddingY={"0.8rem"}
              backgroundColor="rgba(0,0,0,0.4)"
              color="#F1E9DE"
              sx={{
                opacity: "0.7"
              }}
            >
              <Typography
                fontWeight={"700"}
                fontFamily={"Oxanium"}
                fontSize={"1.2rem"}
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

        </Stack>
      </Stack>

      <Button variant="outlined" color="white" sx={{ borderRadius: '15px', paddingX: "19px", paddingY: "12px", margin: "1rem", fontSize: "1.5rem", fontFamily: "Oxanium" }}
        onClick={handleReset}
      >
        Play again
      </Button>


    </Stack>
  );
};

export default Finished;