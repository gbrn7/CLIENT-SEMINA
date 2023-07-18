import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import SAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import Sform from './form';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';



function PageSignin() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [alert, setAlert] = useState(({
    status: false,
    message: '',
    type: '',
  }));

  const handleSubmit = async () => {

    setIsLoading(true);


    const res = await postData('/cms/auth/signin', form);
    if (res?.data?.data) {

      dispatch(userLogin(res.data.data.token, res.data.data.role, res.data.data.refreshToken, res.data.data.email));

      setIsLoading(false);

      navigate('/');
    } else {
      // console.log(error.response.data.msg);
      alertHandle(res?.response?.data?.msg ?? 'Internal Servel Error', 'danger');
      setIsLoading(false);
    }
  };

  const alertHandle = (error, type) => {

    setAlert({ status: true, message: error, type: { type } });
  }


  return (
    <Container md={12} className='my-5'>
      <div className="m-auto" style={{ width: '50%' }}>
        {alert.status && <SAlert type="danger" message={alert.message}></SAlert>}
      </div>
      <Card style={{ width: '50%' }} className='m-auto mt-5'>
        <Card.Body>
          <Card.Title className='text-center'>Form Signin</Card.Title>
          <Sform form={form} handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} />
        </Card.Body>
      </Card>
    </Container>

  );
}



// Input.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// }

// Input.defaultProps = {
//   name: 'name'
// }


export default PageSignin;

