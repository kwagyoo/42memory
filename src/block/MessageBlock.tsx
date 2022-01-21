import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import ButtonList from '../common/ButtonList';

const StyledMessage = styled.div`
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
    .message-header-title {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }
  }
  .card-body {
    width: 100%;
    flex: 1 0;
  }
`;

const MessageBlock: React.FC = () => {
  return (
    <StyledMessage>
      <Card>
        <Card.Header>
          <ButtonList />
          <div className="message-header-title">from Hyunyoo</div>
        </Card.Header>
        <Card.Body>
          <Card.Title as="h5">제목</Card.Title>
          <Card.Text>텍스트 내용</Card.Text>
        </Card.Body>
      </Card>
    </StyledMessage>
  );
};

export default MessageBlock;
