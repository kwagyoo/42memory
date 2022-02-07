import { useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router';

const RedirectPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const code = query.code?.toString() ?? '';
    const userID = sessionStorage.getItem('userID') ?? '';
    navigate(`/message/${userID}/write?code=${code}`);
  });
  return <div></div>;
};

export default RedirectPage;
