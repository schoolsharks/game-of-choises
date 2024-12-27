import { Box, Stack, Typography, useTheme, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import OurButton from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import TotalPlayers from "../../../components/TotalPlayers";
import { useNavigate } from "react-router-dom";
import "./Finished.css";
import { resetState } from "../../../app/userSlice";
import homeIcon from "../../../assets/homeIcon.svg";
import idfc from "../../../assets/IDFC.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import shape from "../../../assets/shape.svg"

const Finished = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user, name, wealth, investment, totalPlayers, goalReachPercentage } =
    useSelector((state) => state.user);

  const [userStatic, setUserStatic] = useState([]);

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
  }, [])

  const handleReset = () => {
    localStorage.clear();
    dispatch(resetState());
    navigate("/home");
  };

  return (
    // <Stack className="user-completed-page" height="100vh">
    //   <Typography
    //     variant="h5"
    //     fontWeight="700"
    //     textAlign="center"
    //     color={theme.palette.primary.main}
    //     marginTop="16px"
    //   >
    //     Challenge Completed
    //   </Typography>
    //   <TotalPlayers players={totalPlayers} />

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
    <Stack style={{
      height: "100vh",
      paddingTop: "3rem",
      padding: "1rem",
      color: "#FFFFFF",
      background: "rgba(0,0,0,0.7)",
      gap: "2rem"
    }}>
      <Link to="#">
        <Stack
          backgroundColor={"#A00612"}
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

      <Stack
        borderRadius="10px"
        border="2px solid white"
        padding="2rem"
        height="100%"
      >
        <div>
          <Typography fontFamily={"Oxanium"} frontWeight={"400"} fontSize={"1rem"}>
            Your personality <br />
          </Typography>
          <Typography fontFamily={"Oxanium"} fontSize={"2rem"} fontWeight={"600"} >{userStatic.personalityName}</Typography>
        </div>

        <Stack
          display={"flex"}
          flexDirection={"row"}
        >
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
        <Button variant="outlined" color="white" sx={{ borderRadius: '15px', paddingX: "19px", paddingY: "12px", fontSize: "1.5rem", fontFamily: "Oxanium" }}>
          Play again
        </Button>
        <Button variant="outlined" color="white" sx={{ borderRadius: '15px', paddingX: "19px", paddingY: "12px", fontSize: "1.5rem", fontFamily: "Oxanium" }}>
          Invite Friends
        </Button>
      </Stack>

    </Stack>
  );
};

export default Finished;
