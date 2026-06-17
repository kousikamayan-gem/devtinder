import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { requestId } = useParams();
  const user = useSelector((store)=> store.user);
  const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);
  const userId = user?._id;
  const firstName = user?.firstName

  const fetchChatData = async() => {
    const chat = await fetch(BASE_URL+'/chat/'+ requestId,{
      method: 'GET',
      credentials: 'include'
    })
    const res = await chat.json();
    console.log(res)
    const chatMessages = res?.messages?.map((msg)=> {return {firstName: msg.senderId.firstName, lastName: msg.senderId.lastName, message: msg.message}}) 
    setMessages(chatMessages)
  }
  useEffect(()=> {
    fetchChatData()
  },[])
  useEffect(()=> {
    if(!userId) {return};
    const socket = createSocketConnection();
    socket.emit('joinChat', { firstName, userId, requestId });

    socket.on('receiveMessage' , ({message, firstName}) => {
        console.log({message, firstName});
        setMessages((prevMessages) => [...prevMessages, { message, firstName }]);
        console.log(messages);
    })
    return () =>{
        socket.disconnect();
    }
  },[userId, requestId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage', {firstName, userId, requestId, message});
    setMessage('');
  }

  return (
    <div className='w-1/2 mx-auto border border-gray-600 h-[70vh] flex flex-col m-5 p-5'>
          <h1 className='border-b border-gray-600 px-2'>Chat</h1>
          <div className='flex-grow overflow-y-auto mb-4'>
              <div className="">
                  <div >
                     {messages?.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat ${
                            user?.firstName === msg.firstName
                                ? "chat-start"
                                : "chat-end"
                            }`}
                        >
                            <div className="chat-header">
                            {msg.firstName}
                            </div>

                            <div className="chat-bubble">
                            {msg.message}
                            </div>
                        </div>
                        ))}
                      <br />
                      {/* I have the high ground. */}
                  </div>
              </div>
              {/* <div className="chat chat-end">
                  <div className="chat-bubble">You underestimate my power!</div>
              </div> */}
          </div>
          <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
              <input value={message} onChange={(e)=> setMessage(e.target.value)} className='flex-1 border border-gray-500 text-white rounded-lg p-2'/>
            <button className="btn btn-sm bg-primary px-2" onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat