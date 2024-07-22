// import React from 'react'

import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  const {selectedConversation, setSelectedConversation} = useConversation()
  useEffect(() => {
     return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col">
        {selectedConversation ? (
            <>
                {/* Header */}
                <div className="bg-slate-250 px-4 py-2 mb-2">
                    <span className="flex flex-row items-center gap-2"><img src={selectedConversation.profilePic} alt="user avatar" className="w-12 rounded-full"/><span className="text-gray-900 font-bold"> {selectedConversation.fullName}</span></span>    
                </div> 
                <Messages />
                <MessageInput />
            </>
        ) : <NoChatSelected />}
    </div>
  )
}

function NoChatSelected() {
  const {authUser} = useAuthContext();  
    return ( 
      <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
              <p>Welcome 👋 {authUser.fullName}</p>
              <p>Select a Chat to Start messaging </p>
              <TiMessages className='text-3xl md:text-6xl text-center'/>  
          </div>
      </div>
    )
}

export default MessageContainer;

//starter code:

/*
import Messages from "./Messages"
import MessageInput from "./MessageInput"

function MessageContainer() {
  return (
    <div className="md:min-w-[450px] flex flex-col">
        <>
            {Header }
            <div className="bg-slate-500 px-4 py-2 mb-2">
                <span className="label-text">To:</span> <span className="text-grey-900 font-bold">John Doe</span>
            </div> 
            <Messages />
            <MessageInput />
        </>
    </div>
  )
}

export default MessageContainer;
*/
