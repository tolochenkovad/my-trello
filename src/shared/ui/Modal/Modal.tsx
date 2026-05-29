import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Modal as AntdModal, ModalProps } from 'antd';
import styles from './Module.module.scss';

export const Modal = ({ children, className, ...rest }: PropsWithChildren<ModalProps>) => (
  <AntdModal
    closable={false}
    mask={{ closable: false }}
    centered
    footer={(_, { OkBtn, CancelBtn }) => (
      <>
        <CancelBtn />
        <OkBtn />
      </>
    )}
    className={classNames(styles.container, className)}
    {...rest}
  >
    {children}
  </AntdModal>
);
