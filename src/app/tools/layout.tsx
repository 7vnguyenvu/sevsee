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
    };
}

export default function Root({ children }: { children: React.ReactNode }) {
    return children;
}
