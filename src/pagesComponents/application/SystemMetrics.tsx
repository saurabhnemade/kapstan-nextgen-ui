import { Card, Flex, Tabs, Text } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { LineChartSeries } from '@mantine/charts/lib/LineChart/LineChart';
import { ApplicationItem, LineChartDataItem } from '@/types';

export interface SystemMetricsProps {
    application: ApplicationItem,
    memoryUtilisation: Array<LineChartDataItem>
    cpuUtilisation: Array<LineChartDataItem>
    seriesData: Array<LineChartSeries>
}
export const SystemMetrics = (props: SystemMetricsProps) => (
        <Card shadow="sm" style={{ flexGrow: 1 }} padding="lg" radius="md" withBorder>
            <Card.Section>
                <Flex justify="space-between" style={{ padding: 10 }}>
                    <Text fw={700}>System Metrics</Text>
                </Flex>
            </Card.Section>
            <Tabs defaultValue="memory">
                <Tabs.List>
                    <Tabs.Tab value="cpu">
                        CPU
                    </Tabs.Tab>
                    <Tabs.Tab value="memory">
                        Memory
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="cpu">
                    <LineChart
                      h={300}
                      data={props.memoryUtilisation}
                      dataKey="date"
                      withLegend
                      legendProps={{ verticalAlign: 'bottom', height: 50 }}
                      series={props.seriesData}
                      curveType="monotone"
                    />
                </Tabs.Panel>

                <Tabs.Panel value="memory">
                    <LineChart
                      h={300}
                      data={props.cpuUtilisation}
                      dataKey="date"
                      withLegend
                      legendProps={{ verticalAlign: 'bottom', height: 50 }}
                      series={props.seriesData}
                      curveType="monotone"
                    />
                </Tabs.Panel>
            </Tabs>
        </Card>
    );
