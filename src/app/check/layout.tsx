import { CheckEn, CheckVi } from "@/locales";

import type { Metadata } from "next";

type Props = {
    params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = params.lang || "en";
    const T = lang === "en" ? CheckEn : CheckVi;

    return {
        title: T.head.title,
        description: T.head.description,
        alternates: {
            canonical: process.env.HOME_CANONICAL + "check",
            languages: {
                vi: process.env.HOME_CANONICAL + "check",
            },
        },
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
