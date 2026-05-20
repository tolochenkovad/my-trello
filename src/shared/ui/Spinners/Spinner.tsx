import { Spin, SpinProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Spinner = ({ ...rest }: SpinProps) => <Spin indicator={<LoadingOutlined spin />} {...rest} />;
