export interface SuccessResponse<Data,Metadata = undefined> {
    status: 'success';
    data: Data;
    meta?: Metadata;
}

export interface ErrorResponse {
    status: 'error';
    message: string | string[];
}

export interface RequestOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export type Mode = "CREATE" | "UPDATE";