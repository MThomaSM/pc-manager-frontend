"use client";
import {useDeleteDevice, useGetDevice} from "@/hook/device";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import {Device} from "@/interface/device";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import {useRouter} from "next/navigation";
import useRedirectByAuthState from "@/hook/utils";

const DeviceDeletePage = ({params}: {params: { deviceId: string }}) => {
    const router = useRouter();
    useRedirectByAuthState("/system/login", true);

    const { data: device, error: deviceError, isLoading: deviceIsLoading } = useGetDevice(params.deviceId);
    const { mutate:deleteDevice } = useDeleteDevice();

    const handleDeleteDevice = (device: Device) => {
        deleteDevice(device.id, {
            onSuccess: (data) => {
                toast.success("Device "+device.name+" was successfully deleted!");
                router.push("/system");
            },
            onError: (error) => {
                toastErrors(error.response?.data.message);
            }
        })
    }


    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-800 pt-8 px-4 flex justify-center items-center h-[calc(100vh-322px)]">
            <div className="flex flex-col items-center justify-center space-y-2 py-12 md:pt-6 px-3 md:px-0 container">
                <ErrorAndLoadingLess loading={deviceIsLoading} error={deviceError}>
                    <div className={"bg-blue-400 text-white px-10 py-8 rounded-lg flex flex-col justify-center items-center gap-y-4"}>
                        <h1 className={"text-2xl md:text-3xl font-normal"}>Are you sure you want to delete <span className={"font-bold text-blue-900"}>&apos;{device?.name}&apos;</span> ?</h1>
                        <div className={"flex flex-row justify-center items-center gap-x-2.5"}>
                            <button onClick={() => router.back() } className={"uppercase px-2.5 py-2 bg-blue-600 rounded-lg text-lg font-medium hover:font-bold hover:scale-110 transition-all hover:bg-blue-700"}>Back</button>
                            <button onClick={() => handleDeleteDevice(device!)} className={"uppercase px-2.5 py-2 bg-red-600 rounded-lg text-lg font-medium hover:font-bold hover:scale-110 transition-all hover:bg-red-700"}>Delete</button>
                        </div>
                    </div>
                </ErrorAndLoadingLess>
            </div>
        </div>
    )
}

export default DeviceDeletePage;