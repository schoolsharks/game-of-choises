import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UpperTriangleBox from "../../../components/UpperTriangleBox";
import { ArrowBack, ArrowForward, ShareOutlined } from "@mui/icons-material";
import balancedSpendorBadge from "../../../assets/badges/balanced-spendor-badge.png";
import hustlerBadge from "../../../assets/badges/hustler-badge.png";
import saverBadge from "../../../assets/badges/saver-badge.png";
import liveForTodaySpendorBadge from "../../../assets/badges/live-for-today-badge.png";
import hopefulBorrowerBadge from "../../../assets/badges/hopeful-borrower-badge.png";
import { useEffect, useState } from "react";
import SplashScreen from "../../../components/SplashScreen";
import { motion, AnimatePresence } from "framer-motion";
import logos from "../../../assets/logos.webp";

const HomeMain = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);

  const currentPage = Number(page);

  const handleBack = () => {
    if (currentPage > 1) {
      handleNavigation(`/home/${currentPage - 1}`);
    }
  };

  const handleForward = () => {
    if (currentPage < 1) {
      handleNavigation(`/home/${currentPage + 1}`);
    } else {
      handleNavigation("/login");
    }
  };

  const handleNavigation = (route) => {
    setIsExiting(true);
    setNextRoute(route);
  };

  useEffect(() => {
    if (isExiting && nextRoute) {
      const timer = setTimeout(() => {
        navigate(nextRoute);
        setIsExiting(false);
        setNextRoute(null);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isExiting, nextRoute, navigate]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  return (
    <Stack bgcolor={theme.palette.primary.main} position={"relative"}>
      <SplashScreen loading={loading} />
      <img
        src={logos}
        alt=""
        style={{
          position: "absolute",
          width: "130px",
          top: "12px",
          right: "12px",
          zIndex: "99",
          filter:"drop-shadow(0 0 3px #00000073)"
        }}
      />
      <UpperTriangleBox
        sx={{
          flex: "1",
          position: "relative",
          marginTop:"15px",
          minHeight: window.innerHeight,
          filter:"drop-shadow(0 0 15px #ffffffad)",
        }}
      >
        <AnimatePresence mode="wait">
          {!isExiting && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                marginTop: "-48px",
                flex: "1",
              }}
            >
              {currentPage === 1 && (
                <Page1 loading={loading} handleForward={handleForward} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </UpperTriangleBox>
    </Stack>
  );
};

export default HomeMain;

const Page1 = ({ handleForward, loading }) => {
  const badges = [
    balancedSpendorBadge,
    hustlerBadge,
    saverBadge,
    hopefulBorrowerBadge,
    liveForTodaySpendorBadge,
  ];

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

  return (
    <Stack
      style={{
        color: "#fff",
        padding: "24px",
        flex: "1",
        justifyContent:"space-between"
      }}
    >
      <Stack>
      <Typography fontSize={"2.2rem"} fontWeight={"700"}>
        WELCOME
      </Typography>
      <Typography fontSize={"16px"} fontWeight={"600"} marginTop={"24px"}>
        To a game where your money decisions shape your future. Every choice you
        make today will impact your future-self for better or worse.
      </Typography>
      <Typography fontSize={"16px"} fontWeight={"600"} marginTop={"40px"}>
        Swipe left for Option A & swipe right for Option B, to make bold
        financial moves.
      </Typography>
      <Typography fontSize={"16px"} fontWeight={"600"} marginTop={"22px"}>
        Discover who you are:
      </Typography>
      <Stack
        direction={"row"}
        marginTop="20px"
        justifyContent={"space-between"}
        gap={"10px"}
      >
        {!loading &&
          badges.map((badge, index) => (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                duration: 0.3,
                delay: 0.2 * index,
              }}
              key={index}
              src={badge}
              alt="badge"
              style={{ width: "42px" }}
            />
          ))}
      </Stack>
      <Typography fontSize={"18px"} fontWeight={"600"} marginTop={"22px"}>
        Make smart moves to break free!
      </Typography>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        margin={"20px 0"}
      >
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
            color: "#fff",
          }}
        >
          Start
        </Button>
        <IconButton onClick={handleShare}>
          <ShareOutlined sx={{ color: "#fff", fontSize: "28px" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
