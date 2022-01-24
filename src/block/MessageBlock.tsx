import { Card } from 'react-bootstrap';
import DraggableWindow from '../common/DraggableWindow';

const MessageBlock: React.FC = () => {
  return (
    <DraggableWindow title="from Hyunyoo" onHeaderButtonClick={() => console.log('hello')}>
      <>
        <Card.Title as="h5">제목</Card.Title>
        <Card.Text>텍스트 내용</Card.Text>
      </>
    </DraggableWindow>
  );
};

export default MessageBlock;
