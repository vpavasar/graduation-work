import React, {useEffect, useState} from 'react';
import './GenresFilter.css';
import {useHttp} from '../../../hooks/http.hook';
import {API_KEY} from '../../../config.json';

export const GenresFilter = (props) => {    
    const {request} = useHttp();
    const [genresList, setGenresList] = useState([]);
    const onClickGenre = () => console.log('Click genre!');

    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        console.log(response);
        setGenresList(response.genres);
    }, [])

    return (
        <div className='filter-genres'>
            <p>Genres</p>
            <div className='genres'>
                {
                    genresList.map(genre => {
                        return <div key={genre.id} className='genre'>
                            <p id={genre.id} onClick={onClickGenre}>{genre.name}</p>
                        </div>
                    })
                }
            </div>
        </div>
    );
}