import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotFavoriteIcon from '@material-ui/icons/FavoriteBorder';

export default function Favorite({}) {
    const isFavorite = false;

    return (
        <div className='list-action-button'>
            {
                isFavorite ? <FavoriteIcon fontSize="small"/> : <NotFavoriteIcon fontSize="small"/>
            }
        </div>
    )
}
