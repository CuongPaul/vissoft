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
import React, { useEffect, useState} from "react"
import {resetPassword, updateAnalyst, getAnalystDetail} from "../../../firebase/analyst"
import {PASSWORD_REGEX} from "src/const";
import {useRouter} from "next/router";
import Preloader from "../../components/Preloader";
import {signOutByFirebase} from "../../../firebase/admin";
import LoadingButton from "@mui/lab/LoadingButton";


const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address (Ex: email@domain.com)').required("This is a required field."),
    firstName: Yup.string().required("This is a required field."),
    lastName: Yup.string().required("This is a required field."),
    active: Yup.bool().required("This is a required field."),
})

const ValidationSchemaPassword = Yup.object().shape({
    password: Yup.string().required('This field is required.').matches(PASSWORD_REGEX, 'The password must be at least 8 characters without spaces and consist of digits, lowercase, UPPERCASE and special characters'),
    confirmPassword: Yup.string().required('This field is required.').oneOf([Yup.ref('password')], 'Confirm password not match with password.')

})
export default function editAnalyst(props) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        active: true,
        email: '',
        firstName: "",
        lastName: ""
    })
    const [toastState, setToastState] = useState(false)
    const [toastType, setToastType] = useState('bg-info')
    const [toastMessage, setToastMessage] = useState('Success')
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [resetLoading, setResetLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getAnalystDetail(router.query.id).then(res => {
            console.log('res', res.data)
            setFormData(res.data)
            setLoading(false)
        });
    }, [router.query])
    return (
        <Container fluid className="px-lg-4 px-xl-5">

            <Breadcrumbs title={'Edit Analyst'}/>
            <PageHeader title={'Edit Analyst'}/>
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
                        <h4 className="card-heading">Update Analyst</h4>
                    </Card.Header>
                    <Card.Body>
                        {loading ? <Preloader type={'pulse'} center={true}/> : <Formik
                            validationSchema={ValidationSchema}
                            initialValues={formData}
                            onSubmit={async (values) => {
                                setFormData(values)
                                setUpdateLoading(true)
                                await updateAnalyst(router.query.id ,values).then(res => {
                                    if (res.redirected) {
                                        signOutByFirebase()
                                    }
                                    if (res.success) {
                                        setToastType('bg-info')
                                    } else {
                                        setToastType('bg-danger')
                                    }
                                    setToastMessage(res.message)
                                    setToastState(true)
                                    setUpdateLoading(false)
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
                                    <LoadingButton variant="contained" color={'info'} type={'submit'}
                                                   loading={updateLoading}>Update</LoadingButton>
                                </Form>
                            )}
                        </Formik>}

                    </Card.Body>
                </Card>
                <Card className="mb-4">
                    <Card.Header>
                        <h4 className="card-heading">Reset password</h4>
                    </Card.Header>
                    <Card.Body>
                        <Formik
                            validationSchema={ValidationSchemaPassword}
                            initialValues={{
                                password: '',
                                confirmPassword: ''
                            }}
                            onSubmit={async (values) => {
                                setFormData(values)
                                setResetLoading(true)
                                await resetPassword(router.query.id ,values).then(res => {
                                    if (res.redirected) {
                                        signOutByFirebase()
                                    }
                                    if (res.success) {
                                        setToastType('bg-info')
                                    } else {
                                        setToastType('bg-danger')
                                    }
                                    setToastMessage(res.message)
                                    setToastState(true)
                                    setResetLoading(false)
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
                                        <Form.Group as={Col} md={12} controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                name="password"
                                                type="password"
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
                                        <Form.Group as={Col} md={12} controlId="confirmPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                name="confirmPassword"
                                                type="password"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.confirmPassword && !errors.confirmPassword}
                                                isInvalid={!!errors.confirmPassword}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <LoadingButton variant="contained" color={'info'} type={'submit'}
                                                   loading={resetLoading}>Reset</LoadingButton>
                                </Form>
                            )}
                        </Formik>

                    </Card.Body>
                </Card>
            </section>
        </Container>
    )
}
