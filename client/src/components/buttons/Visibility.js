import React, {useState, useContext, useCallback, useEffect} from 'react';
import DoneIcon from '@material-ui/icons/Visibility';
import NotDoneIcon from '@material-ui/icons/VisibilityOffOutlined';
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';

export const Visibility = ({itemId, mediaType}) => {
    const {userId} = useContext(AuthContext);
    const {request} = useHttp();
    const [isDone, setIsDone] = useState(false);

    const addToList = async () => {
        try {
            const body = {
                userId,
                listName: 'watched',
                itemId,
                mediaType
            }
            await request('/api/lists/item', 'POST', {...body})
        } catch (e) {}
    }

    const removeFromList = async () => {
        try {
            const body = {
                userId,
                listName: 'watched',
                itemId,
                mediaType
            }
            await request('/api/lists/item', 'DELETE', {...body})
        } catch (e) {}
    }

    const onClickHundler = () => {
        setIsDone(!isDone);
        if(isDone) {
            return removeFromList();
        }

        addToList();
    }

    const fetchUserInfo = useCallback(async () => {
        try {
          const fetched = await request(`/api/lists/watched/${userId}`);
          const condition = fetched.some(item => {
              return item.id === itemId && item.mediaType === mediaType
            });
            setIsDone(condition);
        } catch (e) {}
      }, [userId, request])

    useEffect(() => {
        fetchUserInfo();
    }, [userId, fetchUserInfo]);

    return (
        <div className='list-action-button' onClick={onClickHundler}>
            {
                isDone ? <DoneIcon fontSize="small"/> : <NotDoneIcon fontSize="small"/>
            }
        </div>
    )
}
