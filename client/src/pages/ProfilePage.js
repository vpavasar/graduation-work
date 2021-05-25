import React, {useState, useContext, useEffect} from 'react';
import {useHistory, NavLink} from 'react-router-dom';

import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook.js';

import Container from '@material-ui/core/Container';

const getFullName = (user) => `${user.firstName} ${user.lastName}`;

export const ProfilePage = () => {
    const history = useHistory();

    const [user, setUser] = useState({})
    const {loading, request} = useHttp();

    const {userId} = useContext(AuthContext);
    const profileId = history.location.pathname.split('/profile/')[1];

    useEffect(async () => {
        const response = await request(`/api/users/${profileId}`);
        console.log('Is loading Profile:', loading);
        console.log('Response profile:', response);
        setUser(response.user)
    }, []);

    if(loading) return 'loading...'

    return (
        <Container>
            <h1>{getFullName(user)}</h1>
            <p>{user.email}</p>
            <NavLink to='/'>Home page</NavLink>
        </Container>
    )
}
