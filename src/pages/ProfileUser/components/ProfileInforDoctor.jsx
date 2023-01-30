import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { khoaApi } from '../../../api/khoaApi';
import { userApi } from '../../../api/userApi';
import { Loading } from '../../../components/Loading';
import InputControl from '../../../form-control/InputControl';
import SelectControl from '../../../form-control/SelectControl';
import { toastify } from '../../../utils/common';
import styles from '../ProfileUser.module.css';

export function ProfileInforDoctor() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.currentUser);
  const [file, setFile] = useState('');
  const [privewImage, setPrivewImage] = useState(
    'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
  );
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [khoa, setKhoa] = useState([]);
  const initialValues = {};
  const schema = yup.object().shape({
    chuyenNganh: yup.string().required('Chuyên ngành không được bỏ trống'),
    truongTotNghiep: yup
      .string()
      .required('Trường tốt nghiệp không được bỏ trống'),
    kinhNghiem: yup.string().required('Kinh nghiệm không được bỏ trống'),
    maKhoa: yup.string().required('Khoa không được bỏ trống'),
    lyLichCongTac: yup
      .string()
      .required('Lý lịch công tác không được bỏ trống'),
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    const res = await userApi.getProfileDoctor(user.maND);
    if (res.data[0]) {
      setIsEdit(true);
      reset(res.data[0]);
      setPrivewImage(res.data[0].avatar);
    }
  };

  const fetchOptions = async () => {
    try {
      const data = await khoaApi.getKhoa();
      setKhoa(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    fetchOptions();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleOnSubmit = async (values) => {
    const { chuyenNganh, truongTotNghiep, kinhNghiem, maKhoa, lyLichCongTac } =
      values;
    const formData = new FormData();
    formData.append('chuyenNganh', chuyenNganh);
    formData.append('truongTotNghiep', truongTotNghiep);
    formData.append('kinhNghiem', kinhNghiem);
    formData.append('maKhoa', maKhoa);
    formData.append('lyLichCongTac', lyLichCongTac);
    if (file) {
      formData.append('avatar', file, file.name);
    }
    if (isEdit) {
      const res = await userApi.editProfileDoctor(user.maND, formData);
      toastify('success', res.message);
    } else {
      const res = await userApi.addProfileDoctor(user.maND, formData);
      toastify('success', res.message);
    }
  };

  const memoOption = useMemo(() => {
    return khoa?.map((item) => {
      return {
        value: item.maKhoa,
        label: item.tenKhoa,
      };
    });
  }, [khoa]);
  const handleOnChangeFile = (e) => {
    setFile(e.target.files[0]);
    setPrivewImage(URL.createObjectURL(e.target.files[0]));
  };

  if (loading) return <Loading />;

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <h5 className="text-center mb-5 fw-bold">Cập nhật thông tin bác sĩ</h5>

      <div className="d-flex justify-content-center mb-3 align-items-center gap-5">
        <img
          src={privewImage}
          alt=""
          width="200"
          height="200"
          style={{
            borderRadius: '50%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          }}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleOnChangeFile}
          style={{
            fontSize: '16px',
          }}
        />
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Container>
          <Row>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="chuyenNganh"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Chuyên ngành<span className="text-danger">*</span>
              </label>
              <InputControl
                name="chuyenNganh"
                control={control}
                type="text"
                placeholder="Ví dụ Chuyên ngành Răng hàm mặt"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="truongTotNghiep"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Trường tốt nghiệp<span className="text-danger">*</span>
              </label>
              <InputControl
                name="truongTotNghiep"
                control={control}
                type="text"
                placeholder="Trường tốt nghiệp"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="kinhNghiem"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Số năm kinh nghiệm<span className="text-danger">*</span>
              </label>
              <InputControl
                name="kinhNghiem"
                control={control}
                type="number"
                placeholder="Số năm kinh nghiệm "
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <label
                htmlFor="maKhoa"
                className="form-label fw-bold"
                style={{ fontSize: '1.6rem' }}
              >
                Chọn khoa <span className="text-danger">*</span>
              </label>
              <SelectControl
                name="maKhoa"
                control={control}
                values={memoOption}
                placeholder="Chọn khoa"
              />
            </Col>
            <Col xs={6} className="mb-5 mx-0">
              <div className="d-flex flex-column">
                <label
                  htmlFor="lyLichCongTac"
                  className="form-label fw-bold"
                  style={{ fontSize: '1.6rem' }}
                >
                  Lý lịch công tác<span className="text-danger">*</span>
                </label>
                <textarea
                  rows="3"
                  cols="38"
                  type="text"
                  style={{ fontSize: '1.6rem' }}
                  className={`${`p-4 h4 m-0`} ${
                    errors.lyLichCongTac && styles.inputError
                  }`}
                  id="lyLichCongTac"
                  {...register('lyLichCongTac')}
                  placeholder="Nhập lý lịch công tác"
                />
                {errors.lyLichCongTac && (
                  <Form.Text
                    className="text-danger"
                    style={{
                      fontSize: '1.6rem',
                      paddingTop: '0.5rem',
                      display: 'block',
                    }}
                  >
                    {errors.lyLichCongTac.message}
                  </Form.Text>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        {isEdit ? (
          <button
            className="btn-button btn-button-primary mx-3"
            type="submit"
            disabled={isSubmitting}
          >
            Chỉnh sửa
          </button>
        ) : (
          <>
            <button
              className="btn-button btn-button-primary mx-3"
              type="submit"
              disabled={isSubmitting}
            >
              Lưu
            </button>
          </>
        )}
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
