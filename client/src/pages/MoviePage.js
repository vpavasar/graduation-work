import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
    API_KEY, 
    BACKDROP_URL, 
    POSTER_URL, 
    API_EN_POSTFIX, 
    API_RU_POSTFIX
} from '../config.json';
import {LocalizationContext, localizations} from '../context/LocalizationContext';

import CharacterCard from '../components/CharacterCard';
import RecomendationMovieCard from '../components/RecomendationMovieCard';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import { CommentForm } from '../components/CommentForm';
import CommentCard from '../components/CommentCard';

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
    const [comments, setComments] = useState([]);
    const {localization} = useContext(LocalizationContext);
    const language = localization === localizations.EN ? API_EN_POSTFIX : API_RU_POSTFIX;

    const fetchMovie = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${language}`);
          const data = await fetched.json();
          setMovie(data)
        } catch (e) {}
    }, [movieId, language])

    const fetchCast = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=${language}`);
          const data = await fetched.json();
          setCast(data.cast);
        } catch (e) {}
    }, [movieId, language])

    const fetchRecommendations = useCallback(async () => {
        try {
          const fetched = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=${language}&page=1`);
          const data = await fetched.json();
          setRecommendations(data.results);
        } catch (e) {}
    }, [movieId, language])

    const fetchComments = useCallback(async () => {
        try {
          const fetched = await fetch(`/api/comments/movie/${movieId}`);
          const data = await fetched.json();
          console.log('Comments: ', data);
          setComments(data)
        } catch (e) {}
    }, [movieId])

    const fetchVideos = useCallback(async () => {
        try {
          const fetchedLocale = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${language}`);
          const locale = await fetchedLocale.json();

          const fetchedRu = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${'ru-RU'}`);
          const ru = await fetchedRu.json();

          const fetchedDe = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${'de'}`);
          const de = await fetchedDe.json();

          const fetchedEn = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${'en-US'}`);
          const en = await fetchedEn.json();

          const fetchedFr = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${'fr'}`);
          const fr = await fetchedFr.json();

          
          const fetchedIt = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=${'it'}`);
          const it = await fetchedIt.json();

          setVideos([...locale.results, ...de.results, ...ru.results, ...en.results, ...fr.results, ...it.results]);
        } catch (e) {}
    }, [movieId, language])

    useEffect(() => {
        setLoading(true);

        fetchMovie();
        fetchCast();
        fetchRecommendations();
        fetchVideos();
        fetchComments();
        
        setLoading(false);
    }, [movieId, setLoading, fetchMovie, fetchCast, fetchRecommendations, fetchVideos, fetchComments])

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
                            <div className='movie-page-media-buttons'>

                            </div>
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
                                    <iframe seamless loading = "lazy" width="530" height="300" src={url} title={`https://www.youtube.com/embed/${trailer.key}`}/>
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

                <div className='movie-discussion-container'>
                    <div className='movie-discussion-title'>
                        <h3>{localization === localizations.EN ? 'Discussion' : 'Ообсуждение'}</h3>
                    </div>

                    <div className='movie-discussion-comment-form-wrapper'>
                        <CommentForm commentObjectId={movieId} mediaType={'movie'}/>
                    </div>

                    <div className='movie-discussion-comments-container'>
                        <div className='movie-discussion-comments-container-title'>
                            {
                                comments.length ?
                                <h3>{localization === localizations.EN ? `Last ${comments.length} comments` : `Последние ${comments.length} комментария`}</h3>
                                : <h3>{localization === localizations.EN ? `No comments yet` : `Комментариев ещё нет`}</h3>
                            }
                        </div>

                        <div className='movie-discussion-comments-wrapper'>
                        {
                            comments.map(c => <CommentCard key={c._id} comment={c} loading={loading}/>)
                        }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
