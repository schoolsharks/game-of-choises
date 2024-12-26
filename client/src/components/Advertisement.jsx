import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Stack,
    Typography,
    LinearProgress,
    useTheme,
    Box,
    CircularProgress,
    useMediaQuery,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import growth from "../assets/growth.svg";
import shape from "../assets/shape.svg";

const Advertisement = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Stack
            marginX={"1rem"}
            display={"flex"}
            gap={"1.12rem"}
        >
            <Stack
                // padding={"2rem"}
                paddingX={"1rem"}
                paddingY={"2rem"}
                borderRadius={"26px"}
                border={`1px solid #FBF9ED`}
                fontWeight={"600"}
                fontSize={"1.5rem"}
                lineHeight={"2.2rem"}
                fontFamily={"Oxanium"}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={"3rem"}
                alignItems={"center"}
                sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
            >
                <Stack
                    fontWeight={"600"}
                    fontSize={"1.5rem"}
                    lineHeight={"2.2rem"}
                    fontFamily={"Oxanium"}
                    color={"#FFFFFF"}
                >
                    "Your choice leans toward 'Disciplined Saver.' Stay cautious, but consider exploring growth opportunities." This keeps users engaged and aware of their financial tendencies.
                </Stack>
                <img
                    src={growth}
                    alt="option A"
                    style={{
                        width: "16rem",
                        height: "9rem",
                        objectFit: "contain"
                    }}
                />
            </Stack >

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
                        textDecoration:"none"
                    }}
                >
                    <p>
                        Open account with IDFC
                    </p>
                    <img
                        src={shape}
                        alt="option A"
                        style={{
                            // width: "2.31rem", 
                            // height: "7.05rem", 
                            objectFit: "contain"
                        }}
                    />
                </Stack>
            </Link>
        </Stack>
    )
}

export default Advertisement;