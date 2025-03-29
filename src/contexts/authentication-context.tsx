import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ValidationStatus } from '@/types/common.types.ts';
import { useProfileQuery } from '@/apis/user/useProfileQuery.ts';
import { sessionStorage } from '@/stores/persisted/session-storage.ts';
import { LoginRequest, LoginResponse, useLoginMutation } from '@/apis/auth/useLoginMutation.ts';

type AuthenticationContextProps = {
  isLoggedIn: ValidationStatus;
  signIn: (data: LoginRequest) => Promise<LoginResponse>;
  signOut: () => Promise<void>;
};

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps);

export const AuthenticationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<ValidationStatus>('pending');

  const { refetch: getProfile } = useProfileQuery();
  const { mutateAsync: requestLogin } = useLoginMutation();

  useEffect(() => {
    getProfile().then(({ data, error }) => {
      if (error) {
        setIsLoggedIn('invalid');
      } else if (data) {
        setIsLoggedIn('valid');
      }
    });
  }, []);

  const signIn = async (data: LoginRequest) => {
    const tokens = await requestLogin({
      username: data.username,
      password: data.password,
    });

    sessionStorage.set('auth.access_token', tokens.accessToken);
    sessionStorage.set('auth.refresh_token', tokens.refreshToken);

    setIsLoggedIn('valid');

    return tokens;
  };

  const signOut = async () => {
    sessionStorage.remove('auth.access_token');
    sessionStorage.remove('auth.refresh_token');

    setIsLoggedIn('invalid');
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);

export default AuthenticationContextProvider;
