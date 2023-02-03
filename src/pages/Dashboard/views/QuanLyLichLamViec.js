import React, { useEffect, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePickerHeader from 'react-multi-date-picker/plugins/date_picker_header';
import { lichLamViecUserApi } from '../../../api/lichLamViecUser';
import multiColors from 'react-multi-date-picker/plugins/colors';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { userApi } from '../../../api/userApi';
import { Loading } from '../../../components/Loading';
import { ruleUser, toastify } from '../../../utils/common';
import { Chip } from '../../../components/Chip/Chip';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import TextareaControl from '../../../form-control/TextareaControl';
import { yupResolver } from '@hookform/resolvers/yup';
const schema = yup.object().shape({
  lydohuy: yup.string().required('Ghi chú không được bỏ'),
});
const gregorian_en_lowercase = {
  name: 'gregorian_en_lowercase',
  months: [
    ['Tháng 1', 'Tháng 1'],
    ['Tháng 2', 'Tháng 2'],
    ['Tháng 3', 'Tháng 3'],
    ['Tháng 4', 'Tháng 4'],
    ['Tháng 5', 'Tháng 5'],
    ['Tháng 6', 'Tháng 6'],
    ['Tháng 7', 'Tháng 7'],
    ['Tháng 8', 'Tháng 8'],
    ['Tháng 9', 'Tháng 9'],
    ['Tháng 10', 'Tháng 10'],
    ['Tháng 11', 'Tháng 11'],
    ['Tháng 12', 'Tháng 12'],
  ],
  weekDays: [
    ['saturday', 'T 7'],
    ['sunday', 'CN'],
    ['monday', 'T 2'],
    ['tuesday', 'T 3'],
    ['wednesday', 'T 4'],
    ['thursday', 'T 4'],
    ['friday', 'T 6'],
  ],
  digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  meridiems: [
    ['AM', 'am'],
    ['PM', 'pm'],
  ],
};

const initialProps = {
  value: [],
  multiple: true,
};

const toDateObject = (day) => new DateObject(day);

const ModalCalender = ({ data, isShow, onClose, onSubmit }) => {
  const { lich, trangThai, maND, thang, lydohuy } = data;
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      lydohuy,
    },
    resolver: yupResolver(schema),
  });

  const [props, setProps] = useState(initialProps);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (lich) {
      const colors = JSON.parse(lich);
      const newColor = {
        blue: colors.blue?.map(toDateObject) || [],
        yellow: colors.yellow?.map(toDateObject) || [],
        green: colors.green?.map(toDateObject) || [],
      };

      Object.keys(newColor).forEach((color) => {
        newColor[color].forEach((date, index) => {
          newColor[color][index].color = color;
        });
      });
      setProps({
        multiple: true,
        value: [...newColor?.blue, ...newColor?.yellow, ...newColor?.green],
      });
    }
  }, []);

  const handleOnSubmit = (values) => {
    if (values.lydohuy === undefined) {
      onSubmit(maND, 2, thang, 'null');
      onClose();
    } else {
      onSubmit(maND, 2, thang, values.lydohuy);
      onClose();
    }
  };

  if (props.value.length <= 0) return <Loading />;
  return (
    <Modal show={isShow} onHide={() => onClose()}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          style={{
            padding: '20px',
          }}
        >
          {trangThai === 2 && (
            <p
              className="text-center"
              style={{
                color: 'red',
              }}
            >
              Lịch làm việc bị hủy: {lydohuy}
            </p>
          )}
          <div
            className="d-flex align-items-center gap-3"
            style={{
              padding: '20px 0',
            }}
          >
            <p>Chú ý thời gian </p>
            <ul className="d-flex align-align-items-center gap-4">
              <li
                className="d-flex align-align-items-center"
                style={{
                  fontSize: 15,
                }}
              >
                <p>Cả ngày:</p>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '100%',
                    backgroundColor: '#0074d9',
                  }}
                ></div>
              </li>
              <li
                className="d-flex align-align-items-center"
                style={{
                  fontSize: 15,
                }}
              >
                <p>Buổi sáng:</p>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '100%',
                    backgroundColor: '#009688',
                  }}
                ></div>
              </li>
              <li
                className="d-flex align-align-items-center"
                style={{
                  fontSize: 15,
                }}
              >
                <p>Buổi chiều:</p>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '100%',
                    backgroundColor: '#fad817',
                  }}
                ></div>
              </li>
            </ul>
          </div>

          <Calendar
            readOnly={true}
            {...props}
            disableMonthPicker={true}
            disabled={true}
            locale={gregorian_en_lowercase}
            plugins={[
              multiColors({
                position: 'left',
                colors: ['blue', 'green', 'yellow'],
              }),
            ]}
          />
          {(trangThai === 0 || trangThai === 1) && (
            <div className="pt-4">
              <TextareaControl
                placeholder="Ghi chú"
                name="lydohuy"
                control={control}
                type="text"
                rows={2}
              />
            </div>
          )}
          <Modal.Footer
            style={{
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            <Button
              variant="secondary"
              onClick={() => onClose()}
              className="mx-2"
              style={{
                fontSize: '1.5rem',
              }}
            >
              Đóng
            </Button>
            {trangThai === 0 ? (
              <div>
                <button
                  className="btn-button btn-button-primary mx-3"
                  onClick={handleSubmit((value) => {
                    onSubmit(
                      maND,
                      1,
                      thang,
                      value.lydohuy === undefined ? 'null' : value.lydohuy
                    );
                    onClose();
                  })}
                >
                  Xác nhận
                </button>
                <button
                  type="submit"
                  className="btn-button btn-button-primary mx-3"
                  style={{
                    background: 'red',
                  }}
                >
                  Không xác nhận
                </button>
              </div>
            ) : trangThai === 1 ? (
              <button
                className="btn-button btn-button-primary mx-3"
                onClick={handleSubmit((value) => {
                  onSubmit(
                    maND,
                    2,
                    thang,
                    value.lydohuy === undefined ? 'null' : value.lydohuy
                  );
                  onClose();
                })}
                style={{
                  background: 'red',
                }}
              >
                Hủy xét duyệt
              </button>
            ) : (
              ''
            )}
          </Modal.Footer>
        </div>
      </form>
    </Modal>
  );
};

