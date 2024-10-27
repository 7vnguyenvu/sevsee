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
                    <h1>Coming soon!!!</h1>
                    <p>We are building... </p>
                </Main_Container>
            </Main>
        </Fragment>
    );
}
