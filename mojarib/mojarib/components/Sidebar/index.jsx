import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import {useState} from 'react';

export const Sidebar = ({ listItems, setSelectedItem = null, currentItem = '' }) => {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <div className={clsx(styles.container, isActive && styles.active)}
                 onClick={toggle}
            >
                {listItems.map((item) => {
                    const {value, label} = item;
                    return <li
                        key={value}
                        className={clsx(
                            styles.item,
                            {[styles.selected]: currentItem.value === value}
                        )}
                        onClick={() => setSelectedItem(item)}
                    >
                        {label}
                    </li>;
                })}
            </div>
        </>
    );
};
