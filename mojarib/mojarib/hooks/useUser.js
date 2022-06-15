import { useAuth } from '../contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { isAuthorized as checkAuthorized } from '../firebase/user';
import { signOutByFirebase } from '../firebase/customer';
import { useRouter } from 'next/router';

const useUser = () => {
    const { currentUser } = useAuth();
    const { uid = '', emailVerified = false, email = '' } = currentUser || {};
    const router = useRouter();

    const isLogIn = useMemo(() => {
        if (uid && email) {
            return emailVerified;
        }

        return false;
    }, [email, emailVerified, uid]);

    const isAuthorized = useCallback(
        async (role) => {
            return await checkAuthorized(email, role);
        },
        [email]
    );

    const logOut = ({ success = '', fail = '', target = '' } = {}) => {
        signOutByFirebase()
            .then(() => {
                router.push(target);
                success && alert(success);
            })
            .catch(() => fail && alert(fail));
    };

    return { isLogIn, isAuthorized, logOut };
};

export default useUser;
