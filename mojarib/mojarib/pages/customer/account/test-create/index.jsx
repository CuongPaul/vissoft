import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './TestCreate.module.scss';
import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';
import { createTestByFirebase } from '../../../../firebase/customer';

const TestCreate = () => {
    const typeProductOptions = [
        { label: 'Website', value: 'website' },
        { label: 'Software', value: 'software' },
    ];
    const languageOptions = [
        { label: 'English', value: 'english' },
        { label: 'Arabic', value: 'arabic' },
    ];
    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];
    const familyStatusOptions = [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
    ];
    const educationOptions = [
        { label: 'Education 1', value: 'education_1' },
        { label: 'Education 2', value: 'education_2' },
        { label: 'Education 3', value: 'education_3' },
    ];
    const employmentOptions = [
        { label: 'Employed Private Sector', value: 'private_sector' },
        { label: 'Student', value: 'student' },
        { label: 'Unemployed', value: 'unemployed' },
    ];
    const incomeOptions = [
        { label: 'Income 1', value: 'income_1' },
        { label: 'Income 2', value: 'income_2' },
        { label: 'Income 3', value: 'income_3' },
    ];
    const socialNetworkingOptions = [
        { label: 'Social Networking 1', value: 'social_networking_1' },
        { label: 'Social Networking 2', value: 'social_networking_2' },
        { label: 'Social Networking 3', value: 'social_networking_3' },
    ];
    const devicesOptions = [
        { label: 'Devices 1', value: 'devices_1' },
        { label: 'Devices 2', value: 'devices_2' },
        { label: 'Devices 3', value: 'devices_3' },
    ];
    const technologyOptions = [
        { label: 'Technology 1', value: 'technology_1' },
        { label: 'Technology 2', value: 'technology_2' },
        { label: 'Technology 3', value: 'technology_3' },
    ];
    const browserOptions = [
        { label: 'Browser 1', value: 'browser_1' },
        { label: 'Browser 2', value: 'browser_2' },
        { label: 'Browser 3', value: 'browser_3' },
    ];
    const anwserTypeOptions = [
        { label: 'Textbox', value: 'textbox' },
        { label: 'Radio Button', value: 'radio' },
        { label: 'Checkboxes', value: 'checkbox' },
    ];
    const router = useRouter();
    const { currentUser } = useAuth();
    const schema = yup.object().shape({
        approve: yup.boolean().default(false),
        testName: yup.string().required('This is a required field.'),
        numberOfParticipants: yup
            .number()
            .typeError('This is a required field.')
            .max(10, 'The number exceeds your current balance.')
            .min(0, 'Please enter a valid number in this field.'),
        typeProduct: yup.string().default('website'),
        language: yup.string().default('arabic'),
        endDate: yup.date().typeError('This is a required field.'),
        createAt: yup.date().default(new Date()),
        deviceToTestOptions: yup.string().typeError('This is a required field.'),
        maxSesssion: yup
            .number()
            .typeError('This is a required field.')
            .min(0, 'Please enter a valid number in this field.'),
        participants: yup.object().shape({
            age: yup
                .number()
                .typeError('This is a required field.')
                .min(0, 'Please enter a valid number in this field.'),
            gender: yup.string().required('This is a required field.'),
            familyStatus: yup.string().required('This is a required field.'),
            nativeLanguage: yup.string().default('arabic'),
            spokenLanguage: yup.string().default('arabic'),
            education: yup.string().required('This is a required field.'),
            employment: yup.string().required('This is a required field.'),
            income: yup.string().required('This is a required field.'),
            socialNetworking: yup.string().required('This is a required field.'),
            devices: yup.string().required('This is a required field.'),
            technology: yup.string().required('This is a required field.'),
            browser: yup.string().required('This is a required field.'),
        }),
        instruction: yup.object().shape({
            url: yup.string().required('This is a required field.'),
            testInstruction: yup.string().required('This is a required field.'),
            scenario: yup.string().required('This is a required field.'),
        }),
        task: yup.array().of(
            yup.object().shape({
                value: yup.string().required('This is a required field.'),
            })
        ),
        question: yup.array().of(
            yup.object().shape({
                content: yup.string().required('This is a required field.'),
                anwserType: yup.string().required('This is a required field.'),
                anwserOptions: yup.array().of(yup.string().required('This is a required field.')),
            })
        ),
    });
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    const {
        fields: taskFields,
        append: taskAppend,
        remove: taskRemove,
    } = useFieldArray({ control, name: 'task' });
    const {
        fields: questionFields,
        append: questionAppend,
        remove: questionRemove,
    } = useFieldArray({ control, name: 'question' });
    const { fields: anwserOptionsFields, append: anwserOptionsAppend } = useFieldArray({
        control,
        name: 'anwserOptions',
    });
    const handleClickSave = (data) => {
        createTestByFirebase({
            ...data,
            endDate: data.endDate.toISOString().split('T')[0],
            createAt: data.createAt.toISOString().split('T')[0],
            uid: currentUser.uid,
        })
            .then((res) => {
                alert(res.message);
                router.push('/customer/account/test-list');
            })
            .catch((err) => console.log(err.message));
    };
    const [anwserType, setAnwserType] = useState('textbox');

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
                        <h3>Create new test</h3>
                        <div className={styles.field}>
                            <input {...register('testName')} placeholder={'Enter test name'} />
                            {errors.testName && (
                                <span className={styles.error}>{errors.testName?.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <span>1. How many participants?</span>
                            <input
                                type={'number'}
                                defaultValue={0}
                                placeholder={'...'}
                                {...register('numberOfParticipants')}
                            />
                            <span>You have 5 participant for trial. Contact us to buy more</span>
                            {errors.numberOfParticipants && (
                                <span className={styles.error}>
                                    {errors.numberOfParticipants?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <span>2. Choose type of product to test</span>
                            <select {...register('typeProduct')}>
                                {typeProductOptions.map((item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            {errors.typeProduct && (
                                <span className={styles.error}>{errors.typeProduct?.message}</span>
                            )}
                        </div>
                        <div className={styles.raio_input}>
                            <span>3. Test language:</span>
                            <div className={styles.language}>
                                <input
                                    checked
                                    id={'arabic'}
                                    type={'radio'}
                                    value={'arabic'}
                                    {...register('language')}
                                />
                                <label htmlFor={'arabic'}>Arabic</label>
                            </div>
                            <div className={styles.language}>
                                <input
                                    id={'english'}
                                    type={'radio'}
                                    value={'english'}
                                    {...register('language')}
                                />
                                <label htmlFor={'english'}>English</label>
                            </div>
                            {errors.language && (
                                <span className={styles.error}>{errors.language?.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <span>4. End Date:</span>
                            <input type='date' {...register('endDate')} />
                            {errors.endDate && (
                                <span className={styles.error}>{errors.endDate?.message}</span>
                            )}
                        </div>
                        <div className={styles.raio_input}>
                            <span>5. Device to test:</span>
                            <div className={styles.device}>
                                <input
                                    id={'desktop'}
                                    type={'radio'}
                                    value={'desktop'}
                                    {...register('deviceToTestOptions')}
                                />
                                <label htmlFor={'desktop'}>Desktop</label>
                            </div>
                            <div className={styles.device}>
                                <input
                                    id={'mobile'}
                                    type={'radio'}
                                    value={'mobile'}
                                    {...register('deviceToTestOptions')}
                                />
                                <label htmlFor={'mobile'}>Mobile</label>
                            </div>
                            {errors.deviceToTestOptions && (
                                <span className={styles.error}>
                                    {errors.deviceToTestOptions?.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <span>6. Max sesssion time: </span>
                            <input
                                type={'number'}
                                placeholder={'...'}
                                {...register('maxSesssion')}
                            />
                            {errors.maxSesssion && (
                                <span className={styles.error}>{errors.maxSesssion?.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <span>7. Participants</span>
                            <div className={styles.condition_form}>
                                <span>Demographic conditions:</span>
                                <div className={styles.input_area}>
                                    <div className={styles.left}>
                                        <div className={styles.label}>
                                            <div className={styles.input_field}>Age:</div>
                                            <input
                                                type={'number'}
                                                {...register('participants.age')}
                                            />
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.age?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Gender:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.gender')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {genderOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.gender?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Family Status:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.familyStatus')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {familyStatusOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.familyStatus?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Native Language:</div>
                                            <select
                                                value={'arabic'}
                                                {...register('participants.nativeLanguage')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {languageOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.nativeLanguage?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Spoken Language:</div>
                                            <select
                                                value={'arabic'}
                                                {...register('participants.spokenLanguage')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {languageOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.spokenLanguage?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Education:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.education')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {educationOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.education?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.right}>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Employment:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.employment')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {employmentOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.employment?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Income:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.income')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {incomeOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.income?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Social Networking:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.socialNetworking')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {socialNetworkingOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.socialNetworking?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Devices:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.devices')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {devicesOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.devices?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Technology:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.technology')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {technologyOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.technology?.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Browser:</div>
                                            <select
                                                defaultValue={''}
                                                {...register('participants.browser')}
                                            >
                                                <option value='' disabled hidden>
                                                    Choose here
                                                </option>
                                                {browserOptions.map((item, index) => (
                                                    <option key={index} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.participants && (
                                                <span className={styles.error}>
                                                    {errors.participants.browser?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <span>8. Test instruction</span>
                            <div className={styles.instruction}>
                                <div className={styles.input_field}>
                                    <div className={styles.label}>Website URL: </div>
                                    <input {...register('instruction.url')} />
                                    {errors.instruction && (
                                        <span className={styles.error}>
                                            {errors.instruction.url?.message}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.input_field}>
                                    <div className={styles.label}>Test instruction: </div>
                                    <input {...register('instruction.testInstruction')} />
                                    {errors.instruction && (
                                        <span className={styles.error}>
                                            {errors.instruction.testInstruction?.message}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.input_field}>
                                    <div className={styles.label}>Scenario: </div>
                                    <input {...register('instruction.scenario')} />
                                    {errors.instruction && (
                                        <span className={styles.error}>
                                            {errors.instruction.scenario?.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <span>9. Task and Questions</span>
                            <div className={styles.button_group}>
                                <button onClick={() => taskAppend('')}>Add Task</button>
                                <button
                                    onClick={() =>
                                        questionAppend({
                                            content: '',
                                            anwserType: '',
                                            anwserOptions: [],
                                        })
                                    }
                                >
                                    Add Question
                                </button>
                            </div>
                            {taskFields.map((item, index) => (
                                <div key={item.id} className={styles.question}>
                                    <textarea {...register(`task.${index}.value`)} />
                                    {errors.task && (
                                        <span className={styles.error}>
                                            {errors.task[index].value?.message}
                                        </span>
                                    )}
                                    <button onClick={() => taskRemove(index)}>Delete task</button>
                                </div>
                            ))}
                            {questionFields.map((item, index) => (
                                <div key={item.id} className={styles.question}>
                                    <textarea {...register(`question.${index}.content`)} />
                                    {errors.question && (
                                        <span className={styles.error}>
                                            {errors.question[index].content?.message}
                                        </span>
                                    )}
                                    <select
                                        {...register(`question.${index}.anwserType`)}
                                        onChange={(event) => setAnwserType(event.target.value)}
                                    >
                                        {anwserTypeOptions.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.question && (
                                        <span className={styles.error}>
                                            {errors.question[index].anwserType?.message}
                                        </span>
                                    )}
                                    <button onClick={() => questionRemove(index)}>
                                        Delete question
                                    </button>
                                    {['checkbox', 'radio'].includes(anwserType) && (
                                        <div className={styles.question}>
                                            <button
                                                onClick={() => anwserOptionsAppend({ value: '' })}
                                            >
                                                Add option
                                            </button>
                                            {anwserOptionsFields.map((itemOption, indexOption) => (
                                                <div key={itemOption.id}>
                                                    <input
                                                        key={itemOption.id}
                                                        {...register(
                                                            `question.${index}.anwserOptions.${indexOption}`
                                                        )}
                                                    />
                                                    {errors.question && (
                                                        <span className={styles.error}>
                                                            {
                                                                errors.question[index]
                                                                    .anwserOptions[indexOption]
                                                                    ?.message
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={styles.field}>
                            <button
                                onClick={handleSubmit(handleClickSave)}
                                className={styles.save_button}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCreate;
