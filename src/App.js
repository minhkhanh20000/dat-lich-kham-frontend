import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router';
import './App.css';
import './assets/css/reset.module.css';
import './assets/css/_variable.css';
import routes from './config/routes';

function App() {
  const isLogin = useSelector((state) => state.auth.currentUser);

  return useRoutes(routes(isLogin));
}

export default App;
