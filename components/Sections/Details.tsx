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
                <h2 className="text-4xl font-bold">Unlock the power of ESP32</h2>
                <p className="text-gray-500">With our website, you can easily set up and cofingure your ESP32 to remotely turn on your PC, say goodbye to manually pressing the power button!</p>
            </div>
            <div className="flex-1 flex justify-end items-center pt-8 md:pt-0">
                <Image src={details} alt="details" width={500} height={500} className="rounded-full" loading={"lazy"}/>
            </div>
        </div>
      </div>
  )
}

export default Details;