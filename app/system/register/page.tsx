"use client";
import React, {useEffect} from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import {SignupFormValues} from "@/interface/auth";
import {toastErrors} from "@/utils";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useCreateUser} from "@/hook/auth";
import {useRouter} from "next/navigation";
import {authActions} from "@/store/auth-slice";
import {ImSpinner2} from "react-icons/im";
import useRedirectByAuthState from "@/hook/utils";
import NiceInput from "@/components/Form/NiceInput";

const Register = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    useRedirectByAuthState("/system", false);

    const { mutate, isError, isSuccess, isPending, data, error } = useCreateUser();

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Password is too short - should be 4 chars minimum.').required('Required'),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        } as SignupFormValues,
        validationSchema: validationSchema,
        onSubmit: (values: SignupFormValues) => {
            mutate(values, {
                onSuccess: (data) => {
                    const { jwt, ...user } = data;

                    dispatch(authActions.updateUser({
                        token: jwt.token,
                        expires: jwt.expiresAt,
                        user: user
                    }));

                    toast.success("User created successfully");
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
            <div className={"mx-auto flex flex-col items-center justify-center w-[600px] max-w-full h-fit overflow-clip text-blue-900 bg-white shadow-2xl drop-shadow-2xl rounded-lg"}>
                <h1 className={"text-4xl border-b-2 w-full text-center py-4 font-semibold border-y-blue-900 bg-blue-900 text-white"}>Sign up</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3 w-full pt-2 p-4">
                    <div className="flex flex-col space-y-1">
                        <NiceInput
                            id="firstName"
                            label="First Name"
                            type="text"
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            touched={formik.touched.firstName}
                            error={formik.errors.firstName}
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <NiceInput
                            id="lastName"
                            label="Last Name"
                            type="text"
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            touched={formik.touched.lastName}
                            error={formik.errors.lastName}
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <NiceInput
                            id="email"
                            label="Email"
                            type="email"
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.email}
                            touched={formik.touched.email}
                            error={formik.errors.email}
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <NiceInput
                            id="password"
                            label="Password"
                            type="password"
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.password}
                            touched={formik.touched.password}
                            error={formik.errors.password}
                        />
                    </div>
                    <div className="flex flex-col space-y-1 pb-2">
                        <NiceInput
                            id="passwordConfirm"
                            label="Repeat Password"
                            type="password"
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            value={formik.values.passwordConfirm}
                            touched={formik.touched.passwordConfirm}
                            error={formik.errors.passwordConfirm}
                        />
                    </div>
                    <button disabled={isPending} type={"submit"} className={`h-16 inline-flex items-center justify-center bg-blue-400 border-2 border-blue-200 hover:border-transparent hover:bg-blue-900 p-4 w-full text-xl hover:scale-x-[1.025] transition-all font-semibold text-white hover:font-bold rounded-lg uppercase ${isPending ? "animate-pulse": ""}`}>{isPending ? <ImSpinner2 className={"animate-spin"} /> : "SIGN UP" }</button>
                    <div className={"flex justify-end items-center space-x-2 text-blue-blue-900"}>
                        <Link className={"hover:font-semibold transition-all"} href={"/system/login"}>Log in</Link>
                        <Link className={"hover:font-semibold transition-all"} href={"/system/lostpassword"}>Lost password</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;