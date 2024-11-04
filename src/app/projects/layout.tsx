import type { Metadata } from "next";
import { ProjectVi } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
    const T = ProjectVi;

    return {
        title: T.head.title,
        description: T.head.description,
        alternates: {
            canonical: process.env.HOME_CANONICAL + "projects",
            languages: {
                vi: process.env.HOME_CANONICAL + "projects",
            },
        },
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
