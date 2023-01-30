import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import styles from './Banners.module.css';
import {images} from '../../../../constants/constants';

function BannerService() {
  const navigate = useNavigate();
  return (
    <div className={styles.chooseService}>
      <h4>Chọn dịch vụ</h4>
      <div className={styles.chooseList}>
        <div className={styles.chooseItem} onClick={() => navigate('/dich-vu')}>
          <img src={images.DKCS} alt="" />
          <p>Đặt khám tại cơ sở</p>
        </div>
        <div className={`${styles.chooseItem} ${styles.chooseItemError}`}>
          <img src={images.HAUCV2} alt="" />
          <p>Khám hậu COVID_19</p>
        </div>
        <div className={`${styles.chooseItem} ${styles.chooseItemError}`}>
          <img alt="" src={images.VIEN_PHI} />
          <p>Đăng ký xét nghiệm tại nhà</p>
        </div>
        <div className={`${styles.chooseItem} ${styles.chooseItemError}`}>
          <img src={images.XET_NGHIEM_TAI_NHA} alt="" />
          <p>Thanh toán viện phí</p>
        </div>
      </div>
    </div>
  );
}
function Banners(props) {
  var settings = {
    dots: true,
    infinite: true,
    //  autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //  nextArrow: <BsCircle />,
  };
  return (
    <Slider {...settings}>
      <div>
        <div
          style={{
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            height: '60rem',
            backgroundImage: `url(${images.BANNER_GOI_KHAM})`,
          }}
        >
          <BannerService />
        </div>
      </div>
      <div>
        <div
          style={{
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            position: 'relative',

            backgroundRepeat: 'no-repeat',
            height: '60rem',
            backgroundImage: `url(${images.BANNER4})`,
          }}
        >
          <BannerService />
        </div>
      </div>
    </Slider>
  );
}

export default Banners;
