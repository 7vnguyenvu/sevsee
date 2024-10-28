import { BOTTOMMENU_HEIGHT, chooseThemeValueIn, color } from "@/components";
import { Box, styled } from "@mui/joy";
import {
    CategoryOutlined,
    HistoryEduRounded,
    HomeRepairServiceOutlined,
    HomeRounded,
    SportsEsportsOutlined,
    VisibilityRounded,
} from "@mui/icons-material";
import React, { memo } from "react";

import LinkTo from "@/components/link";
import { useGlobalContext } from "@/context/store";

const iconMap = {
    HomeRounded: <HomeRounded />,
    HomeRepairServiceOutlined: <HomeRepairServiceOutlined />,
    HistoryEduRounded: <HistoryEduRounded />,
    SportsEsportsOutlined: <SportsEsportsOutlined />,
    CategoryOutlined: <CategoryOutlined />,
    VisibilityRounded: <VisibilityRounded />,
};

const bottomMenuLeft = [
    { _id: "lu1", url: "blogs", name: { en: "Blogs & Diaries", vi: "Bài viết & Nhật ký" }, icon: iconMap["HistoryEduRounded"] },
    { _id: "lu2", url: "tools", name: { en: "Tools & Services", vi: "Công cụ & Dịch vụ" }, icon: iconMap["HomeRepairServiceOutlined"] },
];

const bottomMenuCenter = {
    _id: "lu3",
    url: "",
    name: { en: "SEE.ME", vi: "SEE.ME" },
    icon: iconMap["HomeRounded"],
};

const bottomMenuRight = [
    { _id: "lu4", url: "entertainments", name: { en: "Entertainment", vi: "Giải trí" }, icon: iconMap["SportsEsportsOutlined"] },
    { _id: "lu5", url: "projects", name: { en: "Projects & Sketches", vi: "Dự án & Phác thảo" }, icon: iconMap["CategoryOutlined"] },
];

const BottomMenuMobile = () => {
    const { systemMode } = useGlobalContext();
    const bgColor = chooseThemeValueIn(color.white.cream, color.black.dark, systemMode);
    const iconColor = chooseThemeValueIn(color.black.main, color.white.main, systemMode);

    return (
        <BottomMenuArea sx={{ bgcolor: bgColor, display: { xs: "flex", sm: "none" }, zIndex: 1299 }}>
            <BottomMenuContainer>
                {bottomMenuLeft.map((link) => (
                    <BottomMenuItem key={link._id} sx={{ "*": { color: iconColor } }}>
                        <LinkTo url={link.url} sx={{ textDecoration: "none", width: "100%" }}>
                            {link.icon}
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
                            {link.icon}
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
