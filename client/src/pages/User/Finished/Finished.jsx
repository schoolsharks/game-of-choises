import { Stack, Typography, useTheme, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Finished.css";
import { resetState } from "../../../app/userSlice";
import idfc from "../../../assets/IDFC.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import shape from "../../../assets/shape.svg";

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user, name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);
  // console.log("user is", user);
  const [userStatic, setUserStatic] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  console.log("userStatic.strenghts", userStatic.strengths);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const navigate = useNavigate();

  const getAnalysis = async (user) => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/users/analysis",
      {
        params: {
          userId: user,
        },
      }
    );
    console.log("response", response.data.analyticsData);
    setUserStatic(response.data.analyticsData);
  };

  useEffect(() => {
    console.log("Analysis", user);
    getAnalysis(user);
  }, []);

  const handleReset = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/users/storedata`,
      { userId: user }
    );
    console.log("response", response.data.data);
    localStorage.clear();
    dispatch(resetState());
    navigate("/home");
  };
  const values = [70, 80, 15, 18, 30];
  console.log("scoresArray", userStatic.scoreArray);

  return (
    //   <Stack
    //     color={theme.palette.primary.main}
    //     borderRadius="16px"
    //     padding="1rem"
    //     border={`2px solid ${theme.palette.primary.main}`}
    //     margin="4em 24px 0"
    //     gap="8px"
    //   >
    //     <Typography fontSize={"1.5rem"} fontWeight="500">
    //       {name}
    //     </Typography>
    //     <Stack direction="row" justifyContent={"space-between"}>
    //       <Typography>Bank Balance</Typography>
    //       <Typography fontWeight="700">{wealth}</Typography>
    //     </Stack>
    //     <Stack direction="row" justifyContent={"space-between"}>
    //       <Typography>Investments</Typography>
    //       <Typography fontWeight="700">{investment}</Typography>
    //     </Stack>
    //     <Stack direction="row" justifyContent={"space-between"}>
    //       <Typography>Total Wealth</Typography>
    //       <Typography fontWeight="700">{wealth + investment}</Typography>
    //     </Stack>
    //   </Stack>
    //   <Stack
    //     color={"#ffffff"}
    //     borderRadius="16px"
    //     padding="1rem"
    //     border={`2px solid #ffffff`}
    //     margin="1rem 24px 0"
    //     gap="8px"
    //   >
    //     <Typography fontSize={"1.5rem"} fontWeight="500">
    //       Goal update
    //     </Typography>
    //     <Stack
    //       sx={{
    //         width: "max-content",
    //         borderRadius: "50px",
    //         background: `conic-gradient(${theme.palette.primary.main} 0% ${goalReachPercentage}%, #ffffff ${goalReachPercentage}% 100%)`,
    //         overflow: "hidden",
    //         margin: "auto",
    //       }}
    //     >
    //       <Stack
    //         sx={{
    //           margin: "4px",
    //           borderRadius: "50px",
    //           padding: "14px 20px",
    //           // background: "linear-gradient(#a69a85, #68797b)"
    //           background: "#D6B48D",
    //         }}
    //       >
    //         <Typography fontSize={"1.57rem"} fontWeight={"500"}>
    //           {Math.round(Number(goalReachPercentage))}% Reached
    //         </Typography>
    //       </Stack>
    //     </Stack>
    //   </Stack>

    //   <Stack
    //     alignItems="center"
    //     position="fixed"
    //     bottom="50px"
    //     left="0"
    //     width="100%"
    //   >
    //     <Box width="80%" height="4px" bgcolor="#fff" borderRadius="4px" />
    //     <Box
    //       onClick={handleReset}
    //       position="absolute"
    //       left="50%"
    //       sx={{
    //         top: "50%",
    //         transform: "translateX(-50%) translateY(-50%)",
    //       }}
    //     >
    //       <OurButton>
    //         <img
    //           src={homeIcon}
    //           alt=""
    //           style={{ width: "32px", objectFit: "contain" }}
    //         />

    //       </OurButton>
    //     </Box>
    //   </Stack>
    // </Stack>
    <Stack
      style={{
        height: "100vh",
        paddingTop: "3rem",
        padding: "1rem",
        color: "#FFFFFF",
        background: "rgba(0,0,0,0.7)",
        gap: "2rem",
      }}
    >
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
            textDecoration: "none",
          }}
        >
          <p>Open account with IDFC</p>
          <img
            src={idfc}
            alt="option A"
            style={{
              // width: "2.31rem",
              // height: "7.05rem",
              objectFit: "contain",
            }}
          />
        </Stack>
      </Link>
      {/* landing image as per personality */}
      {/* <Stack
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
      </Stack> */}
      {/* subCategory */}
      {/* {userStatic && userStatic.subCategory?.length > 0
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
      {/* {userStatic && userStatic?.strengths?.length > 0 && (
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
              <Typography
                fontFamily={"Oxanium"}
                frontWeight={"500"}
                fontSize={"1.1rem"}
                lineHeight={"1.5rem"}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Stack>
      )}{" "}
      */}
      {/* challenges */}
      {/* {userStatic && userStatic?.challenges?.length > 0 && (
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
              <Typography
                fontFamily={"Oxanium"}
                frontWeight={"500"}
                fontSize={"1.1rem"}
                lineHeight={"1.5rem"}
                key={index}
              >
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
        <div>
          <Typography
            fontFamily={"Oxanium"}
            frontWeight={"400"}
            fontSize={"1rem"}
          >
            Your personality <br />
          </Typography>
          <Typography
            fontFamily={"Oxanium"}
            fontSize={"2rem"}
            fontWeight={"600"}
          >
            {userStatic.personalityName}
          </Typography>
        </div>

        <Stack display={"flex"} flexDirection={"row"}>
          {/* <img
              src={shape}>
                sx={{
                  width:"162px",
                  height:"153px"
                }}
              </img> */}
          {/* <Stack display={"flex"} flexDirection={"column"}>
            {userStatic.subCategory.map((cate, index) => (
              <div key={index}>{cate}</div>  
            ))}
          </Stack> */}
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Button
          variant="outlined"
          onClick={handleReset}
          color="white"
          sx={{
            borderRadius: "15px",
            paddingX: "19px",
            paddingY: "12px",
            fontSize: "1.5rem",
            fontFamily: "Oxanium",
          }}
        >
          Play again
        </Button>
        <Button
          variant="outlined"
          color="white"
          sx={{
            borderRadius: "15px",
            paddingX: "19px",
            paddingY: "12px",
            fontSize: "1.5rem",
            fontFamily: "Oxanium",
          }}
        >
          Invite Friends
        </Button>
      </Stack>
    </Stack>
  );
};

export default Finished;
