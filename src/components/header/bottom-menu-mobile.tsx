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

interface Props {
    display?: { xs: string; sm: string };
    direction?: "row" | "column"; // Thêm prop direction
}

const BottomMenuMobile = ({ display, direction = "row" }: Props) => {
    // Đặt default là "column"
    const { lang, systemMode } = useGlobalContext();
    const bgColor = chooseThemeValueIn(color.white.cream, color.black.dark, systemMode);
    const iconColor = chooseThemeValueIn(color.black.main, color.white.main, systemMode);

    return (
        <BottomMenuArea
            sx={{
                bgcolor: bgColor,
                display: display || { xs: "flex", sm: "none" },
                zIndex: 1299,
                width: direction === "column" ? "60px" : "85%", // Điều chỉnh width cho cột
                height: direction === "column" ? "350px" : BOTTOMMENU_HEIGHT, // Điều chỉnh height cho cột
                bottom: direction === "column" ? ".75rem" : "25px", // Đưa về bên phải nếu là cột
                right: direction === "column" ? ".75rem" : "auto", // Đưa về bên phải nếu là cột
                left: direction === "column" ? "auto" : "50%",
                transform: direction === "column" ? "none" : "translateX(-50%)",
                py: direction === "column" ? 2 : 0,
            }}
        >
            <BottomMenuContainer
                sx={{
                    px: direction === "column" ? 0 : 1,
                    flexDirection: direction,
                    gap: direction === "column" ? 1 : 0,
                }}
            >
                {bottomMenuLeft.map((link) => (
                    <BottomMenuItem key={link._id} sx={{ "*": { color: iconColor } }}>
                        <LinkTo url={link.url} sx={{ textDecoration: "none", width: "100%" }}>
                            <ItemColumnCenter direction={direction} sx={{ gap: 0.2, svg: { fontSize: "1.2rem" } }}>
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
                            <ItemColumnCenter direction={direction} sx={{ gap: 0.2, svg: { fontSize: "1.2rem" } }}>
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

// Styles
const BottomMenuArea = styled(Box)(() => ({
    position: "fixed",
    alignItems: "center",
    borderRadius: "calc(infinity * 1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    padding: "4px",
}));

const BottomMenuContainer = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
}));

const BottomMenuItem = styled(Box)(({ theme }) => ({
    flex: 0.9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    padding: "4px 0px",
}));

const ItemColumnCenter = styled(Box, {
    shouldForwardProp: (prop) => prop !== "direction",
})<{ direction?: "row" | "column" }>(({ direction }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: direction === "column" ? "0.4rem" : "0.2rem",
}));

const BottomMenuItemFeature = styled(Box)(() => ({
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
