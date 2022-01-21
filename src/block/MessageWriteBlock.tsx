import { Card, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import ButtonList from '../common/ButtonList';
import sendimg from '../image/42memory_send_msg.png';
const StyledMessageWrite = styled.div`
  width: 600px;
  height: 600px;
  .card {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .card-header {
    display: flex;
    flex: 0 0 30px;
    width: 100%;
    flex-direction: row;
    padding: 0.1rem 0;
    justify-content: space-between;
    .message-header-title {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }
    .send-button {
      margin: 2px 10px 2px 0;
      cursor: pointer;
      img {
        width: auto;
        height: auto;
        max-width: 20px;
        max-height: 20px;
      }
    }
    .send-button:active img {
      filter: contrast(0);
    }
  }
  .card-body {
    textarea {
      border: none;
      height: 380px;
    }
  }
`;
const MessageWriteBlock: React.FC = () => {
  return (
    <StyledMessageWrite>
      <Card>
        <Card.Header>
          <ButtonList />
          <button className="send-button">
            <img src={sendimg} alt="sendimg" />
          </button>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                받는사람
              </Form.Label>
              <Col sm="10">
                <Form.Control disabled readOnly defaultValue="bkwag" />
              </Col>
              <Form.Label column sm="2">
                제목
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="제목을 작성해주세요" />
              </Col>
              <Form.Label column sm="2">
                보낸사람
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="닉네임을 작성해주세요" />
              </Col>
            </Form.Group>
            <Form.Control as="textarea" placeholder="작성하고 싶은 내용을 자유롭게 작성해주세요" />
          </Form>
        </Card.Body>
      </Card>
    </StyledMessageWrite>
  );
};

export default MessageWriteBlock;
