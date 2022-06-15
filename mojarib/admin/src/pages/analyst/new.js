import {
    Card,
    Col,
    Container,
    Row,
    Form,
    Button,
    Toast
} from "react-bootstrap"
import {Formik} from "formik"
import Breadcrumbs from "src/components/Breadcrumbs"
import PageHeader from "src/components/PageHeader"
import * as Yup from "yup"
import React, {useCallback, useEffect, useRef, useState} from "react"
import {createAccount, createAnalyst} from "../../../firebase/analyst"
import {PASSWORD_REGEX} from "src/const";
import {useAuth} from "src/contexts/AuthContext";
import {redirect} from "next/dist/server/api-utils";

export async function getStaticProps() {
    return {
        props: {
            title: "New Analyst",
        },
    }
}

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address (Ex: email@domain.com)').required("This is a required field."),
    password: Yup.string().required("This is a required field.").matches(PASSWORD_REGEX, 'The password must be at least 8 characters without spaces and consist of digits, lowercase, UPPERCASE and special characters'),
    firstName: Yup.string().required("This is a required field."),
    lastName: Yup.string().required("This is a required field."),
    active: Yup.bool('Must be true or false').required("This is a required field."),

})
export default function NewAnalyst(props) {
    const {createdAccount} = useAuth();
    const [formData, setFormData] = useState(null)
    useEffect(() => {
        if (createdAccount && formData) {
            createAnalyst(createdAccount, formData).then(res => {
                console.log(res)
            })
        }
    }, [createdAccount, formData])
    const [toastState, setToastState] = useState(false)
    const [toastType, setToastType] = useState('bg-info')
    const [toastMessage, setToastMessage] = useState('Success')
    return (
        <Container fluid className="px-lg-4 px-xl-5">

            <Breadcrumbs title={props.title}/>
            <PageHeader title={props.title}/>
            <section>
                <div className="position-fixed" style={{zIndex: 100, bottom: "100px", right: "2%"}}>
                    <Toast
                        show={toastState}
                        onClose={() => setToastState(toastState => !toastState)}
                    >
                        <Toast.Header>
                            <span className={`dot me-2 ${toastType}`}/>
                            <div className="card-heading text-dark me-auto">Notification</div>
                        </Toast.Header>

                        <Toast.Body className="text-muted">
                            {toastMessage}
                        </Toast.Body>
                    </Toast>
                </div>
                <Card className="mb-4">
                    <Card.Header>
                        <h4 className="card-heading">Create New Analyst</h4>
                    </Card.Header>
                    <Card.Body>
                        <Formik
                            validationSchema={ValidationSchema}
                            initialValues={{
                                active: true,
                                email: '',
                                password: '',
                                firstName: "",
                                lastName: ""
                            }}
                            onSubmit={async (values) => {
                                console.log(values)
                                setFormData(values)
                                await createAccount(values).then(res => {
                                    console.log('res', res)
                                    if (res.status) {
                                        setToastType('bg-info')
                                    } else {
                                        setToastType('bg-danger')
                                    }
                                    setToastMessage(res.message)
                                    setToastState(true)
                                })
                            }}
                        >
                            {({
                                  handleSubmit,
                                  handleChange,
                                  handleBlur,
                                  values,
                                  touched,
                                  isValid,
                                  errors,
                              }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row className="g-3 mb-3">
                                        <Form.Group as={Col} md={12} controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control
                                                name="active"
                                                as={"select"}
                                                className="form-select"
                                                value={values.active}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.active && !errors.active}
                                                isInvalid={!!errors.active}
                                            >
                                                <option value={true}>Active</option>
                                                <option value={false}>Deactive</option>
                                            </Form.Control>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.active}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.email && !errors.email}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                name="password"
                                                type="email"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.password && !errors.password}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="firstName">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                name="firstName"
                                                type="text"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.firstName && !errors.firstName}
                                                isInvalid={!!errors.firstName}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="lastName">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control
                                                name="lastName"
                                                type="text"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.lastName && !errors.lastName}
                                                isInvalid={!!errors.lastName}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastName}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                    </Row>
                                    <Button variant="primary" type="submit">
                                        Submit form
                                    </Button>
                                </Form>
                            )}
                        </Formik>

                    </Card.Body>
                </Card>


            </section>


        </Container>
    )
}
