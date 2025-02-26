import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import loader from "../assets/GIFS/loader.gif";

const SplashScreen = ({ loading }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [gifKey, setGifKey] = useState(Date.now()); // Change key to force reload

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
      setGifKey(Date.now()); // Update GIF key on full load
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <Stack
      minHeight={window.innerHeight}
      alignItems={"center"}
      justifyContent={"center"}
      position={"fixed"}
      top={0}
      left={"50%"}
      zIndex={loading && isPageLoaded ? 100 : -1}
      bgcolor={"#000"}
      opacity={loading && isPageLoaded ? 1 : 0}
      sx={{
        transition: "all 0.3s ease",
        transform: "translateX(-50%)",
        width: window.innerWidth,
      }}
    >
      <Box maxHeight="240px" overflow={"hidden"} marginTop={"-100px"}>
        {isPageLoaded && <img key={gifKey} src={`${loader}?t=${gifKey}`} alt="Loading..." />}
      </Box>
    </Stack>
  );
};

export default SplashScreen;
