//this is a example of reusable componenet
const Title = (props) =>{
  return `Nama saya : ${props.name}`;
};

//we can set the defalut props value with this syntax
Title.defaultProps = {
  name : 'Ega',
} 

export default Title;