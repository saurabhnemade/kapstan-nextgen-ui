import { Card, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import { EnvironmentVariableItem } from '@/types';

export const EnvironmentVariablesManagement = ({ envVariables }: { envVariables: Array<EnvironmentVariableItem> }) => {
    const [envVars] = useState<Array<EnvironmentVariableItem>>(envVariables ?? []);
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flexGrow: 1 }}>
            <Card.Section>
                <Flex justify="space-between" style={{ padding: 10 }}>
                    <Text fw={700}>Environment Variables</Text>
                </Flex>
            </Card.Section>

            {
                envVars.length === 0 ? (
                    <Text>No environment variables found.</Text>
                ) : (
                    <div>
                        abcd
                    </div>
                )
            }
        </Card>
    );
};
