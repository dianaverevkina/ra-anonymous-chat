import React from 'react'
import { Message } from './Message/Message'

export const MessagesList = React.forwardRef(({messages}, ref) => {
  return (
    <ul className="messages__list"
    ref={ref}
    >
      {messages.map((message, index) => <Message 
        key={message.id} 
        message={message} 
        ref={index === messages.length - 1 ? ref : null}
      />)}
    </ul>
  )
})
