import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTalents, setKeyword, setRoles } from '../../redux/talents/actions';
import AlertMessage from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessTalents } from '../../const/access';
import SelectBox from '../../components/SelectBox';
import { fetchListRoles } from '../../redux/lists/actions';

function TalentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const talents = useSelector((state) => state.talents);
  const lists = useSelector((state) => state.lists);

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
    Object.keys(accessTalents).forEach(function (key, index) {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, talents.keyword, talents.role]);  //it will execute in first render and when dispatch & talents.keyword change

  useEffect(() => {
    dispatch(fetchListRoles());
  }, [dispatch]);

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
        const res = await deleteData(`/cms/talents/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus speaker ${res.data.data.name}`
          )
        );

        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <BreadCrumb textSecound={'Talents'} />
      {access.tambah && (
        <div className='mb-3'>
          <SButton action={() => navigate('/talents/create')}>Tambah</SButton>
        </div>
      )}

      <Row>
        <Col>
          <SearchInput
            query={talents.keyword}
            placeholder={'Masukan pencarian nama talent disini'}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian role'}
            name='role'
            value={talents.roles}
            options={lists.roles}
            isClearable={true}
            handleChange={(e) => dispatch(setRoles(e))}
          />
        </Col>
      </Row>


      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={talents.status}
        thead={['Nama', 'Role', 'Avatar', 'Aksi']}
        data={talents.data}
        tbody={['name', 'role', 'avatar']}
        editUrl={access.edit ? `/talents/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default TalentsPage;
