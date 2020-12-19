import React from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import { getQuantityItemsInCategories } from '../../store/Tasks/selectors';
import { Spinner } from 'react-bootstrap';

const Analytics: React.FC = () => {
  console.log('render Analytics')
  const dataForChart = useSelector(getQuantityItemsInCategories);
  return (
    <div className="analytics">
      <h3 className="text-center">Tasks statistics by categories</h3>
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
    </div>
  );
};

export default Analytics;
