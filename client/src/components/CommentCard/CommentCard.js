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
    const {userId, userFullName} = useContext(AuthContext);
    const [commentAuthor, setCommentAuthor] = useState(null);
    const [commentReactions, setCommentReactions] = useState(reactions.users);
    
    const {localization} = useContext(LocalizationContext);
    const local = localizations[localization];
    const predlog = localization === localizations.EN ? 'in' : 'в';
    const {request} = useHttp();

    const fetchCommentAuthor = useCallback(async () => {
        try {
          const fetched = await request(`/api/users/${authorId}`);
          setCommentAuthor(fetched.user);
        } catch (e) {}
    }, [authorId, request]);

    useEffect(() => {
        fetchCommentAuthor();
    }, [fetchCommentAuthor]);

    const onDeleteComment = async () => {
        try {
            console.log('comment id:', _id);
            const response = await request(`/api/comments/comment/${_id}`, 'DELETE');
            console.log(response);
            onDeleteHandler(_id);
        } catch (e) {
            console.error(e);
        }
    }

    const onClickReaction = async (reactionType) => {
        if (authorId === userId) return;

        const userReaction = commentReactions.find(user => user.userId === userId);
        console.log('hasUserReaction', Boolean(userReaction));

        if (reactionType === 'like' && !Boolean(userReaction)) {
            const response = await request(`/api/comments/reaction`, 'POST', {
                commentId: _id,
                isPositive: true,
                userName: userFullName,
                userId
            });
            setCommentReactions([...commentReactions, {
                isPositive: true,
                userName: userFullName,
                userId
            }])
            console.log('like', response);
        }

        if (reactionType === 'dislike' && !Boolean(userReaction)) {
            const response = await request(`/api/comments/reaction`, 'POST', {
                commentId: _id,
                isPositive: false,
                userName: userFullName,
                userId
            });
            setCommentReactions([...commentReactions, {
                isPositive: false,
                userName: userFullName,
                userId
            }])
            console.log('dislike', response);
        }

        if (reactionType === 'like' && Boolean(userReaction)) {
            const response = await request(`/api/comments/reaction`, 'DELETE', {
                commentId: _id,
                isPositive: true,
                userId
            });

            let changedReactions = [...commentReactions.filter(r => r.userId !== userId)];
            console.log('unlike', response);

            if (!userReaction.isPositive) {
                changedReactions.push({
                    isPositive: true,
                    userName: userFullName,
                    userId
                });
                await request(`/api/comments/reaction`, 'POST', {
                    commentId: _id,
                    isPositive: true,
                    userName: userFullName,
                    userId
                });
            }
            
            setCommentReactions(changedReactions);
        }

        if (reactionType === 'dislike' && Boolean(userReaction)) {
            const response = await request(`/api/comments/reaction`, 'DELETE', {
                commentId: _id,
                isPositive: false,
                userId
            });

            let changedReactions = [...commentReactions.filter(r => r.userId !== userId)];
            console.log('undislike', response);

            if (userReaction.isPositive) {
                changedReactions.push({
                    isPositive: false,
                    userName: userFullName,
                    userId
                });
                await request(`/api/comments/reaction`, 'POST', {
                    commentId: _id,
                    isPositive: false,
                    userName: userFullName,
                    userId
                });
            }
            
            setCommentReactions(changedReactions);
        }

    }

    console.log('comment reactions after', commentReactions);
    return (
        <div className='comment-container'>
            <div className='comment-autor-img_container'>
                <div className='comment-autor-img_wrapper'>
                    <a href={`/profile/${authorId}`} className='comment-autor-img' style={{backgroundImage: `url('/assets/avatars/${commentAuthor?.avatarUrl}')`} }/>
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

                            <div style={{marginLeft: '20px', color: 'pink', cursor: 'pointer'}} onClick={onDeleteComment}>
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
                        <span>
                            <ButtonDislike 
                                onClick={() => onClickReaction('dislike')} 
                                isActive={ Boolean(commentReactions.find(r => r.userId === userId && r.isPositive === false)) }
                            />
                            {commentReactions?.reduce((count, reaction) => !reaction.isPositive ? count + 1 : count , 0)}
                        </span>

                        <span>
                            <ButtonLike 
                                onClick={() => onClickReaction('like')} 
                                isActive={ Boolean(commentReactions.find(r => r.userId === userId && r.isPositive === true)) }
                            />
                            {commentReactions?.reduce((count, reaction) => reaction.isPositive ? count + 1 : count , 0)}
                        </span>
                    </div>
                </div>

                <div className='comment-answers-container'>

                </div>
            </div>
        </div>
    )
}
