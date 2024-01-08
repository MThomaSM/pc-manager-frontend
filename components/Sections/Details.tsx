import details from '../../public/images/details.png';
import Image from "next/image";
import {useScrollTo} from "@/hook/ui";


const Details = () => {

    const ref = useScrollTo("about");

  return (
      // from-white via-white to-gray-200
      <div ref={ref} className="flex flex-col justify-center items-center py-16 bg-gradient-to-b from-white via-white to-gray-200">
        <div className="container flex flex-col md:flex-row justify-between items-center px-3 md:px-0">
            <div className="flex-1 flex flex-col gap-4 justify-center items-start">
                <p className="text-blue-500 text-sm font-bold uppercase">About</p>
                <h2 className="text-4xl font-bold">PC Control with ESP32 & Port Forwarding</h2>
                <p className="text-gray-500">Our service is dedicated to providing seamless and efficient control of your computer systems from anywhere in the world. Harnessing the power of the ESP32 microcontroller alongside the Wake-on-LAN (WOL) protocol, and integrating advanced port forwarding capabilities, we&apos;ve crafted a comprehensive solution that allows you to awaken, access, and manage your PCs remotely.</p>
                <p className="text-gray-500"> Port forwarding feature is pivotal for users operating within complex network setups or behind multiple layers of network security. Our approach ensures that you can remotely power up and access your computer with ease and confidence, making remote management more accessible and reliable than ever.</p>
            </div>
            <div className="flex-1 flex justify-end items-center pt-8 md:pt-0">
                <Image src={details} alt="details" width={500} height={500} className="rounded-full" loading={"lazy"}/>
            </div>
        </div>
      </div>
  )
}

export default Details;