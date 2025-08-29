// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconHome, IconUser, IconUsers, IconSend, IconHistory, IconUserCircle, IconDeviceMobile } from '@tabler/icons-react';

const icons = {
    IconHome: IconHome,
    IconUser: IconUser,
    IconUsers: IconUsers,
    IconSend: IconSend,
    IconHistory: IconHistory,
    IconUserCircle: IconUserCircle,
    IconDeviceMobile: IconDeviceMobile
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconHome,
    type: 'group',
    children: [
        {
            id: 'dashboard-main',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'user',
            title: 'User',
            type: 'item',
            url: '/dashboard/user',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'role',
            title: 'Role',
            type: 'item',
            url: '/dashboard/role',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'send-pakges',
            title: 'Send Pakges',
            type: 'item',
            url: '/dashboard/send-packages',
            icon: icons.IconSend,
            breadcrumbs: false
        },
        {
            id: 'transaction-history',
            title: 'Transaction History',
            type: 'item',
            url: '/dashboard/transaction-history',
            icon: icons.IconHistory,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/dashboard/profile',
            icon: icons.IconUserCircle,
            breadcrumbs: false
        },
        {
            id: 'mobile-packages',
            title: 'Mobile Packages',
            type: 'item',
            url: '/dashboard/mobile-packages',
            icon: icons.IconDeviceMobile,
            breadcrumbs: false
        },
         {
            id: 'mobile-networks',
            title: 'Mobile Networks',
            type: 'item',
            url: '/dashboard/mobile-networks',
            icon: icons.IconDeviceMobile,
            breadcrumbs: false
        },
         {
            id: 'data-packeges',
            title: 'Data Packeges',
            type: 'item',
            url: 'dashboard/data-packages',
            icon: icons.IconDeviceMobile,
            breadcrumbs: false
        },
        {
            id: 'data-category',
            title: 'Data Packeges Category',
            type: 'item',
            url: 'dashboard/category-table',
            icon: icons.IconDeviceMobile,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
