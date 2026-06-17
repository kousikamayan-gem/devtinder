import React, { useEffect } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  const navigate = useNavigate();
  const getFeed = async() => {
    try
    {const data = await fetch(BASE_URL+'/feed', {
      method: 'GET',
      credentials: 'include'
    })
    
    const res = await data.json();
    console.log(res);
    dispatch(addFeed(res?.data))}
    catch(err) {
      navigate('/login');
    }
  }
  useEffect(() => {
    getFeed();
  },[]);
  if (!feed) return;
  if (feed.length === 0) return <h1>No user found!</h1>
  return (
    <div>
      {/* {console.log(feed?.data[0])} */}
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed