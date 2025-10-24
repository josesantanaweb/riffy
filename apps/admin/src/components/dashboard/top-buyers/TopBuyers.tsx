'use client';
import { TopBuyer } from '@riffy/types';
import { formatCurrency } from '@/utils';

interface TopBuyersProps {
  topBuyers: TopBuyer[];
}

const TopBuyers = ({ topBuyers }: TopBuyersProps) => {
  return (
    <div className="flex flex-col bg-box-primary rounded-xl p-6 min-h-[300px]">
      <h3 className="text-base font-medium text-title mb-6">
        Top Compradores
      </h3>
      {topBuyers.length === 0 && (
        <div className="flex flex-col h-[200px] justify-center items-center">
          <p className="text-body-100 text-sm flex items-center justify-center font-medium">
            No hay compradores todavia
          </p>
        </div>
      )}
      {topBuyers.length > 0 && (
        <div className="flex flex-col gap-3">
          {topBuyers.map(buyer => (
            <div
              className="flex justify-between items-center bg-box-secondary rounded-md py-2 px-6"
              key={buyer.nationalId}
            >
              <div className="flex flex-col gap-1">
                <h6 className="text-base text-title capitalize">
                  {buyer.buyerName}
                </h6>
                <p className="text-sm text-body-100">{buyer.nationalId}</p>
              </div>
              <div className="flex flex-col gap-1">
                <h6 className="text-sm text-title">
                  {buyer.totalTickets}{' '}
                  {buyer.totalTickets === 1 ? 'Boleto' : 'Boletos'}
                </h6>
                <p className="text-xs text-primary-500">
                  {formatCurrency(buyer.totalSpent, 'VES')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBuyers;
