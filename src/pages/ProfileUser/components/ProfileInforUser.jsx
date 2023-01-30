import { yupResolver } from '@hookform/resolvers/yup';
import { parse } from 'date-fns';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { updateProfileUser } from '../../../app/slices/authSlice';
import InputControl from '../../../form-control/InputControl';
import SelectControl from '../../../form-control/SelectControl';
import { phoneRegExp, toastify } from '../../../utils/common';

export function ProfileInforUser() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    hoTen: '',
    SDT: '',
    email: '',
    gioiTinh: '',
    ngheNghiep: '',
    ngaySinh: '',
  };
  const schema = yup.object().shape({
    hoTen: yup.string().required('Họ tên không được bỏ trống'),
    SDT: yup
      .string()
      .required('SDT không được bỏ trống.')
      .matches(phoneRegExp, 'SDT không đúng định dạng')
      .max(10, 'Số điện thoại không hợp lệ'),
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Email không được bỏ trống.'),
    gioiTinh: yup.string().required('Giới tính không được bỏ trông'),
    ngheNghiep: yup.string().required('Nghề nghiệp không được bỏ trống'),
    ngaySinh: yup
      .date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, 'dd.MM.yyyy', new Date());
        return result;
      })
      .typeError('Vui lòng chọn ngày sinh')
      .required()
      .min('1969-11-13', 'Date is too early'),
  });
  const { handleSubmit, reset, control } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(currentUser);
  }, [currentUser, reset]);

  const handleOnSubmit = (data) => {
    dispatch(
      updateProfileUser({
        maND: currentUser.maND,
        formData: {
          ...data,
          ngaySinh: moment(data.ngaySinh).format('YYYY-MM-DD'),
        },
      })
    )
      .unwrap()
      .then((res) => {
        toastify('success', res.message);
      });
  };

  return (
    <div>
      <h5 className="text-center mb-5 fw-bold">NHẬP THÔNG TIN CHUNG</h5>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Container>
          <Row>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="hoTen"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Họ và tên<span className="text-danger">*</span>
              </label>
              <InputControl
                name="hoTen"
                control={control}
                type="text"
                placeholder="Nhập họ tên"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="ngaySinh"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Ngày tháng năm sinh<span className="text-danger">*</span>
              </label>
              <InputControl
                name="ngaySinh"
                control={control}
                placeholder="Chọn ngày sinh"
                type="date"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Số điện thoại<span className="text-danger">*</span>
              </label>
              <InputControl
                name="SDT"
                control={control}
                type="text"
                placeholder="Nhập số điện thoại"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="SDT"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Giới tính<span className="text-danger">*</span>
              </label>
              <SelectControl
                name="gioiTinh"
                control={control}
                values={[
                  {
                    value: 'Nam',
                    label: 'Nam',
                  },
                  {
                    value: 'Nữ',
                    label: 'Nữ',
                  },
                ]}
                placeholder="Chọn giới tính"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="ngheNghiep"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Nghề nghiệp<span className="text-danger">*</span>
              </label>
              <InputControl
                name="ngheNghiep"
                control={control}
                placeholder="Nhập nghề nghiệp"
                type="text"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="email"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Địa chỉ email<span className="text-danger">*</span>
              </label>
              <InputControl
                name="email"
                control={control}
                placeholder="Nhập địa chỉ email"
                type="text"
              />
            </Col>
          </Row>
        </Container>
        <button className="btn-button btn-button-primary mx-3" type="submit">
          Lưu
        </button>
        <button
          className="btn-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Hủy
        </button>
      </form>
    </div>
  );
}
