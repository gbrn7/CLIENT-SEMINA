import React from 'react';
import { Form } from 'react-bootstrap';
import SButton from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';

export default function CategoriesForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={'Masukan nama Organizer'}
        label={'Nama Organizer'}
        name='organizer'
        value={form.organizer}
        type='text'
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={'Masukan nama User'}
        label={'Nama User'}
        name='name'
        value={form.name}
        type='text'
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan email organizer"}
        label={"Email organizer"}
        name={"email"}
        value={form.email}
        type='text'
        onChange={handleChange}
      />
      <TextInputWithLabel
        type={"password"}
        value={form.password}
        placeholder={"Password"}
        name={"password"}
        label={"Password"}
        onChange={handleChange}
      />
      <TextInputWithLabel
        type={"password"}
        value={form.confirmPassword}
        placeholder={"Confirm Password"}
        name={"confirmPassword"}
        label={"Confirm Password"}
        onChange={handleChange}
      />
      <SButton variant='primary' action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </SButton>
    </Form>
  );
}
