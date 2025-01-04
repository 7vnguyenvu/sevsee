import { AspectRatio, Box, Button, Card, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import { BarChart, BookmarkAdd, DoneAll, Visibility } from "@mui/icons-material";

import Image from "next/image";
import LinkTo from "@/components/link";
import { color } from "@/components";

const toolUrl = "tools/image-getter";

const text = {
    vi: {
        title: "Image Getter Online",
        sub: "Tải ảnh hàng loạt siêu nhanh",
        view_TooltipTitle: "Xem mô tả",
        image: {
            src: "/images/img-getter-thumbnail.png",
            alt: "img-getter-thumbnail",
        },
        authorLable: "Tác giả",
        author: "Nguyen Vu",
        usedLable: "Lượt dùng",
        button: "Tới luôn",
    },
    en: {
        title: "Image Getter Online",
        sub: "Super fast batch image download",
        view_TooltipTitle: "View description",
        image: {
            src: "/images/img-getter-thumbnail.png",
            alt: "img-getter-thumbnail",
        },
        authorLable: "Author",
        author: "Nguyen Vu",
        usedLable: "Used",
        button: "Go now",
    },
};

export function ImageGetter_Tools({ lang }: { lang: "en" | "vi" }) {
    return (
        <Card
            sx={{
                p: 1,
                gap: 1.5,
            }}
        >
            <div>
                <Typography level="h2" sx={{ fontSize: { xs: "0.9rem", md: "1.2rem" } }}>
                    <LinkTo url={toolUrl} sx={{ color: color.white.main }}>
                        {text[lang].title}
                    </LinkTo>
                </Typography>
                <Typography level="body-sm" sx={{ fontSize: { xs: "0.65rem", md: "1rem" } }}>
                    {text[lang].sub}
                </Typography>
                <Tooltip title={text[lang].view_TooltipTitle} arrow size="sm" placement="bottom-end">
                    <Visibility
                        sx={{
                            position: "absolute",
                            top: "0.5rem",
                            right: "0.5rem",
                            fontSize: { xs: "0.8rem", md: "1.2rem" },
                            ":hover": { cursor: "pointer", color: color.pink_Of_Nhi.main },
                        }}
                    />
                </Tooltip>
            </div>
            <LinkTo url={toolUrl}>
                <AspectRatio minHeight="100px" maxHeight="200px">
                    <Image
                        title={text[lang].title}
                        src={text[lang].image.src}
                        width={630}
                        height={470}
                        loading="eager"
                        alt={text[lang].image.alt}
                        draggable="false"
                    />
                </AspectRatio>
            </LinkTo>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "start", md: "end" },
                        gap: 1,
                    }}
                >
                    <div>
                        <Typography level="body-xs" sx={{ fontSize: { xs: "0.65rem", md: "0.8rem" } }}>
                            {text[lang].authorLable}: {text[lang].author}
                        </Typography>
                        <Stack direction={"row"} gap={0.5} alignItems={"start"} sx={{ mt: 0.4 }}>
                            <BarChart sx={{ fontSize: { xs: "md", md: "xl" } }} />
                            <Typography sx={{ fontSize: { xs: "xs", md: "sm" }, fontWeight: "lg" }}>7M+ {text[lang].usedLable}</Typography>
                        </Stack>
                    </div>
                    <LinkTo url={toolUrl}>
                        <Button
                            variant="solid"
                            size="sm"
                            sx={{
                                width: "fit-content",
                                bgcolor: color.pink_Of_Nhi.main,
                                color: color.black.dark,
                                px: 0.75,
                                fontWeight: 700,

                                "&:hover": {
                                    bgcolor: color.primary.main,
                                    color: color.white.main,
                                },
                            }}
                        >
                            {text[lang].button}
                        </Button>
                    </LinkTo>
                </Box>
            </CardContent>
        </Card>
    );
}
