import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, setKeyword, setPage } from '../../redux/categories/actions';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessCategories } from '../../const/access';
import SearchInput from '../../components/SearchInput';

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const categories = useSelector((state) => state.categories);
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
    Object.keys(accessCategories).forEach(function (key, index) {
      if (accessCategories[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories.keyword, categories.page,]);

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
        const res = await deleteData(`/cms/categories/${id}`);
        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus kategori ${res.data.data.name}`
          )
        );
        dispatch(fetchCategories());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Categories'} />

      {access.tambah && (
        <div className='mb-3'>
          <SButton
            action={() => navigate('/categories/create')}
          >
            Tambah
          </SButton>
        </div>
      )}

      <SearchInput
        query={categories.keyword}
        placeholder={'Masukan pencarian nama kategori disini'}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={categories.status}
        thead={['Nama', 'Aksi']}
        data={categories.data}
        tbody={['name']}
        pages={categories.pages}
        editUrl={access.edit ? `/categories/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </Container>
  );
}

export default Categories;
