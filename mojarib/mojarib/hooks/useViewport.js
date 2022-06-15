import {useState, useEffect} from 'react';

const useViewport = () => {
    const [width, setWidth] = useState(0);
    const onViewportChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener('resize', onViewportChange);

        return () => {
            window.removeEventListener('resize', onViewportChange);
        }
    }, []);

    const isMobile = width > 0 && width < 768;
    const isTablet = width >= 768 && width < 1200;

    return {isMobile, isTablet};
}

export default useViewport;
