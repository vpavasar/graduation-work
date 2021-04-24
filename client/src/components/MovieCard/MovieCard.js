import React from 'react';
import { useHistory } from "react-router-dom";
import './MovieCard.css';
import {API_POSTER_URL} from '../../config.json';

function dateFormatting(date) {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

function titleFormatting(title) {
    return title.length <= 42 ? title : `${title.slice(0,40)}...`;
}

function validPosterPath(path) {
    const reservePosterPath = '../../images/picture-grey.svg';

    return path === null ? reservePosterPath : `${API_POSTER_URL}${path}`;
}

export function MovieCard({movie}) {
    let history = useHistory();
    const poster_path = validPosterPath(movie.poster_path);
    const original_title = titleFormatting(movie.original_title);
    const release_date = dateFormatting(new Date(movie.release_date));

    const onClickHandler = () => {
        history.push(`/movie/${movie.id}`);
    }

    return (
        <div className='film-card'>
            <div onClick={onClickHandler}>
                <img src={poster_path}  className='film-card-poster'/>
            </div>
            <p className='film-card-title' onClick={onClickHandler}>{original_title}</p>
            <p className='film-card-date'>{release_date}</p>
        </div>
    )
}
