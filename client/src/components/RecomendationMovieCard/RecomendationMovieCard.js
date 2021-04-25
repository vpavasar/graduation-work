import React from 'react';
import './RecomendationMovieCard.css';
import reserveBackdropPath from '../../images/picture-grey.svg';

const validBackdropPath = posterPath => {
    if(posterPath) return `https://image.tmdb.org/t/p/w500_and_h282_face/${posterPath}`;

    return reserveBackdropPath;
}

const validTitle = title => {
    return title.length<=25 ? title : title.slice(0,23)+'...';
}

const ratingToString = rating => `${rating*10}%`;

export const RecomendationMovieCard = ({movie}) => {
    const backdrop_path = validBackdropPath(movie.backdrop_path);
    const title = validTitle(movie.title);
    const rating = ratingToString(movie.vote_average);

    return (
        <div className='recommendation-card'>
            <div>
                <img src={backdrop_path}  className='recommendation-card-img'/>
            </div>
            <div className='recommendation-card-info-wrapper'>
                <div className='recommendation-card-info'>
                    <div className='recommendation-card-title'>
                        <p>{title}</p>
                    </div>

                    <div className='recommendation-card-rating'>
                        <p>{rating}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
