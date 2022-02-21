/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useLayoutEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import DraggableWindow from '../common/DraggableWindow';
import { MessageProps } from '../types/types';

const StyledMessageBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  .message-text {
    white-space: pre-wrap;
    height: 460px;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
`;

const MessageBlock: React.FC<MessageProps> = ({ data, clickedWindow, setClickedWindow, deleteFromClickedMessages }) => {
  const [name, setName] = useState<string>('');

  useLayoutEffect(() => {
    if (data !== null) {
      setName(`message ${data.messageID}`);
    } else setName('');
  }, [data]);

  return (
    <DraggableWindow
      show={data !== null}
      zIndex={name === clickedWindow ? '10000' : 'auto'}
      title={`To. ${sessionStorage.getItem('userClusterName') ?? ''}`}
      width={800}
      height={600}
      setClickedWindow={() => {
        if (setClickedWindow !== undefined) setClickedWindow(name);
      }}
      onHeaderButtonClick={() => {
        if (data !== null) deleteFromClickedMessages(data.messageID);
      }}
    >
      <StyledMessageBlock>
        <Card.Title as="h3">{data?.messageTitle}</Card.Title>
        <Card.Text>From. {data?.senderNickname}</Card.Text>
        <div className="message-text">{data?.messageText}</div>
      </StyledMessageBlock>
    </DraggableWindow>
  );
};

export default MessageBlock;
