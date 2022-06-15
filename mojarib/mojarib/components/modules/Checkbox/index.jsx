import clsx from 'clsx';

import { splitArray } from '../../../utils/splitArray';
import styles from './Checkbox.module.scss';
import Item from './Item';

const Checkbox = ({
    label = 'Check options',
    name = 'name',
    column = 1,
    options = [],
    value: values = [],
    customClass = '',
    onChangeCallback = () => {},
    isRequired = false,
}) => {
    const elements = splitArray(options, column);

    return (
        <div className={clsx(styles.container, customClass)}>
            <label
                className={clsx(
                    styles.title,
                    isRequired && styles.required,
                    'label'
                )}
            >
                {label}
            </label>
            <div className={clsx(styles.checkbox, 'checkbox')}>
                {elements.map((items, index) => (
                    <div
                        key={index}
                        className={clsx(
                            styles.column,
                            styles[`column-${index + 1}`]
                        )}
                    >
                        {items.map(({ value, label }) => (
                            <Item
                                key={value}
                                value={value}
                                label={label}
                                name={name}
                                values={values}
                                onChangeCallback={onChangeCallback}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checkbox;
