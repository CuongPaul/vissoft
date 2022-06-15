import {useState, useContext, createContext, useMemo} from "react";

const ToastContext = createContext({
    showToast: false,
    setShowToast: () => {},
    toastMessage: '',
    setToastMessage: () => {},
});

export const useToastContext = () => useContext(ToastContext);

const ToastContextProvider = ({children}) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    return (
        <ToastContext.Provider value={{ showToast, setShowToast, toastMessage, setToastMessage }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;
