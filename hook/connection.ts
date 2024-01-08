import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ErrorResponse, Mode, SuccessResponse} from "@/interface/response";
import axiosClient from "@/app/api";
import {Connection, ConnectionFormValues} from "@/interface/connection";
import fileDownload from "js-file-download";

const QUERY_KEY = 'connections';

export const useCreateOrUpdateConnection = (computerId: string, connectionId: string, options?: UseMutationOptions<Connection, AxiosError<ErrorResponse>, [ConnectionFormValues, Mode]>) => {
    const mutationFn = ([values, mode]: [ConnectionFormValues, Mode]): Promise<Connection> => {
        if (mode === "CREATE") {
            return axiosClient.post<SuccessResponse<Connection>>(`/connections/${computerId}?XDEBUG_SESSION_START=PHPSTORM`, values)
                .then(response => response.data.data);
        } else if (mode === "UPDATE") {
            return axiosClient.patch<SuccessResponse<Connection>>(`/connections/${computerId}/${connectionId}?XDEBUG_SESSION_START=PHPSTORM`, values)
                .then(response => response.data.data);
        } else {
            throw new Error("Invalid mode");
        }
    };

    return useMutation({
        mutationFn,
        ...options,
    });
};

export const useGetConnection = (connectionId: string, options?: Partial<UseQueryOptions<Connection, AxiosError<ErrorResponse>>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<Connection>>(`/connections/${connectionId}`)
            .then(response => response.data.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY, connectionId],
        queryFn,
        ...options
    });
}

export const useGetConnectionsByComputerId = (computerId: string, options?: Partial<UseQueryOptions<Connection[], AxiosError<ErrorResponse>>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<Connection[]>>(`/computers/${computerId}/connections`)
            .then(response => response.data.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY, computerId],
        queryFn,
        ...options
    });
}

export const useDeleteConnection = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>, [string, string]>) => {
    const mutationFn = ([computerId, connectionId]: [string, string]) => {
        return axiosClient.delete<SuccessResponse<null>>(`/connections/${computerId}/${connectionId}`)
            .then(response => {
                return null;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useDownloadConnection = (options?: UseMutationOptions<void, AxiosError<ErrorResponse>, [string, string]>) => {
    const mutationFn = ([computerId, type]: [string, string]) => {
        return axiosClient.get(`/computers/${computerId}/download?type=${type}`, {
            responseType: 'blob'
        }).then(response => {
            fileDownload(response.data, type === "config" ? "config.ini" : "client.zip");
        });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
};