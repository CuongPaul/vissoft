import React, {useState, useEffect, useContext, createContext} from "react";
import {onAuthStateChanged, signOut, beforeAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/router";

import {auth} from "../../firebase/index";
import {isAdminExist} from "../../firebase/admin";
import Preloader from "src/components/Preloader";
const AuthContext = createContext({currentUser: null, createdAccount: null});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({children}) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [createdAccount, setCreatedAccount] = useState(null);
    useEffect(() => {
        beforeAuthStateChanged(auth, (user) => {
            console.log('before current user', auth.currentUser)
            console.log('before user', user)

            if (auth.currentUser && user) {
                setCreatedAccount(user.uid)
                throw 0;
            }
        })
        onAuthStateChanged(auth, (user) => {
            console.log('auth state change', user)
            if (!user) {
                router.push("/login");
            }
            if (user) {
                isAdminExist(user.uid)
                    .then(res => {
                        if (res) {
                            setCurrentUser(res);
                        } else {
                            router.push("/login");
                        }
                    })
                    .catch(err => {
                        router.push("/login")
                    });
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, createdAccount}}>
            {(!currentUser && router.pathname !== '/login') ? <Preloader type={'pulse'} center={true}/> : children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
