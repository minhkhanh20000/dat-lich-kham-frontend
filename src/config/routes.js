import Layout from '../components/Layout/Layout';
import Auth from '../pages/Auth/Auth';
import Login from '../pages/Auth/components/Login';
import Register from '../pages/Auth/components/Register';
import BooksService from '../pages/BookService/BooksService';
import ChooseDayExamination from '../pages/ChooseDayExamination/ChooseDayExamination';
import ConfirmationList from '../pages/ConfirmInformation/components/ConfirmationList';
import ConfirmInformation from '../pages/ConfirmInformation/ConfirmInformation';
import DashboardLayout from '../pages/Dashboard/components/DashboardLayout';
import Dashboard from '../pages/Dashboard/views/Dashboard';
import ManagerCalendar from '../pages/Dashboard/views/ManagerCalender';
import EditorPost from '../pages/Dashboard/views/Posts/EditorPost';
import EditPost from '../pages/Dashboard/views/Posts/EditPost';
import ManagerPost from '../pages/Dashboard/views/Posts/ManagerPost';
import Upgrade from '../pages/Dashboard/views/Upgrade';
import User from '../pages/Dashboard/views/UserProfile';
import Home from '../pages/Home/Home';
import Page404 from '../pages/NotFound/404';
import ProfileUser from '../pages/ProfileUser/ProfileUser';
import Introduce from '../pages/Introduce/Introduce';
import {
  ProtectedRoute,
  ProtectedRouteAdmin,
  ProtectedRouteDoctor,
} from './ProtectedRoute';
import PageNews from '../pages/News/PageNews';
import NewsDetails from '../pages/News/NewsDetails';
import QuanLyLichKham from '../pages/Dashboard/views/QuanLyLichKham';
import ChooseService from '../pages/BookService/ChooseService';
import QuanLyLichLamViec from '../pages/Dashboard/views/QuanLyLichLamViec';
import QuanLyBacSi from '../pages/Dashboard/views/QuanLyBacSi';
import ListDoctor from '../pages/List-doctor/ListDoctor';

let routes = (isLogin) => [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dich-vu',
        element: (
          <ProtectedRouteDoctor isLogin={isLogin}>
            <BooksService />
          </ProtectedRouteDoctor>
        ),
        children: [
          { index: true, element: <ChooseService /> },
          { path: 'chon-ngay-kham', element: <ChooseDayExamination /> },
        ],
      },
      {
        path: '/gioi-thieu',
        element: <Introduce />,
      },
      {
        path: '/thong-tin',
        element: <ListDoctor />,
      },
      {
        path: '/xac-nhan-thong-tin',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <ConfirmInformation />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ConfirmationList /> },
          { path: 'chon-ngay', element: <ChooseDayExamination /> },
        ],
      },
      {
        path: '/ho-so-ca-nhan',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <ProfileUser />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tin-tuc',
        element: <PageNews />,
      },
      {
        path: '/tin-tuc/:id',
        element: <NewsDetails />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },

  {
    path: 'admin',
    element: (
      <ProtectedRouteAdmin isLogin={isLogin}>
        <DashboardLayout />
      </ProtectedRouteAdmin>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'upgrade', element: <Upgrade /> },
      { path: 'manager-canlendar', element: <ManagerCalendar /> },
      { path: 'user', element: <User /> },
      {
        path: 'manager-posts',
        element: <ManagerPost />,
      },
      {
        path: 'manager-posts/:id',
        element: <EditPost />,
      },
      { path: 'manager-posts/new', element: <EditorPost /> },
      { path: 'quan-ly-lich-kham', element: <QuanLyLichKham /> },
      { path: 'manager-canlendar-user', element: <QuanLyLichLamViec /> },
      { path: 'manager-doctor', element: <QuanLyBacSi /> },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default routes;
