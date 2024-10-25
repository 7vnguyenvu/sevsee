import * as React from "react";

import {
    Accordion,
    AccordionDetails,
    AccordionGroup,
    AccordionSummary,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ModalClose,
    Stack,
    Tooltip,
    Typography,
} from "@mui/joy";
import { AutoStories, ContactSupport } from "@mui/icons-material";
import { ToolEn, ToolVi } from "@/locales";

import { color } from "@/components";
import { useGlobalContext } from "@/context/store";

export function ImageGeter_HelpDrawer() {
    const { lang, isMobile } = useGlobalContext();
    const T = lang === "en" ? ToolEn.imageGetter : ToolVi.imageGetter;

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
                <ModalClose />
                <Box role="presentation">
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
                                <ContactSupport
                                    sx={{
                                        width: "20%",
                                        height: "100%",
                                    }}
                                />
                                <Stack>
                                    <Typography sx={{ fontWeight: "bold", fontSize: { md: "md", lg: "xl" } }}>{T.page.help}</Typography>
                                    <Typography sx={{ fontSize: { xs: ".7rem", lg: "sm" } }}>{T.page.helpSubtitle}</Typography>
                                </Stack>
                            </Stack>
                        </ListItem>
                    </List>
                    <Divider />
                    {/* <AccordionGroup size={"sm"}>
                        <Accordion>
                            <AccordionSummary>First accordion</AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary>Second accordion</AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary>Third accordion</AccordionSummary>
                            <AccordionDetails>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </AccordionDetails>
                        </Accordion>
                    </AccordionGroup> */}
                </Box>
            </Drawer>
        </Box>
    );
}
