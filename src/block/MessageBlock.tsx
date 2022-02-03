/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import DraggableWindow from '../common/DraggableWindow';

const StyledMessageBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const MessageBlock: React.FC<any> = ({ data, key, deleteFromMessageData }) => {
  return (
    <DraggableWindow title={`from ${data.ClusterName ?? ''}`} width={800} height={600} onHeaderButtonClick={() => deleteFromMessageData(data)}>
      <StyledMessageBlock key={key}>
        <Card.Title as="h3">{data.Title}</Card.Title>
        <Card.Text>To.클러스터네임</Card.Text>
        <Card.Text>{data.Contents}</Card.Text>
      </StyledMessageBlock>
    </DraggableWindow>
  );
};

export default MessageBlock;
