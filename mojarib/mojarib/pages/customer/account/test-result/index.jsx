import { useRouter } from 'next/router';

import styles from './TestResult.module.scss';
import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';

const TestResult = () => {
    const router = useRouter();
    const { currentUser } = useAuth();

    const handleClickSeeTestDetails = () => {
        router.push({
            query: { testID: router.query.testID },
            pathname: '/customer/account/test-detail',
        });
    };

    return !currentUser || !currentUser.emailVerified ? (
        <h1>Loading ...</h1>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>Manage Tests</h1>
            </div>
            <div className={styles.bottom_heading}>
                <div className={styles.left_menu}>
                    <LeftMenu itemSelected={'tests'} />
                </div>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <button onClick={handleClickSeeTestDetails}>See Test details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResult;