const QuanLyLichLamViec = () => {
  const [users, setUsers] = useState([]);
  const [usersDoctor, setUserDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lichMonth, setLichMonth] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [props, setProps] = useState(initialProps);

  const fetchData = async () => {
    try {
      const res = await lichLamViecUserApi.getAllLichLamViecUser();
      if (res[0]?.lich) {
        const colors = JSON.parse(res[0].lich);
        const newColor = {
          blue: colors.blue?.map(toDateObject) || [],
          yellow: colors.yellow?.map(toDateObject) || [],
          green: colors.green?.map(toDateObject) || [],
        };

        Object.keys(newColor).forEach((color) => {
          newColor[color].forEach((date, index) => {
            newColor[color][index].color = color;
          });
        });
        setProps({
          multiple: true,
          value: [...newColor?.blue, ...newColor?.yellow, ...newColor?.green],
        });
      }
      setUsers(res);
      setLoading(false);
    } catch (error) {}
  };

  const fetchDataDoctor = async () => {
    try {
      const res = await userApi.getAllUser({
        role: ruleUser.BACSI,
      });
      setUserDoctor(res.users);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    fetchDataDoctor();
  }, []);

  const handleAccept = async (maND, trangThai, thang, lydohuy) => {
    try {
      const res = await lichLamViecUserApi.acceptCalender(
        maND,
        trangThai,
        thang,
        lydohuy
      );
      toastify('success', res.message);
      fetchData();
    } catch (error) {}
  };

  const handleClickMonth = async (thang, maND) => {
    try {
      try {
        const res = await lichLamViecUserApi.getLichLamViecByMonth({
          thang,
          maND,
        });
        setLichMonth(res[0]);
        setIsModal(true);
      } catch (error) {}
    } catch (error) {}
  };

  const checkIsDoctor = (maND) => {
    return users.filter((item) => item.maND === maND);
  };

  const results = React.useMemo(() => {
    return users.reduce(function (r, a) {
      r[a.maND] = r[a.maND] || [];
      r[a.maND].push(a);
      return r;
    }, Object.create(null));
  });
  if (loading) return <Loading />;
  return (
    <div
      style={{
        padding: '0 15px',
      }}
    >
      <h3 className="text-center">Quản lý lịch làm việc của bác sĩ</h3>
      <div className="d-flex align-align-items-center my-4 gap-3">
        <div className="d-flex align-items-center gap-3">
          <p
            style={{
              fontWeight: '600',
            }}
          >
            Chú ý thời gian làm việc:
          </p>
          <ul className="d-flex align-align-items-center my-4 gap-4">
            <li
              className="d-flex align-align-items-center"
              style={{
                fontSize: 15,
              }}
            >
              <p>Đã xét duyệt</p>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '100%',
                  backgroundColor: '#009688',
                }}
              ></div>
            </li>
            <li
              className="d-flex align-align-items-center"
              style={{
                fontSize: 15,
              }}
            >
              <p>Chưa xét duyệt:</p>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '100%',
                  backgroundColor: 'red',
                }}
              ></div>
            </li>
            <li
              className="d-flex align-align-items-center"
              style={{
                fontSize: 15,
              }}
            >
              <p>Bị hủy:</p>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '100%',
                  backgroundColor: '#c1c1c1',
                }}
              ></div>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(results).map((user) => (
          <div
            key={user.maND}
            style={{
              width: '33%',
            }}
          >
            <div className="align-items-center mb-4">
              <p
                style={{
                  marginRight: '20px',
                }}
              >
                Bác sĩ:{' '}
                <strong
                  style={{
                    fontWeight: '700',
                  }}
                >
                  {JSON.stringify(user[1][0].hoTen)}
                </strong>
              </p>
              <p
                style={{
                  marginRight: '20px',
                }}
              >
                Khoa{' '}
                <strong
                  style={{
                    fontWeight: '700',
                  }}
                >
                  {JSON.stringify(user[1][0].tenKhoa)}
                </strong>
              </p>
              <div
                className="d-flex gap-3 flex-wrap"
                style={{
                  width: '70%',
                  marginTop: '10px',
                }}
              >
                {user[1].map((item, index) => (
                  <>
                    <div
                      onClick={() => handleClickMonth(item.thang, item.maND)}
                      style={{
                        width: '23%',
                        background:
                          item?.thang && item?.trangThai === 1
                            ? '#009688'
                            : item?.thang && item?.trangThai === 0
                            ? 'red'
                            : '#c1c1c1',
                        padding: '10px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <p
                        className="text-center"
                        style={{
                          color: item?.thang ? '#fff' : '#000',
                          fontWeight: '500',
                        }}
                      >
                        Tháng {item.thang}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModal && (
        <ModalCalender
          isShow={isModal}
          data={lichMonth}
          onClose={() => setIsModal(false)}
          onSubmit={handleAccept}
        />
      )}
    </div>
  );
};

export default QuanLyLichLamViec;
