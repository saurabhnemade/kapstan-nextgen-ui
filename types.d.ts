export type ApplicationItem = {
    id: number,
    name: string,
    status: 'deployed' | 'uninstalled',
    version: string,
    updatedAt: string,
    desiredVersion: string,
};

export interface MemoryUtilisationApiItem {
    id: number
    timestamp: string
    applicationId: string
    memoryUtilization: string
}

export interface MemoryUtilisationItem extends MemoryUtilisationApiItem {
    timestamp: number
    memoryUtilization: number
}

export interface CpuUtilisationApiItem {
    id: number,
    timestamp: string,
    applicationId: string
    cpuUtilization: string
}
export interface CpuUtilisationItem extends CpuUtilisationApiItem {
    timestamp: string;
    cpuUtilization: number;
}

export interface EventApiItem {
    id: number,
    event: 'Deploy' | 'Uninstall' | '',
    status: 'successful' | 'in_progress' | 'failed',
    version: string,
    timestamp: string,
    applicationId: '1'
}

export interface EventItem extends EventApiItem {
    timestamp: number
}

export interface LineChartDataItem {
    [k: string]: number
    date: string
    timestamp: number
}

export interface EnvironmentVariableItem {
    name: string;
    value: string;
    environment: string;
}
