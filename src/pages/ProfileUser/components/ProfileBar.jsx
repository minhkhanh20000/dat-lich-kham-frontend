import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsFillStickyFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { RiShieldUserLine } from 'react-icons/ri';
import { TbBuildingHospital } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { ruleUser } from '../../../utils/common';
import styles from '../ProfileUser.module.css';

const profileRoute = [
  {
    title: 'Hồ sơ bệnh nhân',
    icon: <RiShieldUserLine />,
    id: 'hoso',
  },
  {
    title: 'Thông tin phiếu khám bệnh',
    icon: <BsFillStickyFill />,
    id: 'phieukham',
  },
  {
    title: 'Lịch sử khám bệnh',
    icon: <FaHistory />,
    id: 'lichsu',
  },
];
export default function ProfileBar({ id, onClickId }) {
  const { maQuyen } = useSelector((state) => state.auth.currentUser);

  return (
    <div className={styles.profile}>
      <ul className={styles.profileBarList}>
        {maQuyen === ruleUser.BACSI && (
          <>
            <li
              className={`${styles.profileBarItem} ${
                id === 'bacsi' && styles.active
              }`}
              onClick={() => onClickId('bacsi')}
            >
              <TbBuildingHospital />
              Thông tin bác sĩ
            </li>
            <li
              className={`${styles.profileBarItem} ${
                id === 'hoso' && styles.active
              }`}
              onClick={() => onClickId('hoso')}
            >
              <TbBuildingHospital />
              Thông tin chung
            </li>
            <li
              className={`${styles.profileBarItem} ${
                id === 'lichlamviec' && styles.active
              }`}
              onClick={() => onClickId('lichlamviec')}
            >
              <AiOutlineCalendar />
              Đăng ký lịch làm việc
            </li>
          </>
        )}
        {maQuyen !== ruleUser.BACSI && (
          <>
            {profileRoute.map((profile) => (
              <>
                <li
                  className={`${styles.profileBarItem} ${
                    id === profile.id && styles.active
                  }`}
                  key={profile.id}
                  onClick={() => onClickId(profile.id)}
                >
                  {profile.icon}
                  {profile.title}
                </li>
              </>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
