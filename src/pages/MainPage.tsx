import { useState } from 'react';
import styled from 'styled-components';
import DirectoryBlock from '../block/DirectoryBlock';
import folder from '../image/42memory_folder.png';

const StyledButton = styled.button`
  margin-right: 30px;
  width: 100px;
  height: 130px;
  background-color: transparent;
  border: none;
  img {
    width: 90px;
    height: 70px;
  }
  &:hover {
    cursor: default;
  }
  &:active {
    img {
      border: solid 1px white;
    }
  }
`;

const MainPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'start', justifyContent: 'end' }}>
      {visible && <DirectoryBlock />}
      <StyledButton onClick={() => setVisible(true)}>
        <img src={folder} alt="folderimg" />
      </StyledButton>
    </div>
  );
};

export default MainPage;
