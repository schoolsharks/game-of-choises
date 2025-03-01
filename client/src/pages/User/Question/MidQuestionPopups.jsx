import { Check } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const texts = [
  {
    id: 1,
    text: "You just crushed the first 5 questions! Keep that momentum rolling!",
  },
  {
    id: 2,
    text: "Halfway there! You’re stacking knowledge like it’s your side hustle —keep going!",
  },
  {
    id: 3,
    text: "Boom! You made it! Your financial glow-up is in progress. Let’s see where you stand!",
  },
];

const TickMarks = ({ id }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      marginTop={"106px"}
    >
      {[1, 2, 3].map((item, index) => (
        <motion.div
          initial={item===id&&{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            duration: 1, 
            type: "spring", 
            stiffness: 300, 
            damping: 10, 
            bounce: 0.8 
          }}
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: `2px solid ${item === id ? "#fff" : "#FFFFFF61"}`,
            scale: item === id ? 1.2 : 1,
            filter: item < id ? "blur(2px)" : "none",
            width: item === id ? "40px" : "34px",
            height: item === id ? "40px" : "34px",
            borderRadius: "50%",
          }}
        >
          {item <= id ? (
            <Check sx={{ color: item === id ? "#ffffff" : "#FFFFFF61" }} />
          ) : null}
        </motion.div>
      ))}
    </Stack>
  );
};

const MidQuestionPopups = ({ id, handleClose }) => {
  const navigate = useNavigate();
  const handleNext = () => {
    if (id === 3) {
      navigate("/completed");
    } else {
      handleClose();
    }
  };
  return (
    <Stack
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      //   justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"#000000"}
      zIndex={100}
      padding={"35px"}
    >
      <TickMarks id={id} />
      <Typography marginTop={"106px"} color="#fff">
        {texts.find((item) => item.id === id)?.text}
      </Typography>
      <Stack
        direction={"row"}
        width="100%"
        alignItems={"flex-start"}
        margin={"auto 0 120px"}
      >
        <Button
          variant="outlined"
          onClick={handleNext}
          sx={{
            width: "max-content",
            textTransform: "none",
            borderRadius: "48px",
            fontSize: "18px",
            padding: "0 18px",
            height: "40px",
            border: "2px solid #fff",
            color: "#fff",
          }}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default MidQuestionPopups;
