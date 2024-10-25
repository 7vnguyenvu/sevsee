import { Breadcrumbs, Stack, Typography } from "@mui/joy";
import { Fragment, useEffect } from "react";

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

const JSONLD__BREADCRUMB = ({ currentText, parentList }: Props) => {
    const { lang } = useGlobalContext();
    const origin = process.env.NEXT_PUBLIC_HOME_PAGE;

    function cleanUrl(url: string) {
        // Thay thế nhiều dấu "/" liên tiếp bằng một dấu "/"
        // nhưng giữ lại "//" sau "https:" hoặc "http:"
        return url.replace(/([^:]\/)\/+/g, "$1");
    }

    // SCHEMA.ORG - JSON-LD
    const schemaItemList: SchemaListItem[] | undefined = parentList?.map((item, index) => {
        return {
            "@type": "ListItem",
            position: index + 2,
            item: {
                "@id": cleanUrl(origin + item.url),
                name: item.text[lang],
            },
        } as SchemaListItem;
    });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: !!schemaItemList
            ? [
                  {
                      "@type": "ListItem",
                      position: 1,
                      item: {
                          "@id": origin,
                          name: "SEE.ME",
                      },
                  },
                  ...schemaItemList,
                  {
                      "@type": "ListItem",
                      position: schemaItemList.length + 2,
                      item: {
                          "@id": cleanUrl(origin + currentText.url),
                          name: currentText.text,
                      },
                  },
              ]
            : [
                  {
                      "@type": "ListItem",
                      position: 1,
                      item: {
                          "@id": origin,
                          name: "SEE.ME",
                      },
                  },
                  {
                      "@type": "ListItem",
                      position: 2,
                      item: {
                          "@id": cleanUrl(origin + currentText.url),
                          name: currentText.text,
                      },
                  },
              ],
    };

    useEffect(() => {
        console.log(jsonLd);
    }, []);

    return (
        <section>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </section>
    );
};
