import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const advertisementContent = [
    {
        content: `"Your choice leans toward 'Disciplined Saver.' Stay cautious, but consider exploring growth opportunities." This keeps users engaged and aware of their financial tendencies.`,
        subContent: `Complimentary 1-year Times Prime Membership with 20+ Exclusive Brand Benefits.`
    },
    {
        content: `"You spent your emergency fund on a luxury purchase. Watch out! That’s a 'Live-for-Today Spender' move. Emergency funds are your safety net—don’t let indulgences put you at risk."`,
        subContent: `Swiggy One Lite Quarterly Membership: Access Free Delivery & Extra Discounts on Instamart & Restaurants.`
    },
    {
        content: `"You delayed repaying high-interest debt. Danger zone! That’s a 'Hopeful Borrower' tendency. Prioritize clearing high-interest debts to avoid financial strain."`,
        subContent: `Amazon Prime Quarterly Membership: Prime Video, Shopping Deals & Free 1-day Delivery.`
    },
];



const Advertisement = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Stack
            marginX={"1rem"}
            display={"flex"}
            gap={"2rem"}
        >
            <Stack
                // padding={"2rem"}
                paddingX={"1rem"}
                paddingY={"2rem"}
                borderRadius={"26px"}
                border={`1px solid #FFFFFF`}
                fontWeight={"600"}
                fontSize={"1.5rem"}
                lineHeight={"2.2rem"}
                fontFamily={"LSC Solid"}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={"3rem"}
                alignItems={"center"}
            // sx={{
            //     backgroundColor: "rgba(0, 0, 0, 0.7)",
            // }}
            >
                <Stack
                    fontWeight={"400"}
                    fontSize={"22px"}
                    lineHeight={"32px"}
                    fontFamily={"LSC Solid"}
                    color={"#FFFFFF"}
                >
                    "Your choice leans toward 'Disciplined Saver.' Stay cautious, but consider exploring growth opportunities." This keeps users engaged and aware of their financial tendencies.
                </Stack>
            </Stack >
            <Stack
                borderRadius="20px"
                border="0.5px solid #FFFFFF"
                paddingX="1rem"
                paddingY={"1.5rem"}
                gap={"0.5rem"}
            >
                <Typography
                    fontFamily={"Oxanium"}
                    color="#ffffff"
                    frontWeight={"400"}
                    fontSize={"18px"}
                    lineHeight={"36px"}>
                    Benefits with IDFC
                </Typography>


                <Stack
                    borderRadius="5px"
                    paddingY={"1.5rem"}
                    backgroundColor={"#A00612"}
                    textAlign={"left"}
                    gap={"1rem"}
                    paddingX="1rem"
                >
                    <Typography
                        fontFamily={"Oxanium"}
                        frontWeight={"400"}
                        fontSize={"18px"}
                        lineHeight={"22.14px"}
                        color="#ffffff"
                    >
                        Complimentary 1-year Times Prime Membership with 20+ Exclusive Brand Benefits
                    </Typography>


                    <Link to="#">
                        <Stack
                            backgroundColor={"#A00612"}
                            paddingX={"24px"}
                            paddingY={"11px"}
                            borderRadius={"5px"}
                            border={`1px solid #FBF9ED`}
                            display={"flex"}
                            justifyContent={"space-between"}
                            flexDirection={"row"}
                            color={"#ffffff"}
                            gap={"1rem"}
                            alignItems={"center"}
                            sx={{
                                backgroundColor: "#A00612",
                                textDecoration: "none"
                            }}
                        >
                            <Typography
                                fontWeight={"400"}
                                fontFamily={"Oxanium"}
                                fontSize={"20px"}
                            >
                                Open account with IDFC
                            </Typography>
                            <ArrowForwardIosIcon fontSize="20px" />

                        </Stack>
                    </Link>

                </Stack>

            </Stack>
        </Stack>
    )
}

export default Advertisement;