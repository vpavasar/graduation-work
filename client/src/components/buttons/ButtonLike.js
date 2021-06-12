import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotActive from '@material-ui/icons/ThumbUpOutlined';
import Active from '@material-ui/icons/ThumbUpAltRounded';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'green'
    }
}));

export const ButtonLike = ({onClick = () => {}, isActive}) => {
  const classes = useStyles();

  return (
    <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={onClick}>
        {
          isActive ?
          <Active className={classes.icon} fontSize="small"/>
          :<NotActive className={classes.icon} fontSize="small"/>
        }
    </IconButton>
  );
}
