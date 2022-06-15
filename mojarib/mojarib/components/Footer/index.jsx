import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';

import useTrans from '../../hooks/useTrans';
import styles from './Footer.module.scss';
import {
    logo,
    branch,
    twitter,
    linkedin,
    facebook,
    instagram,
    send_email,
} from '../../public/images';

export const Footer = () => {
    const trans = useTrans();
    const router = useRouter();

    const handleClickLogo = () => {
        router.push('/');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.top} onClick={handleClickLogo}>
                <div className={styles.logo} onClick={handleClickLogo}>
                    <Image src={logo} alt="Logo" />
                </div>
                <div className={styles.text}>
                    <span>{trans.footer.top}</span>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.column}>
                    <h4>{trans.footer.general.title}</h4>
                    <div className={styles.text}>
                        <span>{trans.footer.general.how_work}</span>
                        <span>{trans.footer.general.features}</span>
                        <span>{trans.footer.general.quality}</span>
                        <span>{trans.footer.general.prices}</span>
                        <span>{trans.footer.general.examples}</span>
                        <span>{trans.footer.general.reports}</span>
                        <span>{trans.footer.general.contact}</span>
                    </div>
                </div>
                <div className={styles.column}>
                    <h4>{trans.footer.customers.title}</h4>
                    <div className={styles.text}>
                        <span>{trans.footer.customers.signup}</span>
                        <span>{trans.footer.customers.login}</span>
                        <span>{trans.footer.customers.FAQ}</span>
                        <span>{trans.footer.customers.customer_service}</span>
                        <span>{trans.footer.customers.term_condittions}</span>
                        <span>{trans.footer.customers.privacy_policy}</span>
                    </div>
                </div>
                <div className={styles.column}>
                    <h4>{trans.footer.participants.title}</h4>
                    <div className={styles.text}>
                        <span>{trans.footer.participants.get_paid}</span>
                        <span>{trans.footer.participants.login}</span>
                        <span>{trans.footer.participants.FAQ}</span>
                        <span>
                            {trans.footer.participants.participants_service}
                        </span>
                        <span>
                            {trans.footer.participants.term_condittions}
                        </span>
                    </div>
                </div>
                <div className={styles.column}>
                    <h4>{trans.footer.newsletter.title}</h4>
                    <div className={styles.text}>
                        <span>{trans.footer.newsletter.sign_up}</span>
                        <div className={styles.email}>
                            <input
                                placeholder={trans.footer.newsletter.email}
                            />
                            <div className={styles.icon}>
                                <Image src={send_email} alt="Send email" />
                            </div>
                        </div>
                        <div className={styles.social}>
                            <div className={clsx(styles.facebook, styles.icon)}>
                                <Image src={facebook} alt="Facebook" />
                            </div>
                            <div
                                className={clsx(styles.instagram, styles.icon)}
                            >
                                <Image src={instagram} alt="Instagram" />
                            </div>
                            <div className={clsx(styles.twitter, styles.icon)}>
                                <Image src={twitter} alt="Twitter" />
                            </div>
                            <div className={clsx(styles.linkedin, styles.icon)}>
                                <Image src={linkedin} alt="Linkedin" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.branch}>
                <Image src={branch} alt="Branch" />
            </div>
        </div>
    );
};
