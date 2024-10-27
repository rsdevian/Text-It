import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

function Messages() {
  const { messages: initialMessages, loading, fetchMessages } = useGetMessages();
  const [messages, setMessages] = useState(initialMessages);
  const lastMessageRef = useRef(null);

  useListenMessages(); // Assuming this sets up Socket.IO listeners, which are also listening for messages

  // Polling every second to fetch new messages
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const newMessages = await fetchMessages();
      setMessages(newMessages);
    }, 1000); // Refresh every second

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [fetchMessages]);

  useEffect(() => {
    if (!loading) {
      // Scroll to bottom
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "auto" });
      }, 100);
    }
  }, [messages, loading]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && (
        <>
          {messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
          <div ref={lastMessageRef} />
        </>
      )}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}

export default Messages;
