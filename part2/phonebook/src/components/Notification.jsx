const Notification = ({ message }) => {
    console.log(message);
    if (message[0] === null) {
      return null,"notification"
    }
    return (
      <div className={message[1]}>
        {message[0]}
      </div>
    )
  }
  
  export default Notification