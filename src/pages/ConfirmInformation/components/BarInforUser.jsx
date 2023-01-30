import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlinePhone } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styles from '../../BookService/components/BookService.module.css';
import { useSelector } from 'react-redux';

function BarInforUser(props) {
  const user = useSelector((state) => state.auth.currentUser);
  return (
    <ul className={styles.listBar}>
      <li className={styles.item}>
        <BiUserCircle />
        <p>{user.hoTen}</p>
      </li>
      <li className={styles.item}>
        <AiOutlinePhone />
        <p>{user.SDT}</p>
      </li>
      <li className={styles.item}>
        <FaMapMarkerAlt />
        <p>23 Dinh Tien Hoang - Hai Chau - Da Nang</p>
      </li>
    </ul>
  );
}

export default BarInforUser;
