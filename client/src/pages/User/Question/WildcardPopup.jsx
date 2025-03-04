import { Button, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UpperTriangleBox from "../../../components/UpperTriangleBox";
import { motion } from "framer-motion";

const WildcardPopup = ({ alert, content, handleClose }) => {
  const [isFlipped, setIsFlipped] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={"#000000"}
      zIndex={100}
      padding={"35px"}
      sx={{ perspective: "1200px" }}
    >
      <motion.div
        initial={{
          rotateY: 180,
          opacity: 0,
          scale: 0.7,
          z: -200,
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          opacity: 1,
          scale: 1,
          z: 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1], // Custom cubic bezier for more dramatic effect
          type: "spring",
          stiffness: 80,
          damping: 15,
        }}
        style={{
          transformStyle: "preserve-3d",
          width: "100%",
          maxWidth: "500px",
          transformOrigin: "center center",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            backfaceVisibility: "hidden",
            // boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)"
          }}
          whileHover={{
            scale: 1.02,
            rotateY: -5,
            transition: { duration: 0.3 },
          }}
        >
          <UpperTriangleBox
            variant="red"
            sx={{
              filter: "drop-shadow(0 0 15px #ffffffad)",
              borderRadius: "0 0 20px 20px",
            }}
          >
            <Stack
              bgcolor={"#9D1D27"}
              textAlign={"center"}
              color={"#fff"}
              padding={"24px 18px"}
              height={"350px"}
              sx={{
                position: "relative",
                borderRadius:"0 0 20px 20px",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "30%",
                  opacity: 0.7,
                },
              }}
            >
              <Typography fontSize={"24px"} fontWeight={"700"}>
                Alert : {alert}
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"500"}
                textAlign="center"
                sx={{ marginTop: "8px" }}
              >
                Wild Card
              </Typography>
              <Typography
                margin={"45px 0 12px"}
                fontSize={"16px"}
                fontWeight={"400"}
                textAlign={"left"}
                dangerouslySetInnerHTML={{ __html: content }}
                sx={{ lineHeight: 1.6 }}
              ></Typography>
            </Stack>
          </UpperTriangleBox>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <Stack direction={"row"} width={"100%"} marginTop={"20px"}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              width: "max-content",
              textTransform: "none",
              borderRadius: "48px",
              fontSize: "18px",
              padding: "0 28px",
              height: "48px",
              border: "2px solid #fff",
              color: "#fff",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderWidth: "2px",
              },
            }}
          >
            Next
          </Button>
        </Stack>
      </motion.div>
    </Stack>
  );
};

export default WildcardPopup;
