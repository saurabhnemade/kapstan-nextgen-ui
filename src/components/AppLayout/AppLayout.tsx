import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import React from 'react';
import { Flex, MantineProvider } from '@mantine/core';
import { SideBar } from '@/src/components/Sidebar/Sidebar';
import { mantineCssVariablesResolver, theme } from '@/theme';

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
    <MantineProvider theme={theme} cssVariablesResolver={mantineCssVariablesResolver}>
            <Flex direction="row">
                <Flex>
                    <SideBar />
                </Flex>
                <Flex flex={1} style={{ flexGrow: 1 }}>
                    {children}
                </Flex>
            </Flex>
    </MantineProvider>
    );
