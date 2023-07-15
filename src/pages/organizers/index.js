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
import { accessOrganizers } from '../../const/access';
import SearchInput from '../../components/SearchInput';
import { fetchOrganizers, setKeyword } from '../../redux/organizers/actions';

function Organizers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const organizers = useSelector((state) => state.organizers);
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
    Object.keys(accessOrganizers).forEach(function (key, index) {
      if (accessOrganizers[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    console.log('test')
    dispatch((fetchOrganizers()));
  }, [organizers.keyword, organizers.page,]);

  const handleDelete = (id) => {
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
        const res = await deleteData(`/cms/organizers/${id}`);
        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus organizer ${res.data.data.name}`
          )
        );
        dispatch(fetchOrganizers());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Organizers'} />

      {access.tambah && (
        <div className='mb-3'>
          <SButton
            action={() => navigate('/organizers/create')}
          >
            Tambah
          </SButton>
        </div>
      )}

      <SearchInput
        query={organizers.keyword}
        placeholder={'Masukan pencarian nama organizers'}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={organizers.status}
        thead={['Nama Organizer', 'Aksi']}
        data={organizers.data}
        tbody={['name']}
        editUrl={access.edit ? `/organizers/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
      />
    </Container>
  );
}

export default Organizers;
