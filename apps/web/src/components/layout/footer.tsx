import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="w-full text-center px-4 text-gray-2 font-medium text-[10px] flex flex-col gap-5 items-center justify-center pb-4">
      <div className="flex w-full items-center justify-center gap-10">
        <Image
          src="/static/images/conalot.svg"
          alt=""
          height={28}
          width={64}
          quality={100}
        />
        <Image
          src="/static/images/tachira.svg"
          alt=""
          height={27}
          width={27}
          quality={100}
        />
        <Image
          src="/static/images/supergana.svg"
          alt=""
          height={17}
          width={25}
          quality={100}
        />
      </div>
      © 2025 Riffy Para Gestion de Rifas Online. Todos los derechos reservados
    </footer>
  );
};
