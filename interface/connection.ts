
export interface Connection {
    id: string;
    type: ConnectionType;
    name: string;
    serverIp: string;
    serverFrpPort: number;
    remotePort: number;
    localPort: number;
    computerId: string;
    localIp: string;
    // computerName: string;
    // macAddress: string;
}

export interface ConnectionFormValues {
    type: ConnectionType;
    name: string;
    remotePort: number;
    localPort: number;
    localIp: string;
}

export type ConnectionType = keyof typeof ConnectionTypeEnum;

export enum ConnectionTypeEnum {
    TCP = 'TCP',
    UDP = 'UDP',
    // HTTP = 'HTTP', todo implement
    // HTTPS = 'HTTPS',
}