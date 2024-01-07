import {AxiosError} from "axios";
import {ErrorResponse, SuccessResponse} from "@/interface/response";
import axiosClient from "@/app/api";
import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "@tanstack/react-query";
import {Startlist, StartlistDetailed, StartlistMeta} from "@/interface/startlist";
import {Computer, ComputerWakeBulkItem} from "@/interface/computer";

const QUERY_KEY = 'startlist';

export const useWakeComputer = (options?: UseMutationOptions<Startlist, AxiosError<ErrorResponse>, Computer>) => {
    const mutationFn = (values: Computer): Promise<Startlist> => {
        return axiosClient.post<SuccessResponse<Startlist>>(`/startlist/${values.deviceId}/wake/${values.id}?XDEBUG_SESSION_START=PHPSTORM`, values)
            .then(response => response.data.data);
    };

    return useMutation({
        mutationFn,
        ...options,
    });
};

export const useWakeComputerBulk = (options?: UseMutationOptions<Startlist, AxiosError<ErrorResponse>, [string,ComputerWakeBulkItem[]]>) => {
    const mutationFn = ([deviceId,values]: [string, ComputerWakeBulkItem[]]): Promise<Startlist> => {
        return axiosClient.post<SuccessResponse<Startlist>>(`/startlist/${deviceId}/bulk?XDEBUG_SESSION_START=PHPSTORM`, values)
            .then(response => response.data.data);
    };

    return useMutation({
        mutationFn,
        ...options,
    });
};


export const useGetStartlist = (deviceId: string, page: number = 1, options?: Partial<UseQueryOptions<SuccessResponse<StartlistDetailed[], StartlistMeta>, AxiosError<ErrorResponse>>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<StartlistDetailed[], StartlistMeta>>(`/startlist/${deviceId}?page=${page}`)
            .then(response => response.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY, deviceId, page],
        queryFn,
        ...options
    });
};

export const useDeleteStartlistByComputer = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>, Computer>) => {
    const mutationFn = (values: Computer): Promise<null> => {
        return axiosClient.delete<SuccessResponse<null>>(`/startlist/${values.deviceId}/${values.id}`)
            .then(response => {
                return null;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useDeleteStartlist = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>, string>) => {
    const mutationFn = (id: string): Promise<null> => {
        return axiosClient.delete<SuccessResponse<null>>(`/startlist/${id}`)
            .then(response => {
                return null;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}