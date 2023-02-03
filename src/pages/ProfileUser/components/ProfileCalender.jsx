// import { addDays } from 'date-fns';
// import { vi } from 'date-fns/locale';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components/Loading';

// import { useEffect, useRef, useState } from 'react';
// import DatePicker from 'react-multi-date-picker';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { lichLamViecUserApi } from '../../../api/lichLamViecUser';
import { toastify } from '../../../utils/common';

// export const ProfileCalender = () => {
//   const currentUser = useSelector((state) => state.auth.currentUser);
//   const [value, setValue] = useState(new Date());
//   const [month, setMonth] = useState(() => moment(new Date()).format('MM'));
//   const [dataDate, setDataDate] = useState();
//   const [active, setActive] = useState(0);
//   const [limitDate, setLimitDate] = useState({
//     startOf: moment().startOf('week').toDate(),
//     endOf: moment().endOf('week').toDate(),
//   });
//   const [resDetail, setResDetail] = useState('');
//   const [params, setParams] = useState({
//     maND: currentUser.maND,
//     thang: month,
//     nam: 2023,
//   });
//   function getPreviousDay(date = new Date()) {
//     const previous = new Date(date.getTime());
//     previous.setDate(date.getDate() - 1);
//     return previous;
//   }
//   const onMapsDay = ({ date, today }) => {
//     return {
//       disabled: value.includes(date),
//     };
//   };

//   const datePickerRef = useRef();
//   useEffect(() => {
//     datePickerRef.current.openCalendar();
//   }, []);

//   const fetchData = async (params) => {
//     const res = await lichLamViecUserApi.getLichLamViecUser(params);
//     if (res) {
//       setValue(JSON.parse(res.lich));
//     } else {
//       setValue(null);
//     }
//     setResDetail(res);
//   };
//   useEffect(() => {
//     fetchData(params);
//   }, [params]);

//   const handleOnChangeDateWeek = () => {
//     setActive(0);

//     datePickerRef.current.openCalendar();
//     setLimitDate({
//       startOf: moment().startOf('week').toDate(),
//       endOf: moment().endOf('week').toDate(),
//     });
//   };
//   const handleOnChangeDateMonth = () => {
//     setActive(1);
//     datePickerRef.current.openCalendar();
//     setLimitDate({
//       startOf: moment().startOf('week').toDate(),
//       endOf: null,
//     });
//   };

//   const handleOnEdit = async () => {
//     try {
//       const res = await lichLamViecUserApi.editLichLamViecUser({
//         maND: currentUser.maND,
//         lich: JSON.stringify(value),
//         thang: month,
//         nam: 2023,
//       });
//       toastify('success', res.message);
//       datePickerRef.current.openCalendar();
//     } catch (error) {}
//   };
//   return (
//     <div style={{ minHeight: '500px' }}>
//       <h5 className="text-center mb-5 fw-bold">
//         Đăng ký lịch làm việc làm việc tháng {month}/
//         {moment(new Date()).format('YYYY')}
//       </h5>

//       <div className="mb-4">
//         <button
//           className={`btn-button ${active === 0 && 'btn-button-primary'} mx-2`}
//           onClick={handleOnChangeDateWeek}
//         >
//           Tuần
//         </button>
//         <button
//           className={`btn-button ${active === 1 && 'btn-button-primary'} mx-2`}
//           onClick={handleOnChangeDateMonth}
//         >
//           Tháng
//         </button>
//       </div>

//       <div
//         style={{
//           paddingBottom: '42rem',
//           display: 'flex',
//           width: '100%',
//           justifyContent: 'space-between',
//         }}
//       >
//         <DatePicker
//           minDate={limitDate.startOf}
//           maxDate={limitDate.endOf}
//           weekStartDayIndex={0}
//           displayWeekNumbers
//           weekNumber="Tuần"
//           placeholder="Chọn lịch"
//           ref={datePickerRef}
//           style={{
//             width: '70rem',
//           }}
//           value={value}
//           fixMainPosition={true}
//           fixRelativePosition={true}
//           onOpenPickNewDate={false}
//           onChange={setValue}
//           onMonthChange={(value) => {
//             setParams({
//               ...params,
//               thang: value.month.number,
//             });
//             setMonth(value.month.number);
//           }}
//           multiple={true}
//           plugins={[<DatePanel />]}
//           locale={gregorian_en_lowercase}
//         />
//         {!!resDetail?.lich ? (
//           <button
//             className="btn-button btn-button-primary"
//             onClick={handleOnEdit}
//           >
//             Chỉnh sửa
//           </button>
//         ) : value ? (
//           <button
//             className="btn-button btn-button-primary"
//             onClick={handleOnSubmit}
//           >
//             Thêm
//           </button>
//         ) : (
//           ''
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePickerHeader from 'react-multi-date-picker/plugins/date_picker_header';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import multiColors from 'react-multi-date-picker/plugins/colors';
import Settings from 'react-multi-date-picker/plugins/settings';
import Toolbar from 'react-multi-date-picker/plugins/toolbar';
import { Chip } from '../../../components/Chip/Chip';

