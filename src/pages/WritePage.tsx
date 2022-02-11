import MessageWriteBlock from '../block/MessageWriteBlock';
import CautionWindow from '../common/CautionWindow';

const WritePage: React.FC = (props: any) => {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MessageWriteBlock />
        <CautionWindow />
      </div>
    </div>
  );
};

export default WritePage;
