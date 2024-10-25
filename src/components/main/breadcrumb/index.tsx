import { Breadcrumbs, Stack, Typography } from "@mui/joy";
import { Fragment, useEffect, useMemo } from "react";

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

export interface BreadcrumbCurrTag {
    text: string;
    url: string;
}

interface SchemaListItem {
    "@type": string;
    position: number;
    item: { "@id": string; name: string };
}

interface Props {
    currentText: BreadcrumbCurrTag;
    parentList?: Array<BreadcrumbParentTag>;
}

export function Breadcrumb({ currentText, parentList }: Props) {
    const { lang } = useGlobalContext();
    return (
        <Fragment>
            <JSONLD__BREADCRUMB currentText={currentText} parentList={parentList} />
            <Breadcrumbs separator="\" aria-label="breadcrumbs" sx={{ px: 0, fontWeight: "md", fontSize: { xs: "xs", sm: "sm" } }}>
                <LinkTo url="/">
                    <Stack direction={"row"} gap={1} sx={{ alignItems: "center", color: color.primary.darkMedium }}>
                        <HomeRounded sx={{ color: "inherit" }} />
                        <Typography>SEE.ME</Typography>
                    </Stack>
                </LinkTo>
                {parentList?.map((item) => (
                    <LinkTo key={item.url} url={item.url} sx={{ color: color.secondary.dark }}>
                        {item.text[lang]}
                    </LinkTo>
                ))}
                <Typography sx={{ color: color.black.dark }}>{currentText.text}</Typography>
            </Breadcrumbs>
        </Fragment>
    );
}

const JSONLD__BREADCRUMB = ({ currentText, parentList = [] }: Props) => {
    const { lang } = useGlobalContext();
    const origin = process.env.NEXT_PUBLIC_HOME_PAGE;

    function cleanUrl(url: string) {
        // Thay thế nhiều dấu "/" liên tiếp bằng một dấu "/"
        // nhưng giữ lại "//" sau "https:" hoặc "http:"
        return url.replace(/([^:]\/)\/+/g, "$1");
    }

    // Build full URL with origin
    const buildFullUrl = (path: string): string => {
        return cleanUrl(`${origin}/${path}`);
    };

    // Create schema item
    const createSchemaItem = (position: number, url: string, name: string | Record<string, string>): SchemaListItem => ({
        "@type": "ListItem",
        position,
        item: {
            "@id": buildFullUrl(url),
            name: typeof name === "string" ? name : name[lang],
        },
    });

    // Memoize the JSON-LD data
    const jsonLd = useMemo(() => {
        const homeItem = createSchemaItem(1, "", "SEE.ME");
        const parentItems = parentList.map((item, index) => createSchemaItem(index + 2, item.url, item.text));
        const currentItem = createSchemaItem(parentItems.length + 2, currentText.url, currentText.text);

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [homeItem, ...parentItems, currentItem],
        };
    }, [parentList, currentText, lang, origin]);

    return (
        <section>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </section>
    );
};
