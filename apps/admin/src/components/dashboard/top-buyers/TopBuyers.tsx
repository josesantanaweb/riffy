'use client';
import { TopBuyer } from '@riffy/types';
import { formatCurrency } from '@/utils';

interface TopBuyersProps {
  topBuyers: TopBuyer[];
}

const TopBuyers = ({ topBuyers }: TopBuyersProps) => {
  return (
    <div className="flex flex-col dark:bg-base-700 bg-base-800 rounded-xl p-6 min-h-[300px]">
      <h3 className="text-base font-medium dark:text-white text-primary mb-6">
        Top Compradores
      </h3>
      <div className="flex flex-col gap-3">
        {topBuyers.map((buyer) => (
          <div className="flex justify-between items-center dark:bg-base-600 bg-base-700 rounded-md py-2 px-6" key={buyer.nationalId}>
            <div className="flex flex-col gap-1">
              <h6 className="text-base dark:text-white text-primary capitalize">{buyer.buyerName}</h6>
              <p className="text-sm text-base-300">
                {buyer.nationalId}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="text-sm dark:text-white text-primary">{buyer.totalTickets} {buyer.totalTickets === 1 ? 'Boleto' : 'Boletos'}</h6>
              <p className="text-xs text-primary-500">{formatCurrency(buyer.totalSpent, 'VES')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBuyers;
