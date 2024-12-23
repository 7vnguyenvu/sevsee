import { Box, Typography, styled } from "@mui/joy";
import { chooseThemeValueIn, color } from "..";

import LinkTo from "@/components/link";
import { memo } from "react";
import { useGlobalContext } from "@/context/store";

export type PageLink = {
    child: Array<PageLink>;
    hiden: boolean;
    page: string;
    pos: number;
    text: {
        en: string;
        vi: string;
    };
};

const bottomMenu: PageLink[] = [
    {
        child: [],
        hiden: false,
        page: "blogs",
        pos: 1,
        text: {
            en: "Blogs",
            vi: "Bài viết",
        },
    },
    {
        child: [],
        hiden: false,
        page: "tools",
        pos: 2,
        text: {
            en: "Tools",
            vi: "Dịch vụ",
        },
    },
    {
        child: [],
        hiden: false,
        page: "/",
        pos: 3,
        text: {
            en: "SEE . ME",
            vi: "SEE . ME",
        },
    },
    {
        child: [],
        hiden: false,
        page: "entertainments",
        pos: 4,
        text: {
            en: "Entertainment",
            vi: "Giải trí",
        },
    },
    {
        child: [],
        hiden: false,
        page: "projects",
        pos: 5,
        text: {
            en: "Projects",
            vi: "Dự án",
        },
    },
];

function BottomMenu() {
    const { lang, systemMode } = useGlobalContext();

    return (
        <BottomMenuWrapper sx={{ display: { xs: "none", sm: "flex" }, zIndex: 1299 }}>
            <BottomMenuContainer>
                {bottomMenu.map((item: PageLink, index: number) => (
                    <LinkTo key={index} url={item.page}>
                        <Typography
                            level="h2"
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                userSelect: "none",
                                color:
                                    item.pos === 3
                                        ? chooseThemeValueIn(color.white.main, color.white.main, systemMode)
                                        : chooseThemeValueIn(color.black.dark, color.black.dark, systemMode),
                            }}
                        >
                            {item.text[lang]}
                        </Typography>
                    </LinkTo>
                ))}
            </BottomMenuContainer>
        </BottomMenuWrapper>
    );
}

export default memo(BottomMenu);

export const BOTTOMMENU_HEIGHT = 50;
const BOTTOMMENU_PSEUDO_CLASS_WIDTH = 15;

const BottomMenuWrapper = styled(Box)(() => ({
    height: BOTTOMMENU_HEIGHT,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 16,
}));

const BottomMenuContainer = styled(Box)(() => {
    const gap = 30;
    return {
        flexGrow: 1,
        height: "inherit",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: gap,
        "& > *": {
            width: `calc(20% - ${gap * 2}px)`, // gap * 2 => Khoảng cách 2 bên -> mỗi bên 1 gap
            height: "inherit",
            background: color.white.lightSub,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            fontWeight: 700,
            "&:hover": {
                background: color.pink.light,

                "&::before": {
                    borderTopColor: color.pink.light,
                },
                "&::after": {
                    borderTopColor: color.pink.light,
                },
            },
        },
        "& > *::before": {
            content: "''",
            borderTop: `${BOTTOMMENU_HEIGHT}px solid ${color.white.lightSub}`,
            borderLeft: `${BOTTOMMENU_PSEUDO_CLASS_WIDTH}px solid transparent`,
            position: "absolute",
            right: "100%",
        },
        "& > *::after": {
            content: "''",
            borderTop: `${BOTTOMMENU_HEIGHT}px solid ${color.white.lightSub}`,
            borderRight: `${BOTTOMMENU_PSEUDO_CLASS_WIDTH}px solid transparent`,
            position: "absolute",
            left: "100%",
        },
        "& > *:nth-of-type(-n+2)": {
            "&:hover": {
                background: color.pink.light,

                "&::before": {
                    borderTopColor: color.pink.light,
                },
                "&::after": {
                    borderBottomColor: color.pink.light,
                },
            },
            "&::after": {
                borderTop: "none",
                borderBottom: `${BOTTOMMENU_HEIGHT}px solid ${color.white.lightSub}`,
                borderRight: `${BOTTOMMENU_PSEUDO_CLASS_WIDTH}px solid transparent`,
            },
        },
        "& > *:nth-last-of-type(-n+2)": {
            "&:hover": {
                background: color.pink.light,

                "&::before": {
                    borderBottomColor: color.pink.light,
                },
            },
            "&::before": {
                borderTop: "none",
                borderBottom: `${BOTTOMMENU_HEIGHT}px solid ${color.white.lightSub}`,
                borderLeft: `${BOTTOMMENU_PSEUDO_CLASS_WIDTH}px solid transparent`,
            },
        },
        "& > :nth-of-type(3)": {
            background: color.primary.darkMedium,
            // color: color.primary.contrastText,
            "&::after, &::before": {
                borderTop: `${BOTTOMMENU_HEIGHT}px solid ${color.primary.darkMedium}`,
            },
            "&:hover": {
                background: color.primary.dark,

                "&::after, &::before": {
                    borderTopColor: color.primary.dark,
                },
            },
        },
    };
});
