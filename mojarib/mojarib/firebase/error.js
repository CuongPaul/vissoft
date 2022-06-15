import { AuthErrorCodes } from 'firebase/auth';

const {
    USER_CANCELLED,
    POPUP_CLOSED_BY_USER,
    INVALID_PASSWORD,
    TOO_MANY_ATTEMPTS_TRY_LATER,
    EMAIL_EXISTS,
} = AuthErrorCodes;

const messagesMap = {
    [USER_CANCELLED]: 'We are refused to grant permissions.',
    [POPUP_CLOSED_BY_USER]: 'The sign in popup was closed.',
    [INVALID_PASSWORD]: 'You enter a wrong password.',
    [TOO_MANY_ATTEMPTS_TRY_LATER]:
        'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
    [EMAIL_EXISTS]:
        'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.',
};

const getMessage = (code) => {
    return messagesMap[code] || 'Undefined error occurs.';
};

export { getMessage };
