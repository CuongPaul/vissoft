import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useTrans from '../../../hooks/useTrans';
import styles from './Login.module.scss';
import { Language } from 'components';
import SocialAuth from '../../../components/SocialAuth';
import useParticipantSocialAuth from '../../../hooks/useParticipantSocialAuth';
import {
    CUSTOMER_LOGIN,
    CUSTOMER_REGISTER,
    FORGOT_PASSWORD,
    PARTICIPANT_DASHBOARD,
    PARTICIPANT_REGISTER,
} from '../../../components/const';
import Link from 'next/link';
import useUser from '../../../hooks/useUser';
import { useAuth } from '../../../contexts/AuthContext';
import LoginForm from '../../../components/LoginForm';

const ParticipantLogin = () => {
    const trans = useTrans();
    const router = useRouter();
    const { locale } = router;
    const { currentUser } = useAuth();
    const { isLogIn, logOut } = useUser();
    const { socialAuthFail, socialAuthSuccess } = useParticipantSocialAuth();
    const {
        heading,
        forgotPassword,
        createAccount,
        customerLogin,
        customerRegister,
    } = trans.login.participant;

    const onLoginSuccess = () => {
        router.push(PARTICIPANT_DASHBOARD);
    };

    useEffect(() => {
        if (isLogIn) {
            router.push(PARTICIPANT_DASHBOARD);
        } else {
            if (currentUser && currentUser.email && !currentUser.emailVerified) {
                logOut();
                setTimeout(() => {
                    alert('You need to verify your email account.');
                }, 2000);
            }
        }
    }, [currentUser, isLogIn, logOut, router]);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.main_content}
                dir={(locale === 'ar' && 'rtl') || 'ltr'}
            >
                <div className={styles.language}>
                    <Language lang={locale} />
                </div>
                <div className={styles.left}>
                    <div className={styles.top}>
                        <h2 className={styles.heading}>{heading}</h2>
                    </div>

                    <LoginForm
                        onSuccessCallback={onLoginSuccess}
                    >
                        <div className={styles.link_to_page}>
                            <Link href={FORGOT_PASSWORD}>
                                <a>{forgotPassword}</a>
                            </Link>
                            <Link href={PARTICIPANT_REGISTER}>
                                <a>{createAccount}</a>
                            </Link>
                        </div>
                    </LoginForm>

                    <div className={styles.customer}>
                        <Link href={CUSTOMER_LOGIN}>
                            <a>{customerLogin}</a>
                        </Link>
                        <Link href={CUSTOMER_REGISTER}>
                            <a>{customerRegister}</a>
                        </Link>
                    </div>
                </div>
                <div className={styles.right}>
                    <SocialAuth
                        labels={{
                            google: 'Login with Google',
                            facebook: 'Login with Facebook',
                        }}
                        onFail={socialAuthFail}
                        onSuccess={socialAuthSuccess}
                    />
                </div>
            </div>
        </div>
    );
};

export default ParticipantLogin;
