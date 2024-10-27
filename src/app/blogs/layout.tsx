import { BlogsVi } from "@/locales";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const T = BlogsVi;

    return {
        title: T.head.title,
        description: T.head.description,
        alternates: {
            canonical: process.env.HOME_CANONICAL + "blogs",
            languages: {
                vi: process.env.HOME_CANONICAL + "blogs",
            },
        },
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
