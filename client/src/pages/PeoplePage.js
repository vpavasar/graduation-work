import React from 'react'
import {NavLink} from "react-router-dom";
import Container from '@material-ui/core/Container';

export const PeoplePage = () => {
    return (
        <Container>
            <div>
                <h2 className='pageTitle'>Popular People</h2>
            </div>
            <NavLink to='/'>Home page</NavLink>
        </Container>
    )
}
