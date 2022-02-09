import { useEffect, useState } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';

const messages = [
  "Don't Panic",
  'So Long, and Thanks for All the Fish',
  'Answer to life the universe and everything',
  'What do you get if you multiply six by nine',
];

const StyledModal = styled(Modal)`
  margin-top: 20px;
`;

const LoadingModal: React.FC<{ completed: boolean }> = ({ completed }) => {
  const [percent, setPercent] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>(messages[Math.floor(Math.random() * messages.length)]);
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => prev + 5);
    }, 500);
    const messageInterval = setInterval(() => {
      setMessageText(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);
    setTimeout(() => {
      clearInterval(interval);
    }, 9000);
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);
  return (
    <StyledModal show={true}>
      <StyledModal.Body>
        {messageText}
        <ProgressBar now={completed ? 100 : percent} label={`${completed ? 100 : percent}%`} />
      </StyledModal.Body>
    </StyledModal>
  );
};

export default LoadingModal;
