import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import errorimg from '../image/42memory_warning_icon.png';
const StyledError = styled.div`
  width: 600px;

  .card-body {
    display: flex;
    flex-direction: row;
    justify-content: start;
    button {
      width: 100px;
      height: 25px;
      border-radius: 5px;
    }
    .error-content {
      flex: 1;
      height: 50px;
    }
    .confirm-button {
      position: absolute;
      right: 20px;
      bottom: 10px;
      background: linear-gradient(to bottom, #41afdc, #0070f5);
      color: white;
    }
    .cancel-button {
      position: absolute;
      right: 150px;
      bottom: 10px;
      background: #f4f4f4;
      border: 1px solid black !important;
    }
  }
`;

interface ErrorBlockProps {
  isCaution?: boolean;
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({ isCaution }: ErrorBlockProps) => {
  return (
    <StyledError>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <img src={errorimg} alt="errorimg" />
          <div className="error-content">
            <Card.Text>error 예시</Card.Text>
            <button className="confirm-button">확인</button>
            <button className="cancel-button">취소</button>
          </div>
        </Card.Body>
      </Card>
    </StyledError>
  );
};

export default ErrorBlock;
