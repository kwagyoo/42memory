import styled from 'styled-components';
import sideimg from '../image/42memory_folder_side.png';
import fileimg from '../image/42memory_file.png';
import DraggableWindow from '../common/DraggableWindow';
import { Col, Container, Row } from 'react-bootstrap';
import { ErrorContext } from '../module/ErrorContext';
import { useContext } from 'react';
import { DirectoryProps, SimpleMessageData } from '../types/types';

const StyledDirectory = styled.div`
  width: 100%;
  height: 100%;
  .directory-content {
    width: 100%;
    height: 583px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .container {
      overflow: scroll;
      overflow-x: hidden;
      height: 580px;
    }
    .directory-side-image {
      width: 243px;
      height: 100%;
      border-radius: 0 0 0 8px;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    }
    .file-page {
      display: flex;
      flex-direction: row;
      background-color: white;
      width: 100%;
      height: 100%;
      border-radius: 0 0 8px 0;
      img {
        width: 50px;
      }
      .file {
        width: 80px;
        height: 110px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
        img {
          pointer-events: none;
          width: 90%;
          height: 75px;
          padding: 7px;
          border-radius: 4px;
        }
        .file-name {
          width: 70px;
          font-size: 14px;
          padding: 0 5px;
          border-radius: 4px;
        }

        &:hover {
          cursor: default;
        }
        &:focus {
          img {
            background-color: #e2e2e2 !important;
          }
          .file-name {
            background-color: #007bff !important;
            color: white;
          }
        }
      }
    }
  }
`;

const DirectoryBlock: React.FC<DirectoryProps> = ({ setVisible, messageFiles, windowData, setWindowData }: DirectoryProps) => {
  const { setErrorText, setError } = useContext(ErrorContext);

  const onMessage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const deadline = sessionStorage.getItem('userDeadline')?.split('T')[0] ?? '';
    const parsedDeadline = Date.parse(deadline) - 9 * 60 * 60 * 1000; // deadline이 gmt 기준으로 인식되어 변환시 오전 9시가 된다.
    if (parsedDeadline <= Date.now()) {
      const event = e.target as HTMLButtonElement;
      const { dataset } = event;
      const unusedWindow = windowData.findIndex((x: Number) => x === -1);
      const duplicateWindow = windowData.findIndex((x: Number) => x === Number(dataset.id));
      if (unusedWindow !== -1 && duplicateWindow === -1) {
        const modified = windowData;
        modified[unusedWindow] = Number(dataset.id);
        setWindowData([...modified]);
      }
    } else {
      setError(true);
      setErrorText(`열람 가능 날짜가 지나지 않았습니다. \n열람 가능 날짜: ${deadline}`);
    }
  };

  return (
    <DraggableWindow
      width={900}
      height={650}
      title="Messages"
      onHeaderButtonClick={(e) => {
        e.preventDefault();
        setVisible(false);
      }}
    >
      <StyledDirectory>
        <div className="directory-content">
          <img src={sideimg} alt="sideimg" className="directory-side-image"></img>
          <Container>
            <Row lg={6}>
              {messageFiles.map((file: SimpleMessageData, index: number) => (
                <Col lg="auto" key={index}>
                  <div className="file-page">
                    <button className="file" onClick={onMessage} data-id={file.messageID}>
                      <img src={fileimg} alt="file" />
                      <div className="file-name">{file.senderNickname.length >= 5 ? `${file.senderNickname.slice(0, 4)}...` : file.senderNickname}</div>
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </StyledDirectory>
    </DraggableWindow>
  );
};
export default DirectoryBlock;
