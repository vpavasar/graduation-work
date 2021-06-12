import React, {useState, useEffect, useContext, useCallback} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {LocalizationContext, localizations} from '../context/LocalizationContext';
import {API_KEY} from '../config.json';
import {NavLink} from "react-router-dom";

export const MovieListCard = ({id, mediaType}) => {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const {localization} = useContext(LocalizationContext);
    
    const fetchMovie = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=ru-RU`);
          const data = await fetched.json();
          setMovie(data)
        } catch (e) {}
    }, [localization, localizations]);
    useEffect(() => {
        setLoading(true);

        fetchMovie();
        
        setLoading(false);
    }, [setLoading, fetchMovie, localization]);
    if(loading){
        return <LinearProgress/>
    }
    return (
        <div className='recommendation-card'>
            <div>
                <NavLink to={`/${mediaType}/${id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500_and_h282_face/${movie.backdrop_path}`} alt='movie-poster' className='recommendation-card-img' />
                </NavLink>
            </div>
            <div className='recommendation-card-info-wrapper'>
                <div className='recommendation-card-info'>
                    <div className='recommendation-card-title'>
                        <p>{mediaType === 'movie' ? movie.title : movie.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
