import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { getMessage, getMessageNickname } from '../api/message';
import DirectoryBlock from '../block/DirectoryBlock';
import MessageBlock from '../block/MessageBlock';
import CautionWindow from '../common/CautionWindow';
import LoadingModal from '../common/LoadingModal';
import folder from '../image/42memory_folder.png';
import { LoginContext } from '../module/LoginContext';
import { MessageData, SimpleMessageData } from '../types/types';

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
  const [messageData, setMessageData] = useState<MessageData[] | null>(null);
  const [messageFiles, setMessageFiles] = useState<SimpleMessageData[]>([]);
  const [windowData, setWindowData] = useState(Array(5).fill(-1));
  const [clickedWindow, setClickedWindow] = useState<string>('');
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const { setLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const getMessages = useCallback(async () => {
    try {
      setMessageLoading(true);
      const messageRes = await getMessage(params.userID ?? '');
      setMessageData(messageRes);
      sessionStorage.setItem('messages', JSON.stringify(messageRes));
      const simpleMessageRes = await getMessageNickname(params.userID ?? '');
      setMessageFiles(simpleMessageRes);
      sessionStorage.setItem('simpleMessages', JSON.stringify(simpleMessageRes));
      setTimeout(() => {
        setMessageLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert('오류가 발생하였습니다.');
      sessionStorage.clear();
      setLogin(false);
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const login = sessionStorage.getItem('userID');
    if (login !== null) {
      setLogin(true);
      const simpleMessages = sessionStorage.getItem('simpleMessages');
      const messages = sessionStorage.getItem('messages');

      if (simpleMessages === null || messages === null) {
        void getMessages();
      } else {
        setMessageData(JSON.parse(messages));
        setMessageFiles(JSON.parse(simpleMessages));
      }
    } else {
      alert('로그인이 되어있지 않습니다. 메인 페이지로 이동합니다.');
      navigate('/');
    }
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
        {windowData.map((message: Number, index) => {
          if (message !== -1) {
            return (
              <MessageBlock
                key={`on-${index}`}
                data={messageData?.find((x: MessageData) => x.messageID === message) ?? null}
                clickedWindow={clickedWindow}
                setClickedWindow={setClickedWindow}
                deleteFromClickedMessages={deleteFromClickedMessages}
              ></MessageBlock>
            );
          } else return <MessageBlock key={`off-${index}`} data={null} deleteFromClickedMessages={deleteFromClickedMessages}></MessageBlock>;
        })}
      </div>
      <CautionWindow />
    </>
  );
};

export default MainPage;
