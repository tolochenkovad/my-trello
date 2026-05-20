import { Spin, SpinProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = ({ ...rest }: SpinProps) => <Spin indicator={<LoadingOutlined spin />} {...rest} />;

export default Spinner;
