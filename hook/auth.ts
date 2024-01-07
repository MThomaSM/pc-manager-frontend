import {
    SignupFormValues,
    AuthUser,
    LoginFormValues,
    UpdateUserFormValues,
    User,
    PasswordResetFormValues, RequestPasswordResetFormValues
} from "@/interface/auth";
import {useMutation, UseMutationOptions, useQuery} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse, SuccessResponse} from "@/interface/response";
import axiosClient from "@/app/api";

const QUERY_KEY = 'users';

export const useCreateUser = (options?: UseMutationOptions<AuthUser, AxiosError<ErrorResponse>, SignupFormValues>) => {
    const mutationFn = (values: SignupFormValues): Promise<AuthUser> => {
        return axiosClient.post<SuccessResponse<AuthUser>>('/signup?XDEBUG_SESSION_START=PHPSTORM', values)
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
        return axiosClient.post<SuccessResponse<AuthUser>>('/auth?XDEBUG_SESSION_START=PHPSTORM', values)
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
        return axiosClient.patch<SuccessResponse<AuthUser>>('/users?XDEBUG_SESSION_START=PHPSTORM', values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}