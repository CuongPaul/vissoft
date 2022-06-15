import styles from './Input.module.scss';
import clsx from 'clsx';

const Input = ({
        label = '',
        name = '',
        value,
        type = 'text',
        isRequired = false,
        customClass = '',
        onChangeCallback = () => {}
    }) => {
    return (
        <div className={clsx(styles.container, customClass)}>
            <label htmlFor={name} className={clsx(styles.label, isRequired && styles.required, 'label')}>{label}</label>
            {typeof value === 'object' && (
                <input {...value} className={clsx(styles.input, 'input')} type={type} />
            ) || (
                <input
                    id={name}
                    value={value}
                    name={name}
                    type={type}
                    onChange={onChangeCallback}
                    className={clsx(styles.input, 'input')}
                />
            )}
        </div>
    );
};

export default Input;
