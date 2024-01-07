import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from "axios";
import {ErrorResponse, Mode, SuccessResponse} from "@/interface/response";
import axiosClient from "@/app/api";
import {Device, DeviceFormValues} from "@/interface/device";

const QUERY_KEY = 'devices';


export const useGetDevices = (options?: Partial<UseQueryOptions<Device[], AxiosError<ErrorResponse>>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<Device[]>>('/devices')
            .then(response => response.data.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn,
        ...options,
    });
};

export const useGetDevice = (id: string, options?: Partial<UseQueryOptions<Device, AxiosError<ErrorResponse>>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<Device>>(`/devices/${id}`)
            .then(response => response.data.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn,
        ...options
    });
};

export const useDeleteDevice = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>, string>) => {
    const mutationFn = (id: string): Promise<null> => {
        return axiosClient.delete<SuccessResponse<null>>(`/devices/${id}`)
            .then(response => {
                return null;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}


export const useCreateDevice = (options?: UseMutationOptions<Device, AxiosError<ErrorResponse>, DeviceFormValues>) => {
    const mutationFn = (values: DeviceFormValues): Promise<Device> => {
        return axiosClient.post<SuccessResponse<Device>>('/devices?XDEBUG_SESSION_START=PHPSTORM', values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}



export const useUpdateDevice = (options?: UseMutationOptions<Device, AxiosError<ErrorResponse>, DeviceFormValues>) => {
    const mutationFn = (values: DeviceFormValues): Promise<Device> => {
        return axiosClient.patch<SuccessResponse<Device>>('/devices?XDEBUG_SESSION_START=PHPSTORM', values)
            .then(response => {
                return response.data.data;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}

export const useCreateOrUpdateDevice = (options?: UseMutationOptions<Device, AxiosError<ErrorResponse>, [Mode, DeviceFormValues]>) => {
    const mutationFn = ([mode, values]: [Mode, DeviceFormValues]): Promise<Device> => {
        if (mode === "CREATE") {
            return axiosClient.post<SuccessResponse<Device>>('/devices?XDEBUG_SESSION_START=PHPSTORM', values)
                .then(response => response.data.data);
        } else if (mode === "UPDATE") {
            return axiosClient.patch<SuccessResponse<Device>>(`/devices/${values.id}?XDEBUG_SESSION_START=PHPSTORM`, values)
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