import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { getReceiverData } from '../api/message';
import image42 from '../image/42memory_title.png';
import { LoginDiv } from './LoginPage';

const MessageLoginPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>('');
  const [userID, setUserID] = useState<string>('');

  useEffect(() => {
    void (async () => {
      try {
        if (params.userID !== undefined) {
          const userClusterName = await getReceiverData(params.userID);
          setUserName(userClusterName);
          if (userClusterName !== null) {
            setUserID(params.userID);
            sessionStorage.setItem('receiveUserID', params.userID);
            sessionStorage.setItem('receiveClusterName', userClusterName);
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <LoginDiv>
      <div className="message-login">
        <div className="thumbnail-42">
          <Image src={image42} />
        </div>
        {userName !== null && userName.length > 0 ? (
          <Button variant="secondary" className="login" size="lg" onClick={() => navigate(`message/${userID}/write`)}>
            {userName} 님에게 글 남기러 가기{' '}
          </Button>
        ) : (
          <Button variant="secondary" className="login" size="lg" disabled>
            {userName === null ? '만료되었거나\n 문제가 발생한 링크입니다.' : '수신자 정보 로딩중'}
          </Button>
        )}
      </div>
    </LoginDiv>
  );
};

export default MessageLoginPage;
