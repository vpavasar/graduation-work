import React from 'react';
import { useHistory, Link } from "react-router-dom";
import './MovieCard.css';
import {API_POSTER_URL} from '../../config.json';
import reservePosterPath from '../../images/picture-grey.svg';

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
    return path === null ? reservePosterPath : `${API_POSTER_URL}${path}`;
}

export function MovieCard({movie, root_path}) {
    let history = useHistory();
    const poster_path = validPosterPath(movie.poster_path);
    const title = titleFormatting(movie.title);
    const release_date = dateFormatting(new Date(movie.release_date));

    const onClickHandler = () => {
        history.push(`${root_path}/${movie.id}`);
    }

    return (
        <div className='film-card'>
            <div onClick={onClickHandler}>
                <img src={poster_path}  className='film-card-poster'/>
            </div>
            <p className='film-card-title' onClick={onClickHandler}>{title}</p>
            <p className='film-card-date'>{release_date}</p>
        </div>
    )
}
