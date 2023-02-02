import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { khoaApi } from '../../api/khoaApi';
import { addDepartment, resetData } from '../../app/slices/bookServiceSlice';
import HeadTitle from '../../components/HeadTitle/HeadTitle';
import { Loading } from '../../components/Loading';
import styles from './BooksService.module.css';

const ChooseService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await khoaApi.getKhoa();
      setData(data);

      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChooseService = (item) => {
    dispatch(addDepartment(item));
    navigate('chon-ngay-kham');
  };
  if (loading) return <Loading />;

  return (
    <div className={styles.wrapper}>
      <HeadTitle title="Vui lòng chọn chuyên khoa" />

      <div className={styles.wrapperContent}>
        <div>
          <Scrollbars style={{ width: '100%', height: 300 }}>
            <ul className={styles.list}>
              {data.map((item) => (
                <li onClick={() => handleChooseService(item)} key={item.maKhoa}>
                  {item.tenKhoa}
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default ChooseService;
