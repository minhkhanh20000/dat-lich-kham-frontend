import styles from './Input.module.css';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export function TextField({ errors, placeholder, name, label }) {
  console.log(errors);
  const { register } = useForm({});
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label h6 fw-bold">
        {label}
      </label>
      <input
        type="number"
        className={`${styles.form} ${`form-control p-4 h4 m-0`} ${
          errors.name && styles.inputError
        }`}
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors.name && (
        <Form.Text className="text-danger" style={{ fontSize: '1.6rem' }}>
          {errors.name.message}
        </Form.Text>
      )}
    </div>
  );
}
