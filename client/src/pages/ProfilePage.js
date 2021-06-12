import React, {useState, useContext, useEffect, useCallback} from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook.js';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import {LocalizationContext, localizations} from '../context/LocalizationContext';
import { MovieListCard } from '../components/MovieListCard';
import CommentCard from '../components/CommentCard';



const getFullName = user => `${user.firstName} ${user.lastName}`;

export const ProfilePage = () => {
    const history = useHistory();
    const {loading, request} = useHttp();
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    const profileId = history.location.pathname.split('/profile/')[1];
    const {localization} = useContext(LocalizationContext);
    const {userId} = useContext(AuthContext);

    const fetchUser = useCallback(async () => {
        try {
          const fetched = await request(`/api/users/${profileId}`);
          setUser(fetched.user);

          const fetchedComments = await fetch(`/api/comments/user/${profileId}`);
          const dataComments = await fetchedComments.json();
          setComments(dataComments);
          console.log('COMMENTS', dataComments);
        } catch (e) {}
    }, [profileId, request]);
    // const fetchUser = useCallback(async () => {
    //     try {
    //       const fetched = await fetch(`/api/users/${profileId}`);
    //       const data = await fetched.json();
    //       setUser(data.user);
    //       console.log(data)
    //     } catch (e) {}
    // }, [profileId, request])

    useEffect(() => {
        fetchUser();
    }, [profileId, fetchUser]);

    if (loading) {
        return <LinearProgress/>;
    }

    const onDeleteComment = id => {
        const filteredComments = comments.filter(c => c._id !== id);
        setComments(filteredComments);
    }
    
    console.log(`/api/comments/user/${profileId}`, comments);

    return (
        <Container>
            <div className='profile-header'>
                <div className='profile-avatar_container'>
                    <img src={`/assets/avatars/${user.avatarUrl || 'reserv-avatar.jpg'}`} alt={`${user.firstName} ${user.lastName}`}  className='profile-avatar'/>
                </div>
                <div>
                    <h1>{getFullName(user)}</h1>
                    <p>{user.email}</p>
                    <p>userId: {userId}</p>
                    <NavLink to='/'>Home page</NavLink>
                </div>
            </div>

            <div className='movie-page-section'>
                <div>
                    <h3 className='section-title'>{localization === localizations.EN ? 'Watched' : 'Просмотренное'}</h3>
                </div>
                <div className='recommendations-wrapper movie-page-section-content'>
                    {
                        user?.lists?.watched.length ?
                        user?.lists?.watched.map(movie => {
                            return <MovieListCard key={movie.id} id={movie.id} mediaType={movie.mediaType}/>
                        })
                        : <p>Список пуст</p>
                    }
                </div>
            </div>
            <div className='movie-page-section'>
                <div>
                    <h3 className='section-title'>{localization === localizations.EN ? 'Favorite' : 'Избранное'}</h3>
                </div>
                <div className='recommendations-wrapper movie-page-section-content'>
                    {
                        user?.lists?.favorite.length ?
                        user?.lists?.favorite.map(movie => {
                            return <MovieListCard key={movie.id} id={movie.id} mediaType={movie.mediaType}/>
                        })
                        : <p>Список пуст</p>
                    }
                </div>
            </div>
            <div className='movie-page-section'>
                <div>
                    <h3 className='section-title'>{localization === localizations.EN ? 'Bookmarks' : 'Закладки'}</h3>
                </div>
                <div className='recommendations-wrapper movie-page-section-content'>
                    {
                        user?.lists?.wish.length ?
                        user?.lists?.wish.map(movie => {
                            return <MovieListCard key={movie.id} id={movie.id} mediaType={movie.mediaType}/>
                        })
                        : <p>Список пуст</p>
                    }
                </div>
            </div>
            <div className='movie-page-section'>
                <div>
                    <h3 className='section-title'>{localization === localizations.EN ? 'User comments' : 'Комментарии пользователя'}</h3>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}} className='movie-page-section-content'>
                    {
                        comments.length ?
                        comments.map(c => <CommentCard key={c._id} comment={c} loading={loading} onDeleteHandler={onDeleteComment}/>)
                        : <p>Комментарии отсутствуют</p>
                    }
                </div>
            </div>
        </Container>
    )
}
