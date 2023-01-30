import React from 'react';
import { CiHospital1 } from 'react-icons/ci';
import { GiHospitalCross } from 'react-icons/gi';
import HeadTitle from '../HeadTitle/HeadTitle';
import styles from './Layout.module.css';

function InforBar({ title, children }) {
  return (
    <div className={styles.barBook}>
      <HeadTitle title={title} />
      <div>{children}</div>
    </div>
  );
}

export default InforBar;
