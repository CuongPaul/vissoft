import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import styles from './TestList.module.scss';
import { useAuth } from '../../../../contexts/AuthContext';
import { Test, LeftMenu } from '../../../../components';
import { getTestListByFirebase, getMoreTestListByFirebase } from '../../../../firebase/customer';

const TestList = () => {
    const router = useRouter();
    const { currentUser } = useAuth();
    const [data, setData] = useState([]);
    const [isDisplay, setIsDisplay] = useState(true);

    const handleClickNewTest = () => {
        router.push('/customer/account/test-create');
    };
    const handleClickSeeResult = (testID) => {
        router.push({
            query: { testID: testID },
            pathname: '/customer/account/test-result',
        });
    };
    const handleClickLoadMore = async () => {
        const lastDocID = data[data.length - 1].id;
        const res = await getMoreTestListByFirebase(lastDocID);
        if (res.data.length < 3) {
            setIsDisplay(false);
        }
        if (res.status == 'succeed') {
            setData((data) => data.concat(res.data));
        } else {
            console.error(res.message);
        }
    };

    useEffect(() => {
        currentUser &&
            getTestListByFirebase()
                .then((res) => setData(res.data))
                .catch((err) => console.error(err));
    }, [currentUser]);

    return !currentUser || !currentUser.emailVerified ? (
        <h1>Loading ...</h1>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h3>Manage Tests</h3>
            </div>
            <div className={styles.bottom_heading}>
                <div className={styles.left_menu}>
                    <LeftMenu itemSelected={'tests'} />
                </div>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <div className={styles.top}>
                            <div className={styles.left}>
                                <h4>Current credit: 10 Tests</h4>
                                <span>Contact us now to buy more</span>
                            </div>
                            <div className={styles.right}>
                                <button onClick={handleClickNewTest}>Create a test</button>
                            </div>
                        </div>
                        <div className={styles.list}>
                            <div className={styles.heading}>
                                <div className={styles.cell}>Name</div>
                                <div className={styles.cell}>End date</div>
                                <div className={styles.cell}>Status</div>
                                <div className={styles.cell}>Used</div>
                                <div className={styles.cell}>Action</div>
                            </div>
                            <div className={styles.rows}>
                                {data.map((item, index) => (
                                    <Test
                                        key={index}
                                        item={item}
                                        handleClickSeeResult={handleClickSeeResult}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={isDisplay ? styles.load_more : styles.hidden}>
                            <button onClick={handleClickLoadMore}>Load more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestList;
