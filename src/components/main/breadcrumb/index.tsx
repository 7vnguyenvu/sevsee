import { BreadcrumbTag, SchemaListItem, color } from "@/components";
import { Breadcrumbs, Stack, Typography } from "@mui/joy";
import { Fragment, useMemo } from "react";

import { HomeRounded } from "@mui/icons-material";
import LinkTo from "@/components/link";
import { useGlobalContext } from "@/context/store";

export function Breadcrumb({ current, parents }: BreadcrumbTag) {
    const { lang } = useGlobalContext();
    return (
        <Fragment>
            <JSONLD__BREADCRUMB current={current} parents={parents} />
            <Breadcrumbs separator="\" aria-label="breadcrumbs" sx={{ px: 0, fontWeight: "md", fontSize: { xs: "xs", sm: "sm" } }}>
                <LinkTo url="/">
                    <Stack direction={"row"} gap={1} sx={{ alignItems: "center", color: color.primary.darkMedium }}>
                        <HomeRounded sx={{ color: "inherit" }} />
                        <Typography>SEE.ME</Typography>
                    </Stack>
                </LinkTo>
                {parents?.map((item) => (
                    <LinkTo key={item.url} url={item.url} sx={{ color: color.secondary.dark }}>
                        {item.page[lang]}
                    </LinkTo>
                ))}
                <Typography sx={{ color: color.black.dark }}>{current.page[lang]}</Typography>
            </Breadcrumbs>
        </Fragment>
    );
}

const JSONLD__BREADCRUMB = ({ current, parents = [] }: BreadcrumbTag) => {
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
    const createSchemaItem = (position: number, url: string, name: string): SchemaListItem => ({
        "@type": "ListItem",
        position,
        item: {
            "@type": "Thing",
            "@id": buildFullUrl(url),
            name: name,
        },
    });

    // Memoize the JSON-LD data
    const jsonLd = useMemo(() => {
        const homeItem = createSchemaItem(1, "", "SEE.ME");
        const parentItems = parents.map((item, index) => createSchemaItem(index + 2, item.url, item.text));
        const currentItem = createSchemaItem(parentItems.length + 2, current.url, current.text);

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [homeItem, ...parentItems, currentItem],
        };
    }, [parents, current, origin]);

    return (
        <section>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </section>
    );
};
