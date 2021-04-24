import React from 'react'
import {NavLink} from "react-router-dom";
import Container from '@material-ui/core/Container';

export const TVShowsPage = () => {
    return (
        <Container>
            <div>
                <h2 className='pageTitle'>Popular TV Shows</h2>
            </div>
            <NavLink to='/'>Home page</NavLink>
        </Container>
    )
}
