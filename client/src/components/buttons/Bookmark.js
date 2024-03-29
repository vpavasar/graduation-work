import React, {useState, useContext, useCallback, useEffect} from 'react';
import BookmarkedIcon from '@material-ui/icons/Bookmark';
import NotBookmarkedIcon from '@material-ui/icons/BookmarkBorder';
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';

export const Bookmark = ({itemId, mediaType}) => {
    const {userId} = useContext(AuthContext);
    const {request} = useHttp();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const addToList = async () => {
        try {
            const body = {
                userId,
                listName: 'wish',
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
                listName: 'wish',
                itemId,
                mediaType
            }
            await request('/api/lists/item', 'DELETE', {...body})
        } catch (e) {}
    }

    const onClickHundler = () => {
        setIsBookmarked(!isBookmarked);
        if(isBookmarked) {
            return removeFromList();
        }

        addToList();
    }

    const fetchUserInfo = useCallback(async () => {
        try {
          const fetched = await request(`/api/lists/wish/${userId}`);
          const condition = fetched.some(item => {
              return item.id === itemId && item.mediaType === mediaType
            });
            setIsBookmarked(condition);
        } catch (e) {}
      }, [userId, request])

    useEffect(() => {
        fetchUserInfo();
    }, [userId, fetchUserInfo]);

    return (
        <div className='list-action-button' onClick={onClickHundler}>
            {
                isBookmarked ? <BookmarkedIcon fontSize="small"/> : <NotBookmarkedIcon fontSize="small"/>
            }
        </div>
    )
}
