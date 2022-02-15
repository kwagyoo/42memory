import DraggableWindow from './DraggableWindow';
import warnimg from '../image/42memory_warning_icon.png';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { ErrorContext } from '../module/ErrorContext';
import { useContext } from 'react';

const StyledCaution = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  img {
    width: 90px;
    height: 90px;
    margin: 15px;
  }
  .caution-body {
    display: flex;
    flex-direction: column;
    flex: 1 0 70%;
    height: 90%;
    .caution-text {
      font-size: 18px;
      font-weight: 600;
      padding: 20px;
      flex: 1 0 60%;
      white-space: pre-wrap;
    }
    .btn-primary {
      margin: 0 30px 10px 400px;
      background-color: #0d6efd !important;
      border-color: #0d6efd !important;
      &:focus {
        background-color: #0b5ed7 !important;
        border-color: #0a58ca !important;
        box-shadow: none;
      }
    }
  }
`;

const StyledCenter = styled.div`
  .draggable-window {
    left: calc(50% - 325px);
    top: calc(50% - 100px);
  }
`;

const CautionWindow: React.VFC = () => {
  const { errorText, error, setError } = useContext(ErrorContext);

  return (
    <StyledCenter>
      <DraggableWindow show={error} title="" onHeaderButtonClick={() => {}} width={650} height={200}>
        <StyledCaution>
          <img src={warnimg} alt="warning" />
          <div className="caution-body">
            <div className="caution-text">{errorText}</div>
            <Button variant="primary" type="submit" size="sm" onClick={() => setError(false)}>
              확인
            </Button>
          </div>
        </StyledCaution>
      </DraggableWindow>
    </StyledCenter>
  );
};

export default CautionWindow;
