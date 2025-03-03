import React, { useEffect } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./Login/Login";
// import Info from "./Info/Info";
import Question from "./Question/Question";
import Finished from "./Finished/Finished";
import { initializeAuth } from "../../services/auth/initializeAuth";
import { useDispatch } from "react-redux";
import AnimatedPage from "../../utils/AnimatedPage";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import HomeMain from "./Home/HomeMain";
import Feedback from "./Feedback/Feedback";

const Main = () => {
  const theme = useTheme();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    initializeAuth(navigate, dispatch);
  }, [dispatch]);

  return (
    <Stack
      width="100%"
      maxWidth="900px"
      height="100%"
      margin={"0 auto"}
      sx={{
        overflow: isLargeScreen ? "" : "hidden",
      }}
    >
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<Navigate to="/home/1" />} />
          <Route path="/home/:page" element={<HomeMain/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/info" element={<AnimatedPage Component={LoadingScreen} />} />

          <Route
            path="/completed"
            element={<AnimatedPage Component={Finished} />}
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/questions"
            element={<AnimatedPage Component={Question} />}
          />
          <Route
            path="/feedback"
            element={<AnimatedPage Component={Feedback} />}
          />
        </Routes>
      </AnimatePresence>
    </Stack>
  );
};

export default Main;
