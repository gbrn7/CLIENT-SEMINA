import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { useNavigate } from 'react-router-dom';
import SNavbar from '../../components/Navbar';
import axios from 'axios';
import { config } from '../../configs';

function CategoryCreate() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${config.api_host_dev}/cms/categories`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/categories');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: error.response.data.msg,
      });
    }
  }

  return (
    <>
      <SNavbar />
      <Container className='mt-3'>
        <SBreadCrumb
          textSecound={'Categories'}
          urlSecound={'/categories'}
          textThird='Create'
        />
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
        <Form
          form={form}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </>
  );

};
export default CategoryCreate;
