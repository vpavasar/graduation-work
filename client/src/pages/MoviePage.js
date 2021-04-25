import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import Container from '@material-ui/core/Container';
import {API_KEY, BACKDROP_URL, POSTER_URL} from '../config.json';
import CharacterCard from '../components/CharacterCard';
import RecomendationMovieCard from '../components/RecomendationMovieCard';

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
    const {loading, request} = useHttp();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        console.log('MOVIE Loading:', loading);
        console.log('MOVIE response:', response);
        setMovie(response);
    }, [])

    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
        console.log('MOVIE (credit) Loading:', loading);
        console.log('MOVIE (credit) response:', response);
        setCast(response.cast);
    }, [])

    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&page=1`);
        console.log('MOVIE (recommendations) Loading:', loading);
        console.log('MOVIE (recommendations) response:', response);
        setRecommendations(response.results);
    }, [])
    
    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
        console.log('MOVIE (videos) Loading:', loading);
        console.log('MOVIE (videos) response:', response);
        setVideos(response.results);
    }, [])

    if(loading){
        return <p>Loading...</p>
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
                            <img src={`${POSTER_URL}${poster_path}`} className="moviePageMainPoster"/>
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
                                <h3>Overview</h3>
                                <p>{overview}</p>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <Container className='description-components-wrapper'>
                <div className='cast'>
                    <div className='cast-title'>
                        <h3>Top Billed Cast</h3>
                    </div>
                    <div className='cards-wrapper'>
                        {cast.map(character => {
                            return <CharacterCard key={character.id} character={character}/>
                        })}
                    </div>
                </div>

                <div className='videos'>
                    <div className='videos-title'>
                        <h3>Videos</h3>
                    </div>
                    <div className='videos-wrapper'>
                        {videos.map((trailer, index) => {
                            const url = `https://www.youtube.com/embed/${trailer.key}?controls=1`;
                            return(
                                <div key={index} className='videoWrapper'>
                                    <iframe width="530" height="300" src={url}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='recommendations'>
                    <div className='recommendations-title'>
                        <h3>Recommendations</h3>
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
