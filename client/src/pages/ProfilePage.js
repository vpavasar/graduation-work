import React from 'react'
import {NavLink} from "react-router-dom";
import Container from '@material-ui/core/Container';

export const ProfilePage = () => {
    return (
        <Container>
            <h1>Profile page</h1>
            <NavLink to='/'>Home page</NavLink>
        </Container>
    )
}
