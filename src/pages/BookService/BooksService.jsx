import React from 'react';
import BarBook from './components/BarBook';
import LayoutBooks from '../../components/Layout/LayoutBooks';
import InforBar from '../../components/Layout/InforBar';

function BooksService(props) {
  return (
    <LayoutBooks
      InfoBar={
        <InforBar title="Thông tin khám">
          <BarBook />
        </InforBar>
      }
    />
  );
}

export default BooksService;
