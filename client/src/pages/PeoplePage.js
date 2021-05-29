import React, {useState, useCallback, useEffect, useContext} from 'react'

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import {PaginationCustom} from '../components/Pagination';

import { PersonCard } from '../components/PersonCard';
import {useHttp} from '../hooks/http.hook';
import {LocalizationContext, localizations} from '../context/LocalizationContext';
import {API_KEY, API_EN_POSTFIX, API_RU_POSTFIX} from '../config.json';

export const PeoplePage = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [peopleList, setPeopleList] = useState([]);

    const {loading, request} = useHttp();
    const {localization} = useContext(LocalizationContext);
    const language = localization === localizations.EN ? API_EN_POSTFIX : API_RU_POSTFIX;
    
    const fetchPeople = useCallback(async () => {
        try {
          const fetched = await request(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=${language}&page=${page}`);
          setPeopleList(fetched.results);
          setTotalPages(fetched.total_pages);
        } catch (e) {}
      }, [page, language, request])

    useEffect(() => {
        fetchPeople();
    }, [page, fetchPeople]);

    
    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <Container className='peoplePageContainer'>
            <div className='peoplePageTitleWrapper'>
                <h2 className='pageTitle'>{localization === localizations.EN ? 'Popular People' : 'Популярные актеры'}</h2>
            </div>
            
            <div className='peoplePageConentWrapper'>
                <div className='peoplePageCardsContainer'>
                    {
                        peopleList.map(p => <PersonCard key={p.id} person={p}/>)
                    }
                </div>

                <div className='peoplePagePaginationWrapper'>
                    <PaginationCustom page={page} onChange={setPage} totalPages={totalPages}/>
                </div>
            </div>            
        </Container>
    )
}
