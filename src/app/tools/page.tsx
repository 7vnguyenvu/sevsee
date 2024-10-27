"use client";

import { Breadcrumb, BreadcrumbTag, Header, ImageGetter_Tools, Main, Main_Container, TopPage, Waiting_Tools, color } from "@/components";
import { ToolEn, ToolVi } from "@/locales";

import { Divider } from "@mui/joy";
import { FaToolbox } from "react-icons/fa";
import { Fragment } from "react";
import { Grid } from "@mui/material";
import { useGlobalContext } from "@/context/store";

const imageTopURL = {
    light: "see.me-light.svg",
    dark: "see.me-dark.svg",
};

const breadcrumbTag: BreadcrumbTag = {
    current: {
        text: "Dịch vụ",
        page: {
            vi: "Dịch vụ",
            en: "Services",
        },
        url: "tools",
    },
    parents: [],
};

export default function Page() {
    const { lang } = useGlobalContext();
    const T = lang === "en" ? ToolEn : ToolVi;

    return (
        <Fragment>
            <Header />
            <Main>
                <Main_Container>
                    <TopPage
                        bgcolor={color.black.sub}
                        image={imageTopURL}
                        title={T.page.title}
                        description={T.page.description}
                        afterTitle={
                            <Fragment>
                                <FaToolbox />
                            </Fragment>
                        }
                    />
                    {/* BREADCRUMB */}
                    <Breadcrumb current={breadcrumbTag.current} />
                    {/* BODY */}
                    <Grid container spacing={{ xs: 1, md: 1 }} sx={{ flexGrow: 1 }}>
                        {/* Image Geter */}
                        <Grid item xs={6} sm={6} md={3} lg={2}>
                            <ImageGetter_Tools lang={lang} />
                        </Grid>
                        <Grid item xs={6} sm={6} md={3} lg={2}>
                            <Waiting_Tools lang={lang} />
                        </Grid>
                    </Grid>
                    <Divider sx={{ py: 2 }}>{T.page.showEnd}</Divider>
                </Main_Container>
            </Main>
        </Fragment>
    );
}
