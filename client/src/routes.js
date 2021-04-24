import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {ProfilePage} from './pages/ProfilePage';
import {MoviePage} from './pages/MoviePage';
import {TVShowsPage} from './pages/TVShowsPage';
import {PeoplePage} from './pages/PeoplePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/movie/:id' component={MoviePage} />
                <Route path='/tv' component={TVShowsPage} />
                <Route path='/person' component={PeoplePage} />
                <Route path='/profile/:id' component={ProfilePage} />
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
