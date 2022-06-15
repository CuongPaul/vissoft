import React, {useState} from "react"

import {Dropdown, NavItem, NavLink} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext";
import {signOutByFirebase} from "../../../firebase/admin";
import {ADMIN_LOGIN} from "../../const";

import {useRouter} from "next/router";

export default function UserMenu() {
    const {currentUser} = useAuth();
    const router = useRouter();

    const handleClickLogout = () => {
        signOutByFirebase()
            .then(() => {
                router.push(ADMIN_LOGIN);
                alert("Logout successfully");
            })
            .catch(() => alert("Logout failure"));
    };
    return (
        <Dropdown as={NavItem} className="ms-auto" align="end">
            <Dropdown.Toggle as={NavLink} className="pe-0" id="userInfo">
                {currentUser ? currentUser.displayName : ''}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="dropdown-menu-animated"
                aria-labelledby="userInfo"
                data-bs-popper="none"
            >
                <Dropdown.Header className="text-gray-700">
                    <h6 className="text-uppercase font-weight-bold">{currentUser && currentUser.displayName}</h6>
                    <small>Web Developer</small>
                </Dropdown.Header>
                <Dropdown.Divider/>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Item href="#">Activity log </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleClickLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
