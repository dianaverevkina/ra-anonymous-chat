import React, { useEffect, useRef, useState } from 'react'
import { ChatForm } from './ChatForm/ChatForm'
import { MessagesList } from './MessagesList/MessagesList'
import { v4 as uuidv4 } from 'uuid';

const url = 'http://localhost:7070/messages';

export const Chat = () => {
  const savedUserId = localStorage.getItem('id');
  const id = savedUserId || uuidv4();

  if (!savedUserId) {
    localStorage.setItem('id', id);
  }

  const initialMessage = {userId: id, content: '', id: 0, sending: false}
  const [message, setMessage] = useState(initialMessage);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  async function getMessages() {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setMessages(result);
        }
      })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const lastMessage = lastMessageRef.current;
    if (lastMessage) {
      lastMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    } 
  }, [messages])

  async function sendMessage() {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(message)
    })
      .then(response => {
        if (response.ok) {
          setMessage(initialMessage);
          setMessages([...messages, {...message, sending: true}])
        }
      })
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function handleChange(e) {
    const {value} = e.target;
    setMessage({...message, content: value})
  }

  return (
    <>
    <div className="chat__messages messages">
      <div className="messages__placeholder">
        <MessagesList messages={messages} ref={lastMessageRef}/>
      </div>
    </div>
      <ChatForm message={message} onSubmit={handleSubmit} onChange={handleChange}/>
    </>
  )
}
