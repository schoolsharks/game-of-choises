import React from "react";
import loader from "../assets/GIFS/loader.gif";
import { Box, Stack, Typography } from "@mui/material";

const SplashScreen = () => {
  return (
    <Stack
      minHeight={window.innerHeight}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box maxHeight="240px" overflow={"hidden"} marginTop={"-100px"}>
        <img src={loader} alt="" />
      </Box>
    </Stack>
  );
};

export default SplashScreen;
