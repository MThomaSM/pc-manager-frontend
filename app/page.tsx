"use client"
import Hero from "@/components/Sections/Hero";
import Details from "@/components/Sections/Details";
import Features from "@/components/Sections/Features";
import Pricing from "@/components/Sections/Pricing";
import FAQ from "@/components/Sections/FAQ";
import {toast} from "react-toastify";

export default function Home() {
    const notify = () => toast.error("Wow so easy!");

  return (
      <>
          <Hero subTitle={"ESP32: The power of remote control"} title={"Turn on your PC remotely"}>
              <a onClick={notify} href="#" className="border-2 border-transparent bg-blue-800 text-white hover:bg-blue-500 text-xl font-bold py-2 px-4 rounded-full hover:scale-110 transition-all">
                  Download
              </a>
              <a href="#" className="hover:border-2 text-white hover:bg-blue-500 transition-all text-xl font-bold py-2 px-4 rounded-full">
                  Learn more
              </a>
          </Hero>
        <Details/>
        <Features/>
        <Pricing/>
        <FAQ/>
      </>
  )
}
