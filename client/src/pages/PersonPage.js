import React, {useState, useEffect, useCallback, useContext} from 'react';

import {API_KEY, API_PEROSN_URL, API_EN_POSTFIX, API_RU_POSTFIX} from '../config.json';
import {LocalizationContext, localizations} from '../context/LocalizationContext';
import PictureGrey from '../images/picture-grey.svg';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

const splitedBiography = biography => {
    return biography ? biography.split('\n\n').map( (row, idx) => <p key={idx} style={styles.personInfo}>{row}</p>) : '';
}

const genderToString = gender => gender === 2 ? 'Male' : 'Female';

const getCurrentAge = (dob) => {
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const getListNames = names => {
    return names ? names.map( (name, idx) => <li style={{listStyleType: 'none'}} key={idx} itemProp="additionalName">{name}</li>) : null;
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '30px'
    },
    leftSide: {

    },
    rightSide: {
        marginLeft: '30px'
    },
    posterContainer: {
    },
    profilePoster: {
        borderRadius: '8px'
    },
    biographyContainer: {
        marginTop: '30px'
    },
    personInfo: {
        marginTop: '18px'
    }
}

export const PersonPage = ({match}) => {
    const personId = match.params.id;
    const [loading, setLoading] = useState(true);
    const [personInfo, setPersonInfo] = useState({});
    const {localization} = useContext(LocalizationContext);
    const language = localization === localizations.EN ? API_EN_POSTFIX : API_RU_POSTFIX;

    const fetchPersonInfo = useCallback(async () => {
        try {
          const fetched = await fetch(`${API_PEROSN_URL}/${personId}?api_key=${API_KEY}&language=${language}`);
          const data = await fetched.json();
          setPersonInfo(data)
        } catch (e) {}
    }, [personId, language])

    useEffect(() => {
        setLoading(true);

        fetchPersonInfo();      

        setLoading(false);
    }, [personId, setLoading, fetchPersonInfo])

    if(loading) {
        return <LinearProgress/>
    }

    const profilePath = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${personInfo.profile_path}` || PictureGrey;

    return (
        <Container>
            <div style={styles.container}>
                <div>
                    <div>
                        <img src={profilePath} alt='person-profile' style={styles.profilePoster}/>
                    </div>

                    <h3>{localization === localizations.EN ? 'Personal Info' : 'Персональная информация'}</h3>
                    <div>
                        <p><strong><bdi>{localization === localizations.EN ? 'Known For' : 'Известность зазвестен'}</bdi></strong> {personInfo.known_for_department}</p>
                        <p><strong><bdi>{localization === localizations.EN ? 'Known Credits' : 'Известно авторство'}</bdi></strong> 138</p>
                        <p><strong><bdi>{localization === localizations.EN ? 'Gender' : 'Пол'}</bdi></strong> {genderToString(personInfo.gender)}</p>
                        <p><strong><bdi>{localization === localizations.EN ? 'Birthday' : 'День рождения'}</bdi></strong>   {personInfo.birthday} ({getCurrentAge(new Date(personInfo.birthday))} years old)</p>
                        <p><strong><bdi>{localization === localizations.EN ? 'Place of Birth' : 'Место рождения'}</bdi></strong> {personInfo.place_of_birth}</p>
                        <p><strong><bdi>{localization === localizations.EN ? 'Also Known As' : 'Также известность как'}</bdi></strong></p>
                        <ul style={{margin: '0', padding: '0'}}>
                            {
                                getListNames(personInfo.also_known_as)
                            }
                        </ul>
                    </div>
                </div>

                <div style={styles.rightSide}>
                    <div>
                        <h2>{personInfo.name}</h2>
                    </div>

                    <div style={styles.biographyContainer}>
                        <h3>{localization === localizations.EN ? 'Biography' : 'Биография'}</h3>
                        <div>
                            {splitedBiography(personInfo.biography)}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}