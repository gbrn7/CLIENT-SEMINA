import { Route, Routes } from 'react-router-dom';

import Admin from '../pages/admin';
import Create from '../pages/admin/create';
import Edit from '../pages/admin/edit';

export function AdminRoute() {
  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:adminId' element={<Edit />} />
    </Routes>
  );
}
