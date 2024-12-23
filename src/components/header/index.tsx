import { Avatar, Box, Drawer, ModalClose, Stack } from "@mui/joy";
import { HEADER_HEIGHT, MD_PADDING, chooseThemeValueIn, color } from "..";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Menu as MenuIcon } from "@mui/icons-material";

import Image from "next/image";
import Languages from "./language";
import LinkTo from "../link";
import { ListMenuLeft } from "./menu";
import NotiFy from "./notify";
import Typewriter from "typewriter-effect";
import { useGlobalContext } from "@/context/store";
import { useState } from "react";

export * from "./bottom-menu";
export * from "./bottom-menu-mobile";

type AnchorMenuPos = "left" | "right";

const HOME_PAGE = process.env.NEXT_PUBLIC_HOME_PAGE;

export function Header() {
    const { systemMode, isTablet } = useGlobalContext();

    const [openMenuState, setopenMenuState] = useState<Record<string, boolean>>({
        left: false,
        right: false,
    });

    const toggleDrawer = (anchor: AnchorMenuPos, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }

        setopenMenuState({ ...openMenuState, [anchor]: open });
    };

    const getMenu = (ItemList: React.ComponentType) => (
        <Box role="presentation">
            <ItemList />
        </Box>
    );

    return (
        <Stack
            direction={"row"}
            sx={{
                bgcolor: chooseThemeValueIn(color.header.light, color.header.dark, systemMode),
                boxShadow: chooseThemeValueIn(`0 2px 8px ${color.white.lightSub}`, "none", systemMode),
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1299, // < Modal Drawer z-index: 1300
                height: `${HEADER_HEIGHT}px`,
                pb: 1,
                px: { xs: `${MD_PADDING}px` },
                alignItems: "center",
            }}
        >
            {/* USER */}
            <Stack
                direction={"row"}
                gap={2}
                sx={{
                    mt: 1,
                    display: { xs: "none", md: "flex" },
                    width: { xs: 0, md: `${100 / 3}%` },
                    alignItems: "center",
                    justifyContent: "start",
                }}
            >
                <Box
                    sx={{
                        ":hover": { cursor: "pointer" },
                        img: {
                            width: "auto",
                            height: "90%",
                            objectFit: "contain",
                            borderRadius: `calc(infinity * 1px)`,
                        },
                    }}
                    onClick={toggleDrawer("left", true)}
                >
                    <Avatar size="sm" sx={{ bgcolor: chooseThemeValueIn(color.white.lightSub, color.white.main, systemMode) }}>
                        <Image
                            title="7V - NGUYEN VU"
                            alt="user-avatar"
                            src={`${HOME_PAGE}/see.me-light.svg`}
                            width={100}
                            height={150}
                            loading="eager"
                        />
                    </Avatar>
                </Box>
                <Box
                    sx={{
                        display: { sm: "none", md: "block" },
                        color: chooseThemeValueIn(color.black.dark, color.white.main, systemMode),
                        fontWeight: "bold",
                        userSelect: "none",
                    }}
                >
                    <Typewriter
                        options={{
                            strings: ["7V - NGUYEN VU", "SEE . ME"],
                            autoStart: true,
                            loop: true,
                            cursor: " 🍀",
                        }}
                    />
                </Box>
            </Stack>

            {/* LOGO NAME */}
            <Stack
                direction={"row"}
                gap={2}
                sx={{
                    width: { xs: `${100 / 2}%`, md: `${100 / 3}%` },
                    alignItems: "center",
                    justifyContent: { sm: "start", md: "center" },
                }}
            >
                <KeyboardDoubleArrowRight sx={{ mt: 1, display: { xs: "none", sm: "inline-block" } }} />
                <LinkTo url="/">
                    <Box sx={{ height: `${(2 / 3) * HEADER_HEIGHT}px`, img: { width: "auto", height: "100%" } }}>
                        <img
                            src={chooseThemeValueIn(`${HOME_PAGE}/see.me-text-light.svg`, `${HOME_PAGE}/see.me-text-dark.svg`, systemMode)}
                            title="SEE . ME"
                            alt="see.me-text-logo.svg"
                            width={"100%"}
                            height={"100%"}
                        />
                    </Box>
                </LinkTo>
                <KeyboardDoubleArrowLeft sx={{ mt: 1 }} />
            </Stack>

            {/* FEATURE */}
            <Stack
                direction={"row"}
                gap={3}
                sx={{
                    mt: 1,
                    width: { xs: `${100 / 2}%`, md: `${100 / 3}%` },
                    alignItems: "center",
                    justifyContent: "end",
                    height: `${(2 / 3) * HEADER_HEIGHT}px`,
                }}
            >
                <NotiFy />
                <Languages />

                {/* USER - Responsive */}
                <Stack
                    direction={"row"}
                    gap={2}
                    sx={{
                        display: { sm: "flex", md: "none" },
                        width: `auto`,
                        alignItems: "center",
                        justifyContent: "start",
                        ":hover": { cursor: "pointer" },
                    }}
                    onClick={toggleDrawer("left", true)}
                >
                    <Box
                        sx={{
                            img: {
                                width: "90%",
                                height: "90%",
                                objectFit: "contain",
                                borderRadius: `calc(infinity * 1px)`,
                            },
                        }}
                    >
                        <Avatar size="sm" sx={{ bgcolor: chooseThemeValueIn(color.white.lightSub, color.white.main, systemMode) }}>
                            <Image
                                title="7V - NGUYEN VU"
                                alt="user-avatar"
                                src={`${HOME_PAGE}/see.me-light.svg`}
                                width={100}
                                height={150}
                                loading="eager"
                            />
                        </Avatar>
                    </Box>
                </Stack>

                {/* Menu button */}
                <Box
                    sx={{
                        mt: 0.75,
                        display: { xs: "none", sm: "block" },
                        ":hover": { cursor: "pointer" },
                    }}
                    onClick={toggleDrawer("right", true)}
                >
                    <MenuIcon sx={{ fontSize: "32px" }} />
                </Box>
            </Stack>

            {/* Menu side */}
            <Drawer key={"left"} anchor={"left"} open={openMenuState["left"]} onClose={toggleDrawer("left", false)}>
                <ModalClose size="sm" onClick={toggleDrawer("left", false)} sx={{ ":hover": { bgcolor: color.transparent } }} />
                {getMenu(ListMenuLeft)}
            </Drawer>
            <Drawer key={"right"} anchor={"right"} open={openMenuState["right"]} onClose={toggleDrawer("right", false)}>
                <ModalClose size="sm" onClick={toggleDrawer("right", false)} sx={{ ":hover": { bgcolor: color.transparent } }} />
                {getMenu(ListMenuLeft)}
            </Drawer>
        </Stack>
    );
}
