'use client';
import React from 'react';
import Avatar from '../avatar';
import Deposit from '../deposit';
import Logo from '../logo';
import Button from '../button';
import Skeleton from './Skeleton';

interface HeaderProps {
  profile: {
    balance: number;
    image: string;
    hasSession: boolean;
    isLoading: boolean;
    isAuthenticating?: boolean;
  };
  actions: {
    onLogin: () => void;
    onRegister: () => void;
    onLogout: () => void;
  };
}

const Header = ({ profile, actions }: HeaderProps): React.ReactElement => {
  const { balance, image, hasSession, isLoading } = profile;
  const { onLogin, onRegister, onLogout } = actions;

  return (
    <div className="flex px-4 items-center w-full bg-base-900 h-[70px] border-b border-base-700 justify-between sticky top-0 z-50">
      <Logo />

      {isLoading && <Skeleton />}

      {!isLoading && hasSession && (
        <div className="flex gap-2">
          <Deposit balance={balance} />
          <div className="cursor-pointer" onClick={onLogout}>
            <Avatar src={image} size={35} />
          </div>
        </div>
      )}

      {!isLoading && !hasSession && (
        <div className="flex gap-6">
          <button
            className="text-xs text-white uppercase font-medium"
            onClick={onLogin}
          >
            Iniciar Sesión
          </button>
          <Button variant="primary" size="sm" onClick={onRegister}>
            Registrate
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
