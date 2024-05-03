'use client';

import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconLogout, IconArrowLeft, IconArrowRight,
} from '@tabler/icons-react';
import Image from 'next/image';
import classes from './Sidebar.module.css';
import LogoCompact from './logo-compact.svg';
import LogoFull from './logo-full.svg';

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
              onClick={onClick}
              className={classes.link}
              data-active={active || undefined}>
                <Icon style={{ width: rem(20), height: rem(20) }} color={active ? 'white' : 'white'} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
];

export const SideBar = () => {
    const [active, setActive] = useState(2);
    const [collapsed, setCollapsed] = useState(false);

    const links = mockdata.map((link, index) => (
        <NavbarLink
          {...link}
          key={link.label}
          active={index === active}
          onClick={() => setActive(index)}
        />
    ));

    return (
        <nav className={classes.navbar} data-expanded={collapsed || undefined}>
            <Center style={{ paddingTop: 10 }}>
                <Image
                  priority
                  src={collapsed ? LogoFull : LogoCompact}
                  height={32}
                  width={collapsed ? 120 : 32}
                  alt="Kapstan" />
            </Center>
            <hr className={classes.separator} />

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={collapsed ? IconArrowLeft : IconArrowRight} label="Change account" onClick={() => setCollapsed(!collapsed)} />
                <NavbarLink icon={IconLogout} label="Logout" />
            </Stack>
        </nav>
    );
};
