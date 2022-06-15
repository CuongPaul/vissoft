import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';
import {
    setCustomerProfileByFirebase,
    getCustomerProfileByFirebase,
} from '../../../../firebase/customer';
import useTrans from '../../../../hooks/useTrans';
import styles from './CompanyProfile.module.scss';

const CompanyProfile = () => {
    const cityOptions = [
        { label: 'City 1', value: 'city-1' },
        { label: 'City 2', value: 'city-2' },
        { label: 'City 3', value: 'city-3' },
    ];
    const sectorOptions = [
        { label: 'Sector 1', value: 'sector-1' },
        { label: 'Sector 2', value: 'sector-2' },
        { label: 'Sector 3', value: 'sector-3' },
    ];
    const countryOptions = [
        { label: 'Country 1', value: 'country-1' },
        { label: 'Country 2', value: 'country-2' },
        { label: 'Country 3', value: 'country-3' },
    ];
    const trans = useTrans();
    const { currentUser } = useAuth();
    const schema = yup.object().shape({
        organizationName: yup.string(),
        firstName: yup.string().required('This is a required field.'),
        lastName: yup.string().required('This is a required field.'),
        sector: yup.string().required('This is a required field.'),
        website: yup.string(),
        country: yup.string().required('This is a required field.'),
        city: yup.string().required('This is a required field.'),
        vat: yup.string().required('This is a required field.'),
        building: yup.string(),
        postalCode: yup.string(),
        address: yup.string().required('This is a required field.'),
    });
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });


    const handleClickSave = (data) => {
        setCustomerProfileByFirebase(currentUser.uid, data)
            .then(() => alert('Save profile successfully'))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (currentUser) {
            getCustomerProfileByFirebase()
                .then((res) => {
                    console.log('res',res);
                    for (const key in res.data) {
                        setValue(key, res.data[key]);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [currentUser]);

    return !currentUser || !currentUser.emailVerified ? (
        <h1>Loading ...</h1>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>Company Profile</h1>
            </div>
            <div className={styles.bottom_heading}>
                <div className={styles.left_menu}>
                    <LeftMenu itemSelected={'profile'} />
                </div>
                <div className={styles.content}>
                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label>Organization:</label>
                            <input
                                name={'organizationName'}
                                {...register('organizationName')}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                <label>First Name:</label>
                            </label>
                            <input
                                name={'firstName'}
                                {...register('firstName')}
                            />
                            {errors.firstName && (
                                <span className={styles.error}>
                                    {errors.firstName?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                Last Name:
                            </label>
                            <input
                                name={'lastName'}
                                {...register('lastName')}
                            />
                            {errors.lastName && (
                                <span className={styles.error}>
                                    {errors.lastName?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                {trans.account.profile.sector}:
                            </label>
                            <select
                                name={'sector'}
                                {...register('sector')}
                                defaultValue={''}
                            >
                                <option value='' disabled hidden>
                                    Choose here
                                </option>
                                {sectorOptions.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            {errors.sector && (
                                <span className={styles.error}>
                                    {errors.sector?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label>{trans.account.profile.website}:</label>
                            <input name={'website'} {...register('website')} />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                {trans.account.profile.vat}:
                            </label>
                            <input name={'vat'} {...register('vat')} />
                            {errors.vat && (
                                <span className={styles.error}>
                                    {errors.vat?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                {trans.account.profile.country}:
                            </label>
                            <select
                                name={'country'}
                                {...register('country')}
                                defaultValue={''}
                            >
                                <option value='' disabled hidden>
                                    Choose here
                                </option>
                                {countryOptions.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            {errors.country && (
                                <span className={styles.error}>
                                    {errors.country?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                {trans.account.profile.city}:
                            </label>
                            <select
                                name={'city'}
                                {...register('city')}
                                defaultValue={''}
                            >
                                <option value='' disabled hidden>
                                    Choose here
                                </option>
                                {cityOptions.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            {errors.city && (
                                <span className={styles.error}>
                                    {errors.city?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <label>{trans.account.profile.building_no}:</label>
                            <input
                                name={'building'}
                                {...register('building')}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>{trans.account.profile.postal_code}:</label>
                            <input
                                name={'postalCode'}
                                {...register('postalCode')}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                {trans.account.profile.address_no}:
                            </label>
                            <input name={'address'} {...register('address')} />
                            {errors.address && (
                                <span className={styles.error}>
                                    {errors.address?.message}
                                </span>
                            )}
                        </div>
                        <button onClick={handleSubmit(handleClickSave)}>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
