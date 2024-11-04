"use client";

import { BlogsEn, BlogsVi } from "@/locales";
import { Box, Typography } from "@mui/joy";
import { Breadcrumb, BreadcrumbTag, Header, Main, Main_Container, TopPage, color } from "@/components";

import { FaPenNib } from "react-icons/fa";
import { Fragment } from "react";
import React from "react";
import { useGlobalContext } from "@/context/store";

const BottomMenuMoblie = React.lazy(() => import("@/components/header/bottom-menu-mobile"));

const imageTopURL = {
    light: "see.me-light.svg",
    dark: "see.me-dark.svg",
};

const breadcrumbTag: BreadcrumbTag = {
    current: {
        text: "Bài viết",
        page: {
            vi: "Bài viết",
            en: "Blogs",
        },
        url: "blogs",
    },
    parents: [],
};

export default function Page() {
    const { lang } = useGlobalContext();
    const T = lang === "en" ? BlogsEn : BlogsVi;

    return (
        <Fragment>
            <Header />
            <Main>
                <Main_Container>
                    <TopPage
                        image={imageTopURL}
                        title={T.page.title}
                        description={T.page.description}
                        afterTitle={
                            <Fragment>
                                ..
                                <FaPenNib />
                            </Fragment>
                        }
                    />
                    {/* BREADCRUMB */}
                    <Breadcrumb current={breadcrumbTag.current} />
                    {/* BODY */}
                    <Box sx={{ textAlign: "center" }}>
                        <Typography level="h2" sx={{ color: color.black.dark, fontSize: "1.4rem" }}>
                            {lang === "vi" ? "Chưa có bài viết nào ở đây ^^!" : "There are no posts here yet ^^!"}
                        </Typography>
                    </Box>

                    <BottomMenuMoblie />
                </Main_Container>
            </Main>
        </Fragment>
    );
}
