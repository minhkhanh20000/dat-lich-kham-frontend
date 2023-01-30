import React, { useEffect } from 'react';
import InforBar from '../../components/Layout/InforBar';
import LayoutBooks from '../../components/Layout/LayoutBooks';
import BarInforUser from './components/BarInforUser';
import { useNavigate, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

function ConfirmInformation(props) {
  const navigate = useNavigate();
  const { services } = useSelector((state) => state.service);
  useEffect(() => {
    if (JSON.stringify(services) === '{}') {
      navigate('/dich-vu');
    }
  }, [services]);
  return (
    <>
      {JSON.stringify(services) === '{}' ? (
        <Navigate to="/dich-vu" />
      ) : (
        <LayoutBooks
          InfoBar={
            <InforBar title="Thông tin bệnh nhân">
              <BarInforUser />
            </InforBar>
          }
        />
      )}
    </>
  );
}

ConfirmInformation.propTypes = {};

export default ConfirmInformation;
