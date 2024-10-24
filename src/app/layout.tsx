import { Box } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { GlobalContextProvider } from "@/context/store";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "[ SEE . ME ] - 7V - NGUYEN VU SERVICES",
        template: "%s -- [ SEE . ME ]",
    },
    description: `SEE.ME - Điểm hẹn của cảm hứng và trải nghiệm, khám phá góc nhìn mới, kết nối với những tâm hồn đồng điệu trên hành trình khám phá bản thân.`,
    alternates: {
        canonical: "./",
        languages: {
            "vi-VN": "./",
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
                <CssVarsProvider defaultMode="system">
                    <GlobalContextProvider>
                        <NextTopLoader color={process.env.TOP_PROGRESS} showSpinner={false} />
                        <Box className={font.className}>{children}</Box>
                    </GlobalContextProvider>
                </CssVarsProvider>
            </body>
        </html>
    );
}
