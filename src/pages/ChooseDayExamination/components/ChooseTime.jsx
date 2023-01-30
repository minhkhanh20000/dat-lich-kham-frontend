import React, { useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from '../ChooseDayExamination.module.css';

const max = 10;
function ChooseTime({
  onClickTime,
  time,
  date,
  listTimeDefault,
  onSubmit,
  dataDatLich,
}) {
  const navigate = useNavigate();
  const { maND } = useSelector((state) => state.auth.currentUser);

  const handleClickTime = (item) => {
    onClickTime(item);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
      <div>
        <h2 className={styles.title}>Buổi sáng</h2>
        <Container>
          <Row>
            {listTimeDefault?.map((item, index) => (
              <Col xs={3} key={item.maTG} style={{ marginBottom: 20 }}>
                <div>
                  {dataDatLich[Number(index)] &&
                  dataDatLich[Number(index)].maND.includes(maND) ? (
                    <button
                      disabled={
                        dataDatLich[Number(index)] &&
                        dataDatLich[Number(index)].maND.includes(maND)
                      }
                      className={`${styles.timeDisble} btn-button`}
                    >
                      <span>
                        {item.thoiGianBatDau} - {item.thoiGianKetThuc}
                      </span>
                    </button>
                  ) : (
                    <button
                      disabled={
                        dataDatLich[Number(index)] &&
                        dataDatLich[Number(index)].maND.includes(maND)
                      }
                      className={`${styles.timeItem} ${
                        item.maTG === time.maTG && styles.timeActive
                      } btn-button`}
                      onClick={() => handleClickTime(item)}
                    >
                      <span>
                        {item.thoiGianBatDau} - {item.thoiGianKetThuc}
                      </span>
                    </button>
                  )}
                </div>

                <span className={styles.emptySlot}>
                  Còn trống
                  {dataDatLich[Number(index)]
                    ? ` ${max - dataDatLich[Number(index)].count} `
                    : ` ${max} `}
                  suất
                </span>
              </Col>
            ))}
          </Row>
        </Container>
        <div className="d-flex justify-content-between">
          <p className={styles.warning}>
            Tất cả thời gian theo múi giờ Việt Nam GMT +7
          </p>
          {time && date && (
            <button className={styles.buttonContuine} onClick={handleSubmit}>
              Tiếp tục
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChooseTime;
