import styles from './TestView.module.scss';
import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';

const TestView = () => {
    const { currentUser } = useAuth();

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
                        <h3>Test view page content</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestView;
