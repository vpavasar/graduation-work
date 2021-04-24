import {useCallback, useState, useEffect} from 'react'

export const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});

    useEffect(async () => {
        const response = await fetch()
    })
}