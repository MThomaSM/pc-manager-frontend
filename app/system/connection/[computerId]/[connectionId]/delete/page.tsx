"use client";
import {useDeleteConnection, useGetConnection} from "@/hook/connection";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import {Connection} from "@/interface/connection";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import {ImSpinner2} from "react-icons/im";
import React from "react";
import useRedirectByAuthState from "@/hook/utils";


const DeleteConnectionPage = ({params}: {params: { computerId: string, connectionId: string }}) => {
    const { data: connection, error: connectionError, isLoading: connectionIsLoading } = useGetConnection(params.connectionId);
    const {mutate: deleteConnection, isPending: deleteConnectionIsPending} = useDeleteConnection();
    const router = useRouter();
    useRedirectByAuthState("/system/login", true);

    const handleDeleteConnection = (connection: Connection) => {
        deleteConnection([params.computerId, params.connectionId], {
            onSuccess: () => {
                toast.success("Connection "+connection.name+" successfully deleted!");
                router.push("/system/computer/"+params.computerId+"/connections");
            },
            onError: (error) => {
                toastErrors(error.response?.data.message);
            }
        })
    }

    return (
        <div
            className="bg-gradient-to-r from-blue-500 to-blue-800 pt-8 px-4 flex justify-center items-center h-[calc(100vh-322px)]">
            <div className="flex flex-col items-center justify-center space-y-2 py-12 md:pt-6 px-3 md:px-0 container">
                <ErrorAndLoadingLess loading={connectionIsLoading} error={connectionError}>
                    <div
                        className={"bg-blue-400 text-white px-10 py-8 rounded-lg flex flex-col justify-center items-center gap-y-4"}>
                        <h1 className={"text-2xl md:text-3xl font-normal"}>Are you sure you want to delete <span
                            className={"font-bold text-blue-900"}>&apos;{connection?.name}&apos;</span> ?</h1>
                        <div className={"flex flex-row justify-center items-center gap-x-2.5"}>
                            <button onClick={() => router.back()}
                                    className={"h-12 uppercase px-2.5 py-2 bg-blue-600 rounded-lg text-lg font-medium hover:font-bold hover:scale-110 transition-all hover:bg-blue-700"}>Back
                            </button>
                            <button onClick={() => handleDeleteConnection(connection!)} disabled={deleteConnectionIsPending}
                                    className={`h-12 uppercase px-2.5 py-2 bg-red-600 rounded-lg text-lg font-medium hover:font-bold hover:scale-110 transition-all hover:bg-red-700 ${deleteConnectionIsPending ? "animate-pulse" : ""}`}>{deleteConnectionIsPending ? <ImSpinner2 className={"animate-spin text-lg"} /> : "Delete" }
                            </button>
                        </div>
                    </div>
                </ErrorAndLoadingLess>
            </div>
        </div>
    )

}

export default DeleteConnectionPage;