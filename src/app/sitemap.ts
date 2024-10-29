import type { MetadataRoute } from "next";

type ChangeFrequency = "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
    const site = process.env.HOME_CANONICAL;

    return URLMap.map((item) => ({
        url: `${site}` + item.url,
        lastModified: new Date(),
        changeFrequency: item.changeFrequency as ChangeFrequency,
        priority: item.priority,
    }));
}

const URLMap = [
    {
        url: "",
        changeFrequency: "weekly",
        priority: 1,
    },
    {
        url: "blogs",
        changeFrequency: "weekly",
        priority: 1,
    },
    {
        url: "tools",
        changeFrequency: "weekly",
        priority: 1,
    },
];
