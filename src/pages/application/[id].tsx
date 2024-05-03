import { ComboboxItem, Flex, rem, Select, Tabs, Text } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import { IconAlertSquare, IconDeviceDesktop, IconKey } from '@tabler/icons-react';
import { format } from 'date-fns';
import { LineChartSeries } from '@mantine/charts/lib/LineChart/LineChart';
import { AppLayout } from '@/src/components/AppLayout/AppLayout';
import { PageContainer } from '@/src/components/PageContainer/PageContainer';
import { appRoutes } from '@/src/routes';
import {
    ApplicationItem,
    CpuUtilisationApiItem,
    EventApiItem,
    EventItem,
    LineChartDataItem,
    MemoryUtilisationApiItem,
} from '@/types';
import { ApplicationSummary } from '@/src/pagesComponents/application/ApplicationSummary';
import { SystemMetrics } from '@/src/pagesComponents/application/SystemMetrics';
import { EventsSummary } from '@/src/pagesComponents/application/Events';
import { EnvironmentVariablesManagement } from '@/src/pagesComponents/application/EnvironmentVariablesManagement';

export type ApplicationDashboardProps = {
    applications: Array<ApplicationItem & ComboboxItem>
    currentApplication: ApplicationItem;
    memoryUtilisation: Array<LineChartDataItem>;
    cpuUtilisation: Array<LineChartDataItem>;
    seriesData: Array<LineChartSeries>;
    events: Array<EventItem>
    defaultId?: string
};
export const ApplicationDashboard = ({
                                         applications,
                                         defaultId,
                                         currentApplication,
                                         memoryUtilisation,
                                         cpuUtilisation,
                                         seriesData,
                                         events,
                                     }: ApplicationDashboardProps) => {
    const onAppChange = (value: string | null) => {
        if (value) window.location.href = appRoutes.applications.id(value);
    };

    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <AppLayout>
            <PageContainer>
                <Flex direction="column" style={{ width: '100%' }}>
                    <Flex>
                        <Select
                          label="Applications"
                          placeholder="Select Application"
                          data={applications}
                          defaultValue={defaultId}
                          clearable={false}
                          multiple={false}
                          onChange={onAppChange}
                        />
                    </Flex>
                    <hr style={{ width: '100%' }} />
                    <Flex>
                        <Text fw={700}>{currentApplication.name}</Text>
                    </Flex>
                    <Tabs defaultValue="dashboard">
                    <Flex gap={2}>

                            <Tabs.List>
                                <Tabs.Tab value="dashboard" leftSection={<IconDeviceDesktop style={iconStyle} />}>
                                    Overview
                                </Tabs.Tab>
                                <Tabs.Tab value="variables" leftSection={<IconKey style={iconStyle} />}>
                                    Environment Variables
                                </Tabs.Tab>
                                <Tabs.Tab value="alerts" leftSection={<IconAlertSquare style={iconStyle} />}>
                                    Alerts
                                </Tabs.Tab>
                                <Tabs.Tab value="events" leftSection={<IconAlertSquare style={iconStyle} />}>
                                    Event History
                                </Tabs.Tab>
                            </Tabs.List>

                    </Flex>
                    <Flex style={{ padding: 10 }}>
                        <Tabs.Panel value="dashboard" style={{ flexGrow: 1 }}>
                            <Flex direction="column" gap={4}>
                                <Flex flex={1}>
                                    <ApplicationSummary application={currentApplication} />
                                </Flex>
                                <Flex flex={1} gap={4}>
                                    <Flex flex={1}>
                                        <SystemMetrics
                                          application={currentApplication}
                                          memoryUtilisation={memoryUtilisation}
                                          cpuUtilisation={cpuUtilisation}
                                          seriesData={seriesData}
                                        />
                                    </Flex>
                                    <Flex flex={1}>
                                        <EventsSummary events={events} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Tabs.Panel>

                        <Tabs.Panel value="variables" style={{ flexGrow: 1 }}>
                            <Flex direction="column" gap={4}>
                                <Flex flex={1}>
                                    <EnvironmentVariablesManagement />
                                </Flex>
                            </Flex>
                        </Tabs.Panel>

                        <Tabs.Panel value="alerts" style={{ flexGrow: 1 }}>
                            Alerts
                        </Tabs.Panel>
                        <Tabs.Panel value="events" style={{ flexGrow: 1 }}>
                            Event history
                        </Tabs.Panel>
                    </Flex>
                    </Tabs>
                </Flex>
            </PageContainer>
        </AppLayout>
    );
};

