'use client'
import {useEffect, useState} from "react";
import Link from "next/link";
import {BiSolidDownArrow} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {authActions} from "@/store/auth-slice";
import {toast} from "react-toastify";
import {usePathname, useRouter} from "next/navigation";
import {User} from "@/interface/auth";
import {uiActions} from "@/store/ui-slice";
import {useUser} from "@/hook/auth";


const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const uiState = useSelector((state: RootState) => state.ui);

    const { user: loggedInUser, logoutHandler: logout } = useUser();

    const updatePage = (page: string) => {
        if(pathname !== "/"){
            router.push("/");
        }
        dispatch(uiActions.setPage({
            page
        }));
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="fixed w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white z-10">
            <div className="md:hidden flex flex-col">
                <div className="flex justify-between items-center p-3">
                    <Link href="/" className="font-bold text-2xl lg:text-4xl">
                        <span className={"font-bold"}>PCM</span><span className={"font-normal"}>ANAGER</span>
                    </Link>
                    <button onClick={toggleMobileMenu} className="w-6 h-6 text-white focus:outline-none">
                        {
                            !isMobileMenuOpen
                                ? <svg className="transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                : <svg className="transition-transform duration-500 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                        }

                    </button>
                </div>
                <div className={`flex flex-col transition-all ease-in-out duration-500 ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <a className="hover:bg-blue-800 transition-all px-3 py-2 text-lg hover:font-bold font-medium hover:cursor-pointer">About</a>
                    <a className="hover:bg-blue-800 transition-all px-3 py-2 text-lg hover:font-bold font-medium hover:cursor-pointer">Features</a>
                    <a className="hover:bg-blue-800 transition-all px-3 py-2 text-lg hover:font-bold font-medium hover:cursor-pointer">Pricing</a>
                    <a className={`hover:bg-blue-800 transition-all px-3 py-2 text-lg hover:font-bold font-medium hover:cursor-pointer`}>FAQ</a>

                    {loggedInUser ? (
                        <div className={"group relative w-full"}>
                            <Link href="/system/register" className="w-full hover:bg-blue-800 transition-all ease-in-out duration-500 px-3 py-2 text-lg hover:font-bold font-medium hover:cursor-pointer inline-flex items-center">
                                {loggedInUser.firstName} {loggedInUser.lastName} <BiSolidDownArrow className={"ml-1 text-xs"}/>
                            </Link>
                            <div className={"absolute group-hover:flex bg-white shadow-2xl drop-shadow-2xl top-10 left-0 w-max max-w-[150px] text-blue-900 hidden rounded-lg py-1 flex-col justify-start items-start border-2 border-blue-800"}>
                                <a className={"hover:bg-blue-800 hover:text-white w-full px-3 py-1 hover:cursor-pointer font-normal hover:font-semibold"}>Update profile</a>
                                <button className={"hover:bg-blue-800 hover:text-white w-full px-3 py-1 hover:cursor-pointer font-normal hover:font-semibold border-t-2"} onClick={logout}>Log out</button>
                            </div>
                        </div>
                    ): (
                        <div className="flex flex-row items-center">
                            <Link href="/system/login" className="hover:bg-blue-800 text-center px-3 py-2 flex-1 text-lg hover:font-bold font-medium transition-all hover:cursor-pointer">Log in</Link>
                            <Link href="/system/register" className="hover:bg-blue-800 text-center px-3 py-2 flex-1 text-lg hover:font-bold font-medium transition-all hover:cursor-pointer">Register</Link>
                        </div>
                    )}

                </div>
            </div>
            <div className="hidden container mx-auto px-8 py-4 md:flex justify-between items-center bg-white text-black rounded-full my-4">
                <Link href="/" className="font-semibold text-2xl lg:text-4xl text-blue-800">
                    <span className={"font-bold hover:font-normal"}>PCM</span><span className={"font-normal"}>ANAGER</span>
                </Link>
                <div className="flex gap-12">
                    <a onClick={updatePage.bind(this, "about")} className={`hover:text-blue-500 rounded-md hover:font-bold font-medium transition-all hover:cursor-pointer ${uiState.page === "about" && pathname === "/" ? "!text-blue-500 !font-bold" : ""}`}>About</a>
                    <a onClick={updatePage.bind(this, "features")} className={`hover:text-blue-500 rounded-md hover:font-bold font-medium transition-all hover:cursor-pointer ${uiState.page === "features" && pathname === "/" ? "!text-blue-500 !font-bold" : ""}`}>Features</a>
                    <a onClick={updatePage.bind(this, "pricing")} className={`hover:text-blue-500 rounded-md hover:font-bold font-medium transition-all hover:cursor-pointer ${uiState.page === "pricing" && pathname === "/" ? "!text-blue-500 !font-bold" : ""}`}>Pricing</a>
                    <a onClick={updatePage.bind(this, "faq")} className={`hover:text-blue-500 rounded-md hover:font-bold font-medium transition-all hover:cursor-pointer ${uiState.page === "faq" && pathname === "/" ? "!text-blue-500 !font-bold" : ""}`}>FAQ</a>
                </div>
                <div className="flex gap-3">
                    {loggedInUser ? (
                        <>
                            <Link href="/system" className="border-[1px] border-blue-800 hover:bg-blue-800 hover:text-white rounded-full px-3 py-2 text-sm font-normal hover:font-bold transition-all hover:cursor-pointer ">
                                System
                            </Link>
                            <div className={"group relative inline-flex items-center"}>
                                <a className="peer inline-flex items-center border-[1px] border-blue-800 group-hover:bg-blue-800 group-hover:text-white bg-blue-800 text-white rounded-full px-3 py-2 text-sm font-normal hover:font-bold transition-all hover:cursor-pointer">
                                    {loggedInUser.firstName} {loggedInUser.lastName} <BiSolidDownArrow className={"ml-1 text-xs"}/>
                                </a>
                                <div className={"absolute  group-hover:flex bg-white shadow-2xl drop-shadow-2xl top-10 left-0 w-max max-w-[150px] hidden rounded-lg py-1 flex-col justify-start items-start border-2 border-blue-800"}>
                                    <Link className={"hover:bg-blue-800 hover:text-white w-full px-3 py-1 hover:cursor-pointer font-normal hover:font-semibold"} href={"/system/user"}>Update profile</Link>
                                    <button className={"text-left hover:bg-blue-800 hover:text-white w-full px-3 py-1 hover:cursor-pointer font-normal hover:font-semibold border-t-2"} onClick={logout}>Log out</button>
                                </div>
                            </div>

                        </>
                    ) : (
                        <>
                            <Link href="/system/login" className="border-[1px] border-blue-800 hover:bg-blue-800 hover:text-white rounded-full px-3 py-2 text-sm font-normal hover:font-bold transition-all hover:cursor-pointer ">
                                Login
                            </Link>
                            <Link href="/system/register" className="border-[1px] border-blue-800 hover:bg-transparent hover:text-black bg-blue-800 text-white rounded-full px-3 py-2 text-sm font-normal hover:font-bold transition-all hover:cursor-pointer">
                                Sign up
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    )
}

export default Navbar;