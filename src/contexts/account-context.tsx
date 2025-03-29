import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '@/contexts/authentication-context.tsx';
import { useProfileQuery, UserProfileResponse } from '@/apis/user/useProfileQuery.ts';

type AccountContextProps = {
  profile?: UserProfileResponse;
};

export const AccountContext = createContext<AccountContextProps>({} as AccountContextProps);

export const AccountContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAuth();

  const { data: profile } = useProfileQuery();

  useEffect(() => {
    if (isLoggedIn === 'invalid') {
      navigate(`/auth/login?redirect=${location.pathname}${location.search}`);
    }
  }, [isLoggedIn]);

  return <AccountContext.Provider value={{ profile }}>{children}</AccountContext.Provider>;
};

export const useAccount = () => useContext(AccountContext);

export default AccountContextProvider;
