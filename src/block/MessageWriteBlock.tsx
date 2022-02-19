import { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { sendMessage } from '../api/message';
import DraggableWindow from '../common/DraggableWindow';
import qs from 'qs';
import { ErrorContext } from '../module/ErrorContext';
import LoadingModal from '../common/LoadingModal';

const StyledForm = styled(Form)`
  padding: 10px;
  .form-control {
    border: none;
  }
  .textblock {
    margin-top: 10px;
    width: 100%;
    height: 500px;
    resize: none;
  }
`;

const MessageWriteBlock: React.FC = () => {
  const params = useParams();
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();
  const { setError, setErrorText } = useContext(ErrorContext);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (params.userID === undefined) throw new Error('NotValidValue');

      const receiveClusterName = sessionStorage.getItem('receiveClusterName');
      const receiveUserID = sessionStorage.getItem('receiveUserID');
      const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      if (receiveClusterName === null || receiveUserID === null) throw new Error('NoReceiveUserData');
      if (query.accessToken === undefined) throw new Error('NoSenderData');
      setUserName(receiveClusterName);
      setUserID(receiveUserID);
      setAccessToken((query.accessToken as string) ?? '');
    } catch (err) {
      console.error(err);
      if (params.userID !== undefined) {
        alert('유효하지 않는 주소입니다. 홈페이지로 이동합니다.');
        navigate('/');
      } else {
        alert('서버 문제가 발생했습니다. 다시 시도해주세요');
        navigate(`/message/${params.userID ?? ''}`);
      }
    }
  }, []);

  const onSendMessage = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (loading) return;
    const { messageTitle, messageNickname, messageTextview } = e.currentTarget;
    const data = {
      accessToken: accessToken,
      userID: userID,
      senderNickname: messageNickname.value,
      messageTitle: messageTitle.value,
      messageText: messageTextview.value,
    };
    try {
      setLoading(true);
      const res = await sendMessage(data);
      setCompleted(true);
      alert(`메세지 전송에 성공했습니다.\n앞으로 ${3 - res}번 보낼 수 있습니다.`);
      navigate(`/message/${params.userID ?? ''}`);
    } catch (e) {
      if (params.userID !== undefined) {
        navigate(`/message/${params.userID}`);
      }
      setLoading(false);
      setError(true);
      setErrorText('메세지 전송에 실패했습니다');
    }
  };

  return (
    <DraggableWindow title="Send a message" width={900} height={700} onHeaderButtonClick={() => console.log('hello')}>
      <StyledForm id="send-message" onSubmit={onSendMessage}>
        {loading && <LoadingModal completed={completed} />}
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
            <Form.Control name="messageNickname" placeholder="닉네임을 작성해주세요(10자 이내)" maxLength={10} />
          </Col>
        </Form.Group>
        <Form.Control
          className="textblock"
          as="textarea"
          wrap="hard"
          name="messageTextview"
          placeholder="작성하고 싶은 내용을 자유롭게 작성해주세요 (2000자 이내)"
          maxLength={2000}
        />
      </StyledForm>
    </DraggableWindow>
  );
};

export default MessageWriteBlock;
