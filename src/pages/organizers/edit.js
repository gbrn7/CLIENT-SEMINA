import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, putData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';

function OrganizerEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [form, setForm] = useState({
    organizer: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'organizer'
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

  const fetchOneOrganizer = async () => {
    const res = await getData(`/cms/users/${userId}`);

    setForm({
      ...form,
      organizer: res.data.data.organizer.organizer,
      name: res.data.data.name,
      email: res.data.data.email,
      password: res.data.data.password,
      confirmPassword: res.data.data.confirmPassword
    });
  };

  useEffect(() => {
    fetchOneOrganizer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await putData(`/cms/organizer/${userId}`, form);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `${res.data.data.organizer.organizer} data updated`
        )
      );
      navigate('/organizers');
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
    <Container className='mt-3'>
      <SBreadCrumb
        textSecound={'Organizers'}
        urlSecound={'/organizers'}
        textThird='Edit'
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        edit
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default OrganizerEdit;
