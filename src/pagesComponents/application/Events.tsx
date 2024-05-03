import { Badge, Card, Flex, Table, Text } from '@mantine/core';
import { formatRelative } from 'date-fns';
import { EventItem } from '@/types';

const renderStatus = (status: 'successful' | 'in_progress' | 'failed') => {
    switch (status) {
        case 'successful':
            return <Badge color="green">Successful</Badge>;
        case 'in_progress':
            return <Badge color="yellow">In progress</Badge>;
        case 'failed':
            return <Badge color="red">Failed</Badge>;
        default:
            return <Badge color="gray">Unknown</Badge>;
    }
};

export const EventsSummary = ({ events }: { events: Array<EventItem> }) => {
    const filteredEvents = events.slice(0, 5);
    return (
        <Card shadow="sm" style={{ flexGrow: 1 }} padding="lg" radius="md" withBorder>
            <Card.Section>
                <Flex style={{ padding: 10 }}>
                    <Text fw={700}>Events</Text>
                </Flex>

            </Card.Section>

            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Event</Table.Th>
                        <Table.Th>Version</Table.Th>
                        <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{filteredEvents.map((event) => (
                    <Table.Tr key={event.id}>
                        <Table.Td>
                            <Flex direction="column">
                                <div>{event.event}</div>
                                <div>{formatRelative(new Date(event.timestamp), new Date())}</div>
                            </Flex>
                        </Table.Td>
                        <Table.Td>{event.version}</Table.Td>
                        <Table.Td>{renderStatus(event.status)}</Table.Td>
                    </Table.Tr>
                ))}
                </Table.Tbody>
            </Table>
        </Card>
    );
};
