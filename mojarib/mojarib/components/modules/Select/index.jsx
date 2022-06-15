import clsx from 'clsx';
import { useMemo } from 'react';

import styles from './Select.module.scss';

const Select = ({
    label = 'Select',
    name = 'name',
    options = [],
    value,
    customClass = '',
    isMultiple,
    isRequired = false,
    onChangeCallback = () => {},
}) => {
    if (isMultiple && !value) {
        value = [];
    }
    const isUseReactHookForm =
        typeof value === 'object' && !Array.isArray(value);

    const optionHtml = useMemo(() => {
        return options.map(({ value, label }) => (
            <option value={value} key={value}>
                {label}
            </option>
        ));
    }, [options]);

    return (
        <div
            className={clsx(
                styles.container,
                customClass,
                isMultiple && styles.multiple,
                isRequired && styles.required
            )}
        >
            <label className={clsx(styles.label, 'label')}>{label}</label>
            {(isUseReactHookForm && (
                <>
                    <select
                        name={name}
                        {...value}
                        className={clsx(styles.select, 'select')}
                    >
                        {optionHtml}
                    </select>
                </>
            )) || (
                <>
                    <select
                        name={name}
                        onChange={onChangeCallback}
                        value={value}
                        multiple={isMultiple}
                        className={clsx(styles.select, 'select')}
                    >
                        {optionHtml}
                    </select>
                </>
            )}
        </div>
    );
};

export default Select;
