"use client"
import Hero from "@/components/Sections/Hero";
import Details from "@/components/Sections/Details";
import Features from "@/components/Sections/Features";
import Pricing from "@/components/Sections/Pricing";
import FAQ from "@/components/Sections/FAQ";
import {toast} from "react-toastify";
import Link from "next/link";

export default function Home() {
    const downloadHandle = () => {
        toast.info(<>
            Thanks for your interest! You can <Link href={"https://github.com/MThomaSM/pc-manager-frontend"} className={"font-bold text-blue-500"} target={"_blank"}>download frontend here</Link> and <Link href={"https://github.com/MThomaSM/pc-manager-backend"} className={"font-bold text-blue-500"} target={"_blank"}>backend here</Link> both from github
        </>, {
            toastId: "download",
            position: "bottom-center",
            hideProgressBar: true,
            autoClose: false,
            closeOnClick: false,
            theme: "light"
        });
    }

  return (
      <>
          <Hero subTitle={"PC Control with ESP32 & Port Forwarding"} title={"Remote PC controll"}>
              <button onClick={downloadHandle} className="border-2 border-transparent bg-blue-800 text-white hover:bg-blue-500 text-xl font-bold py-2 px-4 rounded-full hover:scale-110 transition-all">
                  Source code on GitHub
              </button>
          </Hero>
        <Details/>
        <Features/>
        <Pricing/>
        <FAQ/>
      </>
  )
}
