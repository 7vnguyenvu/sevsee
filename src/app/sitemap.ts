import type { MetadataRoute } from "next";
import sitemap_tools from "./tools/sitemap";

type ChangeFrequency = "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
    const site = process.env.HOME_CANONICAL;

    return [
        ...URLMap.map((item) => ({
            url: `${site}` + item.url,
            lastModified: new Date(),
            changeFrequency: item.changeFrequency as ChangeFrequency,
            priority: item.priority,
        })),
        ...sitemap_tools(),
    ];
}

const URLMap = [
    {
        url: "",
        changeFrequency: "weekly",
        priority: 1,
    },
    {
        url: "blogs",
        changeFrequency: "daily",
        priority: 1,
    },
    {
        url: "tools",
        changeFrequency: "daily",
        priority: 1,
    },
    {
        url: "entertainments",
        changeFrequency: "daily",
        priority: 1,
    },
    {
        url: "projects",
        changeFrequency: "daily",
        priority: 1,
    },
];
