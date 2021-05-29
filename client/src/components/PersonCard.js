import React from 'react';
import {API_IMAGE_BASE_URL} from '../config.json';

import maleProfilePath from '../images/user-grey.svg';
import femaleProfilePath from '../images/user-female.svg';

const validProfilePath = (profilePath, gender) => {
    if(profilePath) return `${API_IMAGE_BASE_URL}w235_and_h235_face/${profilePath}`;

    return gender === 1 ? femaleProfilePath : maleProfilePath;
}

export const PersonCard = ({person}) => {
    const profile_path = validProfilePath(person.profile_path, person.gender)

    return (
        <div className="person_card_wrapper">
            <div className="person_card_image_content">
                <a href={`/person/${person.id}`} title={person.name} alt={person.name}>
                    <img loading="lazy" className="person_card_profile_image" src={profile_path} alt={person.name}/>
                </a>
            </div>
            <div className="person_card_meta">
                <p><a className="person_card_name" href={`/person/${person.id}`}>{person.name}</a></p>
            </div>
        </div>
    )
}