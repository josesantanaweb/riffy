'use client';
import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showActions?: boolean;
  showPagination?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 6,
  showActions = true,
  showPagination = true,
}) => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 h-10" />

      <div className="bg-base-800 rounded-t-xl border-b border-base-600">
        <div className="flex items-center px-6 py-4">
          <div className="h-4 bg-base-600 rounded w-6 mr-4"></div>
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={index}
              className="flex-1 h-4 bg-base-600 rounded mr-4 last:mr-0"
            />
          ))}
          {showActions && <div className="h-4 bg-base-600 rounded w-20" />}
        </div>
      </div>

      <div className="bg-base-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex items-center px-6 py-4 ${
              rowIndex !== rows - 1 ? 'border-b border-base-600' : ''
            }`}
          >
            <div className="h-4 w-4 bg-base-600 rounded mr-4"></div>

            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="flex-1 h-4 bg-base-600 rounded mr-4 last:mr-0"
                style={{
                  width: colIndex === 0 ? '120px' : 'auto',
                }}
              />
            ))}

            {showActions && (
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-base-600 rounded"></div>
                <div className="h-8 w-8 bg-base-600 rounded"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showPagination && (
        <div className="bg-base-800 rounded-b-xl border-t border-base-600">
          <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 gap-4">
            <div className="h-4 bg-base-600 rounded w-32"></div>
            <div className="h-4 bg-base-600 rounded w-24"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSkeleton;
