import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'red'
    }
}));

export const ButtonDislike = () => {
  const classes = useStyles();

  return (
    <IconButton color="primary" aria-label="add to shopping cart" size="small">
        <ThumbDownOutlinedIcon className={classes.icon} fontSize="small"/>
    </IconButton>
  );
}
