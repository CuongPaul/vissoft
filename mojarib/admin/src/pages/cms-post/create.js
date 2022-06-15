import {Row, Col, Card, Container, Form, Button, Collapse} from "react-bootstrap"
import PageHeader from "../../components/PageHeader"
import { Editor } from '@tinymce/tinymce-react';
import {createPostByFirebase} from "../../../firebase/post";
import React, {useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import { serverTimestamp } from "firebase/firestore";
import {useRouter} from "next/router";
import {useLoaderContext} from "../../contexts/PageLoaderContext";
import {useToastContext} from "../../contexts/ToastContext";

export async function getStaticProps() {
    const {
        AWS_FOLDER,
        AWS_BUCKET_NAME,
        AWS_BUCKET_REGION,
        AWS_ACCESS_KEY,
        AWS_SECRET_KEY,
        TINYMCE_SITE_KEY
    } = process.env;

    const config = {
        dirName: AWS_FOLDER,
        bucketName: AWS_BUCKET_NAME,
        region: AWS_BUCKET_REGION,
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
    return {
        props: {
            title: "Add new post",
            config: config,
            editorKey: TINYMCE_SITE_KEY
        },
    }
}
export default function postCreate(props) {
    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const titleRef = React.useRef();
    const editorRef = React.useRef(null);
    const {currentUser} = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const {setShowLoader} = useLoaderContext();
    const {setShowToast, setToastMessage} = useToastContext();

    const handleSubmit = async (event) => {
        setShowLoader(true)
        event.preventDefault()
        const form = event.currentTarget;
        const title = titleRef.current.value;
        const content = editorRef.current.getContent();
        const image = await handleUploadFile();
        const created_at = serverTimestamp()
        const updated_at = created_at
        const author = currentUser.displayName;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                await createPostByFirebase(
                    title,
                    content,
                    image,
                    author,
                    created_at,
                    updated_at
                ).then((res) => {
                    if (res.status == 'success') {
                        setShowToast(true)
                        setToastMessage('You have created a blog post')
                        setTimeout(() => {
                            router.push(`/cms-post/${res.data.postId}`)
                        }, 2000)
                    }
                })

                setShowLoader(false)

            } catch (error) {
                setShowToast(true)
                setToastMessage('Failed to create a post, please try again')
                setShowLoader(false);

            }
            setValidated(true);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleUploadFile = async () => {
        const reactS3 = require('react-s3');
        return await reactS3.uploadFile(selectedFile, props.config)
            .then(data => {
                return data.location;
            })
            .catch(err => console.error(err))
    }
    return (
        <Container fluid className="px-lg-4 px-xl-5">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <PageHeader title={props.title} />
                <section>
                    <Row className="mb-5">
                        <Col lg={8} xxl={9} className="mb-4 mb-lg-0">
                            <Card>
                                <Card.Body>
                                    <Form.Label htmlFor="postTitle">Title</Form.Label>
                                    <Form.Control ref={titleRef} required id="postTitle" type="text" className="mb-4" />
                                    <Editor
                                        apiKey={props.editorKey}
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue={'test'}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
                                                'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                                                'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                                            ],
                                            toolbar: 'image undo redo | formatpainter casechange blocks | bold italic backcolor | ' +
                                                'alignleft aligncenter alignright alignjustify | ' +
                                                'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            image_title: true,
                                            /* enable automatic uploads of images represented by blob or data URIs*/
                                            automatic_uploads: true,
                                            /*
                                              URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                                              images_upload_url: 'postAcceptor.php',
                                              here we add custom filepicker only to Image dialog
                                            */
                                            file_picker_types: 'image',
                                            /* and here's our custom image picker*/
                                            file_picker_callback: function (cb, value, meta) {
                                                var input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.setAttribute('accept', 'image/*');

                                                /*
                                                  Note: In modern browsers input[type="file"] is functional without
                                                  even adding it to the DOM, but that might not be the case in some older
                                                  or quirky browsers like IE, so you might want to add it to the DOM
                                                  just in case, and visually hide it. And do not forget do remove it
                                                  once you do not need it anymore.
                                                */

                                                input.onchange = function () {
                                                    var file = this.files[0];

                                                    var reader = new FileReader();
                                                    reader.onload = function () {
                                                        /*
                                                          Note: Now we need to register the blob in TinyMCEs image blob
                                                          registry. In the next release this part hopefully won't be
                                                          necessary, as we are looking to handle it internally.
                                                        */
                                                        var id = 'blobid' + (new Date()).getTime();
                                                        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                                        var base64 = reader.result.split(',')[1];
                                                        var blobInfo = blobCache.create(id, file, base64);
                                                        blobCache.add(blobInfo);

                                                        /* call the callback and populate the Title field with the file name */
                                                        cb(blobInfo.blobUri(), { title: file.name });
                                                    };
                                                    reader.readAsDataURL(file);
                                                };

                                                input.click();
                                            },
                                        }}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} xxl={3}>
                            <Card className="shadow-sm mb-4">
                                <Card.Header className="py-4">
                                    <h4 className="card-heading">Publish</h4>
                                </Card.Header>
                                <Card.Footer className="text-end">
                                    <Button variant="primary" type={"submit"}>Publish</Button>
                                </Card.Footer>
                            </Card>
                            <Card className="shadow-sm mb-4">
                                <Card.Header className="py-4">
                                    <h4 className="card-heading">Featured Image</h4>
                                </Card.Header>
                                <Card.Body className="text-end">
                                    <input type="file" name="image" onChange={handleFileChange} />
                                    <div>
                                        <img className="previewImage"  src={previewImage} width={'100%'} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </section>
            </Form>
        </Container>
    )
}
