import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { getMessage, getMessageNickname } from '../api/message';
import DirectoryBlock from '../block/DirectoryBlock';
import MessageBlock from '../block/MessageBlock';
import LoadingModal from '../common/LoadingModal';
// import MessageWriteBlock from '../block/MessageWriteBlock';
import folder from '../image/42memory_folder.png';

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  width: 100px;
  height: 130px;
  background-color: transparent;
  border: none;
  img {
    width: 100px;
    height: 90px;
    padding: 10px 5px;
    border-radius: 5px;
  }
  p {
    margin-top: 1px;
    border-radius: 5px;
    color: white;
  }
  &:hover {
    cursor: default;
  }
  &:active {
    img {
      outline: solid 1px white;
      background-color: rgba(74, 74, 74, 0.5);
    }
    p {
      background-color: #007bff !important;
      color: white;
    }
  }
`;

const MainPage: React.FC = () => {
  const params = useParams();
  const [visible, setVisible] = useState(false);
  const [messageData, setMessageData] = useState<any[] | null>(null);
  const [messageFiles, setMessageFiles] = useState([]);
  const [windowData, setWindowData] = useState(Array(5).fill(-1));
  const [clickedWindow, setClickedWindow] = useState<string>('');
  const [messageLoading, setMessageLoading] = useState<boolean>(false);

  useEffect(() => {
    void (async () => {
      setMessageLoading(true);
      const messageRes = await getMessage(params.userID ?? '');
      setMessageData(messageRes.messages);
      const res = await getMessageNickname(params.userID ?? '');
      setMessageFiles(res.messages);
      setTimeout(() => {
        setMessageLoading(false);
      }, 1000);
    })();
  }, []);

  const deleteFromClickedMessages = useCallback(
    (messageID: Number) => {
      if (messageData !== null) {
        const modified = windowData;
        modified[modified.findIndex((x) => x === messageID)] = -1;
        setWindowData([...modified]);
      }
    },
    [messageData, windowData],
  );

  return (
    <>
      {messageLoading ? <LoadingModal completed={messageData !== null} /> : ''}
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
        {visible && <DirectoryBlock setVisible={setVisible} messageFiles={messageFiles} windowData={windowData} setWindowData={setWindowData} />}
        <StyledButton onClick={() => setVisible(true)}>
          <img src={folder} alt="folder image" />
          <p>Messages</p>
        </StyledButton>
        {/* <MessageWriteBlock /> */}
        {windowData.map((message: Number, index) => {
          if (message !== -1) {
            return (
              <MessageBlock
                key={`on-${index}`}
                data={messageData?.find((x: { messageID: Number; [key: string]: unknown }) => x.messageID === message)}
                clickedWindow={clickedWindow}
                setClickedWindow={setClickedWindow}
                deleteFromClickedMessages={deleteFromClickedMessages}
              ></MessageBlock>
            );
          } else return <MessageBlock key={`off-${index}`} data={null} deleteFromClickedMessages={deleteFromClickedMessages}></MessageBlock>;
        })}
      </div>
    </>
  );
};

export default MainPage;
