import React from 'react';
import './SortFilter.css';

export const SortFilter = ({language, localizations}) => {
    const onChangeSelect = (event) => {
        const selectField = event.target;
        const sortBy = selectField.value;
        console.log(sortBy);
    }

    return (
        <div className='sort-container'>
            <h2>{language === localizations.EN ? 'Sort Results By' : 'Сортировать результаты по'}</h2>
            <select onChange={onChangeSelect}>
                <option value="popularity.desc">{language === localizations.EN ? 'Popularity Descending' : 'Популярности (убывание)'}</option>
                <option value="popularity.asc">{language === localizations.EN ? 'Popularity Ascending' : 'Популярности (возрастание)'}</option>
                <option value="vote_average.desc">{language === localizations.EN ? 'Rating Descending' : 'Рейтингу (убывание)'}</option>
                <option value="vote_average.asc">{language === localizations.EN ? 'Rating Ascending' : 'Рейтингу (возрастание)'}</option>
                <option value="release_date.desc">{language === localizations.EN ? 'Release Date Descending' : 'Дате выпуска (убывание)'}</option>
                <option value="release_date.asc">{language === localizations.EN ? 'Release Date Ascending' : 'Дате выпуска (возрастание)'}</option>
                <option value="original_title.desc">{language === localizations.EN ? 'Title (A-Z)' : 'Названию (А-Я)'}</option>
                <option value="original_title.asc">{language === localizations.EN ? 'Title (Z-A)' : 'Названию (Я-А)'}</option>
            </select>
        </div>
    )
}