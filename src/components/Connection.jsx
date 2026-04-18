import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice';

const Connection = () => {

    const dispatch = useDispatch();
    const connections = useSelector(store=> store.connection)


    const fetchConnection = async() => {
        try {
            const res = await fetch(BASE_URL+ '/user/connections',{
            credentials: 'include'
        })
        const data = await res.json();
        console.log(data);
        dispatch(addConnection(data?.data))
        }
        catch(err) {
            console.log(err);
        }
    }
    useEffect(()=> {
        fetchConnection();
    },[])
    if (!connections) return;
    if (connections.length === 0) return <h1>No Connections Found.</h1>
  return (
    <div className='flex justify-center flex-col'>
        <h1 className="mx-auto p-4 pb-2 text-3xl opacity-60 tracking-wide">Connections</h1>
          <ul className="list mx-auto bg-base-100 rounded-box shadow-md">
              {connections.map((connection) => {
                const {firstName, lastName, photoUrl, age, gender, about,_id} = connection;
                  return (
                      <li className="list-row" key={_id}>
                          <div><img className="size-10 rounded-box" src={photoUrl} /></div>
                          <div className="list-col-grow">
                              <div>{firstName + " " + lastName}</div>
                              <div className="text-xs uppercase font-semibold opacity-60">{about}</div>
                          </div>
                      </li>)
              }
              )
              }
          </ul>

      </div>
      
  )
}

export default Connection