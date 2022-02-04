import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMessageNickname } from '../api/message';
import DirectoryBlock from '../block/DirectoryBlock';
import MessageBlock from '../block/MessageBlock';
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
  const [visible, setVisible] = useState(false);
  const [messageData, setMessageData] = useState<any[] | null>(null);
  const [messageFiles, setMessageFiles] = useState([]);
  const [clickedMessages, setClickedMessages] = useState([]);

  useEffect(() => {
    void (async () => {
      const userClusterName = sessionStorage.getItem('userClusterName') as string;
      const res = await getMessageNickname(userClusterName);
      setMessageFiles(res.messages);
      console.log('messages', res.messages);
    })();
  }, []);
  const deleteFromMessageData = useCallback(
    (data: any) => {
      if (messageData !== null) setMessageData(messageData.filter((x) => x !== data));
    },
    [messageData],
  );

  console.log('clicked', clickedMessages);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
      {visible && (
        <DirectoryBlock
          setVisible={setVisible}
          clickedMessages={clickedMessages}
          setClickedMessages={setClickedMessages}
          messageFiles={messageFiles}
          messageData={messageData}
          setMessageData={setMessageData}
        />
      )}
      <StyledButton onClick={() => setVisible(true)}>
        <img src={folder} alt="folder image" />
        <p>Messages</p>
      </StyledButton>
      {clickedMessages.length > 0 &&
        clickedMessages.map((data, index) => {
          return <MessageBlock key={index} data={data} deleteFromMessageData={deleteFromMessageData}></MessageBlock>;
        })}
    </div>
  );
};

export default MainPage;
