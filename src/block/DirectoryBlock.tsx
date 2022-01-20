import styled from 'styled-components';
import sideimg from '../image/42memory_folder_side.png';
import titleimg from '../image/42memory_folder_title_option.png';
import fileimg from '../image/42memory_file.png';
import ButtonList from '../common/ButtonList';
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
  .directory-header {
    display: flex;
    flex-direction: column;
    .directory-header-content {
      display: flex;
      flex-direction: row;
      .directory-header-title {
        flex: 1;
        text-align: center;
      }
    }
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
      }
      .file {
        width: 80px;
        height: 110px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        img {
          width: 90%;
          padding: 7px;
          border-radius: 4px;
        }
        .file-name {
          padding: 0 5px;
          border-radius: 4px;
        }

        &:hover {
          cursor: default;
        }
        &:focus {
          img {
            background-color: #e2e2e2 !important;
          }
          .file-name {
            background-color: #007bff !important;
            color: white;
          }
        }
      }
    }
  }
`;

interface DirectoryBlockProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DirectoryBlock: React.FC<DirectoryBlockProps> = ({ setVisible }: DirectoryBlockProps) => {
  return (
    <StyledDirectory>
      <div className="directory-header">
        <div className="directory-header-content">
          <ButtonList
            onClick={() => {
              console.log('hello');
              setVisible(false);
            }}
          />
          <div className="directory-header-title">헤더</div>
        </div>
        <img src={titleimg} alt="titleimg" className="title-option-image"></img>
      </div>
      <div className="directory-content">
        <img src={sideimg} alt="sideimg" className="directory-side-image"></img>
        <div className="file-page">
          <button className="file">
            <img src={fileimg} alt="file" />
            <div className="file-name">name</div>
          </button>
        </div>
      </div>
    </StyledDirectory>
  );
};

export default DirectoryBlock;
