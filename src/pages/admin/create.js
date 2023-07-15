import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { postData } from '../../utils/fetch';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';

function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin'
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
    const res = await postData('/cms/admin', form);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `berhasil tambah kategori ${res.data.data.name}`
        )
      );
      navigate('/admin');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecound={'Admin'}
        urlSecound={'/admin'}
        textThird='admin'
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default CategoryCreate;
