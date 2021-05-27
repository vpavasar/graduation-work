import React, {useState, useEffect} from 'react'
import {NavLink} from "react-router-dom";
import Container from '@material-ui/core/Container';
import MovieCard from '../components/MovieCard';
import {useHttp} from '../hooks/http.hook';
import {API_KEY} from '../config.json';

export const SearchMoviesPage = ({match}) => {
    const requestValue = match.params.request;
    const {loading, request} = useHttp();
    const [movies, setMovies] = useState([]);

    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${requestValue}`);
        console.log('Search loading:', loading);
        console.log('Search response:', response);
        setMovies(response.results)
    }, [requestValue])

    return (
        <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {!movies.length ? 'По вашему запросу ничего не найдено...' : <div style={{marginTop: '30px', display: 'grid', gridColumnGap: '20px', gridRowGap: '10px', gridTemplateColumns: 'repeat(5, 1fr)'}}>
                {movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>}
        </Container>
    )
}
