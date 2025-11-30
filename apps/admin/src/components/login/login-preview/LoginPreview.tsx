'use client';
import Image from 'next/image';
import { ASSETS } from '@/constants';

const LoginPreview = () => {
  return (
    <div className="bg-box-secondary rounded-xl p-6 w-[60%] h-full hidden lg:flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <h4 className="text-3xl font-semibold text-title">
          Gestiona tus bingos de manera simple y profesional
        </h4>
        <p className="text-body-100 text-base">
          Accede a tu panel para crear, administrar y dar seguimiento a tus
          bingos en tiempo real.
        </p>
      </div>
      <div className="w-[90%]">
        <Image
          src={ASSETS.IMAGES.PREVIEW}
          alt="Preview"
          width={730}
          height={419}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPreview;
