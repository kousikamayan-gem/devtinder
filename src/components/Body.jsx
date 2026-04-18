import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const user = useSelector(store=> store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async() => {
    if(!user) return;
    try{
    const res = await fetch(BASE_URL+'/profile/view', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json();
    dispatch(addUser(data));
    navigate('/')

  }catch(err) {
    navigate('/login');
  }
    
  }

  useEffect(()=> {
    fetchUser();
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body