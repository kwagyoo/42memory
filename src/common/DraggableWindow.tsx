import { useCallback, useRef } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import ButtonList from './ButtonList';
import titleimg from '../image/42memory_folder_title_option.png';
import sendimg from '../image/42memory_send_msg.png';

interface DraggableWindowProps {
  title: string;
  onHeaderButtonClick: () => void;
  children: JSX.Element;
}

const StyledWindow = styled.div`
  position: absolute;
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 8px;
  border: 1px solid #beb5b4;
  background-color: #eeeeee;
  .card {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .card-header {
    display: flex;
    flex-direction: column;
    flex: 0 0 30px;
    width: 100%;
    padding: 0.1rem 0 0 0;
    background-color: #dddddd;
    .header-content {
      display: flex;
      flex: 1 0;
      flex-direction: row;
      .directory-header-title {
        flex: 1;
        text-align: center;
      }
    }
    .header-title {
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
    width: 100%;
    flex: 1 0;
    padding: 0;
  }
`;
const DraggableWindow: React.FC<DraggableWindowProps> = ({ title, onHeaderButtonClick, children }: DraggableWindowProps) => {
  const directoryRef = useRef<any>(null);

  const startDrag = useCallback((e) => {
    const refDiv = directoryRef.current;
    const distOffsetX = e.pageX - refDiv.offsetLeft;
    const distOffsetY = e.pageY - refDiv.offsetTop;

    const moveDrag = (e: MouseEvent): void => {
      const refDiv = directoryRef.current;
      const right = parseInt(refDiv.offsetLeft) + parseInt(refDiv.offsetWidth);
      const down = parseInt(refDiv.offsetTop) + parseInt(refDiv.offsetHeight);
      refDiv.style.left = `${refDiv.offsetLeft <= 0 ? 1 : right >= window.innerWidth ? window.innerWidth - refDiv.offsetWidth - 1 : e.pageX - distOffsetX}px`;
      refDiv.style.top = `${refDiv.offsetTop <= 0 ? 1 : down >= window.innerHeight ? window.innerHeight - refDiv.offsetHeight - 1 : e.pageY - distOffsetY}px`;
    };

    refDiv.addEventListener('mousemove', moveDrag);
    document.addEventListener('mousemove', moveDrag); // 빠르게 마우스를 이동하면 refDiv의 영역에서 나가서 이벤트가 발생을 안함.
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', moveDrag);
        refDiv.removeEventListener('mousemove', moveDrag);
      },
      { once: true },
    );
    refDiv.addEventListener('mouseup', () => refDiv.removeEventListener('mousemove', moveDrag));
  }, []);

  return (
    <StyledWindow ref={directoryRef}>
      <Card>
        <Card.Header onMouseDown={startDrag}>
          <div className="header-content">
            <ButtonList onClick={onHeaderButtonClick} />
            <div className="header-title">{title}</div>
            {title === 'Send a message' && (
              <>
                <button className="send-button">
                  <img src={sendimg} alt="sendimg" />
                </button>
              </>
            )}
          </div>
          {title === 'Messages' && <img src={titleimg} alt="titleimg" className="title-option-image"></img>}
        </Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </StyledWindow>
  );
};

export default DraggableWindow;
