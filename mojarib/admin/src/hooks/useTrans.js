import { useRouter } from "next/router";

import { ar, en } from "../../public/lang";

const useTrans = () => {
    const { locale } = useRouter();

    return en;

};

const useFormatMessage = () => {
    const formatMessage = (message = '', params = {}) => {
        if (!Object.keys(params)) {
            return message;
        }
        for (const key in params) {
            message = message.replaceAll(`{${key}}`, params[key]);
        }
        return message;
    }

    return formatMessage;
}

export {useTrans as default, useFormatMessage};
