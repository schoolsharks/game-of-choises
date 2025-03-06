import { Box, Button, Stack, Typography } from "@mui/material";
import doYouKnow1 from "../../../assets/DoYouKnow/do-you-know-1.webp";
import doYouKnow2 from "../../../assets/DoYouKnow/do-you-know-2.webp";
import doYouKnow3 from "../../../assets/DoYouKnow/do-you-know-3.webp";
import UpperTriangleBox from "../../../components/UpperTriangleBox";
import { Check } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Content1 = () => {
  return (
    <Stack>
      <Typography fontWeight={"600"}>
        If your monthly expense is ₹40,000 today, how much it will be after 25
        years?
      </Typography>
      <img
        src={doYouKnow1}
        alt="Do You Know"
        style={{ width: "240px", margin: "48px auto 20px" }}
      />
      <Typography fontWeight="600">
        INFLATION Reduces Purchasing Power
      </Typography>
    </Stack>
  );
};
const Content2 = () => {
  return (
    <Stack>
      <Typography fontWeight={"600"}>
        If you have ₹ 1 and it doubles daily for a month, how much will you
        receive at the end of the month (31 days)?
      </Typography>
      <img
        src={doYouKnow2}
        alt="Do You Know"
        style={{ width: "240px", margin: "48px auto 20px" }}
      />
      <Typography fontWeight="600">That’s the POWER OF COMPOUNDING</Typography>
    </Stack>
  );
};
const Content3 = () => {
  return (
    <Stack>
      <Typography fontWeight={"600"}>
        If A started investing ₹ 5,000 a month at age 25 and B started investing
        ₹ 15,000 a month at age 45, what will be the difference in their
        investment value at age 55?
      </Typography>
      <img
        src={doYouKnow3}
        alt="Do You Know"
        style={{ width: "240px", margin: "48px auto 20px" }}
      />
      <Typography fontWeight="400" fontSize={"12px"}>
        *Rate of return of 12% is used for illustrative purpose only, names are
        fictitious
      </Typography>
      <Typography fontWeight="600" textAlign={"center"} marginTop={"20px"}>
        That’s the COST OF DELAY
      </Typography>
    </Stack>
  );
};

const DoYouKnow = ({ id, handleClose }) => {
  const [isFlipped, setIsFlipped] = useState(true);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (id === 3) {
      navigate("/feedback");
    }
    handleClose();
  };

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
      alignItems={"center"}
      bgcolor={"#9D1D27"}
      color={"#ffffff"}
      zIndex={100}
      height={window.innerHeight}
      sx={{ overflowY: "scroll", overflowX: "hidden", scrollbarWidth: "none" }}
    >
      <Typography position={"absolute"} fontSize={"1.25rem"} fontWeight={"700"} sx={{top:"30px",right:"30px"}}>Do You Know?</Typography>
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
            sx={{ margin: "40px 30px 0", borderRadius: "0 0 20px 20px",
              filter:"drop-shadow(0 0 15px #ffffffad)",
             }}
          >
            <Stack padding={"0 20px"}>
              {id === 1 && <Content1 />}
              {id === 2 && <Content2 />}
              {id === 3 && <Content3 />}
              <TickMarks id={id} />
            </Stack>
          </UpperTriangleBox>
        </motion.div>
      </motion.div>
      <Stack
        direction={"row"}
        margin={"24px 0 40px"}
        padding={"0 30px"}
        width={"100%"}
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
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export default DoYouKnow;

const TickMarks = ({ id }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      margin={"20px 0"}
      position={"relative"}
    >
      {/* Tick Markers */}
      {[1, 2, 3].map((item) => (
        <motion.div
          initial={item === id ? { scale: 0 } : { scale: 1 }}
          animate={{
            scale: item === id ? 1.2 : 1,
          }}
          transition={{
            delay: item === id ? 1.5 : 0,
            duration: 1,
            type: "spring",
            stiffness: 300,
            damping: 10,
            bounce: 0.8,
          }}
          key={item}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: `2px solid ${item <= id ? "#fff" : "#FFFFFF61"}`,
            width: item === id ? "42px" : "28px",
            height: item === id ? "42px" : "28px",
            borderRadius: "50%",
            background: "#000000",
            zIndex: "2",
          }}
        >
          {item <= id ? <Check sx={{ color: "#ffffff" }} /> : null}
        </motion.div>
      ))}

      {/* Connecting Lines */}
      {[1, 2].map((item) => (
        <Stack
          key={item}
          height="2px"
          width={"50%"}
          position={"absolute"}
          bgcolor={"#ffffff3b"}
          zIndex={"1"}
          left={item === 1 ? "0" : "50%"}
        >
          <motion.div
            initial={{ width: "0" }}
            animate={{
              width: item < id ? "100%" : item === id - 1 ? "100%" : "0%",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: item === id - 1 ? 1.3 : 0,
            }}
            style={{ height: "100%", background: "#ffffff" }}
          />
        </Stack>
      ))}
    </Stack>
  );
};
