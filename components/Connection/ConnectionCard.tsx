import {Connection} from "@/interface/connection";
import React from "react";
import Card from "@/components/Card";
import {useRouter} from "next/navigation";
import {useDownloadConnection} from "@/hook/connection";
import {toast} from "react-toastify";
interface ConnectionCardProps {
    connection: Connection;
}
const ConnectionCard: React.FC<ConnectionCardProps> = ({ connection }) => {

    const router = useRouter();
    const {mutate, isPending} = useDownloadConnection();

    const downloadHandle = (mode: string) => {
        toast.info("Request for download "+mode+" for connection "+connection.name+" was send... it can take a while");
        mutate([connection.computerId, mode], {
            onSuccess: (data) => toast.success("Connection "+connection.name+" successfully downloaded!")
        })
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Copied to clipboard!");
        })
    }

    return (
        <Card title={connection.name}>
            <div
                className={"grid grid-cols-1 md:grid-cols-3 justify-evenly items-stretch gap-4 text-lg pb-4"}>
                <div
                    className={"flex flex-col justify-center items-center bg-white rounded-lg overflow-clip hover:scale-105 transition-all"}>
                    <span
                        className={"bg-blue-500 text-white px-2.5 py-1 cursor-default font-medium w-full text-center"}>Type</span>
                    <span className={"px-2.5 py-1"}>{connection.type}</span>
                </div>
                <div
                    className={"flex flex-col justify-center items-center bg-white rounded-lg overflow-clip hover:scale-105 transition-all"}>
                    <span
                        className={"bg-blue-500 text-white px-2.5 py-1 cursor-default font-medium w-full text-center"}>Forward from</span>
                    <span className={"px-2.5 py-1"}>{connection.localIp}:{connection.localPort}</span>
                </div>
                <div
                    className={"flex flex-col justify-center items-center bg-white rounded-lg overflow-clip hover:scale-105 transition-all"}>
                    <span
                        className={"bg-blue-500 text-white px-2.5 py-1 font-medium w-full text-center"}>Forward to</span>
                    <span className={"px-2.5 py-1  cursor-copy"} onClick={() => copyToClipboard(connection.serverIp+":"+connection.remotePort)}>{connection.serverIp}:{connection.remotePort}</span>
                </div>
            </div>
            <div
                className={"grid grid-cols-3 justify-evenly items-stretch gap-4 text-lg border-b border-blue-950 pb-4 mb-2 "}>
                <button
                    onClick={() => router.push("/system/connection/" + connection.computerId + "/" + connection.id)}
                    className={"bg-blue-600 hover:bg-blue-800 rounded-lg text-white p-1.5 font-medium hover:font-bold transition-all hover:scale-x-[1.025]"}>Edit
                </button>
                <button
                    onClick={() => router.push("/system/connection/"+connection.computerId+"/"+connection.id+"/delete")}
                    className={"bg-red-600 hover:bg-red-800 rounded-lg text-white p-1.5 font-medium hover:font-bold transition-all hover:scale-x-[1.025]"}>Delete
                </button>
                <button
                    onClick={downloadHandle.bind(this, "config")}
                    className={"bg-orange-600 hover:bg-orange-800 rounded-lg text-white p-1.5 font-medium hover:font-bold transition-all hover:scale-x-[1.025]"}>Download config
                </button>
            </div>
            After each change you have to <button
            className={"text-blue-500 hover:text-blue-700 transition-all hover:font-medium"} onClick={downloadHandle.bind(this, "config")}>download new config</button> and replace it and then restart your client. Server is restarted automatically. In case you are using our service for first time you have to <button
            className={"text-blue-500 hover:text-blue-700 transition-all hover:font-medium"} onClick={downloadHandle.bind(this, "client")}>download
            client</button> first. Than you extract it and run it with file start.bat.
        </Card>
)
}

export default ConnectionCard;