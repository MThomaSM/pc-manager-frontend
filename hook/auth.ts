import {
    SignupFormValues,
    AuthUser,
    LoginFormValues,
    UpdateUserFormValues,
    User,
    PasswordResetFormValues, RequestPasswordResetFormValues
} from "@/interface/auth";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ErrorResponse, SuccessResponse} from "@/interface/response";
import axiosClient from "@/app/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useEffect, useState} from "react";
import {authActions} from "@/store/auth-slice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const QUERY_KEY = 'users';

export const useCreateUser = (options?: UseMutationOptions<AuthUser, AxiosError<ErrorResponse>, SignupFormValues>) => {
    const mutationFn = (values: SignupFormValues): Promise<AuthUser> => {
        return axiosClient.post<SuccessResponse<AuthUser>>('/signup', values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useLoginUser = (options?: UseMutationOptions<AuthUser, AxiosError<ErrorResponse>, LoginFormValues>) => {
    const mutationFn = (values: LoginFormValues): Promise<AuthUser> => {
        return axiosClient.post<SuccessResponse<AuthUser>>('/auth', values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useGetUserByPasswordResetToken = (token: string, options?: UseMutationOptions<User, AxiosError<ErrorResponse>, string>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<User>>(`/users/password-reset/${token}`)
            .then(response => response.data.data);
    }

    return useQuery({
        queryKey: [QUERY_KEY, token],
        queryFn,
        ...options
    });
}

export const useGetClientIp = (options?: UseMutationOptions<string, AxiosError<ErrorResponse>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<string>>('/getIp')
            .then(response => response.data.data);
    }

    return useQuery({
        queryKey: [QUERY_KEY, "getIp"],
        queryFn,
        ...options
    });

}

export const useUpdateUserPassword = (options?: UseMutationOptions<User, AxiosError<ErrorResponse>, [string, PasswordResetFormValues]>) => {
    const mutationFn = ([token, values]: [string, PasswordResetFormValues]): Promise<User> => {
        return axiosClient.patch<SuccessResponse<User>>(`/users/password-reset/${token}`, values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useRequestPasswordReset = (options?: UseMutationOptions<boolean, AxiosError<ErrorResponse>, RequestPasswordResetFormValues>) => {
    const mutationFn = (values: RequestPasswordResetFormValues): Promise<boolean> => {
        return axiosClient.post<SuccessResponse<boolean>>('/users/password-request', values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useUpdateUser = (options?: UseMutationOptions<AuthUser, AxiosError<ErrorResponse>, UpdateUserFormValues>) => {
    const mutationFn = (values: UpdateUserFormValues): Promise<AuthUser> => {
        return axiosClient.patch<SuccessResponse<AuthUser>>('/users', values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useUser = (): {
    user: User | undefined,
    logoutHandler: () => void
} => {
    const dispatch = useDispatch();
    const router = useRouter();

    const userState = useSelector((state: RootState) => state.auth);
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        if (!userState.user) return;

        if(userState.jwt.expiresAt*1000 < Date.now()) {
            dispatch(authActions.logoutUser());
            toast.info("Your session has expired, please log in again", {toastId: "session-expired"});
            router.push("/system/login");
            return;
        }

        setLoggedInUser(userState.user);
    }, [dispatch, router, userState.jwt.expiresAt, userState.user]);

    const logout = () => {
        dispatch(authActions.logoutUser());
        setLoggedInUser(undefined);
        toast.info("Logged out successfully");
        router.push("/");
    }

    return {user: loggedInUser, logoutHandler: logout}
}