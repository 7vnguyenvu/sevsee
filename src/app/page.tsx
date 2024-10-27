"use client";

import { BOTTOMMENU_HEIGHT, Header, Loading, MARGIN_HEADER, Main, Main_Container, chooseThemeValueIn, color } from "@/components";
import { Box, Typography } from "@mui/joy";
import { HomeEn, HomeVi } from "@/locales";
import React, { Fragment, useEffect, useState } from "react";

import { useGlobalContext } from "@/context/store";

const BottomMenu = React.lazy(() => import("@/components/header/bottom-menu"));

export default function Page() {
    const { lang, systemMode, isMobile } = useGlobalContext();
    const T = lang === "en" ? HomeEn.page : HomeVi.page;

    const [render, setRender] = useState<boolean>(false);

    const headText = {
        title: isMobile ? T.title.xs : T.title.md,
        description: isMobile ? T.description.xs : T.description.md,
    };

    useEffect(() => {
        setRender(true);
    }, []);

    return (
        <Fragment>
            <Header />
            <Main>
                {render ? (
                    <Main_Container sx={{ height: `calc(100vh - ${MARGIN_HEADER}px - ${BOTTOMMENU_HEIGHT + 16 * 2}px)` }}>
                        {!isMobile && <BottomMenu />}
                        <Box
                            sx={{
                                width: "100%",
                                height: { xs: "60%", md: "80%" },
                                position: "relative",
                                top: { xs: "40%", md: "50%" },
                                transform: "translateY(-50%)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                overflow: "hidden",
                                img: {
                                    width: { xs: "110%", sm: "100%" },
                                    height: { xs: "100%", sm: "70%" },
                                    objectFit: "contain",
                                },
                            }}
                        >
                            {/* TITLE - H1 - RESPONSIVE */}
                            <Typography
                                textAlign={"center"}
                                level="h1"
                                sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
                                textTransform={"capitalize"}
                                textColor={chooseThemeValueIn(color.black.dark, color.black.dark, systemMode)}
                            >
                                {headText.title}
                            </Typography>

                            {/* DESCRIPTION - RESPONSIVE */}
                            <Typography
                                textAlign={"center"}
                                level="body-md"
                                textColor={chooseThemeValueIn(color.black.dark, color.black.dark, systemMode)}
                                sx={{ mt: 2, whiteSpace: "pre-wrap" }}
                            >
                                {headText.description}
                            </Typography>

                            <img
                                style={{ transition: "all 0.3s ease-in-out" }}
                                src="/images/home-img.webp"
                                title={T.title.xs}
                                alt="home-img"
                                width={"100%"}
                                height={"100%"}
                                draggable={false}
                            />
                        </Box>
                    </Main_Container>
                ) : (
                    <Main_Container sx={{ height: `calc(100vh - ${MARGIN_HEADER}px - ${BOTTOMMENU_HEIGHT + 16 * 2}px)` }}>
                        <Loading />
                    </Main_Container>
                )}
            </Main>
        </Fragment>
    );
}
