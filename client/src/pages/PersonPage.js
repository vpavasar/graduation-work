import React, {useState, useEffect} from 'react';

import {API_KEY, API_PEROSN_URL} from '../config.json';
import {useHttp} from '../hooks/http.hook';

import Container from '@material-ui/core/Container';

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
    return names ? names.map( (name, idx) => <li style={{listStyleType: 'none'}} key={idx} itemprop="additionalName">{name}</li>) : null;
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
    const {loading, request} = useHttp();

    const [personInfo, setPersonInfo] = useState({});

    useEffect(async () => {
        const response = await request(`${API_PEROSN_URL}/${personId}?api_key=${API_KEY}&language=en-US`);
        console.log('Person Loading:', loading);
        console.log('Person info:', response);
        setPersonInfo(response);
    }, [])
    console.log('Person Loading 2:', loading);
    if(loading) {
        return <p>Загрузка...</p>
    }

    const profilePath = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${personInfo.profile_path}`

    return (
        <Container>
            <div style={styles.container}>
                <div>
                    <div>
                        <img src={profilePath} style={styles.profilePoster}/>
                    </div>

                    <h3>Personal Info</h3>
                    <div>
                        <p><strong><bdi>Known For</bdi></strong> {personInfo.known_for_department}</p>
                        <p><strong><bdi>Known Credits</bdi></strong> 138</p>
                        <p><strong><bdi>Gender</bdi></strong> {genderToString(personInfo.gender)}</p>
                        <p><strong><bdi>Birthday</bdi></strong>   {personInfo.birthday} ({getCurrentAge(new Date(personInfo.birthday))} years old)</p>
                        <p><strong><bdi>Place of Birth</bdi></strong> {personInfo.place_of_birth}</p>
                        <p><strong><bdi>Also Known As</bdi></strong></p>
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
                        <h3>Biography</h3>
                        <div>
                            {splitedBiography(personInfo.biography)}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}