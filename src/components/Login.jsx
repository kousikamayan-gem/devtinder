import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('kousika@gmail.com');
  const [password, setPassword] = useState('Dappa22@2');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleLogin = async() => {
    try {
      // console.log(email, password)
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({emailId: email, password}),
        credentials: 'include'
      })
      const data = await res.json();
      // console.log(data)
      dispatch(addUser(data));
      navigate('/');
    } catch (err) {
      console.log(err)
      setError('Login failed');
    }
  }
  return (
    <div className='flex justify-center items-center my-10'>
      <form className="bg-base-200 w-[400px] flex flex-col  border-base-300 rounded-box w-xs border p-4" onSubmit={(e)=> e.preventDefault()}>
        <p className="text-lg font-bold px-2">Login</p>

        <label className="label px-2" >Email</label>
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="input my-2 px-2" placeholder="Email" />

        <label className="label px-2" >Password</label>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="input my-2 px-2" placeholder="Password" />
        <p className='text-red-500 text-sm'>{error}</p>
        <button className="mt-4 w-[100px] bg-gray-900 px-3 py-2 rounded-lg" onClick={handleLogin} type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login