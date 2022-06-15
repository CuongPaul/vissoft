import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import styles from './TestDetail.module.scss';
import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';
import { getTestDetailByFirebase, setTestDetailByFirebase } from '../../../../firebase/customer';

const TestDetail = () => {
    const router = useRouter();
    const { currentUser } = useAuth();
    const [testDetailValue, setTestDetailValue] = useState({
        testName: '',
        numberOfParticipants: '',
        typeProduct: '',
        language: '',
        endDate: '',
        createAt: new Date().toISOString().slice(0, 10),
        device: '',
        maxSesssion: '',
        participants: {
            age: '',
            sex: '',
            familyStatus: '',
            education: '',
            employment: '',
            income: '',
            socialNetworking: '',
            devices: '',
            technology: '',
            browser: '',
        },
        instruction: {
            url: '',
            testInstruction: '',
            scenario: '',
        },
        task: [],
        question: [],
    });

    const handleChangeTestName = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            testName: event.target.value,
        });
    };
    const handleChangeNumberOfParticipants = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            numberOfParticipants: event.target.value,
        });
    };
    const handleChangeTypeProduct = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            typeProduct: event.target.value,
        });
    };
    const handleChangeLanguage = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            language: event.target.value,
        });
    };
    const handleChangeEndDate = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            endDate: event.target.value,
        });
    };
    const handleChangeDevice = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            device: event.target.value,
        });
    };
    const handleChangeMaxSesssion = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            maxSesssion: event.target.value,
        });
    };
    const handleChangeAge = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                age: event.target.value,
            },
        });
    };
    const handleChangeSex = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                sex: event.target.value,
            },
        });
    };
    const handleChangeFamilyStatus = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                familyStatus: event.target.value,
            },
        });
    };
    const handleChangeEducation = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                education: event.target.value,
            },
        });
    };
    const handleChangeEmployment = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                employment: event.target.value,
            },
        });
    };
    const handleChangeIncome = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                income: event.target.value,
            },
        });
    };
    const handleChangeSocialNetworking = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                socialNetworking: event.target.value,
            },
        });
    };
    const handleChangeDevices = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                devices: event.target.value,
            },
        });
    };
    const handleChangeTechnology = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                technology: event.target.value,
            },
        });
    };
    const handleChangeBrowser = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            participants: {
                ...testDetailValue.participants,
                browser: event.target.value,
            },
        });
    };
    const handleChangeURL = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            instruction: {
                ...testDetailValue.instruction,
                url: event.target.value,
            },
        });
    };
    const handleChangeTestInstruction = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            instruction: {
                ...testDetailValue.instruction,
                testInstruction: event.target.value,
            },
        });
    };
    const handleChangeScenario = (event) => {
        setTestDetailValue({
            ...testDetailValue,
            instruction: {
                ...testDetailValue.instruction,
                scenario: event.target.value,
            },
        });
    };
    const handleClickAddTask = () => {
        setTestDetailValue({
            ...testDetailValue,
            task: [...testDetailValue.task].concat(''),
        });
    };
    const handleClickAddQuestions = () => {
        setTestDetailValue({
            ...testDetailValue,
            question: [...testDetailValue.question].concat(''),
        });
    };
    const handleClickDeleteTask = (index) => {
        let tempArr = [...testDetailValue.task];
        tempArr.splice(index, 1);
        setTestDetailValue({
            ...testDetailValue,
            task: tempArr,
        });
    };
    const handleClickDeleteQuestion = (index) => {
        let tempArr = [...testDetailValue.question];
        tempArr.splice(index, 1);
        setTestDetailValue({
            ...testDetailValue,
            question: tempArr,
        });
    };
    const handleChangeTask = (index, event) => {
        let tempArr = testDetailValue.task;
        tempArr[index] = event.target.value;
        setTestDetailValue({
            ...testDetailValue,
            task: tempArr,
        });
    };
    const handleChangeQuestion = (index, event) => {
        let tempArr = testDetailValue.question;
        tempArr[index] = event.target.value;
        setTestDetailValue({
            ...testDetailValue,
            question: tempArr,
        });
    };
    const handleClickSave = () => {
        setTestDetailByFirebase(router.query.testID, testDetailValue)
            .then((res) => {
                alert(res.message);
                router.push('/customer/account/test-list');
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getTestDetailByFirebase(router.query.testID)
            .then((res) => {
                if (res.status == 'fail') {
                    alert(res.message);
                    router.push('/customer/account/test-list');
                } else {
                    setTestDetailValue(res.data);
                }
            })
            .catch((err) => console.err(err));
    }, [router, currentUser]);

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
                        <div className={styles.field}>
                            <input
                                placeholder='Enter test name'
                                onChange={handleChangeTestName}
                                value={testDetailValue.testName}
                            />
                        </div>
                        <div className={styles.field}>
                            <span>1. Number of Participants:</span>
                            <input
                                placeholder='...'
                                onChange={handleChangeNumberOfParticipants}
                                value={testDetailValue.numberOfParticipants}
                            />
                        </div>
                        <div className={styles.field}>
                            <span>2. Choose type of product to test:</span>
                            <select
                                onChange={handleChangeTypeProduct}
                                value={testDetailValue.typeProduct}
                            >
                                <option value='website'>Website</option>
                                <option value='software'>Software</option>
                            </select>
                        </div>
                        <div className={styles.raio_input}>
                            <span>3. Test language:</span>
                            <div className={styles.language}>
                                <input
                                    id='arabic'
                                    type={'radio'}
                                    name='language'
                                    value={'arabic'}
                                    onChange={handleChangeLanguage}
                                    checked={true && testDetailValue.language == 'arabic'}
                                />
                                <label htmlFor='arabic'>Arabic</label>
                            </div>
                            <div className={styles.language}>
                                <input
                                    id='english'
                                    type={'radio'}
                                    name='language'
                                    value={'english'}
                                    onChange={handleChangeLanguage}
                                    checked={true && testDetailValue.language == 'english'}
                                />
                                <label htmlFor='english'>English</label>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <span>4. End Date:</span>
                            <input
                                type='date'
                                onChange={handleChangeEndDate}
                                value={testDetailValue.endDate}
                            />
                        </div>
                        <div className={styles.raio_input}>
                            <span>5. Device to test:</span>
                            <div className={styles.device}>
                                <input
                                    id='desktop'
                                    name='device'
                                    type={'radio'}
                                    value={'desktop'}
                                    onChange={handleChangeDevice}
                                    checked={true && testDetailValue.device == 'desktop'}
                                />
                                <label htmlFor='desktop'>Desktop</label>
                            </div>
                            <div className={styles.device}>
                                <input
                                    id='mobile'
                                    name='device'
                                    type={'radio'}
                                    value={'mobile'}
                                    onChange={handleChangeDevice}
                                    checked={true && testDetailValue.device == 'mobile'}
                                />
                                <label htmlFor='mobile'>Mobile</label>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <span>6. Max sesssion time: </span>
                            <input
                                placeholder='...'
                                onChange={handleChangeMaxSesssion}
                                value={testDetailValue.maxSesssion}
                            />
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
                                                onChange={handleChangeAge}
                                                value={testDetailValue.participants.age}
                                            />
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Sex:</div>
                                            <select
                                                onChange={handleChangeSex}
                                                value={testDetailValue.participants.sex}
                                            >
                                                <option value={'male'}>Male</option>
                                                <option value={'female'}>Female</option>
                                            </select>
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Family Status:</div>
                                            <select
                                                value={testDetailValue.participants.familyStatus}
                                                onChange={handleChangeFamilyStatus}
                                            >
                                                <option value={'married'}>Married</option>
                                                <option value={'single'}>Single</option>
                                            </select>
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Education:</div>
                                            <select
                                                value={testDetailValue.participants.education}
                                                onChange={handleChangeEducation}
                                            >
                                                <option value={'a'}>A</option>
                                                <option value={'b'}>B</option>
                                            </select>
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Employment:</div>
                                            <select
                                                value={testDetailValue.participants.employment}
                                                onChange={handleChangeEmployment}
                                            >
                                                <option value={'a'}>A</option>
                                                <option value={'b'}>B</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.right}>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Income:</div>
                                            <select
                                                value={testDetailValue.participants.income}
                                                onChange={handleChangeIncome}
                                            >
                                                <option value={'a'}>A</option>
                                                <option value={'b'}>B</option>
                                            </select>
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Social Networking:</div>
                                            <select
                                                value={
                                                    testDetailValue.participants.socialNetworking
                                                }
                                                onChange={handleChangeSocialNetworking}
                                            >
                                                <option value={'a'}>A</option>
                                                <option value={'b'}>B</option>
                                            </select>
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Devices:</div>
                                            <select
                                                value={testDetailValue.participants.devices}
                                                onChange={handleChangeDevices}
                                            >
                                                <option value={'a'}>A</option>
                                                <option value={'b'}>B</option>
                                            </select>
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Technology:</div>
                                            <select
                                                value={testDetailValue.participants.technology}
                                                onChange={handleChangeTechnology}
                                            >
                                                <option value={'a'}>A</option>
                                                <option value={'b'}>B</option>
                                            </select>
                                        </div>
                                        <div className={styles.input_field}>
                                            <div className={styles.label}>Browser:</div>
                                            <select
                                                value={testDetailValue.participants.browser}
                                                onChange={handleChangeBrowser}
                                            >
                                                <option value={'chrome'}>Chrome</option>
                                                <option value={'safari'}>Safari</option>
                                                <option value={'firefox'}>Firefox</option>
                                            </select>
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
                                    <input
                                        onChange={handleChangeURL}
                                        value={testDetailValue.instruction.url}
                                    />
                                </div>
                                <div className={styles.input_field}>
                                    <div className={styles.label}>Test instruction: </div>
                                    <input
                                        onChange={handleChangeTestInstruction}
                                        value={testDetailValue.instruction.testInstruction}
                                    />
                                </div>
                                <div className={styles.input_field}>
                                    <div className={styles.label}>Scenario: </div>
                                    <input
                                        onChange={handleChangeScenario}
                                        value={testDetailValue.instruction.scenario}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <span>9. Task and Questions</span>
                            <div className={styles.button_group}>
                                <button onClick={handleClickAddTask}>Add task</button>
                                <button onClick={handleClickAddQuestions}>Add question</button>
                            </div>
                            <div className={styles.task_question_list}>
                                {testDetailValue.task.map((item, index) => (
                                    <div key={index} className={styles.task}>
                                        <textarea
                                            value={item}
                                            onChange={(event) => handleChangeTask(index, event)}
                                        />
                                        <button onClick={() => handleClickDeleteTask(index)}>
                                            Delete Task
                                        </button>
                                    </div>
                                ))}
                                {testDetailValue.question.map((item, index) => (
                                    <div key={index} className={styles.question}>
                                        <textarea
                                            value={item}
                                            onChange={(event) => handleChangeQuestion(index, event)}
                                        />
                                        <button onClick={() => handleClickDeleteQuestion(index)}>
                                            Delete Question
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.field}>
                            <button onClick={handleClickSave} className={styles.save_button}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetail;
