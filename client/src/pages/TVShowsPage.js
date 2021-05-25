import React, {useState, useEffect} from 'react'
import {NavLink} from "react-router-dom";

import {API_KEY} from '../config.json';
import {useHttp} from '../hooks/http.hook';

import Container from '@material-ui/core/Container';

import MovieCard from '../components/MovieCard';
import SortFilter from '../components/Filters/SortFilter';
import DateFilter from '../components/Filters/DateFilter';
import GenresFilter from '../components/Filters/GenresFilter';
import UserScoreFilter from '../components/Filters/UserScoreFilter';
import MinUserVotesFilter from '../components/Filters/MinUserVotesFilter';
import RuntimeFilter from '../components/Filters/RuntimeFilter';
import {PaginationCustom} from '../components/Pagination';

export const TVShowsPage = () => {
    const {loading, request} = useHttp();
    const [serials, setSerials] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(async () => {
        const response = await request(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        console.log('Is loading TV:', loading);
        console.log('Response TV:', response);
        setSerials(response.results)
    }, [page])

    return (
        <Container style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
            <div>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: "flex-start"}}>
                    <h2 className='pageTitle'>Popular TV Shows</h2>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{display: 'grid', gridColumnGap: '25px', gridRowGap: '20px', gridTemplateColumns: 'repeat(5, 1fr)'}}>
                            {
                                serials.map(serial => {
                                    const data = {
                                        title: serial.name,
                                        poster_path: serial.poster_path,
                                        release_date: serial.first_air_date,
                                        id: serial.id
                                    }

                                    return <MovieCard key={serial.id} movie={data} root_path={'/tv'}/>;
                                })
                            }
                        </div>
                        <div style={{marginTop: '20px', display:"flex", justifyContent:"center"}}>
                            <PaginationCustom page={page} onChange={setPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
{/* <NavLink to='/'>Home page</NavLink> */}
