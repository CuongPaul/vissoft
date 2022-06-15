import {PRIMARY, SECONDARY} from '../../const';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({
        type = PRIMARY,
        children,
        customClass = '',
        onClickCallback = () => {}
    }) => {
    if (type !== SECONDARY) {
        type = PRIMARY;
    }

    return (
        <>
            <button
                onClick={onClickCallback}
                className={clsx(styles.button, styles[type], customClass)}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
