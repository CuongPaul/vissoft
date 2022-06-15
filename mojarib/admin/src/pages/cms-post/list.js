import Link from "next/link"
import {Button, Card, Container, Form} from "react-bootstrap"
import Image from "../../components/CustomImage"

import {DataTable} from "simple-datatables"
import {useEffect, useRef, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInfoCircle, faPencilAlt, faPlus} from "@fortawesome/free-solid-svg-icons"
import {getListingPosts} from '../../../firebase/post'
import {useLoaderContext} from "../../contexts/PageLoaderContext";
import {CmsPost} from "../../components/CmsPost";

export async function getStaticProps() {
    return {
        props: {
            title: "Posts",
        },
    }
}

export default function postList(props) {
    const [posts, setPosts] = useState([])
    const {setShowLoader} = useLoaderContext()

    useEffect(async () => {
        setShowLoader(true)
        await getListingPosts().then(r => {
            setPosts(r.data)
            setShowLoader(false)
        })
    }, [])

    return (
        <Container fluid className="px-lg-4 px-xl-5">
            <div className="page-header d-flex justify-content-between align-items-center">
                <h1 className="page-heading">{props.title}</h1>
                <div>
                    <Link href="/cms-post/create" passHref>
                        <Button variant="primary" className="text-uppercase">
                            <FontAwesomeIcon icon={faPlus} /> Add new
                        </Button>
                    </Link>
                </div>
            </div>
            <section className="mb-5">
                <Card className="card-table">
                    <CmsPost items={posts} defaultPageSize={10} />
                </Card>
            </section>
        </Container>
    )
}
