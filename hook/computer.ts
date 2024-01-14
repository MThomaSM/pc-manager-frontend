import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from "axios";
import {ErrorResponse, Mode, SuccessResponse} from "@/interface/response";
import axiosClient from "@/app/api";
import {Computer, ComputerFormValues} from "@/interface/computer";


const QUERY_KEY = 'computers';
export const useGetComputers = (options?: UseQueryOptions<Computer[], AxiosError<ErrorResponse>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<Computer[]>>('/computers')
            .then(response => response.data.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn,
        ...options,
    });
};

export const useGetComputer = (id: string, options?: Partial<UseQueryOptions<Computer, AxiosError<ErrorResponse>>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<Computer>>(`/computers/${id}`)
            .then(response => response.data.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn,
        ...options
    });
};

export const useGetComputersByDeviceId = (deviceId: string, options?: Partial<UseQueryOptions<Computer[], AxiosError<ErrorResponse>>>) => {
    const queryFn = () => {
        return axiosClient.get<SuccessResponse<Computer[]>>(`/devices/${deviceId}/computers`)
            .then(response => response.data.data);
    };

    return useQuery({
        queryKey: [QUERY_KEY, deviceId],
        queryFn,
        ...options
    });
}

export const useDeleteComputer = (options?: UseMutationOptions<null, AxiosError<ErrorResponse>, string>) => {
    const mutationFn = (id: string): Promise<null> => {
        return axiosClient.delete<SuccessResponse<null>>(`/computers/${id}`)
            .then(response => {
                return null;
            });
    };

    return useMutation({
        mutationFn,
        ...options,
    });
}


export const useCreateOrUpdateComputer = (options?: UseMutationOptions<Computer, AxiosError<ErrorResponse>, [Mode, ComputerFormValues]>) => {
    const mutationFn = ([mode, values]: [Mode, ComputerFormValues]): Promise<Computer> => {
        if (mode === "CREATE") {
            return axiosClient.post<SuccessResponse<Computer>>('/computers', values)
                .then(response => response.data.data);
        } else if (mode === "UPDATE") {
            return axiosClient.patch<SuccessResponse<Computer>>(`/computers/${values.id}`, values)
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