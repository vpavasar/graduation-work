import React, {useState, useContext, useEffect, useCallback} from 'react';
import {useHistory, NavLink} from 'react-router-dom';

import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook.js';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

const getFullName = (user) => `${user.firstName} ${user.lastName}`;

export const ProfilePage = () => {
    const history = useHistory();
    const {loading, request} = useHttp();
    const {userId} = useContext(AuthContext);
    const [user, setUser] = useState({})
    const profileId = history.location.pathname.split('/profile/')[1];

    const fetchUser = useCallback(async () => {
        try {
          const fetched = await request(`/api/users/${profileId}`);
          setUser(fetched.user);
        } catch (e) {}
      }, [profileId, request])

    useEffect(() => {
        fetchUser();
    }, [profileId, fetchUser]);

    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <Container>
            <h1>{getFullName(user)}</h1>
            <p>{user.email}</p>
            <p>userId: {userId}</p>
            <NavLink to='/'>Home page</NavLink>
        </Container>
    )
}
