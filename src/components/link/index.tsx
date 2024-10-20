import Link from "next/link";
import React from "react";
import { useGlobalContext } from "@/context/store";

interface Props {
    url: string;
    children: React.ReactNode;
    sx?: any;
}

const LinkTo = ({ url, sx, children, ...props }: Props) => {
    const { handleClickLinkTo } = useGlobalContext();

    return (
        <Link onClick={() => handleClickLinkTo(url)} href={`/${url}`} style={{ textDecoration: "none", ...sx }} {...props}>
            {children}
        </Link>
    );
};

export default LinkTo;
