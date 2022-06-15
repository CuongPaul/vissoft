import {useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {GoogleAuthProvider} from 'firebase/auth';

import styles from './account.module.scss';
import {Sidebar} from 'components/Sidebar';
import Profile from '../../../components/participant/Profile';
import Heading from '../../../components/modules/Heading';
import {NOTIFICATIONS, PARTICIPANT_DASHBOARD, PROFILE, SETTINGS, TESTS} from '../../../components/const';
import useTrans, {useFormatMessage} from '../../../hooks/useTrans';
import {FACEBOOK_PROVIDER, GOOGLE_PROVIDER} from '../../../firebase/const';
import Settings from '../../../components/participant/Settings';
import useUser from '../../../hooks/useUser';

const ParticipantAccount = () => {
    const CURRENT_ITEM_KEY = 'participant-current-item';
    const MESSAGE_DELAY = 1000;
    const DEFAULT_ITEM = useMemo(() => ({ value: PROFILE, label: 'Profile' }), []);
    const router = useRouter();
    const {isLogIn} = useUser();
    const {GOOGLE_SIGN_IN_METHOD} = GoogleAuthProvider;
    const {socialSignInSuccess} = useTrans();
    const formatMessage = useFormatMessage();
    const listItems = [
        { value: NOTIFICATIONS, label: 'Notifications' },
        { value: TESTS, label: 'My tests' },
        { value: PROFILE, label: 'Profile' },
        { value: SETTINGS, label: 'Account settings' },
    ];
    const [selectedItem, setSelectedItem] = useState(DEFAULT_ITEM);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setSelectedItem(JSON.parse(localStorage.getItem(CURRENT_ITEM_KEY)) ?? DEFAULT_ITEM);
    }, [DEFAULT_ITEM]);

    useEffect(() => {
        localStorage.setItem(CURRENT_ITEM_KEY, JSON.stringify(selectedItem));
    }, [selectedItem]);

    useEffect(() => {
        if (!isShow) {
            const {provider = ''} = router.query;
            if (provider) {
                const message = formatMessage(
                    socialSignInSuccess,
                    {'provider': provider === GOOGLE_SIGN_IN_METHOD && GOOGLE_PROVIDER || FACEBOOK_PROVIDER}
                );
                router.push(PARTICIPANT_DASHBOARD);
                setTimeout(() => {
                    alert(message);
                }, MESSAGE_DELAY);
            }
            setIsShow(true);
        }
    }, [GOOGLE_SIGN_IN_METHOD, formatMessage, isShow, isLogIn, router, router.query, socialSignInSuccess]);

    return (
        <>
            <Heading type="h1" elementProps={{className: styles.heading}}>
                {selectedItem.value === PROFILE && `My ${selectedItem.label}` || selectedItem.label}
            </Heading>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Sidebar
                        listItems={listItems}
                        setSelectedItem={setSelectedItem}
                        currentItem={selectedItem}
                    />
                </div>
                <div className={styles.right}>
                    {selectedItem.value === PROFILE && <Profile/>}
                    {selectedItem.value === SETTINGS && <Settings/>}
                </div>
            </div>
        </>
    );
};

export default ParticipantAccount;
