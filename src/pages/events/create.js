import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from '../../components/BreadCrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { postData } from '../../utils/fetch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';
import {
  fetchListCategories,
  fetchListTalents,
} from '../../redux/lists/actions';

function EventsCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  const options = [
    { value: true, label: 'Publish', name: 'statusTicketCategories' },
    { value: false, label: 'Draft', name: 'statusTicketCategories' },
  ]

  const [form, setForm] = useState({
    title: '',
    price: '',
    date: '',
    file: '',
    avatar: '',
    about: '',
    venueName: '',
    tagline: '',
    keyPoint: [''],
    tickets: [
      {
        type: '',
        statusTicketCategories: '',
        stock: '',
        price: '',
      },
    ],
    category: '',
    talent: '',
    stock: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/cms/images', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image size less than 3 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'type image png | jpg | jpeg',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else if (e.target.name === 'category' || e.target.name === 'talent') {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    // setIsLoading(true);

    const payload = {
      title: form.title,
      date: form.date,
      about: form.about,
      venueName: form.venueName,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      statusEvent: form.status,
      tickets: form.tickets,
      category: form.category.value,
      talent: form.talent.value,
      image: form.file,
    };

    // console.log(payload);

    const res = await postData('/cms/events', payload);

    console.log(res);

    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `berhasil tambah events ${res.data.data.title}`
        )
      );

      navigate('/events');
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

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push('');

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusTicket = () => {
    let _temp = [...form.tickets];
    _temp.push({
      type: '',
      statusTicketCategories: '',
      stock: '',
      price: '',
    });

    setForm({ ...form, tickets: _temp });
  };
  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);


    _temp.splice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    if (e?.target?.name) {
      _temp[i][e.target.name] = e.target.value;
    } else {
      _temp[i][e.name] = e.value;
    }

    // console.log(_temp);

    setForm({ ...form, tickets: _temp });

    // console.log(form);
  };

  return (
    <Container>
      <BreadCrumb
        textSecound={'Events'}
        urlSecound={'/events'}
        textThird='Create'
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
        handleChangeTicket={handleChangeTicket}
        options={options}
        defaultValue={false}
      />
    </Container>
  );
}

export default EventsCreate;
