"use client";

import { BOTTOMMENU_HEIGHT, Header, Loading, MARGIN_HEADER, Main, Main_Container } from "@/components";

import { Fragment } from "react";

export default function Page() {
    return (
        <Fragment>
            <Header />
            <Main>
                <Main_Container sx={{ height: `calc(100vh - ${MARGIN_HEADER}px - ${BOTTOMMENU_HEIGHT + 16 * 2}px)` }}>
                    <Loading />
                </Main_Container>
            </Main>
        </Fragment>
    );
}
