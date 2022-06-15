import {PARTICIPANTS} from '../firebase/const';

const useCmsContent = (role = '') => {
    const participantTermsAndConditions = () => {
        return (
            <div className='container'>
                <h1>Contributor Terms of Service</h1>
                <p>
                    Thank you for your interest in using the UserTesting
                    Platform to deliver your feedback on products, services and
                    other content from organizations all around the world! Your
                    feedback helps these organizations better understand and
                    empathize with their customers and users. These terms shall
                    govern your access to and use of the UserTesting Platform.
                    As used herein, the "<strong>UserTesting Platform</strong>"
                    shall refer to all platforms owned and operated by User
                    Testing, Inc. and all subsidiaries thereof. User Testing,
                    Inc. and all subsidiaries shall collectively be referred to
                    as "<strong>UserTesting</strong>" for purposes of this
                    Agreement.
                </p>
                <p>
                    To use the UserTesting Platform, you must agree to these
                    UserTesting Contributor Terms of Service (“
                    <strong>Terms of Service</strong>”), which are published at{' '}
                    <a href='https://www.usertesting.com/terms-of-use-contributor'>
                        https://www.usertesting.com/terms-of-use-contributor
                    </a>
                    , and which may be updated by us from time to time. You must
                    also agree to and abide by the following policies:{' '}
                    <a href='https://www.usertesting.com/privacy-policy'>
                        Privacy Policy
                    </a>
                    ,{' '}
                    <a href='https://support.usertesting.com/hc/en-us/articles/4405136672403'>
                        Contributor Code of Conduct
                    </a>
                    , and{' '}
                    <a href='https://www.usertesting.com/content-policy'>
                        Content Policy
                    </a>
                    . These policies along with these Terms of Service are
                    referred to together as the “<strong>Agreement</strong>”. If
                    you provide your email address to us, we will notify you if
                    we change any material terms of these Terms of Service, and
                    your continued use of the Platform will be deemed acceptance
                    of the updated Terms of Service.
                </p>
                <p>
                    PLEASE READ THIS AGREEMENT CAREFULLY TO ENSURE THAT YOU
                    UNDERSTAND EACH PROVISION. THIS AGREEMENT CONTAINS AN
                    ARBITRATION AGREEMENT IN SECTION 6.4 THAT REQUIRES, WITH
                    LIMITED EXCEPTION, THAT YOU AND USERTESTING ARBITRATE CLAIMS
                    ON AN INDIVIDUAL BASIS.
                </p>
                <hr />
                <p>
                    By accepting these Terms of Service as indicated below, you
                    represent and warrant that you are 18 years of age or older,
                    and that you have read, understood and agree to the entire
                    Agreement.
                </p>
                <p>
                    If you are accepting this Agreement on behalf of a company
                    or other legal entity, you also represent and warrant that
                    you have the authority to bind that entity to the terms of
                    this Agreement and that you agree to this Agreement on the
                    entity’s behalf. In this case, references to “you” shall be
                    both to you individually as well as to the entity.
                </p>
                <hr />
                <h2>1.0 Overview of the Platform</h2>
                <h3>1.1 Platform and Tests</h3>
                <p>
                    UserTesting has developed a software platform (the “
                    <strong>Platform</strong>”) that enables UserTesting or its
                    customers (“<strong>Customers</strong>”) to define questions
                    and tasks (“<strong>Tests</strong>”) in order to solicit
                    feedback on any brand, design, content or current or
                    potential offering. A person who uses the Platform in order
                    to participate in one or more Tests is referred to in this
                    Agreement as a “<strong>Contributor</strong>”.
                </p>
                <p>
                    If permitted as part of their purchase, Customers can
                    recruit their own Contributors (“
                    <strong>Private Contributors</strong>”) to take a Test on
                    the Platform or can request UserTesting to source
                    Contributors for them.
                </p>
                <p>
                    UserTesting directs invitations for Tests from a Customer to
                    groups of Contributors according to the Customer’s test
                    plan. If a Test is directed to you, you will have the
                    opportunity to accept the Test. You are not required to
                    accept a Test directed to you.
                </p>
                <p>
                    Each Test completed by a Contributor shall be recorded (a “
                    <strong>Recording</strong>”) and made available to the
                    Customer on the Platform. A Recording of a Test you complete
                    may include, among other things, your voice, video, face,
                    movements, screen, text inputs, and device and screen
                    interactions.
                </p>
                <h3>1.2 Rewards</h3>
                <p>
                    Upon completing a Test, you may be entitled to receive a
                    payment, a gift card, points or other rewards (“
                    <strong>Rewards</strong>”). In advance of each Test, you
                    will be informed through the Platform or directly if
                    completion of the Test entitles you to a Reward.
                </p>
                <p>
                    You are responsible for determining any tax liabilities
                    incurred as a result of receiving a Reward. If you are a
                    Contributor with U.S. tax obligations, you may be required
                    to provide UserTesting with W-9 information.
                </p>
                <p>
                    Occasionally, a Customer may offer to provide a Reward to
                    you for completing a Test it developed. If a Customer makes
                    such an offer, then you shall receive the Reward directly
                    from that Customer, and you acknowledge and agree that
                    UserTesting has no obligation with respect to such Reward.
                </p>
                <p>
                    Any Contributor who engages in any of the Restricted
                    Activities set out below shall not be entitled to receive a
                    Reward.
                </p>
                <h3>
                    1.3 Your Role as a Contributor and Relationship with
                    UserTesting
                </h3>
                <p>
                    As a Contributor, you are a user of our Platform. Our
                    Platform connects you with Customers seeking Contributors
                    for Tests. As a Contributor, you are operating as a
                    participant in market research. UserTesting does not employ
                    you.
                </p>
                <p>
                    Nothing in this Agreement will be construed to make you an
                    agent, employee, partner or legal representative of or joint
                    venture with UserTesting. You will not be entitled to any
                    employment-related benefits and you are solely responsible
                    for your taxes.
                </p>
                <h3>1.4 Third-Party Beneficiary</h3>
                <p>
                    Customers for whom you are conducting Tests are third-party
                    beneficiaries of this Agreement. To the extent that any act
                    or omission by you causes any damage or liability to any
                    such Customer, such Customer shall have the right to enforce
                    any provision of this Agreement.
                </p>
                <h2>2.0 Information Collected</h2>
                <h3>2.1 Contributor Information</h3>
                <p>
                    We care about the privacy of Contributors. When you use the
                    Platform, register with UserTesting to become a Contributor,
                    fill out questionnaires related to specific Tests, or
                    complete a Test, UserTesting will receive and collect
                    information about you, which may include, but is not limited
                    to:
                </p>
                <ul>
                    <li>
                        <p>
                            <em>personally identifiable information</em> such as
                            your name, email address or other identification,
                            contact and account information
                        </p>
                    </li>
                    <li>
                        <p>
                            <em>demographic information</em> such as age,
                            gender, education, employment status and hobbies
                        </p>
                    </li>
                    <li>
                        <p>
                            <em>other information</em> that we may request to
                            facilitate the completion and analysis of Tests
                            (collectively, “
                            <strong>Contributor Information</strong>”)
                        </p>
                    </li>
                </ul>
                <p>
                    You represent that the Contributor Information that you
                    provide to UserTesting will be accurate and complete.
                </p>
                <h3>2.2 Recordings</h3>
                <p>
                    You understand and agree that each Test you take is captured
                    in a Recording and that the Recording may include video or
                    photographic recordings of your face, audio recordings of
                    your voice, recordings of your screen, text inputs,
                    recordings of interactions with your device, and recordings
                    of interactions with your surroundings, provided that all
                    such information capture will only occur in connection with
                    a Test.
                </p>
                <p>
                    You further understand and agree that where the Test is
                    created by a Customer, UserTesting will provide a copy of
                    the Recording of that Test to the Customer for the
                    Customer’s use.
                </p>
                <h3>2.3 Contributor Content</h3>
                <p>
                    UserTesting makes Recordings of the Tests you take and may
                    also collect other content such as comments, suggestions and
                    ideas you post to, or send over, the Platform, whether in
                    response to a Test prompt or otherwise. This content,
                    together with Recordings, are referred to in these Terms of
                    Service as “<strong>Contributor Content</strong>”.
                </p>
                <p>You represent and warrant the following:</p>
                <ul>
                    <li>
                        <p>
                            You have obtained and are solely responsible for
                            obtaining all consents as may be required by law to
                            provide any Contributor Content relating to third
                            parties.
                        </p>
                    </li>
                    <li>
                        <p>
                            Your Contributor Content and UserTesting’s use
                            thereof as contemplated by this Agreement and the
                            Platform will not violate any law or infringe any
                            rights of any third party.
                        </p>
                    </li>
                    <li>
                        <p>
                            UserTesting may exercise the rights to your
                            Contributor Content granted under this Agreement
                            without liability for payment of any guild fees,
                            residuals, payments, fees, or royalties payable
                            under any collective bargaining agreement or
                            otherwise.
                        </p>
                    </li>
                    <li>
                        <p>
                            To the best of your knowledge, all your Contributor
                            Content and other information that you provide to us
                            is truthful and accurate.
                        </p>
                    </li>
                </ul>
                <h3>2.4 Privacy</h3>
                <p>
                    For information on how your Contributor Information and the
                    Contributor Content may be used, please see our{' '}
                    <a href='https://www.usertesting.com/privacy-policy'>
                        Privacy Policy
                    </a>
                    .
                </p>
                <h2>3.0 Ownership and Proprietary Rights</h2>
                <h3>3.1 Assignment of Test Results to UserTesting</h3>
                <p>
                    In consideration for your use of the Platform and where a
                    Reward is provided, your receipt of such Reward, you hereby
                    assign to UserTesting all right, title, and interest you
                    have in and to all results of your Tests, including the
                    Recording and your Contributor Content (“
                    <strong>Test Results</strong>”), provided that
                    non-assignable moral rights are waived. You agree to take
                    any action reasonably requested by UserTesting, at
                    UserTesting’s expense, to evidence, perfect, obtain,
                    maintain, enforce, or defend such assigned rights.
                </p>
                <p>
                    You acknowledge and agree that UserTesting will provide
                    Recordings of Tests created by a Customer to the Customer
                    for their business use.
                </p>
                <p>
                    You acknowledge and agree that Recordings of Tests developed
                    by UserTesting may be publicly displayed or distributed by
                    UserTesting. These Tests will be clearly identified on the
                    Platform. You will be given a chance to opt out of including
                    a Recording of a Test you completed in such public display
                    or distribution.
                </p>
                <p>
                    You may submit comments or ideas about the Platform or
                    Tests, including without limitation about how to improve the
                    Platform, Tests, or our other products or services (“
                    <strong>Ideas</strong>”). By submitting any Idea, you agree
                    that your disclosure is gratuitous, unsolicited and without
                    restriction and will not place UserTesting under any
                    fiduciary or other obligation, and that we are free to use
                    the Idea without any additional compensation to you, and/or
                    to disclose the Idea on a non-confidential basis or
                    otherwise to anyone. You further acknowledge that, by
                    acceptance of your submission, UserTesting does not waive
                    any rights to use similar or related ideas previously known
                    to UserTesting, or developed by its employees, or obtained
                    from sources other than you.
                </p>
                <h3>3.2 Use of and Limited License to the Platform</h3>
                <p>
                    You acknowledge and agree that all content, designs,
                    features, functions, elements and aspects of the Platform
                    are the exclusive property of UserTesting, or its licensors,
                    and may be protected by applicable intellectual property and
                    other laws.
                </p>
                <p>
                    Subject to the provisions of this Agreement, UserTesting
                    grants to you a personal, non-sublicensable, nonexclusive,
                    non-transferable, freely revocable, limited license to use
                    the Platform as permitted by the features of the Platform
                    solely to conduct Tests on behalf of UserTesting and
                    Customers, and in accordance with any documentation or
                    instructions supplied by UserTesting or such Customers.
                    UserTesting may terminate this license at any time for any
                    reason or no reason.
                </p>
                <p>
                    Except as expressly provided in this Agreement, nothing
                    provided in connection with Tests shall be construed as
                    conferring upon you any license under any of UserTesting’s,
                    Customers’, or any other party’s Intellectual Property
                    Rights, whether by estoppel, implication, waiver, or
                    otherwise. UserTesting reserves all rights not expressly
                    granted herein in the Platform and any related content.
                </p>
                <p>
                    For the purposes of this Agreement, “
                    <strong>Intellectual Property Rights</strong>” means all
                    patent rights, copyright rights, mask work rights, moral
                    rights, rights of publicity, trademark, trade dress and
                    service mark rights, goodwill, trade secret rights and other
                    intellectual property rights as may now exist or hereafter
                    come into existence, and all applications therefore and
                    registrations, renewals and extensions thereof, under the
                    laws of any state, country, territory or other jurisdiction.
                </p>
                <h2>4.0 Your Obligations</h2>
                <h3>4.1 Confidential Information</h3>
                <p>
                    When you access the Platform, you will be shown or exposed
                    to both Customer Confidential Information and UserTesting
                    Confidential Information
                </p>
                <p>
                    “<strong>Customer Confidential Information</strong>” means
                    the Tests developed by a Customer, non-public information
                    about a Customer’s brand, design, content or current or
                    potential offering, and the fact that the Customer has
                    requested that a Test be completed on the Platform.
                </p>
                <p>
                    “<strong>UserTesting Confidential Information</strong>”
                    means all non-public content, designs, features, functions,
                    elements and aspects of the Platform, and the Test Results.
                </p>
                <p>
                    Customer Confidential Information and UserTesting
                    Confidential Information are referred to in these Terms of
                    Service collectively as “
                    <strong>Confidential Information</strong>”.
                </p>
                <h3>4.2 Your Obligations of Confidentiality</h3>
                <p>
                    You agree not to disclose Confidential Information to anyone
                    other than UserTesting or the Customer who developed the
                    Test giving rise to the Confidential Information.
                </p>
                <p>
                    You agree not to use Confidential Information for any
                    purpose other than completing the Tests you have accepted
                    and assigning the Test Results to UserTesting.
                </p>
                <p>
                    Notwithstanding the foregoing, you may disclose Confidential
                    Information to the extent required by a court of competent
                    jurisdiction or other applicable governmental authority or
                    as required by applicable law.
                </p>
                <p>
                    You agree and acknowledge that your breach or threatened
                    breach of this provision may result in irreparable harm to
                    UserTesting or a Customer, for which money damages would be
                    an insufficient remedy, and therefore that UserTesting or
                    such Customer will be entitled to seek injunctive relief to
                    enforce the provisions of this section.
                </p>
                <p>
                    As a third-party beneficiary to this Agreement, a Customer
                    may enforce these confidentiality obligations against you
                    directly. In some cases, a Customer may also require that
                    you sign a separate non-disclosure agreement directly with
                    them.
                </p>
                <h3>4.3 Security and Passwords</h3>
                <p>
                    You understand that UserTesting takes steps to ensure that
                    your Contributor Information is treated securely, but no
                    Internet transmission or method of electronic storage is
                    100% secure or error free. You acknowledge and agree that
                    UserTesting cannot guarantee the security of any information
                    provided by you and that you provide information at your own
                    risk. You are responsible for maintaining the
                    confidentiality of any usernames and passwords associated
                    with your account and for monitoring all activity under your
                    account. You are responsible for all activities, acts, or
                    omissions that occur under your account, and you agree to
                    assume full responsibility for any such activities, acts, or
                    omissions. If you become aware of any unauthorized use of
                    your password or your account, you should notify UserTesting
                    immediately at the email address provided at the end of this
                    Agreement.
                </p>
                <h3>4.4 Restricted Activity</h3>
                <p>
                    You are not permitted to do any of the following (each a “
                    <strong>Restricted Activity</strong>”):
                </p>
            </div>
        );
    };

    const participantPrivacyPolicy = () => {
        return (
            <div className='container my-10 md:mt-20'>
                <h1>Privacy Policy</h1>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
            </div>
        );
    };

    const customerTermsAndConditions = () => {
        return (
            <div className='container'>
                <h1>Terms of Service for Customers</h1>
                <p>
                    Thank you for your interest in using the UserTesting
                    Platform to deliver your feedback on products, services and
                    other content from organizations all around the world! Your
                    feedback helps these organizations better understand and
                    empathize with their customers and users. These terms shall
                    govern your access to and use of the UserTesting Platform.
                    As used herein, the "<strong>UserTesting Platform</strong>"
                    shall refer to all platforms owned and operated by User
                    Testing, Inc. and all subsidiaries thereof. User Testing,
                    Inc. and all subsidiaries shall collectively be referred to
                    as "<strong>UserTesting</strong>" for purposes of this
                    Agreement.
                </p>
                <p>
                    To use the UserTesting Platform, you must agree to these
                    UserTesting Contributor Terms of Service (“
                    <strong>Terms of Service</strong>”), which are published at{' '}
                    <a href='https://www.usertesting.com/terms-of-use-contributor'>
                        https://www.usertesting.com/terms-of-use-contributor
                    </a>
                    , and which may be updated by us from time to time. You must
                    also agree to and abide by the following policies:{' '}
                    <a href='https://www.usertesting.com/privacy-policy'>
                        Privacy Policy
                    </a>
                    ,{' '}
                    <a href='https://support.usertesting.com/hc/en-us/articles/4405136672403'>
                        Contributor Code of Conduct
                    </a>
                    , and{' '}
                    <a href='https://www.usertesting.com/content-policy'>
                        Content Policy
                    </a>
                    . These policies along with these Terms of Service are
                    referred to together as the “<strong>Agreement</strong>”. If
                    you provide your email address to us, we will notify you if
                    we change any material terms of these Terms of Service, and
                    your continued use of the Platform will be deemed acceptance
                    of the updated Terms of Service.
                </p>
                <p>
                    PLEASE READ THIS AGREEMENT CAREFULLY TO ENSURE THAT YOU
                    UNDERSTAND EACH PROVISION. THIS AGREEMENT CONTAINS AN
                    ARBITRATION AGREEMENT IN SECTION 6.4 THAT REQUIRES, WITH
                    LIMITED EXCEPTION, THAT YOU AND USERTESTING ARBITRATE CLAIMS
                    ON AN INDIVIDUAL BASIS.
                </p>
                <hr />
                <p>
                    By accepting these Terms of Service as indicated below, you
                    represent and warrant that you are 18 years of age or older,
                    and that you have read, understood and agree to the entire
                    Agreement.
                </p>
                <p>
                    If you are accepting this Agreement on behalf of a company
                    or other legal entity, you also represent and warrant that
                    you have the authority to bind that entity to the terms of
                    this Agreement and that you agree to this Agreement on the
                    entity’s behalf. In this case, references to “you” shall be
                    both to you individually as well as to the entity.
                </p>
                <hr />
                <h2>1.0 Overview of the Platform</h2>
                <h3>1.1 Platform and Tests</h3>
                <p>
                    UserTesting has developed a software platform (the “
                    <strong>Platform</strong>”) that enables UserTesting or its
                    customers (“<strong>Customers</strong>”) to define questions
                    and tasks (“<strong>Tests</strong>”) in order to solicit
                    feedback on any brand, design, content or current or
                    potential offering. A person who uses the Platform in order
                    to participate in one or more Tests is referred to in this
                    Agreement as a “<strong>Contributor</strong>”.
                </p>
                <p>
                    If permitted as part of their purchase, Customers can
                    recruit their own Contributors (“
                    <strong>Private Contributors</strong>”) to take a Test on
                    the Platform or can request UserTesting to source
                    Contributors for them.
                </p>
                <p>
                    UserTesting directs invitations for Tests from a Customer to
                    groups of Contributors according to the Customer’s test
                    plan. If a Test is directed to you, you will have the
                    opportunity to accept the Test. You are not required to
                    accept a Test directed to you.
                </p>
                <p>
                    Each Test completed by a Contributor shall be recorded (a “
                    <strong>Recording</strong>”) and made available to the
                    Customer on the Platform. A Recording of a Test you complete
                    may include, among other things, your voice, video, face,
                    movements, screen, text inputs, and device and screen
                    interactions.
                </p>
                <h3>1.2 Rewards</h3>
                <p>
                    Upon completing a Test, you may be entitled to receive a
                    payment, a gift card, points or other rewards (“
                    <strong>Rewards</strong>”). In advance of each Test, you
                    will be informed through the Platform or directly if
                    completion of the Test entitles you to a Reward.
                </p>
                <p>
                    You are responsible for determining any tax liabilities
                    incurred as a result of receiving a Reward. If you are a
                    Contributor with U.S. tax obligations, you may be required
                    to provide UserTesting with W-9 information.
                </p>
                <p>
                    Occasionally, a Customer may offer to provide a Reward to
                    you for completing a Test it developed. If a Customer makes
                    such an offer, then you shall receive the Reward directly
                    from that Customer, and you acknowledge and agree that
                    UserTesting has no obligation with respect to such Reward.
                </p>
                <p>
                    Any Contributor who engages in any of the Restricted
                    Activities set out below shall not be entitled to receive a
                    Reward.
                </p>
                <h3>
                    1.3 Your Role as a Contributor and Relationship with
                    UserTesting
                </h3>
                <p>
                    As a Contributor, you are a user of our Platform. Our
                    Platform connects you with Customers seeking Contributors
                    for Tests. As a Contributor, you are operating as a
                    participant in market research. UserTesting does not employ
                    you.
                </p>
                <p>
                    Nothing in this Agreement will be construed to make you an
                    agent, employee, partner or legal representative of or joint
                    venture with UserTesting. You will not be entitled to any
                    employment-related benefits and you are solely responsible
                    for your taxes.
                </p>
                <h3>1.4 Third-Party Beneficiary</h3>
                <p>
                    Customers for whom you are conducting Tests are third-party
                    beneficiaries of this Agreement. To the extent that any act
                    or omission by you causes any damage or liability to any
                    such Customer, such Customer shall have the right to enforce
                    any provision of this Agreement.
                </p>
                <h2>2.0 Information Collected</h2>
                <h3>2.1 Contributor Information</h3>
                <p>
                    We care about the privacy of Contributors. When you use the
                    Platform, register with UserTesting to become a Contributor,
                    fill out questionnaires related to specific Tests, or
                    complete a Test, UserTesting will receive and collect
                    information about you, which may include, but is not limited
                    to:
                </p>
                <ul>
                    <li>
                        <p>
                            <em>personally identifiable information</em> such as
                            your name, email address or other identification,
                            contact and account information
                        </p>
                    </li>
                    <li>
                        <p>
                            <em>demographic information</em> such as age,
                            gender, education, employment status and hobbies
                        </p>
                    </li>
                    <li>
                        <p>
                            <em>other information</em> that we may request to
                            facilitate the completion and analysis of Tests
                            (collectively, “
                            <strong>Contributor Information</strong>”)
                        </p>
                    </li>
                </ul>
                <p>
                    You represent that the Contributor Information that you
                    provide to UserTesting will be accurate and complete.
                </p>
                <h3>2.2 Recordings</h3>
                <p>
                    You understand and agree that each Test you take is captured
                    in a Recording and that the Recording may include video or
                    photographic recordings of your face, audio recordings of
                    your voice, recordings of your screen, text inputs,
                    recordings of interactions with your device, and recordings
                    of interactions with your surroundings, provided that all
                    such information capture will only occur in connection with
                    a Test.
                </p>
                <p>
                    You further understand and agree that where the Test is
                    created by a Customer, UserTesting will provide a copy of
                    the Recording of that Test to the Customer for the
                    Customer’s use.
                </p>
                <h3>2.3 Contributor Content</h3>
                <p>
                    UserTesting makes Recordings of the Tests you take and may
                    also collect other content such as comments, suggestions and
                    ideas you post to, or send over, the Platform, whether in
                    response to a Test prompt or otherwise. This content,
                    together with Recordings, are referred to in these Terms of
                    Service as “<strong>Contributor Content</strong>”.
                </p>
                <p>You represent and warrant the following:</p>
                <ul>
                    <li>
                        <p>
                            You have obtained and are solely responsible for
                            obtaining all consents as may be required by law to
                            provide any Contributor Content relating to third
                            parties.
                        </p>
                    </li>
                    <li>
                        <p>
                            Your Contributor Content and UserTesting’s use
                            thereof as contemplated by this Agreement and the
                            Platform will not violate any law or infringe any
                            rights of any third party.
                        </p>
                    </li>
                    <li>
                        <p>
                            UserTesting may exercise the rights to your
                            Contributor Content granted under this Agreement
                            without liability for payment of any guild fees,
                            residuals, payments, fees, or royalties payable
                            under any collective bargaining agreement or
                            otherwise.
                        </p>
                    </li>
                    <li>
                        <p>
                            To the best of your knowledge, all your Contributor
                            Content and other information that you provide to us
                            is truthful and accurate.
                        </p>
                    </li>
                </ul>
                <h3>2.4 Privacy</h3>
                <p>
                    For information on how your Contributor Information and the
                    Contributor Content may be used, please see our{' '}
                    <a href='https://www.usertesting.com/privacy-policy'>
                        Privacy Policy
                    </a>
                    .
                </p>
                <h2>3.0 Ownership and Proprietary Rights</h2>
                <h3>3.1 Assignment of Test Results to UserTesting</h3>
                <p>
                    In consideration for your use of the Platform and where a
                    Reward is provided, your receipt of such Reward, you hereby
                    assign to UserTesting all right, title, and interest you
                    have in and to all results of your Tests, including the
                    Recording and your Contributor Content (“
                    <strong>Test Results</strong>”), provided that
                    non-assignable moral rights are waived. You agree to take
                    any action reasonably requested by UserTesting, at
                    UserTesting’s expense, to evidence, perfect, obtain,
                    maintain, enforce, or defend such assigned rights.
                </p>
                <p>
                    You acknowledge and agree that UserTesting will provide
                    Recordings of Tests created by a Customer to the Customer
                    for their business use.
                </p>
                <p>
                    You acknowledge and agree that Recordings of Tests developed
                    by UserTesting may be publicly displayed or distributed by
                    UserTesting. These Tests will be clearly identified on the
                    Platform. You will be given a chance to opt out of including
                    a Recording of a Test you completed in such public display
                    or distribution.
                </p>
                <p>
                    You may submit comments or ideas about the Platform or
                    Tests, including without limitation about how to improve the
                    Platform, Tests, or our other products or services (“
                    <strong>Ideas</strong>”). By submitting any Idea, you agree
                    that your disclosure is gratuitous, unsolicited and without
                    restriction and will not place UserTesting under any
                    fiduciary or other obligation, and that we are free to use
                    the Idea without any additional compensation to you, and/or
                    to disclose the Idea on a non-confidential basis or
                    otherwise to anyone. You further acknowledge that, by
                    acceptance of your submission, UserTesting does not waive
                    any rights to use similar or related ideas previously known
                    to UserTesting, or developed by its employees, or obtained
                    from sources other than you.
                </p>
                <h3>3.2 Use of and Limited License to the Platform</h3>
                <p>
                    You acknowledge and agree that all content, designs,
                    features, functions, elements and aspects of the Platform
                    are the exclusive property of UserTesting, or its licensors,
                    and may be protected by applicable intellectual property and
                    other laws.
                </p>
                <p>
                    Subject to the provisions of this Agreement, UserTesting
                    grants to you a personal, non-sublicensable, nonexclusive,
                    non-transferable, freely revocable, limited license to use
                    the Platform as permitted by the features of the Platform
                    solely to conduct Tests on behalf of UserTesting and
                    Customers, and in accordance with any documentation or
                    instructions supplied by UserTesting or such Customers.
                    UserTesting may terminate this license at any time for any
                    reason or no reason.
                </p>
                <p>
                    Except as expressly provided in this Agreement, nothing
                    provided in connection with Tests shall be construed as
                    conferring upon you any license under any of UserTesting’s,
                    Customers’, or any other party’s Intellectual Property
                    Rights, whether by estoppel, implication, waiver, or
                    otherwise. UserTesting reserves all rights not expressly
                    granted herein in the Platform and any related content.
                </p>
                <p>
                    For the purposes of this Agreement, “
                    <strong>Intellectual Property Rights</strong>” means all
                    patent rights, copyright rights, mask work rights, moral
                    rights, rights of publicity, trademark, trade dress and
                    service mark rights, goodwill, trade secret rights and other
                    intellectual property rights as may now exist or hereafter
                    come into existence, and all applications therefore and
                    registrations, renewals and extensions thereof, under the
                    laws of any state, country, territory or other jurisdiction.
                </p>
                <h2>4.0 Your Obligations</h2>
                <h3>4.1 Confidential Information</h3>
                <p>
                    When you access the Platform, you will be shown or exposed
                    to both Customer Confidential Information and UserTesting
                    Confidential Information
                </p>
                <p>
                    “<strong>Customer Confidential Information</strong>” means
                    the Tests developed by a Customer, non-public information
                    about a Customer’s brand, design, content or current or
                    potential offering, and the fact that the Customer has
                    requested that a Test be completed on the Platform.
                </p>
                <p>
                    “<strong>UserTesting Confidential Information</strong>”
                    means all non-public content, designs, features, functions,
                    elements and aspects of the Platform, and the Test Results.
                </p>
                <p>
                    Customer Confidential Information and UserTesting
                    Confidential Information are referred to in these Terms of
                    Service collectively as “
                    <strong>Confidential Information</strong>”.
                </p>
                <h3>4.2 Your Obligations of Confidentiality</h3>
                <p>
                    You agree not to disclose Confidential Information to anyone
                    other than UserTesting or the Customer who developed the
                    Test giving rise to the Confidential Information.
                </p>
                <p>
                    You agree not to use Confidential Information for any
                    purpose other than completing the Tests you have accepted
                    and assigning the Test Results to UserTesting.
                </p>
                <p>
                    Notwithstanding the foregoing, you may disclose Confidential
                    Information to the extent required by a court of competent
                    jurisdiction or other applicable governmental authority or
                    as required by applicable law.
                </p>
                <p>
                    You agree and acknowledge that your breach or threatened
                    breach of this provision may result in irreparable harm to
                    UserTesting or a Customer, for which money damages would be
                    an insufficient remedy, and therefore that UserTesting or
                    such Customer will be entitled to seek injunctive relief to
                    enforce the provisions of this section.
                </p>
                <p>
                    As a third-party beneficiary to this Agreement, a Customer
                    may enforce these confidentiality obligations against you
                    directly. In some cases, a Customer may also require that
                    you sign a separate non-disclosure agreement directly with
                    them.
                </p>
                <h3>4.3 Security and Passwords</h3>
                <p>
                    You understand that UserTesting takes steps to ensure that
                    your Contributor Information is treated securely, but no
                    Internet transmission or method of electronic storage is
                    100% secure or error free. You acknowledge and agree that
                    UserTesting cannot guarantee the security of any information
                    provided by you and that you provide information at your own
                    risk. You are responsible for maintaining the
                    confidentiality of any usernames and passwords associated
                    with your account and for monitoring all activity under your
                    account. You are responsible for all activities, acts, or
                    omissions that occur under your account, and you agree to
                    assume full responsibility for any such activities, acts, or
                    omissions. If you become aware of any unauthorized use of
                    your password or your account, you should notify UserTesting
                    immediately at the email address provided at the end of this
                    Agreement.
                </p>
                <h3>4.4 Restricted Activity</h3>
                <p>
                    You are not permitted to do any of the following (each a “
                    <strong>Restricted Activity</strong>”):
                </p>
            </div>
        );
    };

    const customerPrivacyPolicy = () => {
        return (
            <div className='container my-10 md:mt-20'>
                <h1>Customer Privacy Policy for Customers</h1>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
                <p>
                    At UserTesting, your privacy is important to us. This
                    Privacy Policy describes the personal data that User
                    Testing, Inc., Teston AS, and group companies (collectively
                    referred to as "the Company," “we," "our," and "us")
                    processes. This Privacy Policy also explains how we process
                    personal data and for what purposes.
                </p>
            </div>
        );
    };

    return {
        termsAndConditions:
            role === PARTICIPANTS
                ? participantTermsAndConditions()
                : customerTermsAndConditions(),
        privacyPolicy:
            role === PARTICIPANTS
                ? participantPrivacyPolicy()
                : customerPrivacyPolicy(),
    };
};

export default useCmsContent;
