import React from 'react'

const savedUserId = localStorage.getItem('id');
export const Message = React.forwardRef(({ message }, ref) => {
  
  const { userId, content, sending} = message;

  return (
    <li
      ref={ref} 
      className={`chat__message ${userId === savedUserId ? 'message-user' : ''}`}
    >
      <div className="message__date">{new Date().toLocaleDateString()}</div>
      <div className="message__content">
        <div className="message__text">{content}</div> 
        {
          sending && <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'crispedges'}}
            width="20px"
            height="20px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#499255"
            strokeWidth="4"
            r="33"
            strokeDasharray="155.50883635269477 53.83627878423159"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="2.4390243902439024s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            />
          </circle>
        </svg>
      }
      </div>
    </li>
  )
})
