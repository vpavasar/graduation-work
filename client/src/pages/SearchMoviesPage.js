import React, {useState, useEffect, useCallback, useContext} from 'react'
import Container from '@material-ui/core/Container';
import MovieCard from '../components/MovieCard';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useHttp} from '../hooks/http.hook';
import {LocalizationContext, localizations} from '../context/LocalizationContext';
import {API_KEY, API_EN_POSTFIX, API_RU_POSTFIX} from '../config.json';

export const SearchMoviesPage = ({match}) => {
    const requestValue = match.params.request;
    const {loading, request} = useHttp();
    const [movies, setMovies] = useState([]);
    const {localization} = useContext(LocalizationContext);
    const language = localization === localizations.EN ? API_EN_POSTFIX : API_RU_POSTFIX;

    const fetchMovies = useCallback(async () => {
        try {
          const fetched = await request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${requestValue}&language=${language}`);
          setMovies(fetched.results);
        } catch (e) {}
      }, [requestValue, request, language])

    useEffect(() => {
        fetchMovies();
    }, [requestValue, fetchMovies]);

    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row',justifyContent: 'center'}}><div><h2 className='pageTitle'>{localization === localizations.EN ? `Search results for the query: ${requestValue}` : `Результаты поиска по запросу: ${requestValue}`}</h2></div></div>
            {!movies.length ? 'По вашему запросу ничего не найдено...' : <div style={{marginTop: '30px', display: 'grid', gridColumnGap: '20px', gridRowGap: '10px', gridTemplateColumns: 'repeat(5, 1fr)'}}>
                {movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>}
        </Container>
    )
}
