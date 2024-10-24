import { AspectRatio, Button, Card, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import { BarChart, BookmarkAdd, DoneAll, Visibility } from "@mui/icons-material";

import LinkTo from "@/components/link";
import { color } from "@/components";

const text = {
    vi: {
        title: "Image Getter Online",
        sub: "Tải ảnh hàng loạt siêu nhanh",
        view_TooltipTitle: "Xem mô tả",
        image: {
            src: "/images/img-getter-thumbnail.png",
            srcSet: "/images/img-getter-thumbnail.png 2x",
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
            srcSet: "/images/img-getter-thumbnail.png 2x",
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
        <Card>
            <div>
                <Typography level="h2" sx={{ fontSize: "1.2rem" }}>
                    {text[lang].title}
                </Typography>
                <Typography level="body-sm">{text[lang].sub}</Typography>
                <Tooltip title={text[lang].view_TooltipTitle} arrow size="sm" placement="bottom-end">
                    <IconButton variant="plain" color="neutral" size="sm" sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}>
                        <Visibility />
                    </IconButton>
                </Tooltip>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                    title={text[lang].title}
                    src={text[lang].image.src}
                    srcSet={text[lang].image.srcSet}
                    loading="lazy"
                    alt={text[lang].image.alt}
                    draggable="false"
                />
            </AspectRatio>
            <CardContent orientation="horizontal" sx={{ justifyContent: "space-between", alignItems: "end" }}>
                <div>
                    <Typography level="body-xs">
                        {text[lang].authorLable}: {text[lang].author}
                    </Typography>
                    <Stack direction={"row"} gap={0.5} alignItems={"center"} sx={{ mt: 0.4 }}>
                        <BarChart />
                        <Typography sx={{ fontSize: "sm", fontWeight: "lg" }}>7M+ {text[lang].usedLable}</Typography>
                    </Stack>
                </div>
                <LinkTo url="tools/image-getter" sx={{ fontWeight: 600 }}>
                    <Button variant="solid" size="md" sx={{ bgcolor: color.pink_Of_Nhi.main, color: color.black.dark }}>
                        {text[lang].button}
                    </Button>
                </LinkTo>
            </CardContent>
        </Card>
    );
}
