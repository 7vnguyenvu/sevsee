"use client";

import { BOTTOMMENU_HEIGHT, Header, MARGIN_HEADER, Main, Main_Container, chooseThemeValueIn, color } from "@/components";
import { Box, Typography } from "@mui/joy";
import { HomeEn, HomeVi } from "@/locales";
import React, { Fragment } from "react";

import Image from "next/image";
import { useGlobalContext } from "@/context/store";

const BottomMenu = React.lazy(() => import("@/components/header/bottom-menu"));
const BottomMenuMoblie = React.lazy(() => import("@/components/header/bottom-menu-mobile"));

export default function Page() {
    const { lang, systemMode } = useGlobalContext();
    const T = lang === "en" ? HomeEn.page : HomeVi.page;

    return (
        <Fragment>
            <Header />
            <Main>
                <Main_Container
                    sx={{
                        overflow: "hidden",
                        height: `calc(100vh - ${MARGIN_HEADER}px - ${BOTTOMMENU_HEIGHT + 16 * 2}px)`,
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "fit-content",
                            position: "relative",
                            top: { xs: MARGIN_HEADER / 2, lg: MARGIN_HEADER },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            overflow: "hidden",
                            userSelect: "none",
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            {/* TITLE - H1 */}
                            <Typography
                                level="h1"
                                textTransform={"capitalize"}
                                textColor={chooseThemeValueIn(color.black.dark, color.black.dark, systemMode)}
                                sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
                            >
                                {T.title.xs}
                            </Typography>

                            {/* DESCRIPTION */}
                            <Typography
                                level="body-md"
                                textColor={chooseThemeValueIn(color.black.dark, color.black.dark, systemMode)}
                                sx={{ mt: 2, whiteSpace: "pre-wrap", fontSize: { xs: "0.9rem", md: "1rem" } }}
                            >
                                {T.description.md}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: "fit-content",
                                height: { xs: "fit-content", sm: "280px", lg: "370px" },
                                textAlign: "center",
                                img: {
                                    width: "fit-content",
                                    height: { xs: "100%", sm: "100%" },
                                    objectFit: "contain",
                                },
                            }}
                        >
                            <Image
                                style={{ transition: "all 0.3s ease-in-out" }}
                                src="/images/home-img.webp"
                                title={T.title.xs}
                                alt="home-img"
                                width={800}
                                height={500}
                                draggable={false}
                            />
                        </Box>
                    </Box>
                    <BottomMenu />
                    <BottomMenuMoblie />
                </Main_Container>
            </Main>
        </Fragment>
    );
}
