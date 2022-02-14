import React, { useCallback, useRef } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import ButtonList from './ButtonList';
import titleimg from '../image/42memory_folder_title_option.png';
import sendimg from '../image/42memory_send_msg.png';
import { DraggableWindowProps, StyledWindowProps } from '../types/types';

const StyledWindow = styled.div`
  position: absolute;
  left: 200px;
  top: 100px;
  width: ${(props: StyledWindowProps) => `${props.width}px`};
  height: ${(props: StyledWindowProps) => `${props.height}px`};
  z-index: ${(props: StyledWindowProps) => props.zIndex};
  display: ${(props: StyledWindowProps) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 8px;
  border: 1px solid #beb5b4;
  background-color: #eeeeee;
  /* 드래그 방지 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

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
    background: linear-gradient(to bottom, #e1e1e1, #dfdfdf, #dddedd, #dcdcdc, #dadada, #d8d8d8, #d7d7d7, #d5d5d5, #d3d3d3, #d1d1d1, #d0d0d0, #cecece);
    border-bottom: solid 1px #b2b2b2;
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
    .title-option-image {
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
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

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  show = true,
  zIndex = 'auto',
  setClickedWindow,
  title,
  width,
  height,
  onHeaderButtonClick,
  children,
}: DraggableWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const refDiv = windowRef.current;
    if (refDiv !== null) {
      const distOffsetX = e.pageX - refDiv.offsetLeft;
      const distOffsetY = e.pageY - refDiv.offsetTop;

      const moveDrag = (e: MouseEvent): void => {
        const right = refDiv.offsetLeft + refDiv.offsetWidth;
        const down = refDiv.offsetTop + refDiv.offsetHeight;
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
    }
  }, []);

  return (
    <StyledWindow className="draggable-window" onMouseDown={setClickedWindow} show={show} width={width} height={height} ref={windowRef} zIndex={zIndex}>
      <Card>
        <Card.Header onMouseDown={startDrag}>
          <div className="header-content">
            {title !== '' && <ButtonList onClick={onHeaderButtonClick} />}
            <div className="header-title">{title}</div>
            {title === 'Send a message' && (
              <>
                <button className="send-button" form="send-message" type="submit">
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
