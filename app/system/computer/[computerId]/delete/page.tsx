"use client";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import {useRouter} from "next/navigation";
import {useDeleteComputer, useGetComputer} from "@/hook/computer";
import {Computer} from "@/interface/computer";

const ComputerDeletePage = ({params}: {params: { computerId: string }}) => {
    const router = useRouter();
    const { data: computer, error: computerError, isLoading: computerIsLoading } = useGetComputer(params.computerId);
    const { mutate:deleteComputer } = useDeleteComputer();

    const handleDeleteComputer = (computer: Computer) => {
        deleteComputer(computer.id, {
            onSuccess: (data) => {
                toast.success("Computer "+computer.name+" was successfully deleted!");
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
                <ErrorAndLoadingLess loading={computerIsLoading} error={computerError}>
                    <div className={"bg-blue-400 text-white px-10 py-8 rounded-lg flex flex-col justify-center items-center gap-y-4"}>
                        <h1 className={"text-2xl md:text-3xl font-normal"}>Are you sure you want to delete <span className={"font-bold text-blue-900"}>&apos;{computer?.name}&apos;</span> ?</h1>
                        <div className={"flex flex-row justify-center items-center gap-x-2.5"}>
                            <button onClick={() => router.back() } className={"uppercase px-2.5 py-2 bg-blue-600 rounded-lg text-lg font-medium hover:font-bold hover:scale-110 transition-all hover:bg-blue-700"}>Back</button>
                            <button onClick={() => handleDeleteComputer(computer!)} className={"uppercase px-2.5 py-2 bg-red-600 rounded-lg text-lg font-medium hover:font-bold hover:scale-110 transition-all hover:bg-red-700"}>Delete</button>
                        </div>
                    </div>
                </ErrorAndLoadingLess>
            </div>
        </div>
    )
}

export default ComputerDeletePage;