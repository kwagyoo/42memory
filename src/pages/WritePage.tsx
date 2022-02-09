import MessageWriteBlock from '../block/MessageWriteBlock';

const WritePage: React.FC = (props: any) => {
  return (
    <div>
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MessageWriteBlock />
      </div>
    </div>
  );
};

export default WritePage;
