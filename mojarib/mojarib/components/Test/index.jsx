import { useState } from 'react';
import Toggle from 'react-toggle';
import jwt_decode from 'jwt-decode';
import copy from 'copy-to-clipboard';

import styles from './Test.module.scss';
import { setTestShareByFirebase } from '../../firebase/customer';

const jwt_encode = require('jwt-encode');

export const Test = ({ item, handleClickSeeResult }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isActiveToken, setIsActiveToken] = useState(
        item.testShare ? jwt_decode(item.testShare).status : false
    );
    const token = jwt_encode(
        {
            testID: item.id,
            status: isActiveToken,
            createAt: new Date().toLocaleDateString(),
        },
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    );

    const handleTogglePopup = () => {
        setIsOpenPopup(!isOpenPopup);
        if (!item.testShare || isOpenPopup) {
            setTestShareByFirebase({ ...item, testShare: token });
        }
    };
    const handleToggleActiveToken = () => {
        setIsActiveToken(!isActiveToken);
    };
    const handleCopyText = () => {
        copy(
            `${process.env.NEXT_PUBLIC_DOMAIN}/link-test-participant?token=${token}`
        );
    };

    return (
        <div className={styles.row}>
            <div className={styles.cell}>
                <p>{item.testName}</p>
                <p>{item.createAt}</p>
            </div>
            <div className={styles.cell}>{item.endDate}</div>
            <div className={styles.cell}>
                {item.approve ? 'Launching' : 'Pending'}
            </div>
            <div className={styles.cell}>
                <p>5 Participants used</p>
                <p>(3/5 submitted)</p>
            </div>
            <div className={styles.cell}>
                <button onClick={() => handleClickSeeResult(item.id)}>
                    See results
                </button>
                {item.approve && (
                    <button onClick={handleTogglePopup}>Share</button>
                )}
            </div>
            {isOpenPopup && (
                <div className={styles.popup}>
                    <div className={styles.box}>
                        <span
                            className={styles.close_icon}
                            onClick={handleTogglePopup}
                        >
                            x
                        </span>
                        <div className={styles.content}>
                            <input
                                value={`${process.env.NEXT_PUBLIC_DOMAIN}/link-test-participant?token=${token}`}
                            />
                            <Toggle
                                defaultChecked={isActiveToken}
                                onChange={handleToggleActiveToken}
                            />
                            <button onClick={handleCopyText}>Copy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
