import React, {useEffect, useState, useCallback} from 'react';
import './GenresFilter.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHttp} from '../../../hooks/http.hook';
import {API_KEY} from '../../../config.json';

export const GenresFilter = ({language, localizations}) => {    
    const {request, loading} = useHttp();
    const [genresList, setGenresList] = useState([]);
    const onClickGenre = () => console.log('Click genre!');    

    const fetchGenres = useCallback(async () => {
        try {
            const fetched = await request(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`);
            setGenresList(fetched.genres.sort((a,b) => a.name < b.name ? -1 : 1))
        } catch (e) {}
    }, [request, language])

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres])

    if (loading) {
        return <CircularProgress />
    }

    return (
        <div className='filter-genres'>
            <p>{language === localizations.EN ? 'Genres' : 'Жанры'}</p>
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