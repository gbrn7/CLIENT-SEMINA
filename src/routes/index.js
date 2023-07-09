import { Navigate, Route, Routes } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute'; //middleware that handel for guest authenticate
import GuestOnlyRoute from '../components/GuestOnlyRoute'; // middleware that handel for user authenticate

import PageSignin from '../pages/signIn';
import { HomeRoute } from './HomeRoute';
// import { TalentsRoute } from './TalentsRoute';
import { CategoriesRoute } from './CategoriesRoute';
// import { PaymentsRoute } from './PaymentsRoute';
import SNavbar from '../components/Navbar';
// import { EventsRoute } from './EventsRoute';
// import { OrdersRoute } from './OrdersRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path='login'
        element={
          <GuestOnlyRoute>
            <PageSignin />
          </GuestOnlyRoute>
        }
      />
      <Route
        path='/'
        element={
          <>
            <SNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path='dashboard/*' element={<HomeRoute />} /> //* nesting route *//
        <Route path='categories/*' element={<CategoriesRoute />} />
        {/* <Route path='talents/*' element={<TalentsRoute />} />
        <Route path='payments/*' element={<PaymentsRoute />} />
        <Route path='events/*' element={<EventsRoute />} />
        <Route path='orders/*' element={<OrdersRoute />} /> */}
        <Route path='' element={<Navigate to='/dashboard' replace={true} />} />
      </Route>
    </Routes>
  );
}
