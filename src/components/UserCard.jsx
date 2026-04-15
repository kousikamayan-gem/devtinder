import React from 'react'

const UserCard = ( {user} ) => {
    const {firstName, lastName, about, photoUrl, gender, age} = user;
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
      <button className="btn btn-secondary bg-primary p-2">Ignore</button>
      <button className="btn btn-primary bg-secondary p-2">Interested</button>
    </div>
  </div>
  
</div>

  )
}

export default UserCard