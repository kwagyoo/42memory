import { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { getUserClusterName, sendMessage } from '../api/message';
import DraggableWindow from '../common/DraggableWindow';
import qs from 'qs';
import { ErrorContext } from '../module/Context';

const StyledForm = styled(Form)`
  padding: 10px;
  .form-control {
    border: none;
  }
  .textblock {
    margin-top: 10px;
    width: 100%;
    height: 600px;
    resize: none;
  }
`;

const MessageWriteBlock: React.FC = () => {
  const params = useParams();
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { setError, setErrorText } = useContext(ErrorContext);

  useEffect(() => {
    void (async () => {
      try {
        if (params.userID !== undefined) {
          const user = await getUserClusterName(params.userID);
          setUserName(user.data.userClusterName);
        }
        const query = qs.parse(location.search, {
          ignoreQueryPrefix: true,
        });
        setCode(query.code?.toString() ?? '');
      } catch (err) {
        if (params.userID !== undefined) {
          alert('유효하지 않는 주소입니다. 홈페이지로 이동합니다.');
          navigate('/');
        } else {
          alert('서버 문제가 발생했습니다. 다시 시도해주세요');
          navigate(`/message/${params.userID ?? ''}`);
        }
      }
    })();
  }, []);

  const onSendMessage = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { messageTitle, messageNickname, messageTextview } = e.currentTarget;
    const data = {
      code: code,
      userID: params.userID ?? '',
      senderNickname: messageNickname.value,
      messageTitle: messageTitle.value,
      messageText: messageTextview.value,
    };
    try {
      const res = await sendMessage(data);
      console.log(res);
    } catch (e) {
      if (params.userID !== undefined) {
        navigate(`/message/${params.userID}`);
      }
      setError(true);
      setErrorText('메세지 전송에 실패했습니다');
    }
  };

  return (
    <DraggableWindow title="Send a message" width={1000} height={800} onHeaderButtonClick={() => console.log('hello')}>
      <StyledForm id="send-message" onSubmit={onSendMessage}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            받는사람
          </Form.Label>
          <Col sm="10">
            <Form.Control disabled readOnly defaultValue={userName} />
          </Col>
          <Form.Label column sm="2">
            제목
          </Form.Label>
          <Col sm="10">
            <Form.Control name="messageTitle" placeholder="제목을 작성해주세요" />
          </Col>
          <Form.Label column sm="2">
            보낸사람
          </Form.Label>
          <Col sm="10">
            <Form.Control name="messageNickname" placeholder="닉네임을 작성해주세요" />
          </Col>
        </Form.Group>
        <Form.Control className="textblock" as="textarea" wrap="hard" name="messageTextview" placeholder="작성하고 싶은 내용을 자유롭게 작성해주세요" />
      </StyledForm>
    </DraggableWindow>
  );
};

export default MessageWriteBlock;
