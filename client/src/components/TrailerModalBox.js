import React, {useContext} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {LocalizationContext, localizations} from '../context/LocalizationContext';

export const TrailerModalBox = ({trailerId, onCloseHundler}) => {
    const {localization} = useContext(LocalizationContext);
    return (
        <div className='trailer-box-wrapper'>
            <div className='trailer-box'>
                <div className='trailer-box-header'>
                    <h3>{localization === localizations.EN ? ' Play Trailer' : 'Воспроизвести трейлер'}</h3>
                    <div className='close-icon-container'>
                            <CloseIcon className='close-trailer' onClick={onCloseHundler} fontSize="medium"/>
                    </div>
                </div>
                <div className='trailer-video'>
                    <iframe type="text/html" width="1468" height="826" src={`https://www.youtube.com/embed/${trailerId}`} title={trailerId} frameborder="0" allowfullscreen="" allow="autoplay; encrypted-media">
                    </iframe>
                </div>
            </div>
        </div>
    )
}
