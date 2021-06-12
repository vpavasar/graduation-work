import React, {useContext, useState, useCallback, useEffect} from 'react';
import './CommentCard.css';
import {AuthContext} from '../../context/AuthContext';
import {LocalizationContext, localizations} from '../../context/LocalizationContext';
import {ButtonLike} from '../buttons/ButtonLike';
import {ButtonDislike} from '../buttons/ButtonDislike';
import {useHttp} from '../../hooks/http.hook';

export const CommentCard = ({comment, onDeleteHandler}) => {
    const {
        _id,
        text,
        createdOn,
        authorName,
        authorId,
        comments,
        reactions
    } = comment;
    const {userId} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const {localization} = useContext(LocalizationContext);
    const local = localizations[localization];
    const predlog = localization === localizations.EN ? 'in' : 'в';
    const {request} = useHttp();

    const fetchUser = useCallback(async () => {
        try {
          const fetched = await request(`/api/users/${authorId}`);
          setUser(fetched.user);
        } catch (e) {}
    }, [authorId, request]);

    useEffect(() => {
        fetchUser();
    }, []);

    const onClickHandler = async () => {
        try {
            console.log('comment id:', _id);
            const response = await request(`/api/comments/comment/${_id}`, 'DELETE');
            console.log(response);
            onDeleteHandler(_id);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='comment-container'>
            <div className='comment-autor-img_container'>
                <div className='comment-autor-img_wrapper'>
                    <a href={`/profile/${authorId}`} className='comment-autor-img' style={{backgroundImage: `url('/assets/avatars/${user?.avatarUrl}')`} }/>
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

                            <div style={{marginLeft: '20px', color: 'pink', cursor: 'pointer'}} onClick={onClickHandler}>
                                {userId === authorId ? <strong>Удалить комментарий</strong> : null}
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
