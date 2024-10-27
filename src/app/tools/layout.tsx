import type { Metadata } from "next";
import { ToolVi } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
    const T = ToolVi;

    return {
        title: {
            default: T.head.title,
            template: "%s -- [ SEE . ME ]",
        },
        description: T.head.description,
        alternates: {
            canonical: process.env.HOME_CANONICAL + "/tools",
            languages: {
                vi: process.env.HOME_CANONICAL + "/tools",
            },
        },
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
