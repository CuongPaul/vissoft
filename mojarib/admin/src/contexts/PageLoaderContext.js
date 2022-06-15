import {useState, useContext, createContext, useMemo} from "react";

const LoaderContext = createContext({
    showLoader: false,
    setShowLoader: () => {},
});

export const useLoaderContext = () => useContext(LoaderContext);

const PageLoaderProvider = ({children}) => {
    const [showLoader, setShowLoader] = useState(false);

    return (
        <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export default PageLoaderProvider;
