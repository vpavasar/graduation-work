import React from 'react';
import './CharacterCard.css';
import maleProfilePath from '../../images/user-grey.svg';
import femaleProfilePath from '../../images/user-female.svg';

const validProfilePath = (profilePath, gender) => {
    if(profilePath) return `https://image.tmdb.org/t/p/w276_and_h350_face/${profilePath}`;

    return gender === 1 ? femaleProfilePath : maleProfilePath;
}

export const CharacterCard = ({character}) => {
    const profilePath = validProfilePath(character.profile_path, character.gender);
    return (
        <div className='character-card'>
            <div>
                <img src={profilePath}  className='character-card-img'/>
            </div>
            <p className='character-card-title'>{character.name}</p>
            <p className='character-card-date'>{character.character}</p>
        </div>
    )
}
