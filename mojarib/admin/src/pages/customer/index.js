import * as React from 'react';
import {
    Table,
    TableBody,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    styled,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {deleteCustomer, getCustomerList, getMoreCustomer} from "../../../firebase/customer";

import {Container, Badge, Row, Button, Col, Toast} from "react-bootstrap"
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "src/contexts/AuthContext";
import {useRouter} from "next/router";
import {signOutByFirebase} from "../../../firebase/admin";

export async function getStaticProps() {
    return {
        props: {
            title: "List Analyst",
        },
    }
}

export default function Index() {
    const router = useRouter();
    const {currentUser} = useAuth();
    const [list, setList] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [selected, setSelected] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [deleteAnalystId, setDeleteAnalystId] = useState(null);
    const [toastState, setToastState] = useState(false)
    const [toastType, setToastType] = useState('bg-info')
    const [toastMessage, setToastMessage] = useState('Success')
    const [deleteLoading, setDeleteLoading] = useState(false)
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = list.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    useEffect(() => {
        if (currentUser) {
            getCustomerList().then(resData => {
                console.log('res', resData)
                setList(resData.list)
                setLastVisible(resData.lastVisible)
                if (!resData.list.length) {
                    setIsEnd(true)
                }
            });
        }
    }, [currentUser, router])
    const toggleDelete = useCallback(() => {
        setOpenDeleteDialog(prevState => !prevState);
    }, [])
    const loadMore = useCallback(() => {
        setLoadMoreLoading(true)
        getMoreCustomer(lastVisible).then(resData => {
            console.log('resData', resData)
            if (resData.list.length) {
                setList(prevState => prevState.concat(resData.list))
                setLastVisible(resData.lastVisible)
            } else {
                setIsEnd(true)
            }
            setLoadMoreLoading(false)
        })
    }, [lastVisible])

    const deleteAnalystFunction = useCallback(id => {
        setDeleteLoading(true)
        deleteCustomer(id).then(resData => {
            if (resData.redirected) {
                signOutByFirebase()
            }
            if (resData.success) {
                setIsEnd(false);
                router.push('/customer')
            } else {
                console.log('resData', resData)
                setToastType('bg-danger')
                setToastMessage(resData.message)
                setToastState(true)
            }
            toggleDelete()
            setDeleteLoading(false)
        })
    }, [])
    const redirectToEditPage = useCallback((id) => {
        router.push('/customer/' + id)
    }, [router])
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#343a40',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    return (
        <Container fluid className="px-lg-4 px-xl-5">
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
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} stickyHeader aria-label="sticky customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < list.length}
                                    checked={list.length > 0 && selected.length === list.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all desserts',
                                    }}
                                />
                            </StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Created At</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < list.length}
                                        checked={list.length > 0 && selected.length === list.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell component={'th'}>{row.email}</TableCell>
                                <TableCell align="right">{`${row.firstName} ${row.lastName}`}</TableCell>
                                <TableCell align="right"><Badge
                                    className={`badge ${(row.status || row.status === undefined) ? 'text-success bg-success-light' : 'text-danger bg-danger-light'}`}>{(row.status || row.status === undefined) ? 'Active' : 'Deactive'}</Badge></TableCell>
                                <TableCell
                                    align="right">{row.createdAt && `${row.createdAt.toDate().getDate()}/${row.createdAt.toDate().getMonth() + 1}/${row.createdAt.toDate().getFullYear()}`}</TableCell>
                                <TableCell align="right">
                                    <Button variant="primary" className={'me-2'} size={"sm"}
                                            onClick={() => redirectToEditPage(row.id)}>Edit</Button>
                                    <Button variant="danger" size={"sm"}
                                            onClick={() => {
                                                setDeleteAnalystId(row.id);
                                                toggleDelete();
                                            }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Row className={'d-flex align-items-center mt-1'}>
                <Col md={2} style={{margin: "auto"}} className={'d-flex align-items-center'}>
                    {!isEnd &&
                    <LoadingButton variant="contained" onClick={loadMore} size={"small"} loading={loadMoreLoading}>Load
                        More</LoadingButton>}
                </Col>
            </Row>
            <Dialog
                open={openDeleteDialog}
                onClose={toggleDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this customer ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this customer. This can't be undone ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleDelete} variant="outlined">Disagree</Button>
                    <LoadingButton variant="contained" color="error" onClick={() => deleteAnalystFunction(deleteAnalystId)}
                                   loading={deleteLoading}>Agree</LoadingButton>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
