import {ReactNode} from "react";

export default function MainLayout({children}: {children: ReactNode}){
    return <>
        <header>WOL</header>
        <main>{children}</main>
        <footer>This is footer nigger</footer>
    </>
}