import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../contexts/AuthContext';
import { PARTICIPANTS } from '../../../firebase/const';
import { getUser, setUser } from '../../../firebase/user';
import { isEmpty, removeItems } from '../../../utils/object';
import { PRIMARY } from '../../const';
import Button from '../../modules/Button';
import Checkbox from '../../modules/Checkbox';
import ErrorMessage from '../../modules/ErrorMessage';
import Input from '../../modules/Input';
import Radio from '../../modules/Radio';
import Select from '../../modules/Select';
import styles from './profile.module.scss';

const Profile = () => {
    const ageOptions = [
        { value: 'under_20', label: 'Under 20' },
        { value: '20_25', label: '20-25' },
        { value: 'above_25', label: 'Above 25' },
    ];

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ];

    const familyOptions = [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
    ];

    const nativeLanguageOptions = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic' },
    ];

    const spokenLanguageOptions = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic' },
    ];

    const educationOptions = [
        { value: 'graduated', label: 'Graduated' },
        { value: 'not_graduated', label: 'Not graduated' },
    ];

    const employmentOptions = [
        { value: 'employed', label: 'Employed' },
        { value: 'student', label: 'Student' },
        { value: 'unemployed', label: 'Unemployed' },
    ];

    const incomeOptions = [
        { value: '100_200', label: '100000 - 200000' },
        { value: '300_400', label: '300000 - 400000' },
    ];

    const socialNetworkOptions = [
        { value: 'facebook', label: 'Facebook' },
        { value: 'linkedin', label: 'Linkedin' },
    ];

    const devicesOptions = [
        { value: 'ios', label: 'iOS' },
        { value: 'android', label: 'Android' },
        { value: 'windows', label: 'Windows' },
        { value: 'desktop', label: 'Desktop' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'tablet', label: 'Tablet' },
    ];

    const technologyOptions = [
        { value: 'js', label: 'Javascript' },
        { value: 'java', label: 'Java' },
    ];

    const browserOptions = [
        { value: 'safari', label: 'Safari' },
        { value: 'chrome', label: 'Chrome' },
        { value: 'firefox', label: 'Firefox' },
    ];

    const { currentUser } = useAuth();
    const { uid = '' } = currentUser || {};
    const router = useRouter();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        age: 'under_20',
        gender: 'male',
        familyStatus: 'single',
        nativeLanguage: 'en',
        spokenLanguage: ['en'],
        education: 'graduated',
        employment: 'employed',
        income: '100_200',
        socialNetworking: ['facebook'],
        devices: [],
        technology: ['js'],
        browser: ['safari'],
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (loading && uid) {
            getUser(uid, PARTICIPANTS)
                .then((res) => {
                    setProfileData({ ...profileData, ...res });
                })
                .catch(({ message }) => {
                    console.error(message);
                });
            setLoading(false);
        }
    }, [currentUser, loading, profileData, router, uid]);

    const {
        firstName,
        lastName,
        age,
        gender,
        familyStatus,
        nativeLanguage,
        spokenLanguage,
        education,
        employment,
        income,
        socialNetworking,
        devices,
        technology,
        browser,
    } = profileData;

    const validateSubmitData = () => {
        let result = { ...errors };
        for (const field in profileData) {
            const value = profileData[field];
            if (!value || (Array.isArray(value) && !value.length)) {
                result[field] = { message: 'This is a required field.' };
            }
        }
        setErrors({ ...errors, ...result });
        return result;
    };

    const handleOnSave = () => {
        if (!isEmpty(validateSubmitData())) {
            return;
        }
        setUser(uid, profileData, PARTICIPANTS)
            .then((res) => {
                alert(res.message);
            })
            .catch(({ message }) => {
                alert(message);
            });
    };

    const handleOnFieldChange = (event) => {
        const target = event.target;
        const {
            name = '',
            multiple: isMultipleSelect = false,
            type = '',
        } = target;
        if (!name) {
            return;
        }
        if (!target.value) {
            setErrors({
                ...errors,
                [name]: { message: 'This is a required field.' },
            });
        } else {
            setErrors(removeItems(errors, [name]));
        }

        if (type && type === 'checkbox' && Array.isArray(profileData[name])) {
            let values = [...profileData[name]];
            const index = values.indexOf(target.value);
            if (index > -1) {
                values.splice(index, 1);
            } else {
                values = [...values, target.value];
            }

            if (!values.length) {
                setErrors({
                    ...errors,
                    [name]: { message: 'This is a required field.' },
                });
            } else {
                setErrors(removeItems(errors, [name]));
            }

            setProfileData({ ...profileData, [name]: values });
            return;
        }

        const value = !isMultipleSelect
            ? target.value
            : Array.from(target.selectedOptions, (option) => option.value);

        setProfileData({ ...profileData, [name]: value });
    };

    return (
        <>
            {(loading && <h2>Loading...</h2>) || (
                <div className={styles.container}>
                    <Input
                        label='First name'
                        name='firstName'
                        customClass={styles.item}
                        isRequired
                        value={firstName}
                        onChangeCallback={handleOnFieldChange}
                    />
                    <ErrorMessage error={errors} name='firstName' />
                    <Input
                        label='Last name'
                        name='lastName'
                        customClass={styles.item}
                        isRequired
                        value={lastName}
                        onChangeCallback={handleOnFieldChange}
                    />
                    <ErrorMessage error={errors} name='lastName' />
                    <Select
                        label='Age'
                        options={ageOptions}
                        value={age}
                        name='age'
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <Radio
                        label='Gender'
                        name='gender'
                        options={genderOptions}
                        selected={gender}
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <Radio
                        label='Family status'
                        name='familyStatus'
                        options={familyOptions}
                        selected={familyStatus}
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <Select
                        label='Native language'
                        options={nativeLanguageOptions}
                        value={nativeLanguage}
                        name='nativeLanguage'
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <Select
                        label='Spoken language'
                        options={spokenLanguageOptions}
                        value={spokenLanguage}
                        name='spokenLanguage'
                        onChangeCallback={handleOnFieldChange}
                        isMultiple={true}
                        customClass={styles.item}
                        isRequired
                    />
                    <ErrorMessage error={errors} name='spokenLanguage' />
                    <Select
                        label='Education'
                        options={educationOptions}
                        value={education}
                        name='education'
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <Select
                        label='Employment'
                        options={employmentOptions}
                        value={employment}
                        name='employment'
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <Select
                        label='Income'
                        options={incomeOptions}
                        value={income}
                        name='income'
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <Select
                        label='Social networking'
                        options={socialNetworkOptions}
                        value={socialNetworking}
                        name='socialNetworking'
                        onChangeCallback={handleOnFieldChange}
                        isMultiple={true}
                        customClass={styles.item}
                        isRequired
                    />
                    <ErrorMessage error={errors} name='socialNetworking' />
                    <Checkbox
                        label='Devices'
                        options={devicesOptions}
                        column='2'
                        value={devices}
                        name='devices'
                        onChangeCallback={handleOnFieldChange}
                        customClass={styles.item}
                        isRequired
                    />
                    <ErrorMessage error={errors} name='devices' />
                    <Select
                        label='Technology'
                        options={technologyOptions}
                        value={technology}
                        name='technology'
                        onChangeCallback={handleOnFieldChange}
                        isMultiple={true}
                        customClass={styles.item}
                        isRequired
                    />
                    <ErrorMessage error={errors} name='technology' />
                    <Select
                        label='Browser'
                        options={browserOptions}
                        value={browser}
                        name='browser'
                        onChangeCallback={handleOnFieldChange}
                        isMultiple={true}
                        customClass={styles.item}
                        isRequired
                    />
                    <ErrorMessage error={errors} name='browser' />

                    <div className={styles['save-container']}>
                        <Button
                            onClickCallback={handleOnSave}
                            type={PRIMARY}
                            customClass={styles.save}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
