import {
    DEFAULT_HEADER,
    POST_METHOD,
    SEND_EMAIL_ENDPOINT,
    API_SUCCESS
} from '../components/const';
import {useCallback} from 'react';
import useTrans from './useTrans';

const useSendEmail = () => {
    const trans = useTrans();
    const sendEmail = useCallback(async (
        {
            mailTo = '',
            subject = 'Subject',
            templateName = '',
            props = {},
            successMessage = trans.sendEmailSuccess,
            errorMessage = ''
        } = {}
    ) => {
        console.log(mailTo, ' - ', templateName);
        if (!mailTo || !templateName) {
            alert(trans.invalidEmail);
            return;
        }

        try {
            const result = await fetch(SEND_EMAIL_ENDPOINT, {
                method: POST_METHOD,
                headers: DEFAULT_HEADER,
                body: JSON.stringify({
                    mailTo,
                    subject,
                    templateName,
                    props
                }),
            });
            if (result.status === API_SUCCESS) {
                console.log(successMessage);
            }
        } catch (e) {
            console.log(errorMessage || e.message);
        }
    }, [trans.invalidEmail, trans.sendEmailSuccess]);

    return {sendEmail};
}

export default useSendEmail;