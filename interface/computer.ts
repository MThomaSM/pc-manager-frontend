
export interface Computer {
    id: string;
    name: string;
    deviceId: string;
    macAddress: string;
    deviceName: string;
}

export interface ComputerWakeBulkItem {
    computerId: string;
    startAt: string;
}

export interface ComputerFormValues {
    deviceId: string;
    name: string;
    macAddress: string;
    id: string;
}