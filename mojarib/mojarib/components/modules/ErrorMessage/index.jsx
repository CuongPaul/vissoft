import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({
        name = '',
        error = {}
    }) => {
    const message = error[name]?.message;
    return (
        <>
            {message && <p className={styles.error}>{message}</p>}
        </>
    );
};

export default ErrorMessage;
