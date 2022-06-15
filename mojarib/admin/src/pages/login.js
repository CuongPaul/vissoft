import * as yup from "yup";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap"
import Image from "../components/CustomImage"
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import useTrans from "../../src/hooks/useTrans";
import {signInByFirebase, signOutByFirebase, isAdminExist} from "../../firebase/admin";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import styles from "../../../mojarib/pages/customer/login/Login.module.scss";
import {ADMIN_LOGIN, ADMIN_DASHBOARD} from "../const";
import {useAuth} from "../contexts/AuthContext";

export async function getStaticProps() {
    return {
        props: {
            title: "Login",
            pageHolderClass: "page-holder align-items-center py-4 bg-gray-100 vh-100",
            hideHeader: true,
            hideFooter: true,
            hideSidebar: true,
        },
    }
}


export default function login() {
    const trans = useTrans();
    const router = useRouter();
    const schema = yup.object().shape({
        email: yup
            .string()
            .email(`${trans.login.errorMessage.emailValid}`)
            .required(`${trans.login.errorMessage.emailRequired}`),
        password: yup
            .string()
            .required(`${trans.login.errorMessage.passwordRequired}`)
    });
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver: yupResolver(schema)});

    const [isLoading, setIsLoading] = useState(false);

    const onLoginSubmit = async (data) => {
        try {
            setIsLoading((pre) => !pre);

            await signInByFirebase(data.email, data.password)
                .then((res) => {
                    console.log('user', res)
                    setIsLoading((pre) => !pre);
                    isAdminExist(res.user.uid)
                        .then(exist => {
                            if (exist) {
                                document.cookie = `accessToken=${res.user.accessToken}; path=/`
                                document.cookie = `uid=${res.user.uid}; path=/`
                                router.push("/");
                            } else {
                                alert('Invalid username or password')
                                signOutByFirebase()
                                router.push("/login");
                            }
                        })
                        .catch(err => {
                            router.push("/login")
                        });
                })
        } catch (error) {
            alert('Something went wrong')
            console.log('err', error)
            setIsLoading((pre) => !pre);
        }
    };
    return (
        <Container>
            <Row className="align-items-center">
                <Col lg={6} className="px-lg-4">
                    <Card>
                        <Card.Header className="px-lg-5">
                            <div className="card-heading text-primary">Mojarib Dashboard</div>
                        </Card.Header>
                        <Card.Body className="p-lg-5">
                            <Form id="loginForm" action="/">
                                <div className="form-floating mb-3">
                                    <Form.Control
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        {...register("email")}
                                    />
                                    <Form.Label htmlFor="email">Email address</Form.Label>
                                    {errors.email && (
                                        <span className={styles.error}>
                                    {errors.email?.message}
                                </span>
                                    )}
                                </div>
                                <div className="form-floating mb-3">
                                    <Form.Control
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password")}
                                    />
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    {errors.password && (
                                        <span className={styles.error}>
                                    {errors.password?.message}


                                </span>
                                    )}
                                </div>
                                <Button disabled={isLoading} variant="primary" onClick={handleSubmit(onLoginSubmit)}
                                        size="lg" type="submit">
                                    Submit
                                </Button
                                >
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col
                    lg={6}
                    xl={5}
                    className="ms-xl-auto px-lg-4 text-center text-primary"
                >
                    <div className="mb-4">
                        <div style={{transform: "rotate(10deg)"}}>
                            <Image
                                src="/img/drawkit-illustration.svg"
                                alt="..."
                                width={475}
                                height={356}
                                className="img-fluid"
                            />
                        </div>
                    </div>
                    <h1 className="mb-4">
                        Start saving <br className="d-none d-lg-inline"/>
                        your time &amp; money
                    </h1>
                    <p className="lead text-muted">
                        One morning, when Gregor Samsa woke from troubled dreams, he found
                        himself transformed in his bed in
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
