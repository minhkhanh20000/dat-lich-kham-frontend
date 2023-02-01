import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from '../Dashboard.module.css';
import { baiDangApi } from '../../../../api/baiDang';
import { toastify } from '../../../../utils/common';
import { Loading } from '../../../../components/Loading';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import moment from 'moment';

import { GoSearch } from 'react-icons/go';
import { useNavigate } from 'react-router';

function ManagerPost() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDataPost = async () => {
    try {
      const data = await baiDangApi.getAllBaiDang();
      setData(data.posts);
      setLoading(false);
    } catch (error) {
      toastify('error', error.message);
    }
  };

  useEffect(() => {
    fetchDataPost();
  }, []);

  const handleOpenModalDeletePost = async (id) => {
    try {
      const res = await baiDangApi.deleteBaiDang(id);
      toastify('success', res.message);
      fetchDataPost();
    } catch (error) {
      toastify('error', error.message);
    }
  };

  if (loading)
    return (
      <div style={{ marginTop: '75px' }}>
        <Loading />
      </div>
    );

  return (
    <>
      <Container style={{ marginTop: '9rem' }}>
        <Row>
          <div className="d-flex justify-content-between my-2">
            <div>
              <button
                className="btn-button btn-button-primary"
                onClick={() => navigate('/admin/manager-posts/new')}
              >
                Thêm mới bài viết
              </button>
            </div>
          </div>
        </Row>

        <Row>
          {data.length > 0 ? (
            data.map((item) => (
              <div className="d-flex justify-content-start wrapper-content my-3">
                <div className={styles.image}>
                  <img src={item.anh} style={{ objectFit: 'cover' }} alt="" />
                </div>

                <div style={{ width: '70%' }}>
                  <div className={styles.content}>
                    <div className={styles.title}>
                      <h4
                        style={{
                          padding: 0,
                          margin: 0,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.tieude}
                      </h4>
                    </div>
                    <div className={styles.description}>
                      <p>{item.mota}</p>
                    </div>

                    <span
                      style={{
                        fontSize: '1.4rem',
                        padding: '1rem 0',
                        display: 'block',
                      }}
                    >
                      Tác giả:{' '}
                      <strong style={{ fontWeight: 600 }}>{item.hoten} </strong>
                    </span>
                    <div>
                      <h5>
                        Ngày tạo : {moment(item.ngaydang).format('DD-MM-YYYY')}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className={styles.icon}>
                  <AiFillDelete
                    fontSize="medium"
                    color="primary"
                    onClick={() => handleOpenModalDeletePost(item.mabaidang)}
                  />
                  <AiFillEdit
                    fontSize="medium"
                    color="error"
                    onClick={() => navigate(`${item.mabaidang}`)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center" style={{ fontSize: '1.8rem' }}>
              Chưa có bài đăng nào
            </p>
          )}
        </Row>
      </Container>
    </>
  );
}

export default ManagerPost;
