import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomSnackbar({message, clearError}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    clearError();
    setOpen(false);
  };

  const view = <div className={classes.root}>
      
  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
      {message}
    </Alert>
  </Snackbar>
  {/* <Alert severity="error">This is an error message!</Alert>
  <Alert severity="warning">This is a warning message!</Alert>
  <Alert severity="info">This is an information message!</Alert>
  <Alert severity="success">This is a success message!</Alert> */}
</div>

  return message ? view : null;
}
