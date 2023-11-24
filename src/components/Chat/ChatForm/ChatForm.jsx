export const ChatForm = ({message, onSubmit, onChange}) => {
  const {content} = message;
  return (
    <form 
      name='send-message'
      className="form"
      onSubmit={onSubmit}
    >
      <div className="form__field">
        <input
          name="message" 
          value={content}
          className="form__input" 
          placeholder="Type your message here"
          onChange={onChange}
        />
        <button className="form__btn-send">
          <span className="form__btn-icon">
            <img src="./images/Send.svg" alt="" />
          </span>
        </button>
      </div>
    </form>
  )
}
