import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store=> store.request)
    const handleResponse = async(status, _id) => {
        try {
            const res = await fetch(BASE_URL + "/request/review/" + status + "/" + _id, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            console.log(data)
            dispatch(removeRequest(_id));

        }
        catch (err) {
            console.log(err)
        }
    }
    const fetchRequests = async() => {
        const res = await fetch(BASE_URL+'/user/requests/received',{
            credentials: 'include'
        });
        const data = await res.json();
        console.log(data);
        dispatch(addRequests(data?.data));
    }
    useEffect(()=> {
        fetchRequests();
    },[])
    if (!requests) return;
    if (requests.length === 0) return <h1>No Requests Found.</h1>
  return (
    <div className='flex justify-center flex-col'>
        <h1 className="mx-auto p-4 pb-2 text-3xl opacity-60 tracking-wide">Connection Requests</h1>
          <ul className="list mx-auto bg-base-100 rounded-box shadow-md">
              {requests.map((request) => {
                const {firstName, lastName, photoUrl, age, gender, about, _id} = request?.fromUserId;
                  return (
                      <li className="list-row" key={_id}>
                          <div><img className="size-10 rounded-box" src={photoUrl} /></div>
                          <div className="list-col-grow">
                              <div>{firstName + " " + lastName}</div>
                              <div className="text-xs uppercase font-semibold opacity-60">{about}</div>
                          </div>
                          <button className="btn btn-sm bg-secondary px-2" onClick={()=> handleResponse("accepted",request._id)}>Accept</button>
                          <button className="btn btn-sm bg-primary px-2" onClick={()=> handleResponse("rejected", request._id)}>Reject</button>
                      </li>)
              }
              )
              }
          </ul>

      </div>
  )
}

export default Requests