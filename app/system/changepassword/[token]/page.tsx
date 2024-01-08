"use client";
import {useRouter} from "next/navigation";
import {useGetUserByPasswordResetToken, useUpdateUserPassword} from "@/hook/auth";
import * as Yup from "yup";
import {useFormik} from "formik";
import {PasswordResetFormValues} from "@/interface/auth";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import {ImSpinner2} from "react-icons/im";
import React, {useEffect} from "react";
import useRedirectByAuthState from "@/hook/utils";

const ChangePasswordPage = ({params}: {params: { token: string }}) => {
    const router = useRouter();
    useRedirectByAuthState("/system", false);

    const { data: user, isFetched: isUserFetched } = useGetUserByPasswordResetToken(params.token);
    const { mutate, isPending } = useUpdateUserPassword();

    useEffect(() => {
        if (isUserFetched && !user) {
            toast.error("Invalid token. Please try sending new request.", {toastId: "invalid-token"});
            router.push("/system/lostpassword");
        }
    }, [isUserFetched, router, user]);


    const validationSchema = Yup.object({
        password: Yup.string().min(4, 'Password is too short - should be 4 chars minimum.').required('Required'),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
        } as PasswordResetFormValues,
        validationSchema: validationSchema,
        onSubmit: (values: PasswordResetFormValues) => {
            mutate([params.token, values], {
                onSuccess: (data) => {
                    toast.success("Password was been updated successfully. Now you can log in with your new password.");
                    router.push("/system/login");
                },
                onError: (error) => {
                    toastErrors(error.response?.data.message);
                }
            });
        },
    });

    return (
        <div className={"bg-gradient-to-r from-blue-500 to-blue-800 pt-8 px-4 flex justify-center items-center h-[calc(100vh-322px)]"}>
            <div className={"mx-auto flex flex-col items-center justify-center w-[600px] max-w-full h-fit overflow-clip text-blue-900 bg-white shadow-2xl drop-shadow-2xl rounded-lg"}>
                <h1 className={"text-4xl border-b-2 w-full text-center py-4 font-semibold border-y-blue-900 bg-blue-900 text-white"}>Update password</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3 w-full pt-2 p-4">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={"bg-blue-50 border-2 text-black border-blue-200 focus:scale-x-[1.025] transition-all rounded-md px-2 py-1 focus:outline-none focus:border-blue-900"}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <small className="text-red-600">{formik.errors.password}</small>
                        ) : null}
                    </div>
                    <div className="flex flex-col space-y-1 pb-2">
                        <label htmlFor="passwordConfirm" className="font-semibold">Repeat Password</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirm}
                            className={"bg-blue-50 border-2 text-black border-blue-200 focus:scale-x-[1.025] transition-all rounded-md px-2 py-1 focus:outline-none focus:border-blue-900"}
                        />
                        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                            <small className="text-red-600">{formik.errors.passwordConfirm}</small>
                        ) : null}
                    </div>
                    <button disabled={isPending} type={"submit"} className={`h-16 inline-flex items-center justify-center bg-blue-400 border-2 border-blue-200 hover:border-transparent hover:bg-blue-900 p-4 w-full text-xl hover:scale-x-[1.025] transition-all font-semibold text-white hover:font-bold rounded-lg uppercase ${isPending ? "animate-pulse": ""}`}>{isPending ? <ImSpinner2 className={"animate-spin"} /> : "Update profile" }</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePasswordPage;