import React, {useState, useContext, useCallback, useEffect} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';

export const Favorite = ({itemId, mediaType}) => {
    const {userId} = useContext(AuthContext);
    const {request} = useHttp();
    const [isFavorite, setIsFavorite] = useState(false);

    const addToList = async () => {
        try {
            const body = {
                userId,
                listName: 'favorite',
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
                listName: 'favorite',
                itemId,
                mediaType
            }
            await request('/api/lists/item', 'DELETE', {...body})
        } catch (e) {}
    }

    const onClickHundler = () => {
        setIsFavorite(!isFavorite);
        if(isFavorite) {
            return removeFromList();
        }

        addToList();
    }

    const fetchUserInfo = useCallback(async () => {
        try {
          const fetched = await request(`/api/lists/favorite/${userId}`);
          const condition = fetched.some(item => {
              return item.id === itemId && item.mediaType === mediaType
            });
          setIsFavorite(condition);
        } catch (e) {}
      }, [userId, request])

    useEffect(() => {
        fetchUserInfo();
    }, [userId, fetchUserInfo]);

    return (
        <div className='list-action-button' onClick={onClickHundler}>
            {
                isFavorite ? <FavoriteIcon fontSize="small"/> : <NotFavoriteIcon fontSize="small"/>
            }
        </div>
    )
}
