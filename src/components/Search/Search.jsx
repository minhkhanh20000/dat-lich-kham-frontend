import React from 'react';
import { GoSearch } from 'react-icons/go';
import styles from './Search.module.css';

function SearchInput({ width, onChange }) {
  return (
    <div className={styles.boxSearch} style={{ width: width }}>
      <input
        placeholder="Nhập từ khóa tìm kiếm..."
        className={styles.search}
        onChange={(e) => onChange(e.target.value)}
      />
      <GoSearch />
    </div>
  );
}

export default SearchInput;
