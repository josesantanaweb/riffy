'use client';
import { useMemo } from 'react';
import { useTheme } from '@riffy/hooks';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { COLORS } from './colors';

interface ProgressChartProps {
  sold: number;
  unsold: number;
}

const ProgressChart = ({ sold, unsold }: ProgressChartProps) => {
  const { theme } = useTheme();
  const colors = COLORS[theme];

  const percentage = useMemo(() => {
    const total = sold + unsold;
    if (!total || total === 0) {
      return 0;
    }
    const calc = Math.round((sold / total) * 100);
    return isNaN(calc) ? 0 : calc;
  }, [sold, unsold]);

  const chartColors = [colors.sold, colors.unsold];

  return (
    <div className="md:col-span-1 xl:col-span-1 dark:bg-base-700 bg-base-800 rounded-xl p-6 min-h-[400px] flex flex-col">
      <h3 className="text-base font-medium dark:text-white text-primary mb-6">
        Progreso actual
      </h3>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[280px] aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Vendidos', value: sold },
                  { name: 'No Vendidos', value: unsold },
                ]}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                startAngle={90}
                endAngle={450}
                paddingAngle={0}
                dataKey="value"
                strokeWidth={0}
                cornerRadius={20}
              >
                  {chartColors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-medium dark:text-white text-primary">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-[4px]"
              style={{ backgroundColor: colors.unsold }}
            />
            <span className="text-sm" style={{ color: colors.subtext }}>
              No Vendidos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-[4px]"
              style={{ backgroundColor: colors.sold }}
            />
            <span className="text-sm" style={{ color: colors.subtext }}>
              Vendidos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
