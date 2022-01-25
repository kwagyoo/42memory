import { useState } from 'react';
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

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
      {visible && <DirectoryBlock setVisible={setVisible} />}
      <StyledButton onClick={() => setVisible(true)}>
        <img src={folder} alt="folderimg" />
        <p>Messages</p>
      </StyledButton>
      <MessageBlock />
      <MessageBlock />
    </div>
  );
};

export default MainPage;
