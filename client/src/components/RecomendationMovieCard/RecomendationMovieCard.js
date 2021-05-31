import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import './RecomendationMovieCard.css';
import reserveBackdropPath from '../../images/picture-grey.svg';

const validBackdropPath = posterPath => {
    if(posterPath) return `https://image.tmdb.org/t/p/w500_and_h282_face/${posterPath}`;

    return reserveBackdropPath;
}

const validTitle = title => {
    return title.length<=25 ? title : title.slice(0,23)+'...';
}

const ratingToString = rating => `${Math.trunc(rating*10)}%`;

export const RecomendationMovieCard = ({movie, root_path = '/movie'}) => {
    let history = useHistory();
    const backdrop_path = validBackdropPath(movie.backdrop_path);
    const title = validTitle(movie.title);
    const rating = ratingToString(movie.vote_average);

    const onClickHandler = () => {
        history.push(`${root_path}/${movie.id}`);
    }

    return (
        <div className='recommendation-card'>
            <div>
                <NavLink to={`${root_path}/${movie.id}`}>
                    <img src={backdrop_path} alt='movie-poster' className='recommendation-card-img' />
                </NavLink>
            </div>
            <div className='recommendation-card-info-wrapper'>
                <div className='recommendation-card-info'>
                    <div className='recommendation-card-title'>
                        <p  onClick={onClickHandler}>{title}</p>
                    </div>

                    <div className='recommendation-card-rating'>
                        <p>{rating}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
