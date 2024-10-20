"use client";

import { BOTTOMMENU_HEIGHT, BottomMenu, Header, MARGIN_HEADER, Main, Main_Container, chooseThemeValueIn, color } from "@/components";
import { Box, Typography } from "@mui/joy";
import { Fragment, useLayoutEffect, useState } from "react";
import { HomeEn, HomeVi } from "@/locales";

import { useGlobalContext } from "@/context/store";

export default function Page() {
    const { lang, systemMode, isMobile } = useGlobalContext();
    const T = lang === "en" ? HomeEn.page : HomeVi.page;

    const [windowHeight, setWindowHeight] = useState(0);

    useLayoutEffect(() => {
        function handleResize() {
            setWindowHeight(window.innerHeight);
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial window height

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Fragment>
            <Header />
            <Main>
                <Main_Container sx={{ height: windowHeight - MARGIN_HEADER - (BOTTOMMENU_HEIGHT + 16 * 2) }}>
                    <BottomMenu />
                    <Box
                        sx={{
                            width: "100%",
                            height: "80%",
                            position: "relative",
                            top: "50%",
                            transform: "translateY(-50%)",
                            // bgcolor: color.primary.main,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            overflow: "hidden",
                            img: {
                                width: { xs: "140%", md: "70%" },
                                height: { xs: "100%", md: "70%" },
                                objectFit: "contain",
                            },
                        }}
                    >
                        {/* TITLE - H1 - RESPONSIVE */}
                        <Typography
                            textAlign={"center"}
                            level="h1"
                            fontSize={isMobile ? "1.8rem" : "2.2rem"}
                            textTransform={"capitalize"}
                            textColor={chooseThemeValueIn(color.black.dark, color.black.dark, systemMode)}
                        >
                            {isMobile ? T.title.xs : T.title.md}
                        </Typography>

                        {/* DESCRIPTION - RESPONSIVE */}
                        <Typography
                            textAlign={"center"}
                            level="body-md"
                            textColor={chooseThemeValueIn(color.black.dark, color.black.dark, systemMode)}
                            sx={{ mt: 2, whiteSpace: "pre-wrap" }}
                        >
                            {isMobile ? T.description.xs : T.description.md}
                        </Typography>

                        <img src="/images/home-img.webp" title={T.title.xs} alt="home-img" width={"aotu"} height={"aotu"} draggable={false} />
                    </Box>
                </Main_Container>
            </Main>
        </Fragment>
    );
}
