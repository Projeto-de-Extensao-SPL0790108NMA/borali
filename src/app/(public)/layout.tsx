import Header from "./components/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex bg-white'>
            <Header />
            {children}
        </div>
    )
}