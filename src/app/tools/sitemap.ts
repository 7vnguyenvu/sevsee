import type { MetadataRoute } from "next";

type ChangeFrequency = "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never";

export default function sitemap_tools(): MetadataRoute.Sitemap {
    const site = process.env.HOME_CANONICAL;

    return URLMap.map((item) => ({
        url: `${site}` + `tools/${item.url}`,
        lastModified: new Date(),
        changeFrequency: item.changeFrequency as ChangeFrequency,
        priority: item.priority,
    }));
}

const URLMap = [
    {
        url: "image-getter",
        changeFrequency: "weekly",
        priority: 1,
    },
];
