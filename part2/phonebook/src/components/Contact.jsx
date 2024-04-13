const Contact = ({name,number,id,handleDelete}) => {
  return ( <div>{name} {number} <button onClick={() =>handleDelete(id)}>eliminar</button></div> );
} 
export default Contact;