const formatDataMemoryUtilisation = (data: Array<MemoryUtilisationApiItem>, applicationMap: { [k: string]: string }) : Array<LineChartDataItem> => {
    const acc: any = {};
    data.forEach(item => {
        if (!acc[item.timestamp]) {
            acc[item.timestamp] = [];
        }
        acc[item.timestamp].push(item);
    });

    return Object.keys(acc).map((k: string) => {
        const dataSeries = acc[k].reduce((accc: any, curr: any) => ({
            ...accc,
            [applicationMap[curr.applicationId]]: curr.memoryUtilization,
        }), {});
        return {
            date: format(new Date(parseInt(k, 10) * 1000), 'HH:mm:ss'),
            timestamp: parseInt(k, 10) * 1000,
            ...dataSeries,
        };
    });
};

const colorRanges = ['indigo.6', 'blue.6', 'teal.6', 'red.6', 'yellow.6'];
const buildSeries = (applicationMap: { [k: string]: string }) => Object.values(applicationMap).map((value, index) => ({
        name: value,
        color: colorRanges[index],
    }));

const formatDataCpuUtilisation = (data: Array<CpuUtilisationApiItem>, applicationMap: { [k: string]: string }) : Array<LineChartDataItem> => {
    const acc: any = {};
    data.forEach(item => {
        if (!acc[item.timestamp]) {
            acc[item.timestamp] = [];
        }
        acc[item.timestamp].push(item);
    });

    return Object.keys(acc).map((k: string) => {
        const dataSeries = acc[k].reduce((accc: any, curr: any) => ({
            ...accc,
            [applicationMap[curr.applicationId]]: curr.cpuUtilization,
        }), {});
        return {
            date: format(new Date(parseInt(k, 10) * 1000), 'HH:mm:ss'),
            timestamp: parseInt(k, 10) * 1000,
            ...dataSeries,
        };
    });
};

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ id?: string }>) {
    const responses = await Promise.all([
        fetch('https://retoolapi.dev/71NNjB/applications'),
        fetch('https://retoolapi.dev/ybFVVH/memoryutilization'),
        fetch('https://retoolapi.dev/Ymxfa2/cpuutilization'),
        fetch('https://retoolapi.dev/TYjDIe/eventhistory'),
    ]);

    const data = await Promise.all(responses.map(response => response.json()));

    const applicationsItems = data[0] as Array<ApplicationItem>;

    const applications: Array<ApplicationItem & ComboboxItem>
        = applicationsItems.map(i => ({ ...i, label: i.name, value: i.id.toString() }));

    const applicationNameMap: { [k: string]: string } = applications.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr.name,
    }), {} as { [k: string]: string });

    const currentApplication = applications.find(i => i.value === params?.id);

    const formattedMemoryUtilisation: Array<LineChartDataItem> = formatDataMemoryUtilisation(data[1] as Array<MemoryUtilisationApiItem>, applicationNameMap);
    const formattedCpuUtilisation: Array<LineChartDataItem> = formatDataCpuUtilisation(data[2] as Array<CpuUtilisationApiItem>, applicationNameMap);
    const events: Array<EventItem> = (data[3] as Array<EventApiItem>)
        .map(k => ({
            ...k,
            timestamp: parseInt(k.timestamp, 10) * 1000,
        }));
    const seriesData = buildSeries(applicationNameMap);

    return {
        props: {
            applications,
            defaultId: params?.id,
            currentApplication,
            memoryUtilisation: formattedMemoryUtilisation,
            cpuUtilisation: formattedCpuUtilisation,
            seriesData,
            events,
        },
    };
}

export default ApplicationDashboard;
