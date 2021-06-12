import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {HomePage} from './pages/HomePage';
import {ProfilePage} from './pages/ProfilePage';
import {MoviePage} from './pages/MoviePage';
import {TVShowsPage} from './pages/TVShowsPage';
import {TvPage} from './pages/TvPage';
import {PeoplePage} from './pages/PeoplePage';
import {SearchMoviesPage} from './pages/SearchMoviesPage';
import {PersonPage} from './pages/PersonPage';
import {SignIn} from './pages/SignIn';
import {SignUp} from './pages/SignUp';
import { AdminUserPage } from './pages/AdminUsersPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/movie/:id' component={MoviePage} />
                <Route path='/tv/:id' component={TvPage} />
                <Route path='/tv' component={TVShowsPage} />
                <Route path='/profile/:id' component={ProfilePage} />
                <Route path='/search/:request' component={SearchMoviesPage} />
                <Route path='/person/:id' component={PersonPage} />
                <Route path='/person' component={PeoplePage} />
                <Route path='/admin/users' component={AdminUserPage} />
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/sign-in' exact component={SignIn} />
            <Route path='/sign-up' exact component={SignUp} />
            <Redirect to='/sign-in'/>
        </Switch>
    )
}
