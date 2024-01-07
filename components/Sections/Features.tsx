import { PiCubeBold } from "react-icons/pi";
import {useScrollTo} from "@/hook/ui";

const Features = () => {

    const ref = useScrollTo("features");


    return (
        <div ref={ref} className="flex flex-col justify-center items-center bg-gray-200">
            <div className="container py-16 flex flex-col justify-center items-center gap-4 px-3 md:px-0">
                <p className="text-blue-500 text-sm font-bold uppercase">Features</p>
                <h2 className="text-4xl font-bold">Powerfull Features for Remote PC Control</h2>
                <p className="text-gray-500">Experience the convenience and flexibility of remotely turning on your PC with the help of ESP32.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center w-full">
                    <div className="col-span-1 bg-white p-8 flex flex-row justify-start items-start h-full rounded-lg group">
                        <div className="w-fit pr-4 pt-2 text-5xl text-blue-500 group-hover:scale-125 transition-transform"><PiCubeBold/></div>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-black font-semibold text-3xl">Remote PC Control</h3>
                            <p className="text-gray-700">Turn on yozur PC remotely from anywhere using the ESP32 module.</p>
                        </div>
                    </div>
                    <div className="col-span-1 bg-white p-8 flex flex-row justify-start items-start h-full rounded-lg group">
                        <div className="w-fit pr-4 pt-2 text-5xl text-blue-500 group-hover:scale-125 transition-transform"><PiCubeBold/></div>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-black font-semibold text-3xl">Easy Setup</h3>
                            <p className="text-gray-700">Simple and straightforward installation process to get your PC ready for remote control.</p>
                        </div>
                    </div>
                    <div className="col-span-1 bg-white p-8 flex flex-row justify-start items-start h-full rounded-lg group">
                        <div className="w-fit pr-4 pt-2 text-5xl text-blue-500 group-hover:scale-125 transition-transform"><PiCubeBold/></div>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-black font-semibold text-3xl">Secure Connection</h3>
                            <p className="text-gray-700">Ensure the safety of your data with encrypted communication between the ESP32 and your PC.</p>
                        </div>
                    </div>
                    <div className="col-span-1 bg-white p-8 flex flex-row justify-start items-start h-full rounded-lg group">
                        <div className="w-fit pr-4 pt-2 text-5xl text-blue-500 group-hover:scale-125 transition-transform"><PiCubeBold/></div>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-black font-semibold text-3xl">Customizable Options</h3>
                            <p className="text-gray-700">Personalize your remote control experience by adjusting settings and preferences to suit your needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Features;