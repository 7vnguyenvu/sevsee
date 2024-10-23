import { Breadcrumbs, Stack, Typography } from "@mui/joy";

import { HomeRounded } from "@mui/icons-material";
import LinkTo from "@/components/link";
import { color } from "@/components";
import { useGlobalContext } from "@/context/store";

export interface BreadcrumbParentTag {
    text: {
        vi: string;
        en: string;
    };
    url: string;
}

interface Props {
    currentText: string;
    parentList?: Array<BreadcrumbParentTag>;
}

export function Breadcrumb({ currentText, parentList }: Props) {
    const { lang } = useGlobalContext();

    return (
        <Breadcrumbs separator="\" aria-label="breadcrumbs" sx={{ px: 0, fontWeight: "md", fontSize: { xs: "xs", sm: "sm" } }}>
            <LinkTo url="/">
                <Stack direction={"row"} gap={1} sx={{ alignItems: "center", color: color.primary.darkMedium }}>
                    <HomeRounded sx={{ color: "inherit" }} />
                    {/* <Typography>Trang chủ</Typography> */}
                </Stack>
            </LinkTo>
            {parentList?.map((item) => (
                <LinkTo key={item.url} url={item.url} sx={{ color: color.secondary.dark }}>
                    {item.text[lang]}
                </LinkTo>
            ))}
            <Typography sx={{ color: color.black.dark }}>{currentText}</Typography>
        </Breadcrumbs>
    );
}
