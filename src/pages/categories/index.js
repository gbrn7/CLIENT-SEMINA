import React, { useEffect, useState } from 'react'
import { Container, Spinner, Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import SButton from '../../components/Button';
import SBreadCrumb from '../../components/BreadCrumb';
import SNavbar from '../../components/Navbar';
import axios from 'axios';
import { config } from '../../configs';

export default function PageCategories() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  console.log('data');
  console.log(data);

  useEffect(() => {

    const getCategoriesAPI = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // console.log(res.data);
        setData(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);

      }
    };

    // console.log('useEffect');
    getCategoriesAPI();
  }, [])

  if (!token) return <Navigate to="/signin" replace={true} />


  return (
    <>

      {console.log('render')}
      <SNavbar />
      <Container className="mt-3">
        <SBreadCrumb textSecound={'Categories'} />
        <SButton action={() => navigate('/categories/create')}>Tambah</SButton>

        <Table className='mt-3' striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Index</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? (
                <tr>
                  <td colSpan={data.length + 1} style={{ textAlign: 'center' }}>
                    <Spinner animation='grow' variant='lignt' />
                  </td>
                </tr>
              ) : (
                data.map((data, index) => (
                  <tr key={index}>
                    <td>{(index + 1)}</td>
                    <td>{data.name}</td>
                    <td>{'test'}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </Table>
      </Container>
    </>
  )
}

