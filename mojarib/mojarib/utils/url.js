import {
    ANALYST_DASHBOARD,
    ANALYST_LOGIN,
    CUSTOMER_DASHBOARD,
    CUSTOMER_LOGIN,
    HOMEPAGE,
    PARTICIPANT_DASHBOARD,
    PARTICIPANT_LOGIN,
} from '../components/const';
import { isEmpty } from './object';

const extractUrl = (url = '', fields = []) => {
    if (!url || isEmpty(fields)) {
        return {};
    }
    const params = new URL(decodeURIComponent(url)).searchParams;
    let result = {};
    for (const field of fields) {
        result[field] = params.get(field) || '';
    }
    return result;
};

const getLoginPath = (pathName) => {
    let target = HOMEPAGE;
    switch (pathName) {
        case PARTICIPANT_DASHBOARD:
            target = PARTICIPANT_LOGIN;
            break;
        case CUSTOMER_DASHBOARD:
            target = CUSTOMER_LOGIN;
            break;
        case ANALYST_DASHBOARD:
            target = ANALYST_LOGIN;
            break;
        default:
            break;
    }
    return target;
};

export { extractUrl, getLoginPath };
