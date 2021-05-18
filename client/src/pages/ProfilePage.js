import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import {NavLink} from "react-router-dom";
import Container from '@material-ui/core/Container';

export const ProfilePage = () => {
    const history = useHistory();
    const {userId} = useContext(AuthContext);
    const profileId = history.location.pathname.split('/profile/')[1];

    useEffect(() => {
        
    }, [])

    return (
        <Container>
            <h1>Profile page</h1>
            <p>{userId}</p>
            <NavLink to='/'>Home page</NavLink>
        </Container>
    )
}
