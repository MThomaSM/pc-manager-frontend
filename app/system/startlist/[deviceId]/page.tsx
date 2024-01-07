"use client";

import SystemMenu from "@/components/SystemMenu";
import {BiCalendarCheck, BiEdit, BiSolidRightArrow, BiTrash} from "react-icons/bi";
import Card from "@/components/Card";
import {useGetDevice} from "@/hook/device";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import React, {useEffect, useState} from "react";
import {useDeleteStartlist, useGetStartlist, useWakeComputer, useWakeComputerBulk} from "@/hook/startlist";
import {useGetComputersByDeviceId} from "@/hook/computer";
import {Computer, ComputerWakeBulkItem} from "@/interface/computer";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {calculateDifferenceInSeconds, toastErrors} from "@/utils";
import {StartlistDetailed} from "@/interface/startlist";
import {ImSpinner2} from "react-icons/im";
import Link from "next/link";
import Pagination from "@/components/Pagination";

interface ComputerState {
    [key: string]: {
        checked: boolean;
        time: string;
    };
}

const StartListPage = ({params}: {params: { deviceId: string }}) => {

    const router = useRouter();

    const now = new Date().toISOString().slice(0, 16);

    const [deviceColor, setDeviceColor] = useState<string>("text-green-600");
    const [allChecked, setAllChecked] = useState(false);
    const [page, setPage] = useState<number>(1);


    const [computersState, setComputersState] = useState<ComputerState>({});

    const { data: device, error: deviceError, isLoading: deviceIsLoading } = useGetDevice(params.deviceId);
    const { data: startlist, error: startlistError, isLoading: startlistIsLoading, refetch: startlistRefetch } = useGetStartlist(params.deviceId, page,{
        refetchInterval: 10000,
    });

    useEffect(() => {
        startlistRefetch();
    }, [page, startlistRefetch]);


    const { data: computers, error: computersError, isLoading: computersIsLoading, refetch: computersRefetch} = useGetComputersByDeviceId(params.deviceId);

    const { mutate: deleteStartlist } = useDeleteStartlist();
    const { mutate: wakeComputerBulk, isPending: wakeComputerBulkIsPending, variables: wakeComputerBulkVariables } = useWakeComputerBulk();

    function updateAllComputersState(computers: Computer[], computersState: ComputerState, checked: boolean, withTime: boolean): ComputerState {
        return computers.reduce((acc, computer) => {
            acc[computer.id] = { checked: checked, time: withTime ? computersState[computer.id]?.time || now : now };
            return acc;
        }, {} as ComputerState);
    }

    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllChecked(e.target.checked);
        const newComputersState = updateAllComputersState(computers!, computersState, e.target.checked, true);

        setComputersState(newComputersState);
    };

    const uncheckAll = () => {
        setAllChecked(false);
        const newComputersState = updateAllComputersState(computers!, computersState, false, false);
        setComputersState(newComputersState);
    };


    const handleCheck = (id: string, checked: boolean) => {
        setComputersState(prev => ({
            ...prev,
            [id]: { ...prev[id], checked, time: prev[id]?.time || now }
        }));
    };

    const handleTimeChange = (id: string, time: string) => {
        setComputersState(prev => ({
            ...prev,
            [id]: { ...prev[id], time }
        }));
    };

    const handleWakeAll = () => {
        const computersToWake: ComputerWakeBulkItem[] = Object.entries(computersState).filter(([_, value]) => value.checked).map(([key, value]) => ({ computerId: key, startAt: value.time }));

        if (computersToWake.length === 0)
            return;

        wakeComputerBulk([params.deviceId, computersToWake], {
            onSuccess: (data) => {
                toast.success("Computers were successfully planned to wake up!");
                uncheckAll();
                startlistRefetch();
                computersRefetch();
            },
            onError: (error) => {
                toastErrors(error.response?.data.message);
            }
        })
    };

    const handleDeleteStartlist = (startlist: StartlistDetailed) => {
        deleteStartlist(startlist.id, {
            onSuccess: (data) => {
                toast.success("Computer "+startlist.computerName+" was successfully deleted from startlist!");
                startlistRefetch();
            },
            onError: (error) => {
                toastErrors(error.response?.data.message);
            }
        })
    }

    const handleWakeComputer = (computer: Computer) => {
        if(wakeComputerBulkIsPending)
            return;

        const computersToWake = [
            {
                computerId: computer.id,
                startAt: computersState[computer.id]?.time || now
            }
        ] as ComputerWakeBulkItem[];

        wakeComputerBulk([params.deviceId, computersToWake], {
            onSuccess: (data) => {
                toast.success("Computer "+computer.name+" was successfully planned to wake up!");
                startlistRefetch();
                computersRefetch();
                uncheckAll();
            },
            onError: (error) => {
                toastErrors(error.response?.data.message);
            }
        })
    }

    useEffect(() => {
        if (!device) return;
        setDeviceColor(calculateDifferenceInSeconds(device?.lastActiveAt as number) > 30 ? 'text-red-600' : 'text-green-600');
    }, [device]);

    return (
        <>
            <SystemMenu/>
            <div className="flex flex-col items-center justify-center pt-12 md:pt-0 px-3 md:px-0">
                <div className="flex flex-col items-center justify-center space-y-2 py-12 md:pt-6 px-3 md:px-0 container">
                        <ErrorAndLoadingLess loading={deviceIsLoading || startlistIsLoading} error={deviceError || startlistError} height={"200px"}>
                            <h2 className="font-normal text-xl md:text-4xl inline-flex justify-center items-center">Startlist of&nbsp;<span className={`font-semibold ${deviceColor}`}>&apos;{device?.name}&apos;</span>
                                <Link href={`/system/device/${device?.id}/delete`}><BiTrash className={"hover:text-red-700 transition-colors cursor-pointer ml-1"}/></Link>
                                <Link href={`/system/device/${device?.id}`}><BiEdit className={"hover:text-blue-700 transition-colors cursor-pointer ml-1 mt-0.5"}/></Link>
                            </h2>
                            <p className="text-normal font-light">The list below contains all the PCs that are scheduled to be turned on.</p>
                            <div className="container flex-col justify-center items-center space-y-4">
                                {startlist?.data.map((startlist) => (
                                    startlist.executedAt !== null ?
                                        <div key={startlist.id} className={"h-14 hover:scale-x-[1.01] transition-all max-h-fit flex flex-row mb-3 justify-between items-stretch bg-gradient-to-r shadow-xl  overflow-clip from-green-400 to-green-600 text-white text-lg uppercase rounded-full"}>
                                            <div className="flex flex-row justify-evenly items-stretch text-base">
                                                <p className="font-bold bg-green-800 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 pl-6 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg]"}>Started on {new Date(startlist.startAt).toLocaleString('sk-SK')}</span></p>
                                                <p className="font-bold bg-green-600 inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>{startlist.computerName}</span></p>
                                                <p className="font-bold bg-green-400 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>{startlist.macAddress}</span></p>
                                            </div>
                                            <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                                                <button onClick={() => handleDeleteStartlist(startlist)} className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1 hover:scale-150 hover:pr-4 transition-all hover:cursor-pointer"><BiTrash className={"skew-x-[24deg]"}/></button>
                                            </div>
                                        </div>
                                        :
                                        <div key={startlist.id} className={`h-14 hover:scale-x-[1.01] transition-all max-h-fit flex flex-row mb-3 justify-between items-stretch bg-gradient-to-r shadow-xl overflow-clip from-orange-400 to-orange-600 text-white text-lg uppercase rounded-full`}>
                                            <div className="flex flex-row justify-evenly items-stretch text-base">
                                                <p className="font-bold bg-orange-800 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 pl-6 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg]"}>Planned for {new Date(startlist.startAt).toLocaleString('sk-SK')}</span></p>
                                                <p className="font-bold bg-orange-600 inline-flex items-center justify-center w-fit pl-8 md:px-5 -skew-x-[24deg] py-4 -ml-1"><span className={"skew-x-[24deg]"}>{startlist.computerName}</span></p>
                                                <p className="font-bold bg-orange-400 items-center justify-center w-fit px-5 -skew-x-[24deg] py-4 -ml-1 hidden lg:inline-flex"><span className={"skew-x-[24deg] font-mono text-red-50"}>{startlist.macAddress}</span></p>
                                            </div>
                                            <div className="flex flex-row justify-evenly items-stretch text-xl -mr-1">
                                                <button onClick={() => handleDeleteStartlist(startlist)} className="font-bold bg-red-700 inline-flex items-center justify-center w-16 -skew-x-[24deg] pr-1 hover:scale-150 hover:pr-4 transition-all hover:cursor-pointer"><BiTrash className={"skew-x-[24deg]"}/></button>
                                            </div>
                                        </div>
                                ))}
                                <Pagination total={startlist?.meta?.total as number} itemsPerPage={startlist?.meta?.perPage as number} currentPage={startlist?.meta?.page as number} onPageChange={setPage}/>
                            </div>
                        </ErrorAndLoadingLess>

                        <ErrorAndLoadingLess loading={computersIsLoading} error={computersError} height={"200px"}>
                            <h2 className="font-normal text-4xl pt-6">Detailed setup</h2>

                            <table className="table-auto border-separate border-spacing-x-1 border-spacing-y-1.5 w-full rounded-lg">
                                <thead>
                                    <tr className="bg-blue-600 font-medium text-white rounded-lg hover:scale-x-[1.01] transition-all">
                                        <th className="border p-2 border-blue-400 rounded-lg"><input type="checkbox" checked={allChecked} onChange={handleCheckAll}/></th>
                                        <th className="border p-2 border-blue-400 rounded-lg">PC Name</th>
                                        <th className="border p-2 border-blue-400 rounded-lg">MAC Address</th>
                                        <th className="border p-2 border-blue-400 rounded-lg max-w-max">Date of execution</th>
                                        <th className="border p-2 border-blue-400 rounded-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {computers?.map((computer: Computer) => (
                                    <tr key={computer.id} className="bg-blue-300 text-black text-center  rounded-lg  hover:scale-x-[1.01] transition-all">
                                        <td className="rounded-lg"><input type="checkbox" checked={computersState[computer.id]?.checked || false} onChange={(e) => handleCheck(computer.id, e.target.checked)}/></td>
                                        <td className="rounded-lg">{computer.name}</td>
                                        <td className="rounded-lg font-mono">{computer.macAddress}</td>
                                        <td className="rounded-lg w-max"><input className="m-2 focus:outline-none bg-blue-400 rounded-lg py-1 px-2" key={computersState[computer.id]?.time || now}  type="datetime-local" value={computersState[computer.id]?.time || now} onChange={(e) => handleTimeChange(computer.id, e.target.value)} /></td>
                                        <td className="rounded-lg">
                                            <div className="flex items-center justify-center text-white">
                                                <Link href={`/system/computer/${computer.id}`} className="h-[52px] bg-blue-700 w-full rounded-l-lg flex items-center justify-center text-2xl hover:text-3xl transition-all"><BiEdit/></Link>
                                                <Link href={`/system/computer/${computer.id}/delete`} className="h-[52px] bg-red-700 w-full flex items-center justify-center text-2xl hover:text-3xl transition-all"><BiTrash /></Link>
                                                <button onClick={() => handleWakeComputer(computer)} className="h-[52px] bg-green-700 w-full rounded-r-lg flex items-center justify-center text-2xl hover:text-3xl transition-all">
                                                    {wakeComputerBulkIsPending && wakeComputerBulkVariables?.[1].some(item => item.computerId === computer.id) ?
                                                        <ImSpinner2 className={"animate-spin"} />
                                                        :
                                                        <BiSolidRightArrow />
                                                    }
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button onClick={handleWakeAll} className={`px-3 py-2.5 ${wakeComputerBulkIsPending && wakeComputerBulkVariables?.[1].length > 1 ? "bg-green-800 animate-pulse" : "bg-green-700" } hover:bg-green-800 rounded-lg text-white text-lg font-medium hover:font-bold transition-all hover:scale-105`}>{wakeComputerBulkIsPending && wakeComputerBulkVariables?.[1].length > 1 ? <ImSpinner2 className={"animate-spin text-2xl"} /> : "Wake all"}</button>
                        </ErrorAndLoadingLess>
                </div>
            </div>
        </>
    )
}

export default StartListPage;