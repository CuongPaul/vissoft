import styles from './CompanyUser.module.scss';
import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';

const CompanyUser = () => {
    const { currentUser } = useAuth();

    return !currentUser || !currentUser.emailVerified ? (
        <h1>Loading ...</h1>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>Company Users</h1>
            </div>
            <div className={styles.bottom_heading}>
                <div className={styles.left_menu}>
                    <LeftMenu itemSelected={'users'} />
                </div>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <h3>Company users page content</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyUser;
