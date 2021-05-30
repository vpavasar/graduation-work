import React, {useState} from 'react';
import './KeywordsFilter.css';

export const KeywordsFilter = ({language, localizations}) => {
    const [inputValue, setInputValue] = useState('');

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = (event) => {
        const keywords = inputValue.trim().split(' ');

        let idList = getIdList(keywords);

        const separatedIdList = idList.join(',');
        changeCurrentURL('with_keywords', separatedIdList);

        setInputValue('');

        event.preventDefault();
    };

    return (
        <div className='keywordsFilter'>
            <p>{language === localizations.EN ? 'Keywords' : 'Ключевые слова'}</p>
            <div className='keywordsInputWrapper'>
                <form className='keywordsFilterForm' onSubmit={onSubmit}>
                    <input onChange={onChange} value={inputValue} placeholder={language === localizations.EN ? 'Filter by Keywords…' : 'Фильтровать по ключевым словам…'}/>
                </form>
            </div>
        </div>
    );
}
