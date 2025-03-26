import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '@/hocs/authentication-context.tsx';

type AccountContextProps = {};

export const AccountContext = createContext<AccountContextProps>(
  {} as AccountContextProps,
);

export const AccountContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn === 'invalid') {
      navigate(`/auth/login?redirect=${location.pathname}${location.search}`);
    }
  }, [isLoggedIn]);

  return (
    <AccountContext.Provider value={{}}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);

export default AccountContextProvider;
