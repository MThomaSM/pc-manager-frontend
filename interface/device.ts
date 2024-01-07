
export interface Device {
    id: string;
    userId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    lastActiveAt: number;
}

export interface DeviceFormValues {
    name: string;
    id: string;
}