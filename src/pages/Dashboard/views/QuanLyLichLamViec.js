import React, { useEffect, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePickerHeader from 'react-multi-date-picker/plugins/date_picker_header';
import { lichLamViecUserApi } from '../../../api/lichLamViecUser';
import multiColors from 'react-multi-date-picker/plugins/colors';

import { userApi } from '../../../api/userApi';
import { Loading } from '../../../components/Loading';
import { ruleUser, toastify } from '../../../utils/common';
import { Chip } from '../../../components/Chip/Chip';
import moment from 'moment';

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

const CalendarUser = ({ lich }) => {
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
  return (
    <Calendar
      readOnly={true}
      {...props}
      locale={gregorian_en_lowercase}
      plugins={[
        multiColors({
          position: 'left',
          colors: ['blue', 'green', 'yellow'],
        }),
      ]}
    />
  );
};

const QuanLyLichLamViec = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (maND, trangThai) => {
    try {
      const res = await lichLamViecUserApi.acceptCalender(maND, trangThai);
      toastify('success', res.message);
      fetchData();
    } catch (error) {}
  };
  if (loading) return <Loading />;
  return (
    <div
      style={{
        padding: '0 15px',
      }}
    >
      <h3 className="text-center">
        Quản lý lịch làm việc của bác sĩ tháng{' '}
        {moment(new Date()).format('MM-YYYY')}
      </h3>
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
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {users.map((user) => (
          <div
            key={user.maND}
            style={{
              width: '50%',
            }}
          >
            <div className="d-flex align-items-center mb-4">
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
                  {user.hoTen}
                </strong>
              </p>
              {user.trangThai === 0 ? (
                <button
                  className="btn-button btn-button-primary"
                  style={{
                    padding: '10px 20px',
                  }}
                  onClick={() => handleAccept(user.maND, 1)}
                >
                  Duyệt
                </button>
              ) : (
                <div>
                  <Chip variant="red" status="Đã xét duyệt" />
                  <button
                    className="btn-button btn-button-primary mx-2"
                    style={{
                      padding: '5px 20px',
                    }}
                    onClick={() => handleAccept(user.maND, 0)}
                  >
                    Hủy xét duyệt
                  </button>
                </div>
              )}
            </div>
            <CalendarUser lich={user.lich} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuanLyLichLamViec;
