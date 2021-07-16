import React, { FC, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { getQuantityItemsInCategories } from '../../store/Tasks/selectors';
import { Spinner } from 'react-bootstrap';
import classes from './Analytics.module.scss';

const Chart = lazy(() => import('react-google-charts').then((module) => ({ default: module.Chart })));

const Analytics: FC = () => {
  const dataForChart = useSelector(getQuantityItemsInCategories);

  if (dataForChart.slice(1).every((item) => item[1] == '0')) {
    return <div className="text-center">No data. Please create tasks to display analytics.</div>;
  }

  return (
    <div className={classes.analytics}>
      <h3 className="text-center">Tasks statistics by categories</h3>
      <Suspense fallback={<Spinner animation="border" />}>
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
          loader={<Spinner animation="border" />}
          data={dataForChart}
          width="100%"
          height="100%"
        />
      </Suspense>
    </div>
  );
};

export default Analytics;
