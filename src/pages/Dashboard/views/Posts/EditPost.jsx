import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SunEditor from 'suneditor-react';
import * as yup from 'yup';
import { Loading } from '../../../../components/Loading';

import {
  align,
  blockquote,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  image,
  lineHeight,
  link,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
} from 'suneditor/src/plugins';

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import InputControl from '../../../../form-control/InputControl';
import { useForm } from 'react-hook-form';
import TextareaControl from '../../../../form-control/TextareaControl';
import { yupResolver } from '@hookform/resolvers/yup';
import { toastify } from '../../../../utils/common';
import { baiDangApi } from '../../../../api/baiDang';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const EditPost = () => {
  const [body, setBody] = useState();
  const [loading, setLoading] = useState(true);
  const [dataPost, setDataPost] = useState('');
  const { maND } = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataImage, setDataImage] = useState();

  const [privewImage, setPrivewImage] = useState(
    'https://fucoidannano.com/img/no_img.png'
  );

  const schema = yup.object().shape({
    tieude: yup.string().required('Tiêu đề không được bỏ trống.'),
    mota: yup.string().required('Mô tả không được bỏ trống'),
    editor: yup.string(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mota: '',
      tieude: '',
      editor: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (data) => {
    const { mota, tieude } = data;
    try {
      if (!dataPost.noidung) {
        toastify('error', 'Nội dung không được bỏ trống');
      } else {
        const formData = new FormData();
        formData.append('mota', mota);
        formData.append('maND', maND);
        formData.append('tieude', tieude);
        if (body) {
          formData.append('noidung', body);
        } else {
          formData.append('noidung', dataPost.noidung);
        }
        if (dataImage) {
          formData.append('thumbnail', dataImage, dataImage.name);
        }
        const post = await baiDangApi.editBaiDang(formData, id);
        toastify('success', post.message);
        navigate(-1);
      }
    } catch (error) {
      toastify('error', 'Lỗi đăng bài');
    }
  };
  const handleChange = (content) => {
    setBody(content);
  };
  const handleOnChange = (e) => {
    setDataImage(e.target.files[0]);
    setPrivewImage(URL.createObjectURL(e.target.files[0]));
  };
  const fetchData = async () => {
    try {
      const data = await baiDangApi.getChiTietBaiDang(id);
      setDataPost(data.post);
      reset(data.post);
      setLoading(false);
    } catch (error) {
      toastify('error', error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div style={{ marginTop: '75px' }}>
        <Loading />
      </div>
    );
  return (
    <Container style={{ marginTop: '75px' }}>
      <button className="btn btn-danger my-2" onClick={() => navigate(-1)}>
        {' '}
        Quay lại
      </button>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Row>
          <Col item xs={8}>
            <div style={{ height: '500px' }}>
              <SunEditor
                defaultValue={dataPost && dataPost.noidung}
                onChange={handleChange}
                setOptions={{
                  plugins: [
                    align,
                    font,
                    fontColor,
                    blockquote,
                    fontSize,
                    formatBlock,
                    hiliteColor,
                    horizontalRule,
                    lineHeight,
                    list,
                    paragraphStyle,
                    table,
                    template,
                    textStyle,
                    image,
                    link,
                  ],
                  buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['paragraphStyle'],
                    ['blockquote'],
                    [
                      'bold',
                      'underline',
                      'italic',
                      'strike',
                      'subscript',
                      'superscript',
                    ],
                    ['fontColor', 'hiliteColor'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image'],
                    ['codeView', 'preview', 'print'],
                    ['save'],
                  ],
                  formats: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                  font: [
                    'Arial',
                    'Open Sans ',
                    'Moon Dance',
                    'Lato',
                    'Quicksand',
                    'Roboto',
                  ],
                }}
              />
            </div>
          </Col>
          <Col item xs={4}>
            <div>
              <div className="">
                <TextareaControl
                  name="tieude"
                  control={control}
                  placeholder="Nhập tiêu đề"
                  errors={errors}
                />
              </div>
              <div className="my-5">
                <TextareaControl
                  name="mota"
                  control={control}
                  placeholder="Nhập mô tả"
                  errors={errors}
                />
              </div>

              <div className="d-flex align-items-center flex-column">
                <div className="mx-2 my-2">
                  <input
                    type="file"
                    style={{ fontSize: '1.4rem' }}
                    className="btn btn-success"
                    onChange={handleOnChange}
                  />
                </div>

                <div>
                  {dataImage ? (
                    <img
                      src={privewImage}
                      alt=""
                      width="100%"
                      style={{ borderRadius: '10px', maxHeight: '200px' }}
                    />
                  ) : (
                    <img
                      src={dataPost.anh}
                      alt=""
                      width="100%"
                      style={{ borderRadius: '10px', maxHeight: '200px' }}
                    />
                  )}
                </div>
              </div>

              <div className="my-5">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ fontSize: '1.4rem' }}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default EditPost;
