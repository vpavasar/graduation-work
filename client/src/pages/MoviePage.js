import React, {useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import Container from '@material-ui/core/Container';
import {API_KEY, BACKDROP_URL, POSTER_URL} from '../config.json';

const releaseDateToString = releaseDate => {
    const date = new Date(releaseDate);
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} (US)`;
}

const genresListToString = (genres) => {
    console.log('genres: ', typeof(genres));
    return genres.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.name;
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
    const {loading, request} = useHttp();
    const movieId = match.params.id;
    const [movie, setMovie] = useState({})

    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        console.log('MOVIE Loading:', loading);
        console.log('MOVIE response:', response);
        setMovie(response);
    }, [])

    if(loading){
        return <p>Loading...</p>
    }

    const {
        poster_path = '',
        backdrop_path = '',
        release_date = '2021-03-24',
        genres = [],
        runtime = 0,
        tagline = '',
        overview = ''
    } = movie;

    return (
        <div>
            <div className="backdropWrapper" style={{backgroundImage: `url("${BACKDROP_URL}${backdrop_path}")`}}>
                <div className="backdropWrapperShadow">
                    <Container style={{paddingTop: '70px', paddingBottom: '70px', display: 'flex', flexDirection: 'row'}}>
                        <div>
                            <img src={`${POSTER_URL}${poster_path}`} className="moviePageMainPoster"/>
                        </div>
                        <div className='moviePageMainInfoWrapper'>
                            <div>
                                <h2>{movie.original_title} <span>({releaseDateFullYear(release_date)})</span></h2>
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
        </div>
    )
}
