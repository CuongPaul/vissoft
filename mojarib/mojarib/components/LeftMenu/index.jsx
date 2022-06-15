import clsx from 'clsx';
import { useRouter } from 'next/router';

import styles from './LeftMenu.module.scss';

export const LeftMenu = ({ itemSelected }) => {
    const itemList = [
        {
            value: 'profile',
            label: 'Company Profile',
            pathName: '/customer/account/profile',
        },
        {
            value: 'tests',
            label: 'Manage Tests',
            pathName: '/customer/account/test-list',
        },
        {
            value: 'settings',
            label: 'Account Settings',
            pathName: '/customer/account/setting',
        },
        {
            value: 'users',
            label: 'Company Users',
            pathName: '/customer/account/user',
        },
        {
            value: 'notifications',
            label: 'Notifications',
            pathName: '/customer/account/notification',
        },
    ];
    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <ul>
                {itemList.map((item) => (
                    <li
                        key={item.value}
                        className={
                            itemSelected != item.value
                                ? styles.item
                                : clsx(styles.item, styles.selected)
                        }
                        onClick={() => router.push(item.pathName)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
