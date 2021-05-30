import React, {useContext} from 'react';
import './CommentCard.css';
import {LocalizationContext, localizations} from '../../context/LocalizationContext';
import {ButtonLike} from '../ButtonLike';
import {ButtonDislike} from '../ButtonDislike';

export const CommentCard = props => {
    const {
        _id,
        text,
        createdOn,
        authorName,
        authorId,
        comments,
        reactions
    } = props.comment;    
    const {localization} = useContext(LocalizationContext);
    const local = localizations[localization];
    const predlog = localization === localizations.EN ? 'in' : 'в';

    return (
        <div className='comment-container'>
            <div className='comment-autor-img_container'>
                <div className='comment-autor-img_wrapper'>
                    <a href={`/profile/${authorId}`} className='comment-autor-img' style={{backgroundImage: "url('/images/avatars/HWQCNJkJg-I.jpg')"} }/>
                </div>
            </div>
            <div className='comment-data-container'>
                <div className='comment-root_wrapper'>
                    <div className='comment-info_wrapper'>
                        <div className='comment-meta-info_wrapper'>
                            <div className='comment-autor-name_wrapper'>
                                <a href={`/profile/${authorId}`} className='comment-autor-name'><strong>{authorName}</strong></a>
                            </div>

                            <div>
                                {`${new Date(createdOn).toLocaleDateString(local)} ${predlog} ${new Date(createdOn).getHours()}:${new Date(createdOn).getMinutes()}`}
                            </div>
                        </div>

                        <div className='comment-text_wrapper'>
                            <p  className='comment-text'>
                                {text}
                            </p>
                        </div>
                    </div>

                    <div className='comment-media-buttons_wrapper'>
                        <span><ButtonDislike/>{reactions.dislikesCount}</span>
                        <span><ButtonLike/>{reactions.likesCount}</span>
                    </div>
                </div>

                <div className='comment-answers-container'>

                </div>
            </div>
        </div>
    )
}