const dateObject = new DateObject();

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
const toDateObject = (day) => new DateObject(day);

const initialProps = {
  value: [],
  multiple: true,
};

export const ProfileCalender = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [resDetail, setResDetail] = useState('');
  const [active, setActive] = useState(0);
  const [role, setRule] = useState(true);
  const [month, setMonth] = useState(() => moment(new Date()).format('MM'));
  const [limitDate, setLimitDate] = useState({
    startOf: moment().startOf('week').toDate(),
    endOf: moment().endOf('week').toDate(),
  });
  const [params, setParams] = useState({
    maND: currentUser.maND,
    thang: month,
    nam: 2023,
  });
  const [props, setProps] = useState(initialProps);
  const isRTL = ['fa', 'ar'].includes(props.locale?.name?.split?.('_')?.[1]);
  const handleOnEdit = async () => {
    try {
      const values = props.value.reduce(function (r, a) {
        r[a.color] = r[a.color] || [];
        r[a.color].push(a);
        return r;
      }, Object.create(null));
      const res = await lichLamViecUserApi.editLichLamViecUser({
        maND: currentUser.maND,
        lich: JSON.stringify(values),
        thang: month,
        nam: 2023,
        trangThai: 0,
      });
      toastify('success', res.message);
      fetchData(params);
    } catch (error) {}
  };
  const handleOnSubmit = async () => {
    try {
      const values = props.value.reduce(function (r, a) {
        r[a.color] = r[a.color] || [];
        r[a.color].push(a);
        return r;
      }, Object.create(null));
      const res = await lichLamViecUserApi.themLichLamViecUser({
        maND: currentUser.maND,
        lich: JSON.stringify(values),
        thang: month,
        nam: 2023,
        trangThai: 0,
      });
      toastify('success', res.message);
      fetchData(params);
    } catch (error) {}
  };

  const onMapsDay = ({ date, today }) => {
    return {
      disabled: props.value.includes(date),
    };
  };

  const fetchData = async (params) => {
    const res = await lichLamViecUserApi.getLichLamViecUser(params);
    setResDetail(res);

    if (res?.lich) {
      const colors = JSON.parse(res.lich);

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
      const newValue = [
        ...newColor?.blue,
        ...newColor?.green,
        ...newColor?.yellow,
      ];
      setProps({
        ...props,
        activeColor: 'blue',
        readOnly: false,
        weekNumber: 'Tuần',
        weekStartDayIndex: 0,
        multiple: true,
        value: [...newValue],
      });

      setLoading(false);
    } else {
      setLoading(false);

      setProps({
        ...props,
        value: [],
      });
    }
  };
  useEffect(() => {
    fetchData(params);
  }, [params]);

  if (loading) return <Loading />;
  return (
    <div
      style={{
        width: '100%',
        minHeight: '80vh',
      }}
    >
      <h5 className="text-center mb-5 fw-bold">
        Đăng ký lịch làm việc làm việc tháng {month}/
        {moment(new Date()).format('YYYY')}
      </h5>
      <div className="d-flex align-align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
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

        {resDetail?.trangThai === 0 ||
        resDetail?.trangThai === 2 ||
        !resDetail?.trangThai ? (
          <>
            {!!resDetail?.lich ? (
              <>
                <button
                  className="btn-button btn-button-primary"
                  onClick={handleOnEdit}
                >
                  Chỉnh sửa
                </button>
              </>
            ) : (
              <button
                className="btn-button btn-button-primary"
                onClick={handleOnSubmit}
              >
                Thêm
              </button>
            )}{' '}
          </>
        ) : (
          <Chip variant="red" status="Đã xét duyệt" />
        )}
      </div>

      {resDetail?.trangThai === 2 && (
        <div className="my-4 d-flex">
          <Chip variant="red" status="Đã bị hủy" />
          <p className="px-2">
            Lý do:{' '}
            <strong
              style={{
                fontWeight: 'bold',
              }}
            >
              {resDetail.lydohuy}
            </strong>
          </p>
        </div>
      )}

      <Calendar
        {...props}
        weekStartDayIndex={0}
        readOnly={
          resDetail?.trangThai === 0 ||
          resDetail?.trangThai === 2 ||
          !resDetail?.trangThai
            ? false
            : true
        }
        displayWeekNumbers
        minDate={new Date()}
        mapDays={onMapsDay}
        weekNumber="Tuần"
        onPropsChange={setProps}
        locale={gregorian_en_lowercase}
        onMonthChange={(value) => {
          setParams({
            ...params,
            thang: value.month.number,
          });
          setMonth(value.month.number);
        }}
        plugins={[
          <DatePickerHeader position="top" size="small" />,
          <DatePanel
            position={isRTL ? 'left' : 'right'}
            sort="date"
            eachDaysInRange={!props.onlyMonthPicker && !props.onlyYearPicker}
          />,
          multiColors({
            position: isRTL ? 'right' : 'left',
            colors: ['blue', 'green', 'yellow'],
          }),
        ]}
      />
    </div>
  );
};
