"use client";

import { BOTTOMMENU_HEIGHT, Header, MARGIN_HEADER, Main, Main_Container } from "@/components";
import { Box, Stack } from "@mui/joy";

import { Fragment } from "react";
import { keyframes } from "@mui/material";
import { useParams } from "next/navigation";

export default function Comp() {
    const param = useParams();

    return (
        <Fragment>
            <Header />
            <Main>
                <Main_Container sx={{ height: `calc(100vh - ${MARGIN_HEADER}px - ${BOTTOMMENU_HEIGHT + 16 * 2}px)` }}>
                    <Stack direction={"row"} alignItems={"baseline"}>
                        <h1>Coming soon!!! We are building </h1>
                        <Box
                            sx={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                display: "block",
                                margin: "0 50px",
                                position: "relative",
                                color: "#000",
                                boxSizing: "border-box",
                                animation: `${animloader} 1s linear infinite`,
                            }}
                        ></Box>
                    </Stack>
                </Main_Container>
            </Main>
        </Fragment>
    );
}

const animloader = keyframes`
    0% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
    }
    25% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 2px;
    }
    50% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 2px,  -38px 0 0 -2px;
    }
    75% {
        box-shadow: 14px 0 0 2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
    }
    100% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
    }
`;
