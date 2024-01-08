import {useScrollTo} from "@/hook/ui";
import Link from "next/link";


const Pricing = () => {

    const ref = useScrollTo("pricing");


  return (
      <>
          <div ref={ref} className="flex flex-col justify-center items-center bg-gradient-to-b from-gray-200 via-white to-white">
              <div className="container py-16 flex flex-col justify-center items-center gap-4 px-3 md:px-0">
                <p className="text-blue-500 text-sm font-bold uppercase">Pricing</p>
                <h2 className="text-4xl font-bold">Choose the Perfect Plan for You</h2>
                <p className="text-gray-500">Get the most out of your remote control experience with our premium features.</p>
                  {/*<div className="w-full grid grid-cols-1 md:grid-cols-3 justify-center gap-8 pt-6">*/}

                  {/*    <div className="bg-gray-300 flex flex-col justify-start items-start h-full rounded-lg hover:scale-[1.025] transition-all">*/}
                  {/*        <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-400 to-blue-600 w-full rounded-t-lg overflow-clip">*/}
                  {/*            <h4 className="font-semibold text-2xl p-4 uppercase text-white">Selfhosted</h4>*/}
                  {/*            <div className="font-semibold text-lg text-gray-200 bg-blue-500 h-full py-4 pl-6 pr-12 skew-x-[40deg] -mx-8 group hover:skew-x-0 hover:text-xl transition-all">*/}
                  {/*                <p className="-skew-x-[40deg] group-hover:skew-x-0">FREE!</p>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*        <p className="p-4">You can download everything you need from here and upload it by yourself on your hosting for free.</p>*/}
                  {/*        <button className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 w-full text-xl font-semibold text-white hover:font-bold rounded-b-lg">Order now!</button>*/}
                  {/*    </div>*/}

                  {/*    <div className="bg-gray-300 flex flex-col justify-start items-start h-full rounded-lg hover:scale-[1.025] transition-all">*/}
                  {/*        <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 w-full rounded-t-lg overflow-clip">*/}
                  {/*            <h4 className="font-semibold text-2xl p-4 uppercase text-white">Hosted</h4>*/}
                  {/*            <div className="font-semibold text-lg text-gray-200 bg-blue-500 h-full py-4 pl-6 pr-12 skew-x-[40deg] -mx-8 group hover:skew-x-0 hover:text-xl transition-all">*/}
                  {/*                <p className="-skew-x-[40deg] group-hover:skew-x-0">$2/month</p>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*        <p className="p-4">Just upload firmware to your ESP32 configured it and use in combination with this website.</p>*/}
                  {/*        <button className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 w-full text-xl font-semibold text-white hover:font-bold rounded-b-lg">Order now!</button>*/}
                  {/*    </div>*/}

                  {/*    <div className="bg-gray-300 flex flex-col justify-start items-start h-full rounded-lg hover:scale-[1.025] transition-all">*/}
                  {/*        <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-800 to-blue-950 w-full rounded-t-lg overflow-clip">*/}
                  {/*            <h4 className="font-semibold text-2xl p-4 uppercase text-white">Full package</h4>*/}
                  {/*            <div className="font-semibold text-lg text-gray-200 bg-blue-500 h-full py-4 pl-6 pr-12 skew-x-[40deg] -mx-8 group hover:skew-x-0 hover:text-xl transition-all">*/}
                  {/*                <p className="-skew-x-[40deg] group-hover:skew-x-0">$60 onetime fee</p>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*        <p className="p-4">You will received full installed ESP32 connected to your account, all working with lifetime access to our system.</p>*/}
                  {/*        <button className="bg-gradient-to-r from-blue-800 to-blue-950 p-4 w-full text-xl font-semibold text-white hover:font-bold rounded-b-lg">Order now!</button>*/}
                  {/*    </div>*/}

                  {/*</div>*/}

                  <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-center gap-8 pt-6">
                      <div>
                      </div>
                      <div className="bg-gray-200 flex flex-col justify-start items-start h-full rounded-lg hover:scale-[1.025] transition-all">
                          <div
                              className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 w-full rounded-t-lg overflow-clip">
                              <h4 className="font-semibold text-xl p-4 uppercase text-white">FREE</h4>
                          </div>
                          <p className="p-4 font-light">Embrace the power of open-source with our Free Tier! Completely free of charge, we offers you full access to our remote PC control technology. Whether you&apos;re a DIY enthusiast or prefer the convenience of using our website, our open-source solution ensures that anyone can set up and enjoy remote access to their PC. Experience the freedom and flexibility of managing your computer systems without any cost.</p>
                          <Link href={"/system/register"} className="max-h-[60px] text-center bg-gradient-to-r from-blue-600 to-blue-800 p-4 w-full text-xl font-semibold text-white hover:font-bold rounded-b-lg transition-all hover:text-2xl">Sign up!</Link>
                      </div>
                  </div>

              </div>
          </div>
      </>
  )
}

export default Pricing;