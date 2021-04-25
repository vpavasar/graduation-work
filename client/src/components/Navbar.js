import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function Navbar() {
    const classes = useStyles();

    const history = useHistory()
    const auth = useContext(AuthContext);
    const logoutHandler = () => {
        auth.logout();
        history.push('/');
    }
    const goToMovies = () => {
        history.push('/');
    }
    const goToTV = () => {
        history.push('/tv');
    }
    const goToProfile = () => {
        history.push(`/profile/${auth.userId}`);
    }
    const goToPeople = () => {
        history.push('/person');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: 'rgba(0, 0, 0, 0.54)'}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                       <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Movies Searcher
                    </Typography>
                    <Button color="inherit" onClick={goToMovies}>Movies</Button>
                    <Button color="inherit" onClick={goToTV}>TV Shows</Button>
                    <Button color="inherit" onClick={goToPeople}>People</Button>
                    <Button color="inherit" onClick={goToProfile}>Profile</Button>
                    <Button  onClick={logoutHandler}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
