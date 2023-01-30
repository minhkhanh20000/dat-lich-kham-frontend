import { addDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import React, { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useForm } from 'react-hook-form';
import { datLichApi } from '../../../api/datLich';
import { lichLamViecApi } from '../../../api/lichLamViecApi';
import { Chip } from '../../../components/Chip/Chip';
import { Loading } from '../../../components/Loading';
import SelectControl from '../../../form-control/SelectControl';
import { formatDate, toastify } from '../../../utils/common';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  maThoiGian: yup.string(),
  tinhTrangDangKy: yup.string(),
});
function ManagerCalendar() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: 'selection',
    },
  ]);
  const [dateData, setDateData] = useState(new Date());
  const [params, setParams] = useState({
    maThoiGian: '',
    tinhTrangDangKy: '',
  });
  const [loading, setLoading] = useState(true);
  const [listRegister, setListRegister] = useState([]);
  const [lich, setLich] = useState([]);
  const [isLoadingCard, setIsLoadingCard] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      maThoiGian: '',
      tinhTrangDangKy: '',
    },
    resolver: yupResolver(schema),
  });

  const fetchData = async (date) => {
    try {
      const res = await datLichApi.getAllDatLich({
        ngayBatDau: formatDate(state[0].startDate),
        ngayKetThuc: formatDate(state[0].endDate),
        ...params,
      });
      setListRegister(res);
      setLoading(false);
    } catch (error) {}
  };

  const fetchGetTime = async () => {
    try {
      const res = await lichLamViecApi.getThoiGianLamViec();
      setLich(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(state);
  }, [state, params]);

  useEffect(() => {
    fetchGetTime();
  }, []);

  const handleOnConfirm = (maND, maThoiGian, thoiGianDky) => {
    try {
      const res = datLichApi.comfirmDangKy(
        { maND, maThoiGian, thoiGianDky: formatDate(thoiGianDky) },
        { tinhTrangDangKy: 'Success' }
      );
      setIsLoadingCard(true);

      setTimeout(() => {
        fetchData(dateData);
      }, 500);
      toastify('success', res.message);
    } catch (error) {}
  };

  const optionTime = useMemo(() => {
    return lich.map((item) => {
      return {
        value: item.maTG,
        label: `${item.thoiGianBatDau} - ${item.thoiGianKetThuc}`,
      };
    });
  }, [lich]);

  const handleOnSubmit = (data) => {
    setParams(data);
  };

  if (loading) return <Loading />;
  return (
    <>
      <Container style={{ marginTop: '75px' }}>
        <Row>
          <Col xs={12}>
            <div className="d-flex align-items-center gap-2">
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="my-2 mb-5">
                  <div className="d-flex align-items-center gap-5">
                    <div>
                      <h5 style={{ margin: 0 }}> Lọc </h5>
                    </div>
                    <div>
                      <SelectControl
                        name="maThoiGian"
                        placeholder="Chọn thời gian"
                        values={optionTime}
                        control={control}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <SelectControl
                        name="tinhTrangDangKy"
                        placeholder="Chọn trạng thái"
                        values={[
                          {
                            value: 'Success',
                            label: 'Đã xác nhận',
                          },
                          {
                            value: 'Pending',
                            label: 'Đang chờ',
                          },
                        ]}
                        control={control}
                        errors={errors}
                      />
                    </div>
                    <div
                      style={{ marginTop: '-1rem', width: '300px' }}
                      className="d-flex gap-2"
                    >
                      <button
                        className="btn-button btn-button-primary p-3"
                        style={{ width: '100%' }}
                        type="submit"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div style={{ width: '300px' }}>
                <button
                  className="btn-button p-3 mb-5"
                  style={{ width: '100%', margin: 'auto' }}
                  onClick={() => {
                    reset({
                      maThoiGian: '',
                      tinhTrangDangKy: '',
                    });
                    setParams({
                      maThoiGian: '',
                      tinhTrangDangKy: '',
                    });
                  }}
                >
                  Xóa lọc
                </button>
              </div>
            </div>
            <div className="mb-4">
              <DateRange
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction="horizontal"
                locale={vi}
                editableDateInputs={true}
              />
            </div>

            <Row>
              <h2 className="text-center">Danh sách đăng ký lịch khám</h2>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>SDT</th>
                    <th>Ngày khám</th>
                    <th>Thời gian khám</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listRegister.data?.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.hoTen}</td>
                      <td>{item.SDT}</td>
                      <td>{formatDate(item.thoiGianDky)}</td>
                      <td>{item.thoiGianBatDau}</td>
                      <td>
                        {item.tinhTrangDangKy === 'Success' ? (
                          <Chip status={'Đã xác nhận'} variant={'#03a9f4'} />
                        ) : item.tinhTrangDangKy === 'Pending' ? (
                          <Chip status={'Đang chờ'} variant={'#ffc107'} />
                        ) : (
                          <>
                            <Chip status={'Đã khám'} variant={'#03a9f4'} />
                          </>
                        )}
                      </td>

                      <td>
                        <div className="d-flex justify-content-between mt-4">
                          {item.tinhTrangDangKy === 'Pending' && (
                            <button
                              className="btn-button btn-button-primary p-p-5 mx-1"
                              onClick={() =>
                                handleOnConfirm(
                                  item.maND,
                                  item.maThoiGian,
                                  item.thoiGianDky
                                )
                              }
                            >
                              Xác nhận
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {listRegister.total <= 0 && (
                <h4 className="text-warning">Chưa có người đăng ký</h4>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ManagerCalendar;
