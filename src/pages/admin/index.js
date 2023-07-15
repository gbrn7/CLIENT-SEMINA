import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessAdmin } from '../../const/access';
import SearchInput from '../../components/SearchInput';
import { fetchAdmin, setKeyword } from '../../redux/admin/actions';

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const admin = useSelector((state) => state.admin);
  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessAdmin).forEach(function (key, index) {
      if (accessAdmin[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch((fetchAdmin()));
  }, [admin.keyword]);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/admin/${id}`);
        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus admin ${res.data.data.name}`
          )
        );
        dispatch(fetchAdmin());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Admin'} />

      {access.tambah && (
        <div className='mb-3'>
          <SButton
            action={() => navigate('/admin/create')}
          >
            Tambah
          </SButton>
        </div>
      )}

      <SearchInput
        query={admin.keyword}
        placeholder={'Masukan pencarian nama admin'}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={admin.status}
        thead={['Nama Admin', 'Aksi']}
        data={admin.data}
        tbody={['name']}
        editUrl={access.edit ? `/admin/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default Categories;
