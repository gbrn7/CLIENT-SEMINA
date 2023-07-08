import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Card } from 'react-bootstrap';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SButton from '../../components/Button';
import SAlert from '../../components/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../configs/index'


function PageSignin() {

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

    try {
      const res = await axios.post(`${config.api_host_dev}/cms/auth/signin`,
        form
      );

      console.log(res.data.data.token);
    } catch (error) {
      // console.log(error.response.data.msg);
      alertHandle(error?.response?.data?.msg ?? 'Internal Servel Error', 'danger');
    }

    setIsLoading(false);
    navigate('/');
  };

  const alertHandle = (error, type) => {
    // console.log(error);
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <TextInputWithLabel type="email" placeholder="Enter email" name="email" label="Email Address" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <TextInputWithLabel type="password" placeholder="Password" name="password" label="Password" onChange={handleChange} />
            </Form.Group>
            <SButton loading={isLoading} disabled={isLoading} variant="primary" type="submit" action={handleSubmit}>
              Submit
            </SButton>
          </Form>
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

