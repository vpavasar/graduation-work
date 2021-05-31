import React from 'react';
import BookmarkedIcon from '@material-ui/icons/Bookmark';
import NotBookmarkedIcon from '@material-ui/icons/BookmarkBorder';

export default function Favorite({}) {
    const isBookmarked = false;

    return (
        <div className='list-action-button'>
            {
                isBookmarked ? <BookmarkedIcon fontSize="small"/> : <NotBookmarkedIcon fontSize="small"/>
            }
        </div>
    )
}
