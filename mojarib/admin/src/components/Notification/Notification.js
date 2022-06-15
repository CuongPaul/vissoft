import { Toast } from "react-bootstrap"
import {useState} from "react";
import ToastContainer from 'react-bootstrap/ToastContainer';
import {useToastContext} from "../../contexts/ToastContext";

export default function Notification() {
    const {toastMessage, setShowToast, showToast} = useToastContext()
    const header = 'Notification';
    return(
        <div className={'toast-container position-fixed z-index-50 top-0 end-0 p-3'}>
            <ToastContainer>
                <Toast
                    show={showToast}
                    autohide={true}
                    position={'top-end'}
                    onClose={() => setShowToast(false)}
                >
                    <Toast.Header>
                        <span className="dot bg-info me-2" />
                        <div className="card-heading text-dark me-auto">{header}</div>
                    </Toast.Header>

                    <Toast.Body className="text-muted">
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}