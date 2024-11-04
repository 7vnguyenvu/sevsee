"use client";

import { CheckEn, CheckVi } from "@/locales";
import { Header, Main, Main_Container } from "@/components";

import React from "react";
import { useGlobalContext } from "@/context/store";
import { useSystemColorMode } from "@/hooks";

const BottomMenuMoblie = React.lazy(() => import("@/components/header/bottom-menu-mobile"));
// import { useEffect, useState } from "react";

// import { useColorScheme } from "@mui/joy/styles";

export default function Home() {
    const { lang } = useGlobalContext();
    const T = lang === "en" ? CheckEn : CheckVi;
    // const { mode } = useColorScheme();
    const systemMode = useSystemColorMode();

    const currTheme = {
        dark: {
            vi: "Tối",
            en: "Dark",
        },
        light: {
            vi: "Sáng",
            en: "Light",
        },
    };
    const currLanguages = {
        vi: "Việt Nam",
        en: "English",
    };

    // /* Handle Hydration */ {
    //     const [mounted, setMounted] = useState(false);

    //     useEffect(() => {
    //         setMounted(true);
    //     }, []);

    //     if (!mounted) {
    //         return null;
    //     }
    // }

    return (
        <div>
            <Header />
            <Main>
                <Main_Container>
                    {/* <h1>Chế độ hiện tại [mode]: {mode}</h1> */}
                    <h1>
                        {T.page.systemMode}: {currTheme[systemMode][lang]}
                    </h1>
                    <hr style={{ borderTop: "1px dashed #ccc" }} />
                    <h2 style={{ fontSize: "1rem", fontWeight: "normal", color: "#777", margin: 0 }}>
                        {T.page.languageSelected}: {currLanguages[lang]}
                    </h2>

                    <BottomMenuMoblie />
                </Main_Container>
            </Main>
        </div>
    );
}
