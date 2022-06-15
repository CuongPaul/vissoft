import {useRouter} from 'next/router';
import {ar, en} from '../public/lang';
import HTMLReactParser from 'html-react-parser';

const useTrans = () => {
    const { locale } = useRouter();

    if (locale == "ar") {
        return ar;
    }
    if (locale == "en") {
        return en;
    }
};

const useFormatMessage = () => {
    return (message = '', params = {}) => {
        if (!Object.keys(params)) {
            return message;
        }
        for (const key in params) {
            message = message.replaceAll(`{${key}}`, params[key]);
        }
        return HTMLReactParser(message);
    };
}

export {useTrans as default, useFormatMessage};
