import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCommentIcon from '@material-ui/icons/AddComment';
import {LocalizationContext, localizations} from '../context/LocalizationContext';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export const CommentForm = ({commentObjectId, mediaType}) => {
    const classes = useStyles();
    const [text, setText] = React.useState('');

    const {localization} = useContext(LocalizationContext);
    const {userId} = useContext(AuthContext);
    const {request} = useHttp();
  
    const handleChange = (event) => {
      setText(event.target.value);
    };
    
    const submitHandler = async () => {
      try {
        // {
        //   "text": "test comment222",
        //   "commentObjectId": "503736",
        //   "mediaType": "movie",
        //   "authorName": "Vadim Pavasar",
        //   "authorId": "60a3d9b4ef20c329e4139646"
        // }
        const response = await request('/api/comments', 'POST', {
          text,
          commentObjectId,
          mediaType,
          authorId: userId,
          authorName: "Vadim Pavasar"
        });
        console.log('Comment res: ', response);
      } catch (e) {
        console.log(e);
      }
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                    id="outlined-multiline-static"
                    label={localization === localizations.EN ? 'Comment' : 'Комментарий'}
                    multiline
                    rows={2}
                    value={text}
                    onChange={handleChange}
                    variant="outlined"
                    />
                </div>

                <div>
                  <Button
                    disabled={text.trim().length === 0}
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<AddCommentIcon />}
                    onClick={submitHandler}
                  >
                    {localization === localizations.EN ? 'Upload comment' : 'Добавить комментарий'}
                  </Button>
                </div>
            </form>
        </div>
    )
}
