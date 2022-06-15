import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Language } from '../Language';
import styles from './Header.module.scss';
import useTrans from '../../hooks/useTrans';
import {
    CUSTOMER_LOGIN,
    HOMEPAGE,
} from '../const';
import { logo, account } from '../../public/images';
import { useAuth } from '../../contexts/AuthContext';
import useUser from '../../hooks/useUser';
import { useMemo } from 'react';
import {getLoginPath} from '../../utils/url';

export const Header = () => {
    const trans = useTrans();
    const router = useRouter();
    const { currentUser } = useAuth();
    const { logOut } = useUser();

    const handleClickLogo = () => {
        router.push(HOMEPAGE);
    };

    const signOutTarget = useMemo(() => {
        const { pathname } = router;
        return getLoginPath(pathname);
    }, [router]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.logo} onClick={handleClickLogo}>
                    <Image src={logo} alt='Logo' />
                </div>
                <div className={styles.menu}>
                    <div className={styles.navigation}>
                        <Link href='/'>
                            <a>{trans.header.how_work}</a>
                        </Link>
                    </div>
                    <div className={styles.navigation}>
                        <Link href='/'>
                            <a>{trans.header.prices}</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.button}>
                    <Link href='/'>
                        <a>{trans.header.get_paid}</a>
                    </Link>
                </div>
                <div className={styles.login}>
                    <Image src={account} alt='Account' />
                    <Link href={CUSTOMER_LOGIN}>
                        <a>{trans.header.login}</a>
                    </Link>
                </div>
                <div className={styles.language}>
                    <Language lang={router.locale} />
                </div>
                {currentUser && (
                    <div
                        className={styles.logout}
                        onClick={() =>
                            logOut({
                                success: 'Logout successfully',
                                fail: 'Logout failure',
                                target: signOutTarget,
                            })
                        }
                    >
                        Logout
                    </div>
                )}
            </div>
        </div>
    );
};
