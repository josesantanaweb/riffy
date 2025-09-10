'use client';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative w-full h-screen flex flex-col">
      <div className="bg-base-800 h-full">{children}</div>
    </main>
  );
};

export default Layout;
