'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useTheme } from '@riffy/hooks';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Button } from '@riffy/components';
import { COLORS } from './colors';
import { formatCurrency } from '@riffy/utils';

const monthlyData = [
  { period: 'Ene', amount: 450 },
  { period: 'Feb', amount: 250 },
  { period: 'Mar', amount: 120 },
  { period: 'Abr', amount: 320 },
  { period: 'May', amount: 500 },
  { period: 'Jun', amount: 380 },
  { period: 'Jul', amount: 180 },
  { period: 'Ago', amount: 200 },
  { period: 'Sep', amount: 480 },
  { period: 'Oct', amount: 350 },
  { period: 'Nov', amount: 520 },
];

const dailyData = [
  { period: '1', amount: 45 },
  { period: '2', amount: 52 },
  { period: '3', amount: 38 },
  { period: '4', amount: 65 },
  { period: '5', amount: 42 },
  { period: '6', amount: 58 },
  { period: '7', amount: 70 },
  { period: '8', amount: 48 },
  { period: '9', amount: 55 },
  { period: '10', amount: 62 },
  { period: '11', amount: 44 },
  { period: '12', amount: 50 },
  { period: '13', amount: 68 },
  { period: '14', amount: 72 },
  { period: '15', amount: 58 },
  { period: '16', amount: 46 },
  { period: '17', amount: 54 },
  { period: '18', amount: 60 },
  { period: '19', amount: 48 },
  { period: '20', amount: 66 },
  { period: '21', amount: 52 },
  { period: '22', amount: 70 },
  { period: '23', amount: 64 },
  { period: '24', amount: 56 },
  { period: '25', amount: 62 },
  { period: '26', amount: 58 },
  { period: '27', amount: 68 },
  { period: '28', amount: 74 },
  { period: '29', amount: 66 },
  { period: '30', amount: 72 },
];

enum PeriodEnum {
  MONTH = 'MONTH',
  DAY = 'DAY',
}

const PERIOD_OPTIONS = [
  { value: PeriodEnum.DAY, label: 'Día' },
  { value: PeriodEnum.MONTH, label: 'Mes' },
];

const EarningsChart = () => {
  const { theme } = useTheme();
  const [periodFilter, setPeriodFilter] = useState<PeriodEnum>(
    PeriodEnum.MONTH,
  );
  const primaryColorRef = useRef<HTMLDivElement>(null);
  const [primaryColor, setPrimaryColor] = useState<string>(COLORS[theme].primary.start);

  const colors = COLORS[theme];

  useEffect(() => {
    const root = document.documentElement;
    const primaryColorValue = getComputedStyle(root).getPropertyValue('--color-primary-500').trim();

    if (primaryColorValue) {
      setPrimaryColor(primaryColorValue);
    } else if (primaryColorRef.current) {
      const computedStyle = window.getComputedStyle(primaryColorRef.current);
      const color = computedStyle.backgroundColor;
      if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
        setPrimaryColor(color);
      }
    }
  }, [theme]);

  const chartData = useMemo(() => {
    return periodFilter === PeriodEnum.DAY ? dailyData : monthlyData;
  }, [periodFilter]);

  const totalEarnings = useMemo(() => {
    const sum = chartData.reduce((acc, item) => acc + item.amount, 0);
    return sum * 100;
  }, [chartData]);

  const yAxisTicks = useMemo(() => {
    return periodFilter === PeriodEnum.DAY
      ? [0, 20, 40, 60, 80]
      : [0, 100, 200, 400];
  }, [periodFilter]);

  return (
    <div className="md:col-span-2 xl:col-span-2 bg-box-primary rounded-xl p-6 min-h-[400px] relative">
      <div ref={primaryColorRef} className="bg-primary-500 w-0 h-0 absolute opacity-0 pointer-events-none" />
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-base text-title font-medium">Ganancias</h3>
          <p className="text-xl font-medium text-primary-500">
            {formatCurrency(totalEarnings)}
          </p>
        </div>
        <div className="flex gap-2">
          {PERIOD_OPTIONS.map((period) => (
            <Button
              key={period.value}
              variant={periodFilter === period.value ? 'primary' : 'default'}
              className="capitalize"
              size="sm"
              onClick={() => setPeriodFilter(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={primaryColor}
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor={colors.primary.end}
                stopOpacity={1}
              />
            </linearGradient>
            <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={colors.secondary.start}
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor={colors.secondary.end}
                stopOpacity={1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={false}
          />
          <XAxis
            dataKey="period"
            stroke={colors.axis}
            tick={{ fill: colors.tick, fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            interval={periodFilter === PeriodEnum.DAY ? 4 : 0}
          />
          <YAxis
            stroke={colors.axis}
            tick={{ fill: colors.tick, fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
          />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]} maxBarSize={40}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index % 2 === 0
                    ? 'url(#colorPrimary)'
                    : 'url(#colorSecondary)'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;
