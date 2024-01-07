import {useScrollTo} from "@/hook/ui";

const FAQ = () => {
    const ref = useScrollTo("faq");
    return (
        <div ref={ref} className="flex flex-col justify-center items-center bg-gray-200">
            <div className="container py-16 flex flex-col md:flex-row justify-start items-start gap-4 px-3 md:px-0">
                <div className="w-full md:w-1/3 flex flex-col justify-start items-start space-y-6">
                    <p className="text-blue-500 text-sm font-bold uppercase">FAQ</p>
                    <h2 className="text-4xl font-bold">Common questions</h2>
                    <p className="text-gray-500">Here are some of the most common questions that we get.</p>
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-start items-start space-y-8">
                    <div className="flex flex-col justify-start items-start space-y-2">
                         <p className="font-bold">What is ESP32?</p>
                         <p className="text-gray-500">ESP32 is a low-cost, low-powered system on a chip (SoC) microcontroller that provides Wi-Fi and Bluetooth capabilities.</p>
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="font-bold">How does the remote PC turning work with ESP32?</p>
                        <p className="text-gray-500">It uses feature build in every motherboard that is called Wake On Lan witch enable any device from same wifi network to turn on pc on that network.</p>
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="font-bold">Do i need any additional harware to use ESP32 for remote PC turning on?</p>
                        <p className="text-gray-500">No you dont, you just have to have PC and ESP32 on same wifi network and on pc in bios enabled feature called Wake On Lan.</p>
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="font-bold">Can i turn off my PC remotely using ESP32?</p>
                        <p className="text-gray-500">No, the current functionality only allows for turning on PC remotely but we are working on adding turnin off too.</p>
                    </div>
                    <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="font-bold">Is it safe to use ESP32 for remote PC turning on?</p>
                        <p className="text-gray-500">Yes, as long as you follow proper security measures such as using strong passwords and securing your network.</p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default FAQ;