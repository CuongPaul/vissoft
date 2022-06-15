import clsx from 'clsx';
import { useRef } from 'react';
import Popup from 'reactjs-popup';

import { isEmpty } from '../../../utils/object';
import styles from './Modal.module.scss';

const Modal = ({
    customClass = '',
    customContentStyle = {},
    children,
    customProps = {},
    isAuto = {},
    isManual: { openLabel = 'Open modal' } = {},
}) => {
    const isAutoPopup = !isEmpty(isAuto);
    const { open = false, setOpen = () => {} } = isAuto || {};

    const openButtonRef = useRef(null);
    const defaultProps = {
        modal: true,
        nested: true,
        position: 'center center',
        repositionOnResize: true,
        overlayStyle: { backgroundColor: 'rgba(0,0,0,.5)' },
        contentStyle: { width: '60%', ...customContentStyle },
    };
    const props = { ...defaultProps, ...customProps };

    return (
        <>
            {(isAutoPopup && (
                <Popup {...props} open={open} ref={openButtonRef}>
                    <button onClick={() => setOpen(false)} className={styles.close}>
                        &times;
                    </button>
                    <div className={clsx(styles.modal, customClass)}>
                        {children}
                    </div>
                </Popup>
            )) || (
                <Popup
                    ref={openButtonRef}
                    trigger={
                        <span className={styles.open}>
                            {openLabel}
                        </span>
                    }
                    {...props}
                >
                    {(close) => (
                        <>
                            <button onClick={close} className={styles.close}>
                                &times;
                            </button>
                            <div className={clsx(styles.modal, customClass)}>
                                {children}
                            </div>
                        </>
                    )}
                </Popup>
            )}
        </>
    );
};

export default Modal;
