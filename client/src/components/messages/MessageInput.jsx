import { useState } from 'react'
import useSendMessage from "../../hooks/useSendMessage.js"
import { BsSend } from "react-icons/bs"

function MessageInput() {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message); //Error
    setMessage('');
  }

  return (
   <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
          <input 
            type="text" 
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" 
            placeholder="Type to send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
          <button type='submit' className="absolute inset-y-0 end-0 flex items-center pe-3">
              {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
          </button>
      </div>
   </form>
  )
}

export default MessageInput

//starter code:
/*
import { BsSend } from "react-icons/bs"

function MessageInput() {
  return (
   <form className="px-4 my-3">
      <div className="w-full">
          <input type="text" className="border text-sm rounded-lg block w-full p-2.5 bg-grey-700 border-grey-600 text-white" placeholder="send a message"/>
          <button type='submit' className="absolute inset-y-0 end-0 flex items-center pe-3">
              <BsSend />
          </button>
      </div>
   </form>
  )
}

export default MessageInput
*/