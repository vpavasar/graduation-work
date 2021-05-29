import React, {useEffect, useState, useCallback, useContext} from 'react';
import {API_KEY, BACKDROP_URL, POSTER_URL} from '../config.json';
import {LocalizationContext, localizations} from '../context/LocalizationContext';

import CharacterCard from '../components/CharacterCard';
import RecomendationMovieCard from '../components/RecomendationMovieCard';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';

const releaseDateToString = releaseDate => {
    const date = new Date(releaseDate);
    return `${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()} (US)`;
}

const genresListToString = (genres) => {
    return genres.reduce((accumulator, currentValue) => {
        return `${accumulator} ${currentValue.name}`;
    }, '');
}

const runtimeToString = runtime => {
    const hours = Math.floor(runtime/60);
    const minutes = Math.round((runtime/60 - Math.floor(runtime/60)) * 60);
    return `${hours}h ${minutes}m`;
}

const releaseDateFullYear = (releaseDate = '2021-03-24') => {
    const date = new Date(releaseDate);
    return date.getFullYear();
}

export const MoviePage = ({match}) => {
    const movieId = match.params.id;
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [videos, setVideos] = useState([]);
    const {localization} = useContext(LocalizationContext);

    const fetchMovie = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
          const data = await fetched.json();
          setMovie(data)
        } catch (e) {}
    }, [movieId])

    const fetchCast = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
          const data = await fetched.json();
          setCast(data.cast);
        } catch (e) {}
    }, [movieId])

    const fetchRecommendations = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&page=1`);
          const data = await fetched.json();
          setRecommendations(data.results);
        } catch (e) {}
    }, [movieId])

    const fetchVideos = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
          const data = await fetched.json();
          setVideos(data.results);
        } catch (e) {}
    }, [movieId])

    useEffect(() => {
        setLoading(true);

        fetchMovie();
        fetchCast();
        fetchRecommendations();
        fetchVideos();
        
        setLoading(false);
    }, [movieId, setLoading, fetchMovie, fetchCast, fetchRecommendations, fetchVideos])

    if(loading){
        return <LinearProgress/>
    }

    const {
        poster_path = '',
        backdrop_path = '',
        release_date = '2111-03-11',
        genres = [],
        runtime = 0,
        tagline = '',
        overview = '',
        title = '',
    } = movie;

    return (
        <div>
            <div className="backdropWrapper" style={{backgroundImage: `url("${BACKDROP_URL}${backdrop_path}")`}}>
                <div className="backdropWrapperShadow">
                    <Container style={{paddingTop: '40px', paddingBottom: '40px', display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <img src={`${POSTER_URL}${poster_path}`} alt='movie-poster' className="moviePageMainPoster"/>
                        </div>
                        <div className='moviePageMainInfoWrapper'>
                            <div>
                                <h2>{title} <span>({releaseDateFullYear(release_date)})</span></h2>
                            </div>
                            <div>
                                <span>{releaseDateToString(release_date)}</span>
                                <span className='dotPoint'>.</span>
                                <span>{genresListToString(genres)}</span>
                                <span className='dotPoint'>.</span>
                                <span>{runtimeToString(runtime)}</span>
                            </div>
                            <div></div>
                            <div>
                                <p>{tagline}</p>
                            </div>
                            <div>
                                <h3>{localization === localizations.EN ? 'Overview' : 'Обзор'}</h3>
                                <p>{overview}</p>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <Container className='description-components-wrapper'>
                <div className='cast'>
                    <div className='cast-title'>
                        <h3>{localization === localizations.EN ? 'Top Billed Cast' : 'В главных ролях'}</h3>
                    </div>
                    <div className='cards-wrapper'>
                        {cast.map(character => {
                            return <CharacterCard key={character.id} character={character}/>
                        })}
                    </div>
                </div>

                <div className='videos'>
                    <div className='videos-title'>
                        <h3>{localization === localizations.EN ? 'Videos' : 'Видеоролики'}</h3>
                    </div>
                    <div className='videos-wrapper'>
                        {videos.map((trailer, index) => {
                            const url = `https://www.youtube.com/embed/${trailer.key}?controls=1`;
                            return(
                                <div key={index} className='videoWrapper'>
                                    <iframe width="530" height="300" src={url} title={`https://www.youtube.com/embed/${trailer.key}`}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='recommendations'>
                    <div className='recommendations-title'>
                        <h3>{localization === localizations.EN ? 'Recommendations' : 'Рекомендации'}</h3>
                    </div>
                    <div className='recommendations-wrapper'>
                        {recommendations.map(movie => {
                            return <RecomendationMovieCard key={movie.id} movie={movie}/>
                        })}
                    </div>
                </div>
            </Container>
        </div>
    )
}
