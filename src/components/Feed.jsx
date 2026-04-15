import React, { useEffect } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  const getFeed = async() => {
    const data = await fetch(BASE_URL+'/feed', {
      method: 'GET',
      credentials: 'include'
    })
    
    const res = await data.json();
    console.log(res);
    dispatch(addFeed(res));
  }
  useEffect(() => {
    getFeed();
  },[]);
  return (
    <div>
      {console.log(feed?.data[0])}
     {feed?.data && <UserCard user={feed.data[0]} />}
    </div>
  )
}

export default Feed