import {saveToDB} from '../firebase/participant/create';
import {useRouter} from 'next/router';
import useSendEmail from './useSendEmail';
import {PARTICIPANT_DASHBOARD} from '../components/const';
import {WELCOME} from '../templates/email';

const useParticipantSocialAuth = () => {
    const router = useRouter();
    const {sendEmail} = useSendEmail();

    const socialAuthFail = ({message}) => {
        const TIMEOUT = 1000;
        setTimeout(() => {
            alert(message);
        }, TIMEOUT);
    };

    const socialAuthSuccess = (data) => {
        const {
            providerId = 'email',
            _tokenResponse: {
                isNewUser = false
            } = {}
        } = data || {};
        if (isNewUser) {
            const {
                user: {
                    uid,
                    displayName
                },
                _tokenResponse: {
                    email,
                    firstName = '',
                    lastName = ''
                }
            } = data;
            const userFirstName = firstName || displayName;
            saveToDB({
                uid,
                email,
                'firstName': userFirstName,
                lastName,
                provider: providerId
            }).then(() => {
                sendEmail({
                    mailTo: email,
                    subject: 'Welcome to Mojarib',
                    templateName: WELCOME,
                    props: {name: userFirstName}
                });
            }).catch((e) => {
                console.log(e);
            });
        }
        router.push({
            pathname: PARTICIPANT_DASHBOARD,
            query: {provider: providerId }
        });
    };

    return {socialAuthFail, socialAuthSuccess};
};

export default useParticipantSocialAuth;
