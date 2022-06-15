import {Container, Row, Col, Card} from "react-bootstrap"
import React from "react";

export async function getStaticProps() {
    return {
        props: {
            title: "404 Page not found",
        },
    }
}

export default function Page404(props) {
    return (
        <Container fluid className="px-lg-4 px-xl-5">
            <section>
                <Row className="mb-5">
                    <Col lg={8} xxl={9} className="mb-4 mb-lg-0">
                        <Card>
                            <Card.Body>
                                <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">
                                    {props.title}
                                </h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </Container>
    )
}
