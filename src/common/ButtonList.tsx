import styled from 'styled-components';
import closeButtonImg from '../image/42memory_close_button.png';
import miniButtonImg from '../image/42memory_minimize_button.png';
import maxiButtonImg from '../image/42memory_maximize_button.png';

const StyledButtonList = styled.div`
  flex: 0 0 80px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;

  .button-list {
    width: 20px;
    height: 20px;
    padding: 2px;
    img {
      width: 15px;
      height: 15px;
    }
    img:hover {
      filter: saturate(200%);
    }
  }
`;

interface LoginProps {
  onClick?: () => void;
}

const ButtonList: React.FC<LoginProps> = ({ onClick }: LoginProps) => {
  return (
    <StyledButtonList>
      <button className="button-list" onClick={onClick}>
        <img src={closeButtonImg} alt="close button" className="close-button" />
      </button>
      <button className="button-list">
        <img src={miniButtonImg} alt="minimize button" className=" minimize-button" />
      </button>
      <button className="button-list">
        <img src={maxiButtonImg} alt="maximize button" className="maximize-button" />
      </button>
    </StyledButtonList>
  );
};

export default ButtonList;
