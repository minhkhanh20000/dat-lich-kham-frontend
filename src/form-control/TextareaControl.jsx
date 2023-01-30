import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import styles from './InputControl.module.css';
import moment from 'moment';

function TextareaControl({ name, control, placeholder, type }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { invalid, error },
      }) => (
        <>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ width: '100%', fontSize: '1.6rem', color: '#565656' }}
            type={type}
            className={`${styles.form} ${`p-4 h4 m-0`} ${
              invalid && styles.inputError
            }`}
            placeholder={placeholder}
            value={type === 'date' ? moment(value).format('YYYY-MM-DD') : value}
            onChange={onChange}
          />
          <Form.Text
            className="text-danger"
            style={{
              fontSize: '1.6rem',
              paddingTop: '0.5rem',
              display: 'block',
            }}
          >
            {error?.message}
          </Form.Text>
        </>
      )}
    />
  );
}

TextareaControl.propTypes = {};

export default TextareaControl;
