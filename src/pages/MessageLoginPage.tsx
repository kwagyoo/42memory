import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getUserClusterName } from '../api/message';
import image42 from '../image/42memory_title.png';
import { LoginDiv } from './LoginPage';

const MessageLoginPage: React.FC = () => {
  const params = useParams();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    void (async () => {
      try {
        if (params.userID !== undefined) {
          const user = await getUserClusterName(params.userID);
          setUserName(user.data.userClusterName);
          sessionStorage.setItem('userID', params.userID);
        }
      } catch (err) {
        alert('에러 발생!');
      }
    })();
  }, []);

  const URL = process.env.REACT_APP_MESSAGE_REDIECT_URL;
  return (
    <LoginDiv>
      <div className="message-login">
        <div className="thumbnail-42">
          <Image src={image42} />
        </div>
        <a href={URL}>
          <Button variant="secondary" className="login" size="lg">
            {userName} 님에게 글 남기러 가기{' '}
          </Button>
        </a>
      </div>
    </LoginDiv>
  );
};

export default MessageLoginPage;
