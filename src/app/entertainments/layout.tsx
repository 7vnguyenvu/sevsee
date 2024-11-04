import { EntertaimentVi } from "@/locales";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const T = EntertaimentVi;

    return {
        title: T.head.title,
        description: T.head.description,
        alternates: {
            canonical: process.env.HOME_CANONICAL + "entertaiments",
            languages: {
                vi: process.env.HOME_CANONICAL + "entertaiments",
            },
        },
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
