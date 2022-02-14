import { useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router';

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userID = sessionStorage.getItem('receiveUserID');
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (userID !== null && query.code !== undefined) {
      const code = (query.code as string).toString();
      navigate(`/message/${userID}/write?code=${code}`);
    }
  });
  return <div></div>;
};

export default RedirectPage;
