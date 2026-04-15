import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || '');
    const [about, setAbout] = useState(user.about || '');
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const handleSaveProfile =async() => {
        setError("");
        try {
            const data = await fetch(BASE_URL + '/profile/edit', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl
                }),
                credentials: "include",
            });
            if (!data.ok) {
                throw new Error(data.message || 'Failed to save profile');
            }
            const res = await data.json();
            console.log(res);
            dispatch(addUser(res?.data));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (err) {
            setError(err.message);
        }
    }
    
  return (
    <>
    {success && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>
    )}
    <div className='flex flex-row justify-center gap-10'>
        <div className='flex justify-center items-center'>
      <form className="bg-base-200 w-[400px] flex flex-col  border-base-300 rounded-box w-xs border p-4" onSubmit={(e)=> e.preventDefault()}>
        <p className="text-lg font-bold px-2">Edit Profile</p>

        <label className="label px-2" >First Name</label>
        <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="input my-2 px-2"/>

        <label className="label px-2" >Last Name</label>
        <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="input my-2 px-2"/>
        <label className="label px-2" >Age</label>
        <input type="text" value={age} onChange={(e)=> setAge(e.target.value)} className="input my-2 px-2"  />
        <label className="label px-2" >Gender</label>
        <input type="text" value={gender} onChange={(e)=> setGender(e.target.value)} className="input my-2 px-2"  />
        <label className="label px-2" >About</label>
        <input type="text" value={about} onChange={(e)=> setAbout(e.target.value)} className="input my-2 px-2"  />
        <label className="label px-2" >Photo URL</label>
        <input type="text" value={photoUrl} onChange={(e)=> setPhotoUrl(e.target.value)} className="input my-2 px-2" />
        <p className='text-red-500 text-sm'>{error}</p>
        <button className="mt-4 w-[200px] bg-gray-900 px-3 py-2 rounded-lg" onClick={handleSaveProfile} type='submit'>Save Profile</button>
      </form>
    </div>
    <div className="card bg-base-300 w-96 shadow-sm">
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
    </div>
    </>
  )
}

export default EditProfile