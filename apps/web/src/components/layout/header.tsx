import Image from 'next/image';

export const Header = () => {
  return (
    <header className="bg-[#06090E] w-screen px-4 h-20 flex items-center justify-center">
      <div className="flex justify-between items-center h-full w-full max-w-[500px]">
        <Image
          src="/static/images/riffy.svg"
          alt="Riffy"
          width={58}
          height={27}
        />
        <div className="flex items-center gap-4">
          <Image
            src="/static/images/icons/whatsapp.svg"
            alt="WhatsApp"
            width={24}
            height={24}
          />
          <Image
            src="/static/images/icons/instagram.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
          <Image
            src="/static/images/icons/user.svg"
            alt="User"
            width={24}
            height={24}
          />
        </div>
      </div>
    </header>
  );
};
