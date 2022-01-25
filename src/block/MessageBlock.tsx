import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import DraggableWindow from '../common/DraggableWindow';

const StyledMessageBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const MessageBlock: React.FC = () => {
  return (
    <DraggableWindow title="from Hyunyoo" width={800} height={600} onHeaderButtonClick={() => console.log('hello')}>
      <StyledMessageBlock>
        <Card.Title as="h3">제목</Card.Title>
        <Card.Text>From.클러스터네임</Card.Text>
        <Card.Text>텍스트 내용</Card.Text>
      </StyledMessageBlock>
    </DraggableWindow>
  );
};

export default MessageBlock;
