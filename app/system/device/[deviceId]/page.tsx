"use client";
import Card from "@/components/Card";
import React, {useEffect} from "react";
import SystemMenu from "@/components/SystemMenu";
import {useRouter} from "next/navigation";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {DeviceFormValues} from "@/interface/device";
import {useCreateOrUpdateDevice, useGetDevice} from "@/hook/device";
import {ImSpinner2} from "react-icons/im";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import {v4 as uuidv4} from 'uuid';
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import Link from "next/link";
import useRedirectByAuthState from "@/hook/utils";

const DeviceEditCreatePage = ({params}: {params: { deviceId: string }}) => {

    const mode = params.deviceId === "new" ? "CREATE" : "UPDATE";

    const router = useRouter();
    useRedirectByAuthState("/system/login", true);

    const { data: device, error: deviceError, isLoading: deviceIsLoading } = useGetDevice(params.deviceId, {enabled: mode === "UPDATE"});
    const { mutate, isPending } = useCreateOrUpdateDevice();

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        id: Yup.string().uuid('Invalid UUID').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            name: device?.name ?? "",
            id: device?.id ?? uuidv4(),
        } as DeviceFormValues,
        validationSchema: validationSchema,
        onSubmit: (values: DeviceFormValues) => {
            mutate([mode,values], {
                onSuccess: (data) => {
                    toast.success("Device "+data.name+" successfully "+mode.toLowerCase()+"d!");
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
        if (!device)
            return;

        formik.setValues({
            name: device.name,
            id: device.id,
        } as DeviceFormValues)
    }, [device, formik.setValues])

    return (
        <>
            <SystemMenu />
            <div className="flex flex-col justify-center items-center">
                <div
                    className="container py-8 grid grid-cols-1 md:grid-cols-2 justify-start items-start gap-4 px-3 md:px-0">
                    <div>
                        <ErrorAndLoadingLess loading={deviceIsLoading} error={deviceError} height={"311px"}>
                            <Card title={mode + " Device"}>
                                <form className="flex flex-col space-y-3" onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="firstName" className="font-semibold">Name of your ESP32</label>
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
                                        <label htmlFor="lastName" className="font-semibold">UUID of your ESP32</label>
                                        <input
                                            type="text"
                                            id="id"
                                            name="id"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.id}
                                            className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 bg-gray-100"}
                                            readOnly={true}
                                        />
                                        {formik.touched.id && formik.errors.id ? (
                                            <small className="text-red-500 text-sm">{formik.errors.id}</small>
                                        ) : null}
                                    </div>
                                    <button disabled={isPending} type={"submit"}
                                            className={`h-16 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 p-4 w-full text-xl font-semibold text-white hover:font-bold rounded-lg ${isPending ? "animate-pulse" : ""}`}>{isPending ?
                                        <ImSpinner2 className={"animate-spin"}/> : mode}</button>
                                </form>
                            </Card>
                        </ErrorAndLoadingLess>
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl uppercase">Configuration</h2>
                        After creation, copy the UUID and download the program <Link
                        href={"https://github.com/MThomaSM/esp32-wol-flash-uploader-gui"} target={"_blank"}
                        className={"font-bold text-blue-500"}>HERE</Link>, then configure it as follows:<br/>
                        <b> UUID - </b> Paste the copied UUID here <br/>
                        <b> Wifi Name - </b> Enter the name of the Wi-Fi network your computers are in <br/>
                        <b> Wifi Password - </b> Enter the password for the said Wi-Fi network here. <br/>
                        When you are using it for the first time you have to connect it to the computer via USB and
                        upload the program to it using the Arduino IDE. You can download it from <Link
                        href={"https://github.com/MThomaSM/esp32-wol-firmware"} target={"_blank"}
                        className={"font-bold text-blue-500"}>HERE</Link>.<br/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeviceEditCreatePage;