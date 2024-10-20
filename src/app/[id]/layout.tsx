export default function CompLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Record<string, string> }>) {
    console.log(params);

    return children;
}
