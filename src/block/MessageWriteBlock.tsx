import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { getUserClusterName, sendMessage } from '../api/message';
import DraggableWindow from '../common/DraggableWindow';
import qs from 'qs';

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
  useEffect(() => {
    void (async () => {
      if (params.userID !== undefined) {
        const user = await getUserClusterName(params.userID);
        setUserName(user.data.userClusterName);
      }
      const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      setCode(query.code?.toString() ?? '');
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
    const res = await sendMessage(data);
    console.log(res);
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
