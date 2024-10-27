import type { Metadata } from "next";
import { ToolVi } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
    const T = ToolVi.imageGetter;

    return {
        title: T.head.title,
        description: T.head.description,
        alternates: {
            canonical: process.env.HOME_CANONICAL + "tools/image-getter",
            languages: {
                vi: process.env.HOME_CANONICAL + "tools/image-getter",
            },
        },
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
