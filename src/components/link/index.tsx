import Link from "next/link";
import React from "react";
import { useGlobalContext } from "@/context/store";

interface Props {
    url: string;
    children: React.ReactNode;
    sx?: React.CSSProperties;
}

const LinkTo = ({ url, sx, children }: Props) => {
    const { handleClickLinkTo } = useGlobalContext();

    return (
        <Link onClick={() => handleClickLinkTo(url)} href={`/${url}`} style={{ textDecoration: "none", ...sx }}>
            {children}
        </Link>
    );
};

export default LinkTo;
