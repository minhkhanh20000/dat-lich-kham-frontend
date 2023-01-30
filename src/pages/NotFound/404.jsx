import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {images} from '../../constants/constants';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            "
            <h1 className="text-center">
              404: The page you are looking for isn’t here
            </h1>
            <p className="text-center">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </p>
            <div style={{ textAlign: 'center' }}>
              <img
                alt="Under development"
                src={images.NOT_FOUND}
                style={{
                  marginTop: 50,
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 560,
                }}
              />
            </div>
            <button
              className="btn-button-primary btn-button"
              onClick={() => navigate('/')}
            >
              Trở lại trang chủ
            </button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Page404;
