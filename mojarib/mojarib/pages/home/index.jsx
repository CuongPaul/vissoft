import { useRouter } from 'next/router';

import styles from './Home.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import {
    PARTICIPANT_DASHBOARD,
    PARTICIPANT_LOGIN,
    PARTICIPANT_REGISTER,
} from '../../components/const';

const Home = () => {
    const router = useRouter();
    const { currentUser } = useAuth();

    const handleClickRedirectToCustomerLogin = () => {
        router.push('customer/register');
    };
    const handleClickRedirectToParticipantLogin = () => {
        let target = PARTICIPANT_REGISTER;
        if (currentUser) {
            target = currentUser.emailVerified
                ? PARTICIPANT_DASHBOARD
                : PARTICIPANT_LOGIN;
        }
        router.push(target);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.main_content}>
                <div className={styles.heading}>Home page</div>
                <div
                    className={styles.call_action}
                    onClick={handleClickRedirectToCustomerLogin}
                >
                    Customer register
                </div>
                <div
                    className={styles.call_action}
                    onClick={handleClickRedirectToParticipantLogin}
                >
                    Participant register
                </div>
            </div>
        </div>
    );
};

export default Home;
