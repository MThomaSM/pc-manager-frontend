export interface StartlistDetailed {
    id: string;
    startAt: string;
    executedAt: string;
    computerId: string;
    computerName: string;
    macAddress: string;
    deviceName: string;
    deviceId: string;
    updatedAt: string;
}

export interface StartlistMeta {
    page: number;
    maxPage: number;
    perPage: number;
    total: number;
}

export interface Startlist {
    id: string;
    deviceId: string;
    computerId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    startAt: string;
    executedAt: string;
}

export interface StartlistWakeValues {
    deviceId: string;
    computerId: string;
}