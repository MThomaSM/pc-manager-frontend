"use client";
import SystemMenu from "@/components/SystemMenu";
import React from "react";
import {useGetConnectionsByComputerId} from "@/hook/connection";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import {useRouter} from "next/navigation";
import ConnectionCard from "@/components/Connection/ConnectionCard";



const Connection = ({params}: {params: { computerId: string }}) => {

    const router = useRouter();
    const { data: connections, isLoading: connectionsIsLoading, error:connectiosError, isPending: connectionsIsPending } = useGetConnectionsByComputerId(params.computerId);

    return (
        <>
            <SystemMenu/>
            <div className="container py-4 px-3 md:px-0 mx-auto">
                <ErrorAndLoadingLess loading={connectionsIsLoading || connectionsIsPending} error={connectiosError}>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                        {connections?.map((connection, index) => <ConnectionCard connection={connection} key={index}/>)}
                    </div>
                </ErrorAndLoadingLess>
                <button
                    onClick={() => router.push("/system/connection/"+params.computerId+"/new")}
                    className={"text-center rounded-lg w-full bg-blue-600 hover:bg-blue-800 transition-all hover:scale-x-[1.009] mt-4 mb-1 p-3 text-lg font-medium hover:font-bold text-white uppercase"}>Create
                    new
                </button>
            </div>
        </>
    )
}

export default Connection