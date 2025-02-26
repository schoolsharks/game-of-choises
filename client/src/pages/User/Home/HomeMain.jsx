import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UpperTriangleBox from "../../../components/UpperTriangleBox";
import { ArrowBack, ArrowForward, ShareOutlined } from "@mui/icons-material";
import balancedSpendorBadge from "../../../assets/badges/balanced-spendor-badge.png";
import hustlerBadge from "../../../assets/badges/hustler-badge.png";
import saverBadge from "../../../assets/badges/saver-badge.png";
import { useEffect, useState } from "react";
import SplashScreen from "../../../components/SplashScreen";
import {motion} from "framer-motion";

const HomeMain = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading,setLoading]=useState(true)

  const currentPage = Number(page);

  const handleBack = () => {
    if (currentPage > 1) {
      navigate(`/home/${currentPage - 1}`);
    }
  };

  const handleForward = () => {
    if (currentPage < 1) {
      navigate(`/home/${currentPage + 1}`);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setTimeout(()=>setLoading(false),2500)
  }, []);

  if(loading){
    return <SplashScreen/>
  }

  return (
    <UpperTriangleBox
      sx={{
        flex: "1",
        position: "relative",
        minHeight:window.innerHeight,
        bgcolor: theme.palette.primary.main,
        filter:"drop-shadow(0 0 15px #fff)"
      }}
    >
      <Stack marginTop="-48px" flex={"1"}>
        {currentPage === 1 && <Page1 handleForward={handleForward}/>}
        {/* {currentPage === 2 && <Page2 />} */}
        {/* {currentPage === 3 && <Page3 />} */}

        {/* <Stack
          direction={"row"}
          gap={"20px"}
          padding={"16px"}
          // margin={"auto 0 16px"}
          marginBottom={"16px"}
        >
          {currentPage > 1 && (
            <IconButton onClick={handleBack}>
              <ArrowBack
                sx={{
                  border: "2px solid white",
                  fontSize: "40px",
                  padding: "4px",
                  borderRadius: "50%",
                  color: "#ffffff",
                }}
              />
            </IconButton>
          )}

          <IconButton onClick={handleForward}>
            <ArrowForward
              sx={{
                border: "2px solid white",
                fontSize: "40px",
                padding: "4px",
                borderRadius: "50%",
                color: "#ffffff",
              }}
            />
          </IconButton>
        </Stack> */}
      </Stack>
    </UpperTriangleBox>
  );
};

export default HomeMain;

const Page1 = ({handleForward}) => {
  const badges = [
    balancedSpendorBadge,
    hustlerBadge,
    saverBadge,
    balancedSpendorBadge,
    hustlerBadge,
  ];

  return (
    <motion.div style={{color:"#fff",padding:"24px",flex:"1"}}>
      <Typography fontSize={"2.5rem"} fontWeight={"700"}>
        WELCOME
      </Typography>
      <Typography fontSize={"18px"} fontWeight={"600"} marginTop={"40px"}>
        Swipe left or right to build good habits, unlock your financial
        strengths, and uncover your financial personality.
      </Typography>
      <Typography fontSize={"18px"} fontWeight={"600"} marginTop={"22px"}>
        Discover who you are:
      </Typography>
      <Stack
        direction={"row"}
        marginTop="20px"
        justifyContent={"space-between"}
        gap={"10px"}
      >
        {badges.map((badge, index) => (
          <img key={index} src={badge} alt="badge" style={{ width: "58px" }} />
        ))}
      </Stack>
      <Typography fontSize={"18px"} fontWeight={"600"} marginTop={"22px"}>
        Make smart moves to break free!
      </Typography>

      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} margin={"auto 0 20px"}>
        <Button
          variant="outlined"
          onClick={handleForward}
          sx={{
            width: "max-content",
            textTransform: "none",
            borderRadius: "48px",
            fontSize: "18px",
            padding: "0 18px",
            height: "36px",
            border: "2px solid #fff",
            color:"#fff"
          }}
        >
          Start
        </Button>
        <IconButton><ShareOutlined sx={{color:"#fff",fontSize:"28px"}}/></IconButton>
      </Stack>
    </motion.div>
  );
};
