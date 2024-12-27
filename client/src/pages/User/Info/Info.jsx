import { Stack, Typography, IconButton, useTheme, Box } from "@mui/material";
import React, { useState } from "react";

import person1 from "../../../assets/person1.png";
import person2 from "../../../assets/person2.png";
import SwipeBar from "../../../components/SwipeBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";

const Info = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleOnSwipe = () => {
    navigate("/questions");
  };
  const Infodata = [
    {
      id: 1,
      image: person1,

      content1: "Question mark",

      desc1:
        "Just like Neo, embark on a financial journey, evolving from inexperienced to confident. Represents bold and ambitious decision-making . . .",
    },
    {
      id: 2,
      image: person1,

      content1: "The Hustler",

      desc1:
        "Just like Neo, embark on a financial journey, evolving from inexperienced to confident Represents bold and ambitious decision-making . . .",
    },
    {
      id: 3,
      image: person2,

      content1: "Balanced Spender",

      desc1:
        "Just like Trinity a supportive companion who emphasises balance between enjoying life now and planning for the future . . .",
    },
  ];

  const [slide, setslide] = useState(0);
  const data = Infodata[slide];
  // console.log("infodata", data);
  const handlePrev = () => {
    if (slide > 0) {
      setslide(slide - 1);
    }
  };

  const handleNext = () => {
    if (slide < Infodata.length - 1) {
      setslide(slide + 1);
    }
  };

  return (
    <Stack
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <Stack
        width="100%"
        maxWidth="431px"
        maxHeight="939px"
        height="75%"
        position="relative"
        overflow="hidden"
        display="flex"
        justifyContent="start"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
        // paddingY="10%"
        gap={"4%"}
        sx={{
          backgroundColor: "#00000080",
        }}
      >
        {/* <Box
          sx={{
            position: "relative",
          }}
        > */}
        <Box
          component="img"
          src={data?.image}
          alt="info-person"
          sx={{
            width: "100%",
            height: "50%",
            opacity: "60%",
          }}
          alignContent={"center"}
        />
        <Typography
          variant="h3"
          component="div"
          alignContent={"center"}
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "1.8rem",
              md: "1.2rem",
              lg: "1.2rem",
            },
            fontWeight: "800",
            width: "75%",
            color: "white",
            position: "absolute",
            transform: "rotate(90deg)",

            top: {
              md: "40%",
              xs: "29%",
            },
            right: {
              md: "-120px",
              xs: "-100px",
            },
          }}
        >
          {data.content1}
        </Typography>
        {/* </Box> */}

        <Typography
          variant="body3"
          component="div"
          alignContent={"center"}
          sx={{
            fontSize: {
              xs: "22px",
              sm: "22px",
              md: "22px",
              lg: "22px",
            },
            fontWeight: "500",
            width: "75%",
            height: "30%",
            color: "white",
            lineHeight: "30.8px",
          }}
        >
          {data.desc1}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            margin: "0 auto",
            paddingBottom: "15px",
          }}
        >
          <IconButton
            onClick={handlePrev}
            disabled={slide === 0}
            sx={{
              color: slide === 0 ? "gray" : "primary.main",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={slide === 2}
            sx={{
              color: slide === 2 ? "gray" : "primary.main",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Stack>

      <Stack
        position={"fixed"}
        bottom={"8%"}
        maxHeight={"88px"}
        maxWidth={"361px"}
        height={"10%"}
        width={"80%"}
        alignContent={"center"}
        alignSelf={"center"}
      >
        <SwipeBar onSwipe={handleOnSwipe} text={"Play"} />
      </Stack>
    </Stack>
  );
};
{
  /* <Box
          sx={{
            backgroundColor: "#000000CC",
            color: "white",
            paddingBottom: "10%",
            paddingTop: "5%",
            paddingRight: "10%",
            height: "60%",
            maxHeight: "527px",
            width: "100%",
            maxWidth: "433px",
            direction: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",

            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              paddingX: "5%",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              height: "90%",
              // marginBottom: "10px",
              width: "100%",

              // gap: "0.8rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                paddingTop: "10px",

                width: "100%",
              }}
            >
              {data?.image && (
                <Box
                  component="img"
                  src={data?.image}
                  alt="info-person"
                  sx={{
                    width: data.flag ? "70%" : "154px",
                    height: data.flag ? "70%" : "154px",
                  }}
                  alignContent={"center"}
                />
              )}
              {slide === 1 && (
                <Grid2
                  container
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  width={"100%"}
                >
                  <Grid2 item>
                    <Typography
                      variant="body3"
                      component="div"
                      alignContent={"center"}
                      sx={{
                        fontSize: "2.2rem",
                        fontWeight: "600",
                      }}
                    >
                      {data.content1}
                    </Typography>
                  </Grid2>
                  <Grid2 item>
                    <Typography
                      variant="body3"
                      component="div"
                      alignContent={"center"}
                      size="1.4rem"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "500",
                      }}
                    >
                      {data.content2}
                    </Typography>
                  </Grid2>
                </Grid2>
              )}
            </Box> */
}

{
  /* {slide !== 1 && (
              <Grid2
                container
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                alignContent={"center"}
                width={"100%"}
              >
                <Grid2 item>
                  <Typography
                    variant="body3"
                    component="div"
                    alignContent={"center"}
                    sx={{
                      fontSize: "2.2rem",
                      fontWeight: "600",
                    }}
                  >
                    {data.content1}
                  </Typography>
                </Grid2>
                <Grid2 item>
                  <Typography
                    variant="body3"
                    component="div"
                    alignContent={"center"}
                    size="1.4rem"
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    {data.content2}
                  </Typography>
                </Grid2>
              </Grid2>
            )}
            <Typography
              variant="body3"
              alignContent={"start"}
              display="block"
              alignItems={"start"}
              sx={{
                marginTop: "18px",
                width: "345px",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              {data.desc1}
            </Typography>
            {data?.desc2 && (
              <Typography
                variant="body3"
                alignContent={"center"}
                alignItems={"center"}
                width="345px"
                display="block"
                sx={{
                  marginTop: 1,
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                {data.desc2}
              </Typography>
            )} */
}
// </Box>

{
  /* <Box
            sx={{
              display: "flex",
              justifyContent:
                slide > 0 && slide < 4
                  ? "space-between"
                  : slide === 0
                  ? "end"
                  : "start",
              alignItems: "center",
              paddingX: "5%",
              // marginBottom: 2,
            }}
          >
            {slide > 0 && (
              <Box
                component="img"
                src={arrow}
                onClick={handlePrevious}
                alt="info-person"
                sx={{
                  width: "50px",
                  cursor: "pointer",
                  height: "50px",
                  // marginBottom: 2,
                  transform: "rotate(180deg)",
                }}
              />
            )}
            {slide < 4 && (
              <Box
                component="img"
                src={arrow}
                onClick={handleNext}
                alt="info-person"
                sx={{
                  width: "50px",
                  height: "50px",
                }}
              />
            )}
          </Box>
      // */
}
// </Box>

//   // </Stack>
// </Stack>
//   );
// };

export default Info;
