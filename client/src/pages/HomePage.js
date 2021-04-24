import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {useHttp} from '../hooks/http.hook';
import MovieCard from '../components/MovieCard';
import SortFilter from '../components/Filters/SortFilter';
import DateFilter from '../components/Filters/DateFilter';
import GenresFilter from '../components/Filters/GenresFilter';
import UserScoreFilter from '../components/Filters/UserScoreFilter';
import MinUserVotesFilter from '../components/Filters/MinUserVotesFilter';
import RuntimeFilter from '../components/Filters/RuntimeFilter';

import Grid from "@material-ui/core/Grid";
import Pagination from '@material-ui/lab/Pagination';

export const HomePage = () => {
    const {loading, request} = useHttp();
    const [movies, setMovies] = useState([]);
    // const [page, setPage] = useState(1);
    // const [filters, setFilters] = useState({});

    useEffect(async () => {
        const response = await request('https://api.themoviedb.org/3/movie/popular?api_key=da70999142590b2cd3ea6d77a0ac0b79&language=en-US&page=1');
        console.log('Is loading Home:', loading);
        console.log('Response:', response);
        setMovies(response.results)
    }, [])

    return (
        <Container>
            <div>
                <h2 className='pageTitle'>Popular Movies</h2>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <SortFilter/>
                    <div className='filters-container'>
                        <div className='filters-container-title'>
                            <h2>Filters</h2>
                        </div>
                        <DateFilter/>
                        <GenresFilter/>
                        <UserScoreFilter/>
                        <MinUserVotesFilter/>
                        {/* <RuntimeFilter/> */}
                    </div>
                </div>
                <div style={{marginLeft: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{display: 'grid', gridColumnGap: '20px', gridRowGap: '10px', gridTemplateColumns: 'repeat(4, 1fr)'}}>
                        {movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
                    </div>
                    <div style={{margin: '20px'}}>
                        <Pagination count={10} color="primary" size="large"/>
                        <div style={{backgroundColor: 'rgb(1, 180, 228)', color: 'rgb(255, 255, 255)'}}>
                            <p>Load More</p>
                        </div>
                    </div>
                </div>           
            </div>
        </Container>
    )
}


{/* <div>
            <h1>Home page</h1>
            <NavLink to='/profile'>Profile page</NavLink>
        </div> */}