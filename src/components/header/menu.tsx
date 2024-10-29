import { Avatar, Box, Divider, List, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import { HomeRounded, NearMe, VisibilityRounded } from "@mui/icons-material";
import { PiBoundingBoxLight, PiGameControllerLight, PiToolboxLight } from "react-icons/pi";
import { chooseThemeValueIn, color } from "..";

import { Fragment } from "react";
import LinkTo from "../link";
import { RiQuillPenLine } from "react-icons/ri";
import { useGlobalContext } from "@/context/store";

const HOME_PAGE = process.env.NEXT_PUBLIC_HOME_PAGE;

const iconMap = {
    HomeRounded: <HomeRounded />,
    PiToolboxLight: <PiToolboxLight />,
    RiQuillPenLine: <RiQuillPenLine />,
    PiGameControllerLight: <PiGameControllerLight />,
    PiBoundingBoxLight: <PiBoundingBoxLight />,
    NearMe: <NearMe />,
    VisibilityRounded: <VisibilityRounded />,
};

const userMenu = [
    { _id: "lu1", url: "/", name: { en: "Home", vi: "Trang chủ" }, icon: iconMap["HomeRounded"] },
    { _id: "lu2", url: "blogs", name: { en: "Blogs & Diaries", vi: "Bài viết & Nhật ký" }, icon: iconMap["RiQuillPenLine"] },
    { _id: "lu3", url: "tools", name: { en: "Tools & Services", vi: "Công cụ & Dịch vụ" }, icon: iconMap["PiToolboxLight"] },
    { _id: "lu5", url: "entertaiments", name: { en: "Entertainment", vi: "Giải trí" }, icon: iconMap["PiGameControllerLight"] },
    { _id: "lu6", url: "projects", name: { en: "Projects & Sketches", vi: "Dự án & Phác thảo" }, icon: iconMap["PiBoundingBoxLight"] },
    { _id: "lu7", url: "check", name: { en: "SEE.Check", vi: "SEE.Check" }, icon: iconMap["VisibilityRounded"] },
];

const systemMenu = [
    { _id: "ls1", url: "explore", name: { en: "Explore", vi: "Khám phá" }, icon: iconMap["NearMe"] },
    { _id: "ls2", url: "check", name: { en: "SEE.Check", vi: "SEE.Check" }, icon: iconMap["VisibilityRounded"] },
];

export function ListMenuLeft() {
    const { lang, systemMode } = useGlobalContext();

    return (
        <Fragment>
            <List>
                <ListItem sx={{}}>
                    <Stack
                        direction={"row"}
                        gap={2}
                        sx={{
                            my: 2,
                            mx: 2,
                            width: `${100}%`,
                            alignItems: "center",
                            justifyContent: "start",
                            ":hover": {
                                cursor: "default",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                img: {
                                    width: "auto",
                                    height: "90%",
                                    objectFit: "contain",
                                    borderRadius: `calc(infinity * 1px)`,
                                },
                            }}
                        >
                            <Avatar size="lg" sx={{ bgcolor: chooseThemeValueIn(color.white.lightSub, color.white.main, systemMode) }}>
                                <img title="7V - NGUYEN VU" alt="user-avatar" src={`${HOME_PAGE}/see.me-light.svg`} />
                            </Avatar>
                        </Box>
                        <Stack>
                            <Typography sx={{ fontWeight: "bold", fontSize: "xl" }}>7V NGUYEN VU</Typography>
                            <Typography sx={{ fontSize: "sm" }}>@7v52nguyenvu</Typography>
                        </Stack>
                    </Stack>
                </ListItem>
            </List>
            <Divider />
            <List>
                {userMenu.map((link) => (
                    <ListItem key={link._id}>
                        <LinkTo url={link.url} sx={{ textDecoration: "none", width: "100%" }}>
                            <ListItemButton sx={{ gap: 2 }}>
                                {link.icon}
                                <Typography>{link.name[lang]}</Typography>
                            </ListItemButton>
                        </LinkTo>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
}

export function ListMenuRight() {
    const { lang } = useGlobalContext();
    return (
        <Fragment>
            <List>
                {systemMenu.map((link) => (
                    <ListItem key={link._id}>
                        <LinkTo url={link.url} sx={{ textDecoration: "none", width: "100%" }}>
                            <ListItemButton>
                                {link.icon}
                                <Typography>{link.name[lang]}</Typography>
                            </ListItemButton>
                        </LinkTo>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
}
