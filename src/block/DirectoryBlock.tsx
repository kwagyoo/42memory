import styled from 'styled-components';
import sideimg from '../image/42memory_folder_side.png';
import fileimg from '../image/42memory_file.png';
import DraggableWindow from '../common/DraggableWindow';

const StyledDirectory = styled.div`
  width: 100%;
  height: 100%;
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
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
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
    <DraggableWindow
      width={1000}
      height={800}
      title="Messages"
      onHeaderButtonClick={(e) => {
        e.preventDefault();
        setVisible(false);
      }}
    >
      <StyledDirectory>
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
    </DraggableWindow>
  );
};

export default DirectoryBlock;
