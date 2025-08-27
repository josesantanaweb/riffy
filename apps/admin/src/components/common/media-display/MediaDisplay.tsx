'use client';
import React from 'react';
import { Avatar } from '@riffy/components';

interface MediaDisplayProps {
  image: string;
  label: string;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({
  label,
  image,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={image} name={label} className="rounded-md" size={35} />
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
};

export default MediaDisplay;
