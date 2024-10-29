import { BOTTOMMENU_HEIGHT, chooseThemeValueIn, color } from "@/components";
import { Box, Typography, styled } from "@mui/joy";
import { HomeRounded, VisibilityRounded } from "@mui/icons-material";
import { PiBoundingBoxLight, PiGameControllerLight, PiToolboxLight } from "react-icons/pi";

import LinkTo from "@/components/link";
import { RiQuillPenLine } from "react-icons/ri";
import { memo } from "react";
import { useGlobalContext } from "@/context/store";

const iconMap = {
    HomeRounded: <HomeRounded />,
    PiToolboxLight: <PiToolboxLight />,
    RiQuillPenLine: <RiQuillPenLine />,
    PiGameControllerLight: <PiGameControllerLight />,
    PiBoundingBoxLight: <PiBoundingBoxLight />,
    VisibilityRounded: <VisibilityRounded />,
};

const bottomMenuLeft = [
    { _id: "lu1", url: "blogs", name: { en: "Blogs", vi: "Bài viết" }, icon: iconMap["RiQuillPenLine"] },
    { _id: "lu2", url: "tools", name: { en: "Tools", vi: "Dịch vụ" }, icon: iconMap["PiToolboxLight"] },
];
const bottomMenuCenter = { _id: "lu3", url: "", name: { en: "SEE.ME", vi: "SEE.ME" }, icon: iconMap["HomeRounded"] };
const bottomMenuRight = [
    { _id: "lu4", url: "entertainments", name: { en: "Games", vi: "Giải trí" }, icon: iconMap["PiGameControllerLight"] },
    { _id: "lu5", url: "projects", name: { en: "Projects", vi: "Dự án" }, icon: iconMap["PiBoundingBoxLight"] },
];

const BottomMenuMobile = () => {
    const { lang, systemMode } = useGlobalContext();
    const bgColor = chooseThemeValueIn(color.white.cream, color.black.dark, systemMode);
    const iconColor = chooseThemeValueIn(color.black.main, color.white.main, systemMode);

    return (
        <BottomMenuArea sx={{ bgcolor: bgColor, display: { xs: "flex", sm: "none" }, zIndex: 1299 }}>
            <BottomMenuContainer sx={{ px: 1 }}>
                {bottomMenuLeft.map((link) => (
                    <BottomMenuItem key={link._id} sx={{ "*": { color: iconColor } }}>
                        <LinkTo url={link.url} sx={{ textDecoration: "none", width: "100%" }}>
                            <ItemColumnCenter sx={{ gap: 0.2, svg: { fontSize: "1.2rem" } }}>
                                {link.icon}
                                <Typography sx={{ fontSize: "0.7rem" }}>{link.name[lang]}</Typography>
                            </ItemColumnCenter>
                        </LinkTo>
                    </BottomMenuItem>
                ))}
                <BottomMenuItemFeature>
                    <LinkTo url={bottomMenuCenter.url} sx={{ textDecoration: "none", width: "100%" }}>
                        {bottomMenuCenter.icon}
                    </LinkTo>
                </BottomMenuItemFeature>
                {bottomMenuRight.map((link) => (
                    <BottomMenuItem key={link._id} sx={{ "*": { color: iconColor } }}>
                        <LinkTo url={link.url} sx={{ textDecoration: "none", width: "100%" }}>
                            <ItemColumnCenter sx={{ gap: 0.2, svg: { fontSize: "1.2rem" } }}>
                                {link.icon}
                                <Typography sx={{ fontSize: "0.7rem" }}>{link.name[lang]}</Typography>
                            </ItemColumnCenter>
                        </LinkTo>
                    </BottomMenuItem>
                ))}
            </BottomMenuContainer>
        </BottomMenuArea>
    );
};

export default memo(BottomMenuMobile);

const BottomMenuArea = styled(Box)(() => ({
    position: "fixed",
    bottom: "25px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "85%",
    maxWidth: "500px",
    borderRadius: "calc(infinity * 1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    padding: "4px",
}));

const BottomMenuContainer = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: BOTTOMMENU_HEIGHT,
}));

const BottomMenuItem = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "14px",
    padding: "4px 12px",
}));

const ItemColumnCenter = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

const BottomMenuItemFeature = styled(Box)(() => ({
    height: "100%",
    aspectRatio: 1 / 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${color.primary.main}, ${color.primary.dark})`,
    borderRadius: "50%",
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
    padding: "8px",
    "*": {
        display: "flex",
        alignItems: "center",
        padding: "4px",
        justifyContent: "center",
        fontSize: "2rem",
        color: color.white.main,
    },
}));
