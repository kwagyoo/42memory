import RegisterBlock from '../block/RegisterBlock';
import CautionWindow from '../common/CautionWindow';

const RegisterPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <RegisterBlock />
      <CautionWindow />
    </div>
  );
};

export default RegisterPage;
