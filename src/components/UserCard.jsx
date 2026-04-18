import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ( {user} ) => {
    const {_id, firstName, lastName, about, photoUrl, gender, age} = user;
    const dispatch = useDispatch();

    const handleFeed = async(status) => {
      try {
        const res = await fetch(BASE_URL + "/request/send/" + status + "/" + _id, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        console.log(data);
        dispatch(removeFeed(_id));

      }
      catch (err) {
        console.log(err)
      }
    }
  return (
    <div className="card bg-base-300 w-96 shadow-sm my-5 mx-auto">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    {gender && age && <p>{gender}, {age}</p> }
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-secondary bg-primary p-2" onClick={()=> handleFeed("ignored")}>Ignore</button>
      <button className="btn btn-primary bg-secondary p-2" onClick={()=> handleFeed("interested")}>Interested</button>
    </div>
  </div>
  
</div>

  )
}

export default UserCard