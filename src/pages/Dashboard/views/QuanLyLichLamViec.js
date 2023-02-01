import React, { useEffect, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePickerHeader from 'react-multi-date-picker/plugins/date_picker_header';
import { lichLamViecUserApi } from '../../../api/lichLamViecUser';
import multiColors from 'react-multi-date-picker/plugins/colors';
import Button from 'react-bootstrap/Button';

import { userApi } from '../../../api/userApi';
import { Loading } from '../../../components/Loading';
import { ruleUser, toastify } from '../../../utils/common';
import { Chip } from '../../../components/Chip/Chip';
import moment from 'moment';
import { Modal } from 'react-bootstrap';

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
  const { lich, trangThai, maND, thang } = data;
  console.log(moment().startOf('month').month(0)._d);
  const [props, setProps] = useState(initialProps);

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

  if (props.value.length <= 0) return <Loading />;
  return (
    <Modal show={isShow} onHide={() => onClose()}>
      <div
        style={{
          padding: '20px',
        }}
      >
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
            <button
              className="btn-button btn-button-primary mx-3"
              onClick={() => {
                onSubmit(maND, 1, thang);
                onClose();
              }}
            >
              Xác nhận
            </button>
          ) : (
            <button
              className="btn-button btn-button-primary mx-3"
              onClick={() => {
                onSubmit(maND, 0, thang);
                onClose();
              }}
              style={{
                background: 'red',
              }}
            >
              Hủy xét duyệt
            </button>
          )}
        </Modal.Footer>
      </div>
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
      console.log(res[0]);
      if (res[0]?.lich) {
        const colors = JSON.parse(res[0].lich);
        console.log(colors);
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

  const handleAccept = async (maND, trangThai, thang) => {
    console.log(maND, trangThai);
    try {
      const res = await lichLamViecUserApi.acceptCalender(
        maND,
        trangThai,
        thang
      );
      toastify('success', res.message);
      fetchData();
    } catch (error) {}
  };

  const handleClickMonth = async (thang, maND) => {
    console.log(thang, maND);
    try {
      try {
        const res = await lichLamViecUserApi.getLichLamViecByMonth({
          thang,
          maND,
        });
        console.log(res);
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
  console.log(results);
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
              <p>Chưa xét duyệt:</p>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '100%',
                  backgroundColor: '#009688',
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
                            ? 'red'
                            : item?.thang && item?.trangThai === 0
                            ? '#009688'
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
