"use client";
import React from "react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {useLoginUser} from "@/hook/auth";
import {useFormik} from "formik";
import {LoginFormValues} from "@/interface/auth";
import {authActions} from "@/store/auth-slice";
import {toast} from "react-toastify";
import {toastErrors} from "@/utils";
import * as Yup from 'yup';
import {useRouter} from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

const LoginPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { mutate, isError, isSuccess, isPending, data, error } = useLoginUser();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        } as LoginFormValues,
        validationSchema: validationSchema,
        onSubmit: (values: LoginFormValues) => {
            mutate(values, {
                onSuccess: (data) => {
                    const { jwt, ...user } = data;

                    dispatch(authActions.updateUser({
                        token: jwt.token,
                        expires: jwt.expiresAt,
                        user: user
                    }));
                    
                    toast.success(<>Welcome back <b>{user.firstName} {user.lastName}</b>!</>);
                    formik.resetForm();
                    router.push("/system");
                },
                onError: (error) => {
                    toastErrors(error.response?.data.message);
                }
            });
        },
    });


    return (
        <div className={"bg-gradient-to-r from-blue-500 to-blue-800 pt-8 px-4 flex justify-center items-center min-h-[calc(100vh-322px)]"}>
            <div className={"mx-auto flex flex-col items-center justify-center w-[600px] max-w-full overflow-clip text-blue-900 bg-white shadow-2xl drop-shadow-2xl rounded-lg"}>
                <h1 className={"text-4xl border-b-2 w-full text-center py-4 font-semibold border-y-blue-900 bg-blue-900 text-white"}>Log in</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3 w-full pt-2 p-4">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={"bg-blue-50 border-2 text-black border-blue-200 focus:scale-x-[1.025] transition-all rounded-md px-2 py-1 focus:outline-none focus:border-blue-900"}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <small className="text-red-500 text-sm">{formik.errors.email}</small>
                        ) : null}
                    </div>
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
                            <small className="text-red-500 text-sm">{formik.errors.password}</small>
                        ) : null}
                    </div>
                    <button disabled={isPending} type={"submit"} className={`h-16 inline-flex items-center justify-center bg-blue-400 border-2 border-blue-200 hover:border-transparent hover:bg-blue-900 p-4 w-full text-xl hover:scale-x-[1.025] transition-all font-semibold text-white hover:font-bold rounded-lg uppercase ${isPending ? "animate-pulse": ""}`}>{isPending ? <ImSpinner2 className={"animate-spin"} /> : "LOG IN" }</button>
                    <div className={"flex justify-end items-center space-x-2 text-blue-blue-900"}>
                        <Link className={"hover:font-semibold transition-all"} href={"/system/register"}>Sing up</Link>
                        <Link className={"hover:font-semibold transition-all"} href={"/system/lostpassword"}>Lost password</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;