import React from 'react';
import './CharacterCard.css';

import {NavLink, useHistory} from "react-router-dom";

import maleProfilePath from '../../images/user-grey.svg';
import femaleProfilePath from '../../images/user-female.svg';

const validProfilePath = (profilePath, gender) => {
    if(profilePath) return `https://image.tmdb.org/t/p/w276_and_h350_face/${profilePath}`;

    return gender === 1 ? femaleProfilePath : maleProfilePath;
}

export const CharacterCard = ({character}) => {
    let history = useHistory();
    const profilePath = validProfilePath(character.profile_path, character.gender);

    const onClickHandler = () => {
        // history.push(`/person/1245`);
        history.push(`/person/${character.id}`);
    }

    return (
        <div className='character-card'>
            <div>
                <NavLink to={`/person/${character.id}`}>
                    <img src={profilePath}  className='character-card-img' alt='character-profile'/>
                </NavLink>                
            </div>
            <div className='card-info-wrapper'>
                {/* <NavLink to={`/person/${character.id}`} className='character-card-title'>
                <p className='character-card-title' onClick={onClickHandler}>{character.name}</p>
                </NavLink> */}
                <div>
                    <p className='character-card-title' onClick={onClickHandler}>{character.name}</p>
                </div>
                <div>
                    <p className='character-card-date'>{character.character}</p>
                </div>
            </div>
        </div>
    )
}
