import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'green'
    }
}));

export const ButtonLike = () => {
  const classes = useStyles();

  return (
    <IconButton color="primary" aria-label="add to shopping cart" size="small">
        <ThumbUpOutlinedIcon className={classes.icon} fontSize="small"/>
    </IconButton>
  );
}
