import React from 'react';
import { images } from '../../constants/constants';

const Introduce = () => {
  return (
    <div>
      <div style={{ height: '300px', position: 'relative' }}>
        <img
          src={images.GIOITHIEU}
          alt=""
          style={{
            height: '100%',
            width: '100%',
          }}
        />

        <h3
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            color: '#fff',
            fontSize: '3rem',
            transform: 'translateY(-50%)',
          }}
        >
          Giới thiệu
        </h3>
      </div>

      <div
        style={{
          width: '90%',
          margin: '2rem auto',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          padding: '3rem 2rem',
          color: '#12263f',
          borderRadius: '0.5rem',
          backgroundColor: '#fff',
        }}
      >
        <h6 className="py-4">
          Chào mừng bạn đến với phần mềm MinhKhanh- Đặt lịch khám bệnh, phần mềm
          liên kết với các bệnh viện nhằm giúp bệnh nhân có thể:
        </h6>

        <ul>
          <li style={{ fontSize: '1.4rem' }} className="py-2">
            + Đăng ký khám bệnh.
          </li>
          <li style={{ fontSize: '1.4rem' }} className="py-2">
            + Tạo hồ sơ bệnh nhân.
          </li>
          <li style={{ fontSize: '1.4rem' }} className="py-2">
            + Quản lý hồ sơ bệnh nhân.
          </li>
          <li style={{ fontSize: '1.4rem' }} className="py-2">
            + Quản lý phiếu khám bệnh.
          </li>
        </ul>
        <p className="py-3">
          Hoàn toàn trực tuyến ở mọi lúc mọi nơi mà không cần phải đến bệnh viện
          để xếp hàng và chờ đợi.
        </p>
        <p className="py-3">
          Thông qua phần mềm, chúng tôi luôn hy vọng đã tạo nên một phương thức
          giúp bệnh nhân có thể tiếp cận với các dịch vụ y tế (nói chung), và
          dịch vụ khám chữa bệnh (nói riêng) một cách dễ dàng, nhanh chóng và
          thuận lợi.
        </p>

        <p className="py-3">
          Từ đó làm tăng thêm sự hài lòng của bệnh nhân, nâng cao chất lượng
          dịch vụ của bệnh viện, và góp phần phát triển bệnh viện ngày càng trở
          nên thông minh hiện đại đáp ứng với sự kỳ vọng và tin tưởng của quý
          bệnh nhân trong và ngoài nước.
        </p>

        <p>Trân trọng!</p>
      </div>
    </div>
  );
};

export default Introduce;
