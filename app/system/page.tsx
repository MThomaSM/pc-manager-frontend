"use client";
import Hero from "@/components/Sections/Hero";
import {BiSolidDownArrow, BiEdit, BiTrash, BiCalendarCheck, BiSolidRightArrow} from "react-icons/bi";
import Card from "@/components/Card";
import Link from "next/link";
import SystemMenu from "@/components/SystemMenu";
import {useDeleteDevice, useGetDevices} from "@/hook/device";
import {useDeleteComputer, useGetComputers} from "@/hook/computer";
import {useRouter} from "next/navigation";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import {Device} from "@/interface/device";
import {toast} from "react-toastify";
import {calculateDifferenceInSeconds, toastErrors} from "@/utils";
import {Computer} from "@/interface/computer";
import {useWakeComputer} from "@/hook/startlist";
import {ImSpinner2} from "react-icons/im";
import React from "react";
import {VscRemote, VscRemoteExplorer} from "react-icons/vsc";
import {CgRemote} from "react-icons/cg";
const Page = () => {

    const router = useRouter();
    const { data: devices, isLoading: devicesIsLoading, error:devicesError, refetch: devicesRefetch } = useGetDevices();
    const { data: computers, isLoading: computersIsLoading, error: computersError, refetch: computersRefetch } = useGetComputers();

    const { mutate:wakeComputer, isPending: wakeComputerIsPending, variables: wakeComputerVariables } = useWakeComputer();

    const handleWakeComputer = (computer: Computer) => {
        if(wakeComputerIsPending)
            return;

        wakeComputer(computer, {
            onSuccess: (data) => {
                toast.success("Computer "+computer.name+" was successfully planned to wake up!");
                devicesRefetch();
                computersRefetch();
                router.push("/system");
            },
            onError: (error) => {
                toastErrors(error.response?.data.message);
            }
        })
    }


    return (
        <>
            <SystemMenu/>
            <div className="flex flex-col items-center justify-center pt-12 md:pt-0 px-3 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-stretch items-start md:space-x-12 container rounded-lg md:rounded-full mb-4 ">
                    <div>
                        <h2 className="font-semibold text-2xl p-4">Devices</h2>
                        <div className={"flex flex-col justify-center items-stretch"}>
                            <div className={"flex flex-row mb-3 justify-between items-center bg-gradient-to-r shadow-xl from-blue-400 to-blue-600 py-4 px-6 text-white text-lg uppercase rounded-t-lg border-b-[6px] border-green-400"}>
                                <p className="font-bold">ESP32</p>
                                <p className="font-bold">ACTIONS</p>
                            </div>
                            <ErrorAndLoadingLess loading={devicesIsLoading} error={devicesError}>
                                {devices?.map((device) => {
                                    const gradientColor = calculateDifferenceInSeconds(device.lastActiveAt) > 30 ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600';
                                    return (
                                        <div key={device.id} className={`h-14 max-h-fit flex flex-row mb-3 justify-between items-stretch bg-gradient-to-r shadow-xl overflow-clip ${gradientColor} text-white text-lg uppercase rounded-full hover:scale-x-[1.01] transition-all`}>
                                            <p className="font-bold px-6 inline-flex justify-center items-center  text-base">{device.name}</p>
                                            <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                                                <Link href={`/system/device/${device.id}`} className="font-bold bg-blue-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-2.5 transition-all hover:cursor-pointer pr-0.5"><BiEdit className={"skew-x-[24deg]"}/></Link>
                                                <Link href={`/system/device/${device.id}/delete`} className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-2.5 transition-all hover:cursor-pointer pr-0.5"><BiTrash className={"skew-x-[24deg]"}/></Link>
                                                <Link href={`/system/startlist/${device.id}`} className="font-bold bg-green-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1.5 hover:scale-150 hover:pr-3.5 transition-all hover:cursor-pointer"><BiCalendarCheck className={"skew-x-[24deg]"}/></Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </ErrorAndLoadingLess>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl p-4">PCs</h2>
                        <div className={"flex flex-col justify-center items-stretch"}>
                            <div className={"flex flex-row mb-3 justify-between items-center bg-gradient-to-r shadow-xl from-blue-400 to-blue-600 py-4 px-6 text-white text-lg uppercase rounded-t-lg border-b-[6px] border-green-400"}>
                                <p className="font-bold">PC</p>
                                <p className="font-bold">ACTIONS</p>
                            </div>
                            <ErrorAndLoadingLess loading={computersIsLoading} error={computersError}>
                                {computers?.map((computer) => (
                                    <div key={computer.id} className={"h-14 max-h-fit flex flex-row mb-3 justify-between items-stretch bg-gradient-to-r shadow-xl  overflow-clip from-blue-400 to-blue-600 text-white text-lg uppercase rounded-full hover:scale-x-[1.01] transition-all"}>
                                        <div className="flex flex-row justify-evenly items-stretch text-base">
                                            <p className="font-bold bg-blue-600 items-center justify-center w-fit px-4 -skew-x-[24deg] py-4 pl-6 -ml-1 inline-flex min-w-[200px]"><span className={"skew-x-[24deg]"}>{computer.name}</span></p>
                                            <p className="font-bold bg-blue-500 items-center justify-center w-fit px-4 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>{computer.macAddress}</span></p>
                                        </div>

                                        <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                                            <Link href={`/system/computer/${computer.id}/connections`} className="font-bold bg-orange-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-2.5 transition-all hover:cursor-pointer pr-0.5"><VscRemote className={"skew-x-[24deg] stroke-1"}/></Link>
                                            <Link href={`/system/computer/${computer.id}`} className="font-bold bg-blue-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-2.5 transition-all hover:cursor-pointer pr-0.5"><BiEdit className={"skew-x-[24deg]"}/></Link>
                                            <Link href={`/system/computer/${computer.id}/delete`} className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-2.5 transition-all hover:cursor-pointer pr-0.5"><BiTrash className={"skew-x-[24deg]"}/></Link>
                                            <button onClick={() => handleWakeComputer(computer)} className="font-bold bg-green-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] hover:scale-150 hover:pr-3.5 transition-all hover:cursor-pointer pr-1.5">{wakeComputerIsPending && wakeComputerVariables.id === computer.id  ? <span className={"skew-x-[24deg]"}><ImSpinner2 className={"animate-spin"} /></span> : <BiSolidRightArrow className={"skew-x-[24deg]"}/>}</button>
                                        </div>
                                    </div>
                                ))}
                            </ErrorAndLoadingLess>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;