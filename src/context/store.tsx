"use client";

import { Dispatch, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useDynamicFavicon, useSystemColorMode } from "@/hooks";

import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";

export type TypeLang = "en" | "vi";

interface PageSave {
    prev: string;
    curr: string;
}

interface ContextProps {
    isMobile: boolean;
    systemMode: "light" | "dark";
    lang: TypeLang;
    setLang: Dispatch<SetStateAction<TypeLang>>;
    pageSave: PageSave;
    setPageSave: Dispatch<SetStateAction<PageSave>>;
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
    handleClickLinkTo: (url: string) => void;
}

const GlobalContext = createContext<ContextProps>({
    isMobile: false,
    systemMode: "dark",
    lang: "vi",
    setLang: (): void => {},
    pageSave: {} as PageSave,
    setPageSave: (): void => {},
    token: null,
    setToken: (): void => {},
    handleClickLinkTo: (): void => {},
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    // let countReRender = 0;
    const pathname = usePathname();
    const systemMode = useSystemColorMode();
    const storedToken = typeof localStorage !== "undefined" ? localStorage.getItem("access-token") : null;
    const [lang, setLang] = useState<"vi" | "en">("vi");
    const [pageSave, setPageSave] = useState<PageSave>(() => {
        if (typeof window !== "undefined") {
            return {
                prev: "",
                curr: pathname || "",
            };
        }
        return {
            prev: "",
            curr: "/",
        };
    });
    const [token, setToken] = useState<string | null>(storedToken);

    const handleClickLinkTo = useCallback(
        (url: string) => {
            if (url.includes("login")) return;

            if (url != pageSave.curr) {
                setPageSave((prevState) => ({ curr: url, prev: prevState.curr }));
            }
        },
        [pageSave]
    );

    const isMobile = useMediaQuery("(max-width:900px)");

    // DÒNG LOG CHECK -> XÓA SAU
    // useEffect(() => {
    //     console.log("[Store] Render lần:", ++countReRender);
    //     console.log("Page-save:", pageSave);
    // }, [pageSave]);

    const context = {
        isMobile,
        systemMode,
        lang,
        setLang,
        pageSave,
        setPageSave,
        token,
        setToken,
        handleClickLinkTo,
    };

    return (
        <GlobalContext.Provider value={context}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    useDynamicFavicon();
    return context;
}
