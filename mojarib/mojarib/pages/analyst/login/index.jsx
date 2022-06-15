import { useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import { useRouter } from 'next/router';

import LoginForm from '../../../components/LoginForm';

import { ANALYST } from '../../../firebase/const';
import { ANALYST_DASHBOARD } from '../../../components/const';

const AnalystLogin = () => {
    const { isLogIn, isAuthorized } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLogIn) {
            isAuthorized(ANALYST)
                .then((res) => {
                    res && router.push(ANALYST_DASHBOARD);
                })
                .catch((e) => {
                    console.log(e?.message);
                });
        }
    }, [isAuthorized, isLogIn, router]);

    const onLoginSuccess = () => {
        router.push(ANALYST_DASHBOARD);
    };

    return (
        <LoginForm
            onSuccessCallback={onLoginSuccess}
        />
    );
};

export default AnalystLogin;
