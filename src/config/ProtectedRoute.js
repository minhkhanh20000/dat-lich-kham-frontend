import { Navigate } from 'react-router';
import { ruleUser } from '../utils/common';

export const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export const ProtectedRouteDoctor = ({ isLogin, children }) => {
  if (!isLogin || isLogin.maQuyen === ruleUser.BACSI) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const ProtectedRouteAdmin = ({ isLogin, children }) => {
  if (
    !isLogin ||
    isLogin.maQuyen === 'user' ||
    isLogin.maQuyen === ruleUser.BACSI
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
