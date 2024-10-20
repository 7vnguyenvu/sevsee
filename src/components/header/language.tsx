import { Box, Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from "@mui/joy";
import { TypeLang, useGlobalContext } from "@/context/store";

import Link from "next/link";
import { color } from "..";

const HOME_PAGE = process.env.NEXT_PUBLIC_HOME_PAGE;

const langs: {
    locale: TypeLang;
    text: string;
    flag: string;
}[] = [
    {
        locale: "en",
        text: "English (UK)",
        flag: "locales/england-flag.jpg",
    },
    {
        locale: "vi",
        text: "Việt Nam",
        flag: "locales/vietnam-flag.jpg",
    },
];

export default function Languages() {
    const { lang, setLang, pageSave } = useGlobalContext();

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: "plain", color: "neutral" } }}
                sx={{ ":hover": { bgcolor: color.transparent } }}
            >
                <Box
                    sx={{
                        mt: 0.75,
                        img: {
                            width: 28,
                            aspectRatio: 3 / 2,
                            borderRadius: "xs",
                        },
                    }}
                >
                    <img
                        title={langs.find((langItem) => langItem.locale === lang)?.text}
                        alt={`Flag - ${langs.find((langItem) => langItem.locale === lang)?.text}`}
                        src={`${HOME_PAGE}/${langs.find((langItem) => langItem.locale === lang)?.flag}`}
                    />
                </Box>
            </MenuButton>
            <Menu
                placement="bottom-end"
                sx={{
                    // minWidth: 300,
                    // maxWidth: 320,
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "inherit",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                    zIndex: 1300,
                }}
            >
                {langs.map((langItem) => (
                    <MenuItem key={langItem.locale} onClick={() => setLang(langItem.locale)}>
                        <Typography textAlign="center">{langItem.text}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Dropdown>
    );
}
