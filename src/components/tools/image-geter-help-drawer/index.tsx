import * as React from "react";

import { AccordionGroup, Box, Drawer, List, ListItem, ModalClose, Stack, Tooltip, Typography } from "@mui/joy";
import { AutoStories, ContactSupport } from "@mui/icons-material";
import { ImgGetter__DomainErr, ImgGetter__TimeOutErr, ImgGetter__Usage } from "./guide";
import { ToolEn, ToolVi } from "@/locales";
import { chooseThemeValueIn, color } from "@/components";

import { useGlobalContext } from "@/context/store";

export function ImageGeter_HelpDrawer() {
    const { lang, systemMode, isMobile } = useGlobalContext();
    const T = lang === "en" ? ToolEn.imageGetter : ToolVi.imageGetter;

    const headRef = React.useRef<HTMLUListElement>(null);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }

        setOpen(inOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Tooltip
                onClick={toggleDrawer(true)}
                sx={{
                    zIndex: 1,
                    ":hover": {
                        cursor: "pointer",
                    },
                }}
                title={
                    <Stack direction={"row"} alignItems={"center"} gap={1} sx={{ px: 1, py: 0.5, color: color.white.main }}>
                        <AutoStories sx={{ color: "inherit" }} />
                        <Typography level="body-sm" sx={{ color: "inherit" }}>
                            {T.page.help}
                        </Typography>
                    </Stack>
                }
                arrow
                size="sm"
                placement="left"
                open={!isMobile && !open}
            >
                <ContactSupport
                    onClick={toggleDrawer(true)}
                    sx={{
                        color: color.primary.main,
                        fontSize: "1.4rem",
                        padding: "4px",
                        borderRadius: "4px",
                        transition: "all ease-in-out .2s",

                        ":hover": {
                            cursor: "pointer",
                        },
                    }}
                />
            </Tooltip>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor={"left"}>
                <Box
                    role="presentation"
                    sx={{
                        position: "relative",
                        overflow: "overlay",
                        "&::-webkit-scrollbar": {
                            borderRadius: 4,
                            width: 3,
                        },
                        "&::-webkit-scrollbar-thumb": {
                            borderRadius: 4,
                            backgroundColor: color.white.main,
                        },
                        "&::-webkit-scrollbar-track": {
                            borderRadius: 4,
                            backgroundColor: color.white.sub,
                        },
                    }}
                >
                    <List
                        ref={headRef}
                        sx={{
                            position: "sticky",
                            top: 0,
                            zIndex: 2,
                            bgcolor: chooseThemeValueIn(color.white.main, "#0c0d0f", systemMode),
                            borderBottom: `thin ${color.tooltip.dark} solid`,
                        }}
                    >
                        <ModalClose />
                        <ListItem>
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
                                <ContactSupport
                                    sx={{
                                        width: "20%",
                                        height: "100%",
                                    }}
                                />
                                <Stack>
                                    <Typography sx={{ fontWeight: "bold", fontSize: { xs: "md", lg: "xl" } }}>{T.page.help}</Typography>
                                    <Typography sx={{ fontSize: { xs: ".65rem", lg: "sm" } }}>{T.page.helpSubtitle}</Typography>
                                </Stack>
                            </Stack>
                        </ListItem>
                    </List>
                    <AccordionGroup
                        size={"sm"}
                        sx={{
                            position: "relative",
                            h2: { px: 1, py: 1.4, fontSize: "1rem" },
                            h3: { py: 1.4, fontSize: "1rem", color: color.secondary.main },
                            ".MuiAccordionSummary-root": {
                                position: "sticky",
                                top: headRef.current?.offsetHeight,
                                zIndex: 1,
                                bgcolor: chooseThemeValueIn(color.white.main, "#0c0d0f", systemMode),
                            },
                        }}
                    >
                        <ImgGetter__Usage />
                        {/* <ImgGetter__TimeOutErr />
                        <ImgGetter__DomainErr /> */}
                    </AccordionGroup>
                </Box>
            </Drawer>
        </Box>
    );
}
