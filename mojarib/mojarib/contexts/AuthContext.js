import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { CUSTOMER_DASHBOARD, PARTICIPANT_DASHBOARD } from '../components/const';
import { auth } from '../firebase/index';
import { getLoginPath } from '../utils/url';

const AuthContext = createContext({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const pathName = useMemo(() => router.pathname, [router.pathname]);

    useEffect(() => {
        const privatePages = [PARTICIPANT_DASHBOARD, CUSTOMER_DASHBOARD];
        const isCustomerDashboard = pathName.includes(CUSTOMER_DASHBOARD);
        const isPrivatePage =
            privatePages.includes(pathName) || isCustomerDashboard;
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user ? user : null);
            if (!(user && user.emailVerified) && isPrivatePage) {
                signOut(auth);
                router.push(
                    getLoginPath(
                        isCustomerDashboard ? CUSTOMER_DASHBOARD : pathName
                    )
                );
            }
        });
    }, [pathName, router]);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
