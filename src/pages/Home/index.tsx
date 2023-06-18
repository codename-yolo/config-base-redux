import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors';
import reducer from './reducer';
import saga from './saga';
import {
    makeSelectIsLoading,
    makeSelectCompleted,
    makeSelectPosts,
} from './selectors';
import { initPage, requestGetPostsStart } from './actions';
import { useNavigate } from 'react-router-dom';

const key = 'home';

const stateSelector = createStructuredSelector({
    isLoading: makeSelectIsLoading(),
    completed: makeSelectCompleted(),
    posts: makeSelectPosts(),
});

const Home: FC = (props) => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { isLoading, completed, posts } = useSelector(stateSelector);

    console.log(isLoading, completed, posts);

    useEffect(() => {
        dispatch(requestGetPostsStart())
        
        return () => {
            dispatch(initPage())
        }
    }, [])

    return (
        <div>
            Home
            <button onClick={() => {
                navigate('/profile')
            }}>Profile</button>
        </div>
    )
}

export default Home;