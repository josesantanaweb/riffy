'use client';
import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useIsIPhone } from '@riffy/hooks';
import { useStore } from '@/store';

import RaffleCard from '../common/raffle/raffle-card';
import RafflesEmpty from '../common/raffle/raffles-empty';
import TermsModal from '../common/terms/TermsModal';
import Skeleton from './Skeleton';

const TERMS_ACCEPTED_KEY = 'riffy-terms-accepted';

const RafflesPage = (): ReactElement => {
  const { user, loading } = useStore();
  const isIPhone = useIsIPhone();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem(TERMS_ACCEPTED_KEY);
    if (!termsAccepted) {
      setIsTermsModalOpen(true);
    }
  }, []);

  const handleCloseTermsModal = () => {
    localStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
    setIsTermsModalOpen(false);
  };

  return (
    <div
      className={`w-full h-full flex flex-col gap-5 ${isIPhone ? 'pb-24' : ''}`}
    >
      {loading &&
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} />)}

      {!loading &&
        user?.raffles &&
        user.raffles.length > 0 &&
        user.raffles.map(raffle => (
          <RaffleCard key={raffle.id} raffle={raffle} loading={loading} />
        ))}

      {!loading && user && (!user.raffles || user.raffles.length === 0) && (
        <RafflesEmpty />
      )}

      <TermsModal isOpen={isTermsModalOpen} onClose={handleCloseTermsModal} />
    </div>
  );
};

export default RafflesPage;
