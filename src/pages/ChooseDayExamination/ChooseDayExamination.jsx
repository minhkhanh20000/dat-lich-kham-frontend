import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import HeadTitle from '../../components/HeadTitle/HeadTitle';
import ChooseTime from './components/ChooseTime';
import { lichLamViecApi } from '../../api/lichLamViecApi';
import { useNavigate, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addService } from '../../app/slices/bookServiceSlice';
import { datLichApi } from '../../api/datLich';
import moment from 'moment';
import { formatDate } from '../../utils/common';

export default function ChooseDayExamination() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const { department } = useSelector((state) => state.service);
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState('');
  const [dateData, setDateData] = useState(new Date());
  const [isViewTime, setIsViewTime] = useState(false);
  const [listTimeDefault, setListTimeDefault] = useState([]);
  const [dataDatLich, setDataDatLich] = useState([]);
  const navigate = useNavigate();

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }
  const tileDisabled = ({ activeStartDate, date, view }) => {
    return date < getPreviousDay(new Date());
  };

  const handleOnClickDay = (value) => {
    setIsViewTime(true);
    setDateData(value);
  };

  const handleOnClickTime = (time) => {
    setTime(time);
  };

  const handleOnSubmit = () => {
    dispatch(
      addService({
        time,
        date: formatDate(dateData),
        id: uuidv4(),
        maND: user.maND,
      })
    );
    // call api save redux
    navigate('/xac-nhan-thong-tin');
  };

  const fetchData = async () => {
    try {
      const res = await lichLamViecApi.getThoiGianLamViec();
      setListTimeDefault(res.data);
    } catch (error) {}
  };

  const fetchGetDatLich = async () => {
    try {
      const res = await datLichApi.getDatLich({
        ngayDatLich: moment(dateData).format('YYYY-MM-DD'),
        maKhoa: department.maKhoa,
      });
      setDataDatLich(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
    fetchGetDatLich();
  }, [dateData]);

  if (!department) return <Navigate to="/dich-vu" />;

  return (
    <div>
      <HeadTitle title="Vui lòng chọn ngày khám" />
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          tileDisabled={tileDisabled}
          // tileDisabled={({ date }) => !date.getDay('Sunday')}
          onClickDay={handleOnClickDay}
          locale="vi"
        />
      </div>
      {isViewTime && (
        <ChooseTime
          time={time}
          onClickTime={handleOnClickTime}
          date={value}
          listTimeDefault={listTimeDefault}
          onSubmit={handleOnSubmit}
          dataDatLich={dataDatLich}
        />
      )}
    </div>
  );
}
