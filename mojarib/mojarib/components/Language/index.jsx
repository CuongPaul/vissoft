import { useRouter } from 'next/router';

import styles from './Language.module.scss';

export const Language = ({ lang }) => {
    const router = useRouter();

    const handleChangeLanguage = (event) => {
        router.push(router.pathname, router.asPath, {
            locale: event.target.value,
        });
    };

    return (
        <select
            value={lang}
            onChange={handleChangeLanguage}
            className={styles.select_language}
        >
            <option value={'ar'}>عربي</option>
            <option value={'en'}>English</option>
        </select>
    );
};
