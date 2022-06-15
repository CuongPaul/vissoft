export const PROFILE = 'profile';
export const NOTIFICATIONS = 'notifications';
export const TESTS = 'tests';
export const SETTINGS = 'settings';
export const PRIMARY = 'primary';
export const SECONDARY = 'secondary';
export const VERIFY_MODE = 'verifyEmail';
export const UPDATE_MODE = 'updateEmail';
export const SUBSCRIBE = 'subscribe';
export const SUCCESS = 'success';
export const FAIL = 'fail';

// Paths
export const HOMEPAGE = '/';
export const PARTICIPANT_LOGIN = '/participant/login';
export const PARTICIPANT_REGISTER = '/participant/register';
export const PARTICIPANT_DASHBOARD = '/participant/account';
export const CUSTOMER_LOGIN = '/customer/login';
export const CUSTOMER_REGISTER = '/customer/register';
export const CUSTOMER_DASHBOARD = '/customer/account';
export const CUSTOMER_PROFILE = '/customer/account/profile';
export const ANALYST_DASHBOARD = '/analyst/account';
export const ANALYST_LOGIN = '/analyst/login';
export const FORGOT_PASSWORD = '/forgot-password';

// RegEx
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])\S{8,}$/;

// API
export const API_SUCCESS = 200;
export const SEND_EMAIL_ENDPOINT = '/api/sendEmail';
export const DEFAULT_HEADER = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};
export const POST_METHOD = 'POST';

// Custom error code
export const ACCOUNTS_LINKED = 'linked';
export const UNAUTHORIZED = 'unauthorized';
export const UNDEFINED = 'undefined';
export const EMPTY_EMAIL = 'empty_email';
