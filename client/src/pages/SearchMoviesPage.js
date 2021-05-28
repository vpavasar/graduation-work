import React, {useState, useEffect, useCallback} from 'react'
import Container from '@material-ui/core/Container';
import MovieCard from '../components/MovieCard';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useHttp} from '../hooks/http.hook';
import {API_KEY} from '../config.json';

export const SearchMoviesPage = ({match}) => {
    const requestValue = match.params.request;
    const {loading, request} = useHttp();
    const [movies, setMovies] = useState([]);

    const fetchMovies = useCallback(async () => {
        try {
          const fetched = await request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${requestValue}`);
          setMovies(fetched.results);
        } catch (e) {}
      }, [requestValue, request])

    useEffect(() => {
        fetchMovies();
    }, [requestValue, fetchMovies]);

    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {!movies.length ? 'По вашему запросу ничего не найдено...' : <div style={{marginTop: '30px', display: 'grid', gridColumnGap: '20px', gridRowGap: '10px', gridTemplateColumns: 'repeat(5, 1fr)'}}>
                {movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>}
        </Container>
    )
}
