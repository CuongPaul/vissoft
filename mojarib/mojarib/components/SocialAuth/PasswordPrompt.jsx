import {linkWithCredential, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { getMessage } from '../../firebase/error';
import { auth } from '../../firebase/index';
import useTrans from '../../hooks/useTrans';
import {PARTICIPANT_DASHBOARD, PASSWORD_REGEX} from '../const';
import Button from '../modules/Button';
import ErrorMessage from '../modules/ErrorMessage';
import Input from '../modules/Input';
import Modal from '../modules/Modal';
import styles from './SocialAuth.module.scss';
import {isAuthorized} from '../../firebase/user';
import {PARTICIPANTS} from '../../firebase/const';

const PasswordPrompt = ({ open, setOpen, loginData }) => {
    const trans = useTrans();
    const router = useRouter();
    const PASSWORD = 'password';
    const { pendingCredential, email } = loginData;
    const {
        register,
        resetField,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' });
    const password = register(PASSWORD, {
        required: trans.errors.required,
        pattern: {
            value: PASSWORD_REGEX,
            message: trans.errors.invalidPassword,
        },
    });

    const linkWithPassword = async (password) => {
        if (!password) {
            alert('You must enter a password');
            return false;
        }
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            // Check if current account has been existed as a participant
            const isParticipant = await isAuthorized(email, PARTICIPANTS);
            if (!isParticipant) {
                alert('You are not a participant.');
                await signOut(auth);
                return false;
            }
            await linkWithCredential(user, pendingCredential);
            alert('Your account has been linked with the existing one.');
            return true;
        } catch (e) {
            alert(getMessage(e.code));
            return false;
        }
    };

    const submitHandler = ({ password }) => {
        resetField(PASSWORD);
        linkWithPassword(password).then((res) => {
            res && router.push(PARTICIPANT_DASHBOARD);
        });
        setOpen(false);
    };

    return (
        <Modal
            isAuto={{ open, setOpen }}
            customContentStyle={{ width: '40%' }}
            customClass={styles.modal}
        >
            <label>
                Your account exists. Please try to login with your password
            </label>
            <Input
                label='Password'
                isRequired
                value={password}
                name={PASSWORD}
                type='password'
            />
            <ErrorMessage name={PASSWORD} error={errors} />
            <Button onClickCallback={handleSubmit(submitHandler)}>
                Submit
            </Button>
        </Modal>
    );
};

export default PasswordPrompt;
