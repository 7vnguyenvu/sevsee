"use client";

import { useParams } from "next/navigation";

export default function Comp() {
    const param = useParams();

    return <h1>{param["any-for-404"]}</h1>;
}
