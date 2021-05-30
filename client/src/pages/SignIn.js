import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useHttp} from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import {LocalizationContext, localizations} from '../context/LocalizationContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = () => {
  const auth = useContext(AuthContext);  
  const {localization} = useContext(LocalizationContext);
  const {request} = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div>
          <h1>Movies Searcher</h1>
          <br/>
        </div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        {localization === localizations.EN ? 'Sign in' : 'Войти'}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={localization === localizations.EN ? 'Email Address' : 'Адрес электронной почты'}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={localization === localizations.EN ? 'Password' : 'Пароль'}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={localization === localizations.EN ? 'Remember me' : 'Запомнить меня'}
          />
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loginHandler}
          >
            {localization === localizations.EN ? 'Sign in' : 'Войти'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
              {localization === localizations.EN ? 'Forgot password?' : 'Забыли пароль?'}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
              {localization === localizations.EN ? 'Don\'t have an account? Sign Up' : 'Зарегистрироваться'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
