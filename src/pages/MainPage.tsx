import { useCallback, useState } from 'react';
import styled from 'styled-components';
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
  const [messageData, setMessageData] = useState([]);
  const [data] = useState([
    {
      ClusterName: 'bkwag',
      Contents: '123 123 123',
      Title: 'test214',
    },
    {
      ClusterName: 'hyunyoo',
      Contents: '123 123 123 ',
      Title: 'test23',
    },
    {
      ClusterName: 'sun',
      Contents: '123 123 123 ',
      Title: 'test3523',
    },
    {
      ClusterName: 'gho',
      Contents: '123 123 123 ',
      Title: 'tes4t23',
    },
    {
      ClusterName: 'bwag',
      Contents: '123 123 123 ',
      Title: 'test2453',
    },
    {
      ClusterName: 'qwer',
      Contents: '123 123 123 ',
      Title: 'test23r32',
    },
    {
      ClusterName: 'asdf',
      Contents: '123 123 123 ',
      Title: 'test13423',
    },
    {
      ClusterName: 'zwef',
      Contents: '123 123 123 ',
      Title: 'te325st23',
    },
    {
      ClusterName: 'zhzdsfh',
      Contents: '123 123 123 ',
      Title: 'test1252436',
    },
    {
      ClusterName: 'zdfh',
      Contents: '123 123 123 ',
      Title: 'test212461246',
    },
  ]);

  const deleteFromMessageData = useCallback(
    (data: any) => {
      setMessageData(messageData.filter((x) => x !== data));
    },
    [messageData],
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
      {visible && <DirectoryBlock setVisible={setVisible} datas={data} messageData={messageData} setMessageData={setMessageData} />}
      <StyledButton onClick={() => setVisible(true)}>
        <img src={folder} alt="folder image" />
        <p>Messages</p>
      </StyledButton>
      {messageData.length > 0 &&
        messageData.map((data, index) => {
          return <MessageBlock key={index} data={data} deleteFromMessageData={deleteFromMessageData}></MessageBlock>;
        })}
    </div>
  );
};

export default MainPage;
