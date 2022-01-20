import styled from 'styled-components';
import sideimg from '../image/42memory_folder_side.png';
import titleimg from '../image/42memory_folder_title_option.png';
import fileimg from '../image/42memory_file.png';
const StyledDirectory = styled.div`
  position: absolute;
  left: 100px;
  top: 100px;
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 8px;
  border: 1px solid #beb5b4;
  background-color: #eeeeee;
  .title-option-image {
    width: 100%;
    height: 45px;
  }
  .directory-content {
    width: 100%;
    height: 730px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    .directory-side-image {
      width: 243px;
      height: 100%;
      border-radius: 0 0 0 8px;
    }
    .file-page {
      background-color: white;
      width: 100%;
      height: 100%;
      border-radius: 0 0 8px 0;
      img {
        width: 50px;
        margin-top: 30px;
      }
      .file {
        width: 80px;
        height: 110px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

const DirectoryBlock: React.FC = () => {
  return (
    <StyledDirectory>
      <div className="directory-title">
        <div>헤더</div>
        <img src={titleimg} alt="titleimg" className="title-option-image"></img>
      </div>
      <div className="directory-content">
        <img src={sideimg} alt="sideimg" className="directory-side-image"></img>
        <div className="file-page">
          <div className="file">
            <img src={fileimg} alt="file" />
            <div>name</div>
          </div>
        </div>
      </div>
    </StyledDirectory>
  );
};

export default DirectoryBlock;
