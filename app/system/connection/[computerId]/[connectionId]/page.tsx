"use client";
import {useRouter} from "next/navigation";
import {useCreateOrUpdateConnection, useGetConnection} from "@/hook/connection";
import * as Yup from 'yup';
import {ConnectionFormValues, ConnectionTypeEnum} from "@/interface/connection";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import React, {useEffect} from "react";
import SystemMenu from "@/components/SystemMenu";
import ErrorAndLoadingLess from "@/components/ErrorAndLoadingLess";
import Card from "@/components/Card";
import {ImSpinner2} from "react-icons/im";


const CreateEditConnectionPage = ({params}: {params: { connectionId: string, computerId: string }}) => {
    const mode = params.connectionId === "new" ? "CREATE" : "UPDATE";
    const router = useRouter();

    const { data: connection, error: connectionError, isLoading: connectionIsLoading } = useGetConnection(params.connectionId, {enabled: mode === "UPDATE"});
    const { mutate, isPending } = useCreateOrUpdateConnection(params.computerId, params.connectionId);

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        type: Yup.string().oneOf(Object.values(ConnectionTypeEnum), "Invalid connection type").required("Required"),
        remotePort: Yup.number().required('Required').min(1000, "Minimum 1000").max(9999, "Maximum 9999"),
        localPort: Yup.number().required('Required').min(20, "Minimum 20").max(65535, "Maximum 65535"),
        localIp: Yup.string().required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            name: connection?.name ?? "",
            type: connection?.type ?? "",
            remotePort: connection?.remotePort ?? "",
            localPort: connection?.localPort ?? "",
            localIp: connection?.localIp ?? "localhost",
        } as ConnectionFormValues,
        validationSchema: validationSchema,
        onSubmit: (values: ConnectionFormValues) => {
            mutate([values, mode], {
                onSuccess: (data) => {
                    toast.success("Connection "+data.name+" successfully "+mode.toLowerCase()+"d!");
                    formik.resetForm();
                    router.push("/system/computer/"+params.computerId+"/connections");
                },
                onError: (error) => {
                    toastErrors(error.response?.data.message);
                }
            });
        },
    });

    useEffect(() => {
        if (!connection)
            return;

        formik.setValues({
            name: connection.name,
            type: connection.type,
            remotePort: connection.remotePort,
            localPort: connection.localPort,
            localIp: connection.localIp,
        } as ConnectionFormValues)
    }, [connection, formik.setValues])

    return (
        <>
            <SystemMenu />
            <div className="flex flex-col justify-center items-center">
                <div className="container py-8 grid grid-cols-1 md:grid-cols-2 justify-start items-start gap-4 px-3 md:px-0">
                    <div>
                        <ErrorAndLoadingLess loading={connectionIsLoading} error={connectionError} height={"461px"}>
                            <Card title={mode+" Connection"}>
                                <form className="flex flex-col space-y-3" onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="name" className="font-semibold">Name</label>
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
                                        <label htmlFor="type" className="font-semibold">Type</label>
                                        <select
                                            className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
                                            name="type"
                                            id="type"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.type}
                                        >
                                            <option>Choose</option>
                                            {Object.values(ConnectionTypeEnum).map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        {formik.touched.type && formik.errors.type ? (
                                            <small className="text-red-500 text-sm">{formik.errors.type}</small>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="localPort" className="font-semibold inline-flex items-center justify-start gap-x-1">Local IP</label>
                                        <input
                                            type="text"
                                            id="localIp"
                                            name="localIp"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.localIp}
                                            className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
                                        />
                                        {formik.touched.localIp && formik.errors.localIp ? (
                                            <small className="text-red-500 text-sm">{formik.errors.localIp}</small>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="localPort" className="font-semibold">Local port</label>
                                        <input
                                            type="number"
                                            min={20}
                                            max={9999}
                                            minLength={2}
                                            maxLength={4}
                                            id="localPort"
                                            name="localPort"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.localPort}
                                            className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
                                        />
                                        {formik.touched.localPort && formik.errors.localPort ? (
                                            <small className="text-red-500 text-sm">{formik.errors.localPort}</small>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="remotePort" className="font-semibold">Remote port</label>
                                        <input
                                            type="number"
                                            id="remotePort"
                                            name="remotePort"
                                            min={7000}
                                            max={9999}
                                            minLength={4}
                                            maxLength={4}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.remotePort}
                                            className={"border-2 border-blue-200 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"}
                                        />
                                        {formik.touched.remotePort && formik.errors.remotePort ? (
                                            <small className="text-red-500 text-sm">{formik.errors.remotePort}</small>
                                        ) : null}
                                    </div>
                                    <button disabled={isPending} type={"submit"}
                                            className={`h-16 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 p-4 w-full text-xl font-semibold text-white hover:font-bold rounded-lg ${isPending ? "animate-pulse" : ""}`}>{isPending ?
                                        <ImSpinner2 className={"animate-spin"}/> : mode}
                                    </button>
                                </form>
                            </Card>
                        </ErrorAndLoadingLess>
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl uppercase">Informations</h2>
                        <p><b>Name:</b> This is a label for the port forwarding rule you are creating. It helps you identify the purpose or the service for which you are setting up the port forwarding, like "Web Server" or "Gaming".</p>
                        <p><b>Type:</b> This dropdown menu allows you to select the protocol for the ports you are forwarding. The options "TCP" (Transmission Control Protocol) and "UDP" (User Datagram Protocol) are common types. TCP is reliable and used for applications that require guaranteed delivery, such as web browsing (HTTP), email (SMTP, IMAP), and file transfers (FTP). UDP is faster, less reliable, and used for real-time applications where speed is more critical than reliability, like online gaming or streaming.</p>
                        <p><b>Local IP:</b> This is the IP address of the device within your local network to which you want to forward the traffic. "localhost" typically refers to the device itself on which the form is accessed.</p>
                        <p><b>Local Port:</b> This is the port number on the local IP address' device that you want to open up for incoming traffic. It is the port where the service (like a web server) is running on the device.</p>
                        <p><b>Remote Port:</b> This field is for the port number that will be accessed from outside your local network. This is the port that external traffic will target when trying to access the service on your local device.</p>
                        <br/>
                        <p>When setting up port forwarding, you are essentially telling your router that any traffic coming in on the specified "Local Port" should be passed through to the server on the "Remote Port". This is necessary when the services on your local network need to be accessible from the internet, like hosting a game server or providing remote desktop access.</p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CreateEditConnectionPage;