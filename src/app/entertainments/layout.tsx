import { EntertaimentVi } from "@/locales";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const T = EntertaimentVi;

    return {
        title: T.head.title,
        description: T.head.description,
        alternates: {
            canonical: process.env.HOME_CANONICAL + "entertainments",
            languages: {
                vi: process.env.HOME_CANONICAL + "entertainments",
            },
        },
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
