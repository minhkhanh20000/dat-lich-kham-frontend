import React from 'react';
import { CiHospital1 } from 'react-icons/ci';
import { GiHospitalCross, GiStethoscope } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import styles from './BookService.module.css';

function BarBook(props) {
  const { department } = useSelector((state) => state.service);
  return (
    <ul className={styles.listBar}>
      <li className={styles.item}>
        <CiHospital1 />
        <p>Phòng khám Đà Nẵng</p>
      </li>
      <li className={styles.item}>
        <GiHospitalCross />
        <p>Dịch vụ: Khám Thường</p>
      </li>
      {department && (
        <>
          <li className={styles.item}>
            <GiStethoscope />
            <p>Khoa: {department.tenKhoa}</p>
          </li>
        </>
      )}
    </ul>
  );
}

export default BarBook;
