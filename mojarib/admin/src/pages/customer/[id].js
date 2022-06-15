import {
    Card,
    Col,
    Container,
    Row,
    Form,
    Toast
} from "react-bootstrap"
import {Formik} from "formik"
import Breadcrumbs from "src/components/Breadcrumbs"
import PageHeader from "src/components/PageHeader"
import * as Yup from "yup"
import React, { useEffect, useState} from "react"
import {resetPassword, updateCustomer, getCustomerDetail} from "../../../firebase/customer"
import {PASSWORD_REGEX} from "src/const";
import {useRouter} from "next/router";
import Preloader from "../../components/Preloader";
import {signOutByFirebase} from "../../../firebase/admin";
import LoadingButton from "@mui/lab/LoadingButton";


const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address (Ex: email@domain.com)').required("This is a required field."),
    firstName: Yup.string().required("This is a required field."),
    lastName: Yup.string().required("This is a required field."),
    active: Yup.bool('Must be true or false').required("This is a required field."),
    organizationName: Yup.string(),
    sector: Yup.string().required("This is a required field."),
    website: Yup.string(),
    vat: Yup.string().required("This is a required field."),
    country: Yup.string().required("This is a required field."),
    city: Yup.string().required("This is a required field."),
    building: Yup.string(),
    postalCode: Yup.string(),
    address: Yup.string().required("This is a required field."),
})

const ValidationSchemaPassword = Yup.object().shape({
    password: Yup.string().required('This field is required.').matches(PASSWORD_REGEX, 'The password must be at least 8 characters without spaces and consist of digits, lowercase, UPPERCASE and special characters'),
    confirmPassword: Yup.string().required('This field is required.').oneOf([Yup.ref('password')], 'Confirm password not match with password.')

})
export default function EditCustomer(props) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        active: true,
        email: '',
        firstName: "",
        lastName: "",
        organizationName: '',
        sector: 'sector-1',
        website: '',
        vat: '',
        country: 'SA',
        city: 'riyahdh',
        building: '',
        postalCode: '',
        address: '',
    })
    const [toastState, setToastState] = useState(false)
    const [toastType, setToastType] = useState('bg-info')
    const [toastMessage, setToastMessage] = useState('Success')
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [resetLoading, setResetLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCustomerDetail(router.query.id).then(res => {
            console.log('res', res.data)
            setFormData(res.data)
            setLoading(false)
        });
    }, [router.query])
    return (
        <Container fluid className="px-lg-4 px-xl-5">

            <Breadcrumbs title={'Edit Customer'}/>
            <PageHeader title={'Edit Customer'}/>
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
                        <h4 className="card-heading">Update Customer</h4>
                    </Card.Header>
                    <Card.Body>
                        {loading ? <Preloader type={'pulse'} center={true}/> : <Formik
                            validationSchema={ValidationSchema}
                            initialValues={formData}
                            onSubmit={async (values) => {
                                setFormData(values)
                                setUpdateLoading(true)
                                await updateCustomer(router.query.id ,values).then(res => {
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
                                        <Form.Group as={Col} md={6} controlId="sector">
                                            <Form.Label>Sector</Form.Label>
                                            <Form.Control
                                                name="sector"
                                                as={"select"}
                                                className="form-select"
                                                value={values.sector}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.sector && !errors.sector}
                                                isInvalid={!!errors.sector}
                                            >
                                                <option value={'sector-1'}>Sector 1</option>
                                                <option value={'sector-2'}>Sector 2</option>
                                            </Form.Control>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.sector}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="website">
                                            <Form.Label>Website</Form.Label>
                                            <Form.Control
                                                name="website"
                                                type="text"
                                                value={values.website}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.website && !errors.website}
                                                isInvalid={!!errors.website}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.website}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="vat">
                                            <Form.Label>VAT Number</Form.Label>
                                            <Form.Control
                                                name="vat"
                                                type="text"
                                                value={values.vat}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.vat && !errors.vat}
                                                isInvalid={!!errors.vat}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.vat}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="country">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                name="country"
                                                as={"select"}
                                                value={values.country}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.country && !errors.country}
                                                isInvalid={!!errors.country}
                                            >
                                                <option value={'SA'}>Saudi Arabia</option>
                                                <option value={'VN'}>Vietnam</option>
                                            </Form.Control>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.country}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="city">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                name="city"
                                                as={"select"}
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.city && !errors.city}
                                                isInvalid={!!errors.city}
                                            >
                                                <option value={'riyahdh'}>Saudi Arabia</option>
                                                <option value={'hanoi'}>Hanoi</option>
                                            </Form.Control>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.city}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="building">
                                            <Form.Label>Building</Form.Label>
                                            <Form.Control
                                                name="building"
                                                type="text"
                                                value={values.building}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.building && !errors.building}
                                                isInvalid={!!errors.building}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.building}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="postalCode">
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control
                                                name="postalCode"
                                                type="text"
                                                value={values.postalCode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.postalCode && !errors.postalCode}
                                                isInvalid={!!errors.postalCode}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.postalCode}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                name="address"
                                                type="text"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.address && !errors.address}
                                                isInvalid={!!errors.address}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.address}
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
