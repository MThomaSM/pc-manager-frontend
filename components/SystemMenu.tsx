import Link from "next/link";
import {BiSolidDownArrow} from "react-icons/bi";
import {useGetDevices} from "@/hook/device";
import {useGetComputers} from "@/hook/computer";

const SystemMenu = () => {

    const { data: devices, isLoading: devicesIsLoading, error:devicesError, refetch: devicesRefetch } = useGetDevices();
    const { data: computers, isLoading: computersIsLoading, error:computersError, refetch: computersRefetch } = useGetComputers();

    return (
        <div className="flex flex-col items-center justify-center pt-12 md:pt-0 px-3 md:px-0">
            <div
                className="flex flex-col md:flex-row justify-center items-start md:items-center gap-x-4 bg-blue-600 container p-3 text-white rounded-lg md:rounded-full mt-8 px-3 md:px-0">
                <Link href={"/system"}
                      className={"hover:bg-blue-400 text-lg font-medium hover:font-bold transition-all hover:cursor-pointer px-3 py-1.5 rounded-lg w-full md:w-fit"}>System</Link>
                <Link href={"/system/device/new"}
                      className={"hover:bg-blue-400 text-lg font-medium hover:font-bold transition-all hover:cursor-pointer px-3 py-1.5 rounded-lg w-full md:w-fit"}>Add
                    new device</Link>
                <Link href={"/system/computer/new"}
                      className={"hover:bg-blue-400 text-lg font-medium hover:font-bold transition-all hover:cursor-pointer px-3 py-1.5 rounded-lg w-full md:w-fit"}>Add
                    new PC</Link>
                <div
                    className={"group relative hover:bg-blue-400 px-3 py-1.5 rounded-lg hover:cursor-pointer transition-all hover:font-bold font-medium w-full md:w-fit"}>
                    <a className={"text-lg inline-flex items-center"}>Startlist <BiSolidDownArrow
                        className={"ml-1 text-xs"}/></a>
                    {!devicesIsLoading && !devicesError && devices ? (
                        <div
                            className={"z-10 absolute group-hover:flex bg-blue-400 shadow-2xl drop-shadow-2xl top-10 left-0 w-max md:max-w-[150px] hidden rounded-lg py-1 flex-col justify-start items-start border-2 border-blue-600"}>
                            {devices?.map((device) => (
                                <Link key={device.id} href={"/system/startlist/" + device.id}
                                      className={"hover:bg-blue-600 w-full px-3 py-1 hover:cursor-pointer font-normal hover:font-semibold"}>{device.name}</Link>
                            ))}
                        </div>
                    ) : (<> </>)}
                </div>
                <div
                    className={"group relative hover:bg-blue-400 px-3 py-1.5 rounded-lg hover:cursor-pointer transition-all hover:font-bold font-medium w-full md:w-fit"}>
                    <a className={"text-lg inline-flex items-center"}>Port forwarding <BiSolidDownArrow
                        className={"ml-1 text-xs"}/></a>
                    {!devicesIsLoading && !devicesError && devices ? (
                        <div
                            className={"z-10 absolute group-hover:flex bg-blue-400 shadow-2xl drop-shadow-2xl top-10 left-0 w-max min-w-[175px] max-w-[200px] hidden rounded-lg py-1 flex-col justify-start items-start border-2 border-blue-600"}>
                            {computers?.slice(0, 10).map((computer) => (
                                <Link key={computer.id} href={"/system/computer/" + computer.id + "/connections"}
                                      className={"hover:bg-blue-600 w-full px-3 py-1 hover:cursor-pointer font-normal hover:font-semibold"}>{computer.name}</Link>
                            ))}
                        </div>
                    ) : (<> </>)}
                </div>

            </div>
        </div>
    )
}

export default SystemMenu;