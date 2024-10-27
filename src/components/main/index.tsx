import { Box, Theme, styled } from "@mui/joy";
import { MARGIN_HEADER, MD_PADDING, XS_PADDING, color } from "..";

import { SxProps } from "@mui/material";
import { useGlobalContext } from "@/context/store";

export interface BreakpointProps {
    xs?: string;
    md?: string;
}

export interface BreadcrumbItem {
    text: string;
    page: {
        vi: string;
        en: string;
    };
    url: string;
}

export interface BreadcrumbTag {
    current: BreadcrumbItem;
    parents?: Array<BreadcrumbItem>;
}

export interface SchemaListItem {
    "@type": string;
    position: number;
    item: { "@type": string; "@id": string; name: string };
}

export * from "./loading";
export * from "./top-page";
export * from "./breadcrumb";

// Main Area
export const Main = styled(Box)({
    position: "relative",
    top: MARGIN_HEADER,
});

// Main Area > Main Container
export const Main_Container = ({ children, sx }: { children: React.ReactNode; sx?: SxProps<Theme> | undefined }) => {
    const { systemMode } = useGlobalContext();
    return (
        <Box
            sx={{
                bgcolor: color.body[systemMode],
                position: "relative",
                padding: {
                    xs: `0 ${XS_PADDING}px`,
                    md: `0 ${MD_PADDING}px`,
                },
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export const ContainerContentText = styled(Box)({
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    textAlign: "justify",
    "& p": { marginTop: "0.5em" },
    "& img": { height: "auto", objectFit: "contain", borderRadius: "8px", userSelect: "none" },
    "& a": { color: color.primary.main, textDecoration: "none" },
    "& h3 + p": { marginTop: 0 },
});

export const TextAlignLeft = styled(Box)({
    textAlign: "left",
});
