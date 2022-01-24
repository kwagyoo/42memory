import styled from 'styled-components';
import sideimg from '../image/42memory_folder_side.png';
import titleimg from '../image/42memory_folder_title_option.png';
import fileimg from '../image/42memory_file.png';
import ButtonList from '../common/ButtonList';
import { useCallback, useRef } from 'react';

const StyledDirectory = styled.div`
  position: absolute;
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
  // const [distance, setDistance] = useState([0, 0]);
  //   const headerRef = useRef<any>(null);

  //   const update = useCallback(
  //     (e: MouseEvent): void => {
  //       console.log(e.pageX, e.pageY);
  //       const shiftX = e.pageX - headerRef.current.getBoundingClientRect().left;
  //       const shiftY = e.pageY - headerRef.current.getBoundingClientRect().top;
  //       console.log('handle', headerRef.current.getBoundingClientRect().left, headerRef.current.getBoundingClientRect().top);
  //       console.log('shift', shiftX, shiftY);
  //       setX(e.pageX - shiftX);
  //       setY(e.pageY - shiftY);
  //     },
  //     [setX, setY],
  //   );

  //   useEffect(() => {
  //     headerRef.current.onDragstart = function () {
  //       return false;
  //     };
  //   }, []);
  const directoryRef = useRef<any>(null);

  const startDrag = useCallback((e) => {
    const refDiv = directoryRef.current;
    const distOffsetX = e.pageX - refDiv.offsetLeft;
    const distOffsetY = e.pageY - refDiv.offsetTop;

    const test = (e: MouseEvent): void => {
      const refDiv = directoryRef.current;
      refDiv.style.left = `${e.pageX - distOffsetX}px`;
      refDiv.style.top = `${e.pageY - distOffsetY}px`;
    };

    refDiv.addEventListener('mousemove', test);
    document.addEventListener('mousemove', test); // 빠르게 마우스를 이동하면 refDiv의 영역에서 나가서 이벤트가 발생을 안함.
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', test);
        refDiv.removeEventListener('mousemove', test);
      },
      { once: true },
    );
    refDiv.addEventListener('mouseup', () => refDiv.removeEventListener('mousemove', test));
  }, []);

  //   const endDrag = useCallback(
  //     (e) => {
  //       const refDiv = directoryRef.current;
  //       setDistance([0, 0]);
  //       console.log('hi');
  //       refDiv.removeEventListener('mousemove', test);
  //     },
  //     [setDistance],
  //   );

  return (
    <StyledDirectory ref={directoryRef} onMouseDown={startDrag}>
      <div className="directory-header">
        <div className="directory-header-content">
          <ButtonList
            onClick={() => {
              console.log('hello');
              setVisible(false);
            }}
          />
          <div className="directory-header-title" draggable="false">
            Messages
          </div>
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
