import React from 'react';
import './SortFilter.css';

export const SortFilter = () => {
    const onChangeSelect = (event) => {
        const selectField = event.target;
        const sortBy = selectField.value;
        console.log(sortBy);
    }

    return (
        <div className='sort-container'>
            <h2>Sort Results By</h2>
            <select onChange={onChangeSelect}>
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="release_date.desc">Release Date Descending</option>
                <option value="release_date.asc">Release Date Ascending</option>
                <option value="original_title.desc">Title (A-Z)</option>
                <option value="original_title.asc">Title (Z-A)</option>
            </select>
        </div>
    )
}