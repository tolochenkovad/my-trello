import { Select as AntdSelect, SelectProps } from 'antd';
import classNames from 'classnames';
import styles from './Select.module.scss';

export const Select = ({ className, ...rest }: SelectProps) => {
  return <AntdSelect className={classNames(styles.container, className)} {...rest} />;
};
