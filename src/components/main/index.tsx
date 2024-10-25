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
