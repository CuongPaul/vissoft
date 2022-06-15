import styles from './Checkbox.module.scss';

const Item = ({
        values = [],
        value = '',
        label = '',
        name = '',
        onChangeCallback = () => {}
    }) => {
    return (
        <div className={styles.item}>
            <input type="checkbox"
                   id={value}
                   name={name}
                   value={value}
                   checked={values.includes(value)}
                   onChange={onChangeCallback}
                   className={styles.input}
            />
            <label htmlFor={value} className={styles.label}>{label}</label>
        </div>
    );
};

export default Item;
