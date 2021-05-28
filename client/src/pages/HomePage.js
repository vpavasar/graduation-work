import React, {useState, useEffect, useCallback} from 'react';
import Container from '@material-ui/core/Container';
import {useHttp} from '../hooks/http.hook';
import MovieCard from '../components/MovieCard';
import SortFilter from '../components/Filters/SortFilter';
import DateFilter from '../components/Filters/DateFilter';
import GenresFilter from '../components/Filters/GenresFilter';
import UserScoreFilter from '../components/Filters/UserScoreFilter';
import RuntimeFilter from '../components/Filters/RuntimeFilter';
import {PaginationCustom} from '../components/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import {API_KEY} from '../config.json';

export const HomePage = () => {
    const {loading, request} = useHttp();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    // const [filters, setFilters] = useState({});

    const fetchMovies = useCallback(async () => {
        try {
          const fetched = await request(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
          setMovies(fetched.results)
        } catch (e) {}
    }, [page, request])

    useEffect(() => {
        fetchMovies();
    }, [page, fetchMovies])
    
    if (loading) {
        return <LinearProgress/>
    }

    return (
        <Container style={{marginBottom: '20px'}}>
            <div>
                <h2 className='pageTitle'>Popular Movies</h2>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <SortFilter/>
                    <div className='filters-container'>
                        <div className='filters-container-title'>
                            <h2>Filters</h2>
                        </div>
                        <DateFilter/>
                        <GenresFilter/>
                        <UserScoreFilter/>
                        <RuntimeFilter/>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{display: 'grid', gridColumnGap: '25px', gridRowGap: '20px', gridTemplateColumns: 'repeat(4, 1fr)'}}>
                        {
                            movies.map(movie => {
                                const data = {
                                    title: movie.title,
                                    poster_path: movie.poster_path,
                                    release_date: movie.release_date,
                                    id: movie.id
                                }

                                return <MovieCard key={movie.id} movie={data} root_path={'/movie'}/>;
                            })
                        }
                    </div>
                    <div style={{marginTop: '20px', display:"flex", justifyContent:"center"}}>
                            <PaginationCustom page={page} onChange={setPage}/>
                            {/* <div style={{backgroundColor: 'rgb(1, 180, 228)', color: 'rgb(255, 255, 255)'}}>
                                <p>Load More</p>
                            </div> */}
                    </div>
                </div>           
            </div>
        </Container>
    )
}