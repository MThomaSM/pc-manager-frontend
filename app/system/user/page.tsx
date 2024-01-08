"use client";
import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {UpdateUserFormValues} from "@/interface/auth";
import {toastErrors} from "@/utils";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useUpdateUser} from "@/hook/auth";
import {useRouter} from "next/navigation";
import {authActions} from "@/store/auth-slice";
import {ImSpinner2} from "react-icons/im";
import {RootState} from "@/store";
import useRedirectByAuthState from "@/hook/utils";

const UpdateUser = () => {
    const userState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const { mutate, isPending } = useUpdateUser();
    useRedirectByAuthState("/system/login", true);

    const validationSchema = Yup.object({
        firstName: Yup.string().min(3, 'First name is too short - should be 3 chars minimum.'),
        lastName: Yup.string().min(3, 'Last name is too short - should be 3 chars minimum.'),
        password: Yup.string().min(4, 'Password is too short - should be 4 chars minimum.'),
        passwordConfirm: Yup.string().when("password", {
            is: (password:string) => !!password && password.length > 0,
            then: (schema) => schema.required('Password confirmation is required when password is filled out.'),
            otherwise: (schema) => schema,
        }),
    });

    const formik = useFormik({
        initialValues: {
            firstName: userState.user?.firstName,
            lastName: userState.user?.lastName,
            password: '',
            passwordConfirm: '',
        } as UpdateUserFormValues,
        validationSchema: validationSchema,
        onSubmit: (values: UpdateUserFormValues) => {
            if (values.password?.length === 0) {
                delete values.password;
                delete values.passwordConfirm;
            }
            mutate(values, {
                onSuccess: (data) => {
                    const { jwt, ...user } = data;

                    dispatch(authActions.updateUser({
                        token: jwt.token,
                        expires: jwt.expiresAt,
                        user: user
                    }));

                    toast.success("User updated successfully");
                    formik.setValues({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        password: '',
                        passwordConfirm: '',
                    });
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
                <h1 className={"text-4xl border-b-2 w-full text-center py-4 font-semibold border-y-blue-900 bg-blue-900 text-white"}>Update profile</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-3 w-full pt-2 p-4">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="firstName" className="font-semibold">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            className={"bg-blue-50 border-2 text-black border-blue-200 focus:scale-x-[1.025] transition-all rounded-md px-2 py-1 focus:outline-none focus:border-blue-900"}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <small className="text-red-600">{formik.errors.firstName}</small>
                        ) : null}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="lastName" className="font-semibold">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            className={"bg-blue-50 border-2 text-black border-blue-200 focus:scale-x-[1.025] transition-all rounded-md px-2 py-1 focus:outline-none focus:border-blue-900"}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <small className="text-red-600">{formik.errors.lastName}</small>
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
                            <small className="text-red-600">{formik.errors.password}</small>
                        ) : null}
                    </div>
                    {formik.touched.password && !formik.errors.password && formik.values.password && formik.values.password.length > 0 ? (
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
                    ) : null}
                    <button disabled={isPending} type={"submit"} className={`h-16 inline-flex items-center justify-center bg-blue-400 border-2 border-blue-200 hover:border-transparent hover:bg-blue-900 p-4 w-full text-xl hover:scale-x-[1.025] transition-all font-semibold text-white hover:font-bold rounded-lg uppercase ${isPending ? "animate-pulse": ""}`}>{isPending ? <ImSpinner2 className={"animate-spin"} /> : "Update profile" }</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;