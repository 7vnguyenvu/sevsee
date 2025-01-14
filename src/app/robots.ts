import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/_next/static/chunks/*", "/_next/static/css/*", "/check"],
        },
        sitemap: `${process.env.HOME_CANONICAL}sitemap.xml`,
    };
}
