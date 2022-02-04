import styled from 'styled-components';
import sideimg from '../image/42memory_folder_side.png';
import fileimg from '../image/42memory_file.png';
import DraggableWindow from '../common/DraggableWindow';
import { Col, Container, Row } from 'react-bootstrap';

const StyledDirectory = styled.div`
  width: 100%;
  height: 100%;
  .directory-content {
    width: 100%;
    height: 730px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    .container {
      overflow: scroll;
      overflow-x: hidden;
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
          padding: 7px;
          border-radius: 4px;
        }
        .file-name {
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

const DirectoryBlock: React.FC<any> = ({ setVisible, messageFiles, windowData, setWindowData }: any) => {
  const onMessage = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {
    const event = e.target as HTMLButtonElement;
    const { dataset } = event;

    const unusedWindow = windowData.findIndex((x: Number) => x === -1);
    if (unusedWindow !== -1) {
      const modified = windowData;
      modified[unusedWindow] = Number(dataset.id);
      console.log(modified);
      setWindowData(modified);
    }
  };

  return (
    <DraggableWindow
      width={1000}
      height={800}
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
              {messageFiles.map((file: any, index: number) => (
                <Col lg="auto" key={index}>
                  <div className="file-page">
                    <button className="file" onClick={onMessage} data-id={file.messageID}>
                      <img src={fileimg} alt="file" />
                      <div className="file-name">{file.senderNickname}</div>
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
