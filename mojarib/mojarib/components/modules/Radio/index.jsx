import clsx from 'clsx';

import styles from './Radio.module.scss';

const Radio = ({
    label = 'Select one',
    name = 'name',
    selected = '',
    customClass = '',
    options = [],
    onChangeCallback = () => {},
    isRequired = false,
}) => {
    return (
        <div className={clsx(styles.container, customClass)}>
            <p className={clsx(styles.label, isRequired && styles.required, 'label')}>{label}</p>
            <div className={clsx(styles.radio, 'radio')}>
                {options.map(({ label, value }) => {
                    return (
                        <div
                            key={value}
                            className={clsx(styles.controller, 'controller')}
                        >
                            <input
                                type='radio'
                                id={value}
                                name={name}
                                value={value}
                                checked={selected === value}
                                onChange={onChangeCallback}
                                className={styles.input}
                            />
                            <label htmlFor={value} className={styles.label}>
                                {label}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Radio;
