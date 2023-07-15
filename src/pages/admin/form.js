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
        placeholder={'Masukan nama Admin'}
        label={'Nama Admin'}
        name='name'
        value={form.name}
        type='text'
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan email admin"}
        label={"Email admin"}
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
