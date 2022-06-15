import styles from './Notification.module.scss';
import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';

const Notification = () => {
    const { currentUser } = useAuth();

    return !currentUser || !currentUser.emailVerified ? (
        <h1>Loading ...</h1>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>Notifications</h1>
            </div>
            <div className={styles.bottom_heading}>
                <div className={styles.left_menu}>
                    <LeftMenu itemSelected={'notifications'} />
                </div>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <h3>Notifications page content</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
