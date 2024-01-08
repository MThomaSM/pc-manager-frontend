"use client";
import SystemMenu from "@/components/SystemMenu";
import Card from "@/components/Card";
import React, {useEffect} from "react";
import {useGetDevices} from "@/hook/device";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import {useRouter} from "next/navigation";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {ComputerFormValues} from "@/interface/computer";
import {ImSpinner2} from "react-icons/im";
import {useCreateOrUpdateComputer, useGetComputer} from "@/hook/computer";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import Link from "next/link";

const ComputerEditCreatePage = ({params}: {params: { computerId: string }}) => {

    const mode = params.computerId === "new" ? "CREATE" : "UPDATE";

    const router = useRouter();

    const { data: devices, isLoading: devicesIsLoading, error:devicesError } = useGetDevices();
    const { data: computer, error: computerError, isLoading: computerIsLoading } = useGetComputer(params.computerId, {enabled: mode === "UPDATE"});

    const { mutate, isPending } = useCreateOrUpdateComputer();

    const validationSchema = Yup.object({
        deviceId: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
        macAddress: Yup.string().required('Required').matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, "Invalid MAC Address"),
    });

    const formik = useFormik({
        initialValues: {
            deviceId: computer?.deviceId ?? "",
            name: computer?.name ?? "",
            macAddress: computer?.macAddress ?? "",
        } as ComputerFormValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.id = params.computerId;
            mutate([mode,values], {
                onSuccess: (data) => {
                    toast.success("Computer "+data.name+" successfully "+mode.toLowerCase()+"d!");
                    formik.resetForm();
                    router.push("/system");
                },
                onError: (error) => {
                    toastErrors(error.response?.data.message);
                }
            });
        },
    });

    useEffect(() => {
        if (!computer)
            return;

        formik.setValues({
            name: computer.name,
            deviceId: computer.deviceId,
            macAddress: computer.macAddress,
        } as ComputerFormValues)
    }, [computer, formik.setValues])

    return (
        <>
            <SystemMenu />
            <div className="flex flex-col justify-center items-center">
                <div className="container py-8 grid grid-cols-1 md:grid-cols-2 justify-start items-start gap-4 px-3 md:px-0 w-full">
                    <div>
                        <ErrorAndLoadingLess loading={computerIsLoading} error={computerError} height={"385px"}>
                            <Card title={"Computer"}>
                                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3">
                                    <ErrorAndLoadingLess loading={devicesIsLoading} error={devicesError} height={"62px"}>
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="deviceId" className="font-semibold">Device</label>
                                            <select className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
                                                    name="deviceId"
                                                    id="deviceId"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.deviceId}
                                                >
                                                <option>Choose</option>
                                                {devices?.map((device) => (
                                                    <option key={device.id} value={device.id}>{device.name}</option>
                                                ))}
                                            </select>
                                            {formik.touched.deviceId && formik.errors.deviceId ? (
                                                <small className="text-red-500 font-medium">{formik.errors.deviceId}</small>
                                            ) : null}
                                        </div>
                                    </ErrorAndLoadingLess>
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="name" className="font-semibold">Name of your computer</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <small className="text-red-500 text-sm">{formik.errors.name}</small>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="macAddress" className="font-semibold">MAC Address of your computer</label>
                                        <input
                                            type="text"
                                            id="macAddress"
                                            name="macAddress"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.macAddress}
                                            className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
                                        />
                                        {formik.touched.macAddress && formik.errors.macAddress ? (
                                            <small className="text-red-500 text-sm">{formik.errors.macAddress}</small>
                                        ) : null}
                                    </div>
                                    <button disabled={isPending} type={"submit"} className={`h-16 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 p-4 w-full text-xl font-semibold text-white hover:font-bold rounded-lg ${isPending ? "animate-pulse" : ""}`}>{isPending ? <ImSpinner2 className={"animate-spin"} /> : mode }</button>
                                </form>
                            </Card>
                        </ErrorAndLoadingLess>
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl uppercase">Configuration</h2>
                        Setting up your computer for remote access is just a click away. Begin by selecting your device type from the dropdown menu. Then, provide a name for your computer to easily identify it in the future. Finally, enter the MAC Address of your computer—a unique identifier that ensures your remote commands reach the right machine. Once you&apos;ve filled in the details, hit &apos;CREATE&apos; to register your device and get started with remote management.
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComputerEditCreatePage;