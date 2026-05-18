import { FC } from 'react';
import { Spin, SpinProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface ISpinnerProps extends SpinProps {}

const Spinner: FC<ISpinnerProps> = ({ ...rest }) => <Spin indicator={<LoadingOutlined spin />} {...rest} />;

export default Spinner;
