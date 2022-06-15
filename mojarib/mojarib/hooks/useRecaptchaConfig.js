export const useRecaptchaConfig = () => {
    return {
        'type': 'invisible',
        'client_key': process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    }
}