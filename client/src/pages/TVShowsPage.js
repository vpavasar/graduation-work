import React, {useState, useEffect, useCallback, useContext} from 'react'
import {API_KEY} from '../config.json';
import {useHttp} from '../hooks/http.hook';
import {LocalizationContext, localizations} from '../context/LocalizationContext';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import MovieCard from '../components/MovieCard';
import {PaginationCustom} from '../components/Pagination';

export const TVShowsPage = () => {
    const {loading, request} = useHttp();
    const [serials, setSerials] = useState([]);
    const [page, setPage] = useState(1);
    const {localization} = useContext(LocalizationContext);
    
    const fetchSerials = useCallback(async () => {
        try {
          const fetched = await request(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
          setSerials(fetched.results);
        } catch (e) {}
      }, [page, request])

    useEffect(() => {
        fetchSerials();
    }, [page, fetchSerials]);

    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <Container style={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
            <div>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: "flex-start"}}>
                    <h2 className='pageTitle'>{localization === localizations.EN ? 'Popular TV Shows' : 'Популярные сериалы'}</h2>
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