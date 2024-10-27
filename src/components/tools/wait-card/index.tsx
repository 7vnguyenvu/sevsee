import { AspectRatio, Box, Button, Card, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import { BarChart, BookmarkAdd, DoneAll, Visibility } from "@mui/icons-material";

import Image from "next/image";
import LinkTo from "@/components/link";
import { color } from "@/components";

const text = {
    vi: {
        title: "... ... ...",
        sub: "___ ___ ___ ___ ___ ___",
        view_TooltipTitle: "Xem mô tả",
        image: {
            src: "/images/home-img.webp",
            alt: "img-getter-thumbnail",
        },
        authorLable: "Tác giả",
        author: "... ...",
        usedLable: "Lượt dùng",
        button: "Tới liền!",
    },
    en: {
        title: "... ... ...",
        sub: "___ ___ ___ ___ ___ ___",
        view_TooltipTitle: "View description",
        image: {
            src: "/images/home-img.webp",
            alt: "img-getter-thumbnail",
        },
        authorLable: "Author",
        author: "... ... ...",
        usedLable: "Used",
        button: "Soon!",
    },
};

export function Waiting_Tools({ lang }: { lang: "en" | "vi" }) {
    return (
        <Card
            sx={{
                p: 1,
                gap: 1.5,
            }}
        >
            <div>
                <Typography level="h2" sx={{ fontSize: { xs: "0.9rem", md: "1.2rem" } }}>
                    {text[lang].title}
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
            <AspectRatio minHeight="100px" maxHeight="200px">
                <Image
                    title={text[lang].title}
                    src={text[lang].image.src}
                    width={630}
                    height={470}
                    loading="lazy"
                    alt={text[lang].image.alt}
                    draggable="false"
                />
            </AspectRatio>
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
                            <Typography sx={{ fontSize: { xs: "xs", md: "sm" }, fontWeight: "lg" }}>? {text[lang].usedLable}</Typography>
                        </Stack>
                    </div>
                    <Button
                        disabled
                        variant="solid"
                        size="sm"
                        sx={{
                            width: "fit-content",
                            bgcolor: color.pink_Of_Nhi.main,
                            color: color.black.dark,
                            px: 1,
                        }}
                    >
                        {text[lang].button}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
