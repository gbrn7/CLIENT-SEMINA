import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import SAlert from '../../components/Alert';
import axios from 'axios';
import { config } from '../../configs';
import { Navigate, useNavigate } from 'react-router-dom';
import Sform from './form';


function PageSignin() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

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

    try {
      console.log(config.api_host_dev);
      const res = await axios.post(`${config.api_host_dev}/cms/auth/signin`, form
      );

      // console.log(res.data.data.token);
      localStorage.setItem('token', res.data.data.token)

      setIsLoading(false);

      navigate('/');
    } catch (error) {
      console.log(error.response.data.msg);
      alertHandle(error?.response?.data?.msg ?? 'Internal Servel Error', 'danger');
      setIsLoading(false);
    }
  };

  const alertHandle = (error, type) => {

    setAlert({ status: true, message: error, type: { type } });
  }

  if (token) return <Navigate to="/" replace={true} />

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

