'use client';

interface BreadcrumbProps {
  page: string;
}

const Breadcrumb = ({ page }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-3 text-body-100 text-sm">
      <p>Riffy</p>
      <span>/</span>
      <p>{page}</p>
    </div>
  );
};

export default Breadcrumb;
