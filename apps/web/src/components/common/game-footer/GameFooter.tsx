'use client';
import React, { useState } from 'react';
import FavoriteButton from '../favorite-button';
import LikeButton from '../like-button';
import SoundButton from '../sound-button';

const GameFooter = (): React.ReactElement => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between border-t border-base-700 bg-base-800 w-full py-2 px-3 rounded-b-xl">
      <div className="flex items-center gap-3">
        <LikeButton isLiked={isLiked} onClick={() => setIsLiked(!isLiked)} count={12}/>
        <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite} variant="small"/>
        <SoundButton isMuted={isMuted} setIsMuted={setIsMuted} />
      </div>
      <div className="flex items-center">
        <button className="text-xl text-base-300">
          <span className="icon-info-circle" />
        </button>
      </div>
    </div>
  );
};

export default GameFooter;
