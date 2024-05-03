'use client';

import { Badge, Button, Card, CloseButton, Collapse, Flex, Group, Text } from '@mantine/core';
import {
    IconArrowDown,
    IconArrowUp,
    IconCircleCheckFilled,
    IconCircleDotFilled,
    IconInfoCircle, IconInfoCircleFilled,
} from '@tabler/icons-react';
import { useState } from 'react';
import { ApplicationItem } from '@/types';

export interface ApplicationSummaryProps {
    application: ApplicationItem
}

const isDeployable = (version: string, desiredVersion: string) => {
    if (version !== desiredVersion) {
        return true;
    }
    return false;
};
export const ApplicationSummary = (props: ApplicationSummaryProps) => {
    const [open, setOpen] = useState(true);
    const { version, desiredVersion } = props.application;

    const isDeployEnabled = isDeployable(version, desiredVersion);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flexGrow: 1 }}>
            <Card.Section>
                <Flex justify="space-between" style={{ padding: 10 }}>
                    <Text fw={700}>Service Info</Text>
                    <CloseButton
                      icon={open ? <IconArrowUp /> : <IconArrowDown />}
                      onClick={() => setOpen(!open)} />
                </Flex>

            </Card.Section>

            <Collapse in={open}>
                <Flex gap="md">
                    <Flex direction="column">
                        <Text>Current Version</Text>
                        <Flex gap="xs">
                            {version === desiredVersion ? <IconCircleCheckFilled color="green" /> : <IconInfoCircle color="blue" />}
                            <Text>{version}</Text>
                        </Flex>

                    </Flex>

                    <Flex direction="column">
                        <Text>Desired Version</Text>
                        <Text>{desiredVersion}</Text>
                    </Flex>
                </Flex>

                {isDeployEnabled &&
                    <Button mt="md" radius="md">
                        Deploy
                    </Button>
                }

            </Collapse>

        </Card>
    );
};
