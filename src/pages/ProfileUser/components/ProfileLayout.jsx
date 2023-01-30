import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ruleUser } from '../../../utils/common';
import ProfileBar from './ProfileBar';
import { ProfileCalender } from './ProfileCalender';
import { ProfileInforTicker } from './ProfileContent';
import { ProfileHistory } from './ProfileHistory';
import { ProfileInforDoctor } from './ProfileInforDoctor';
import { ProfileInforUser } from './ProfileInforUser';

function ProfileLayout(props) {
  const { maQuyen } = useSelector((state) => state.auth.currentUser);

  const [activeId, setActiveId] = useState(
    maQuyen === ruleUser.BACSI ? 'bacsi' : 'hoso'
  );
  return (
    <div>
      <Container>
        <Row>
          <Col xs={3}>
            <ProfileBar id={activeId} onClickId={(id) => setActiveId(id)} />
          </Col>
          <Col xs={9}>
            {activeId === 'hoso' ? (
              <ProfileInforUser />
            ) : (
              activeId === 'lichsu' && <ProfileHistory />
            )}
            {activeId === 'phieukham' && <ProfileInforTicker />}
            {activeId === 'bacsi' && <ProfileInforDoctor />}
            {activeId === 'lichlamviec' && <ProfileCalender />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileLayout;
