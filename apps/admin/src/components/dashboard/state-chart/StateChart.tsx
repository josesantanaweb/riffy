'use client';
import { motion } from 'framer-motion';
import ProgressBar from '../../common/progress-bar/ProgressBar';
import { PaymentsByState } from '@riffy/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface StateChartProps {
  paymentsByState: PaymentsByState[];
}

const StateChart = ({ paymentsByState }: StateChartProps) => {
  return (
    <div className="md:col-span-1 xl:col-span-1 bg-box-primary rounded-xl p-6 min-h-[300px]">
      <h3 className="text-base font-medium text-title mb-6">
        Top 5 de ventas por estado
      </h3>
      {paymentsByState.length === 0 && (
        <div className="flex flex-col h-[300px] justify-center items-center">
          <p className="text-body-100 text-sm flex items-center justify-center font-medium">
            No hay ventas todavia
          </p>
        </div>
      )}
      {paymentsByState.length > 0 && (
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {paymentsByState.map((state, index) => (
            <motion.div
              key={state.state}
              className="flex flex-col gap-2"
              variants={itemVariants}
            >
              <h6 className="text-sm text-title">
                {state.state}
              </h6>
              <div className="flex items-center gap-3">
                <ProgressBar progress={state.percentage} delay={index * 0.15} />
                <motion.p
                  className="text-sm text-body-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.3 }}
                >
                  {state.percentage}%
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default StateChart;
