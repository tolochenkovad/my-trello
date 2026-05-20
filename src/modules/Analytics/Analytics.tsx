import { Suspense, lazy } from 'react';
import { useQuantityItemsInCategories } from '@/entities/tasks/store/selectors';
import { Spinner } from '@/shared/ui';
import styles from './Analytics.module.scss';

const Chart = lazy(() => import('react-google-charts').then((module) => ({ default: module.Chart })));

export const Analytics = () => {
  const dataForChart = useQuantityItemsInCategories();

  if (dataForChart.slice(1).every((item) => item[1] == '0')) {
    return <div className="text-center">No data. Please create tasks to display analytics.</div>;
  }

  return (
    <div className={styles.analytics}>
      <h3 className="text-center">Tasks statistics by categories</h3>
      <Suspense fallback={<Spinner size="large" />}>
        <Chart
          chartType="PieChart"
          options={{
            chartArea: {
              left: 0,
              right: 0,
              top: 20,
              bottom: 0,
            },
            legend: {
              position: 'right',
              alignment: 'center',
              textStyle: {
                fontSize: 14,
              },
            },
          }}
          loader={<Spinner size="large" />}
          data={dataForChart}
          width="100%"
          height="100%"
        />
      </Suspense>
    </div>
  );
};
