import { PropsWithChildren } from 'react';
import { Modal as AntdModal, ModalProps } from 'antd';

export const Modal = ({ children, ...rest }: PropsWithChildren<ModalProps>) => (
  <AntdModal
    closable={false}
    mask={{ closable: false }}
    footer={(_, { OkBtn, CancelBtn }) => (
      <>
        <CancelBtn />
        <OkBtn />
      </>
    )}
    {...rest}
  >
    {children}
  </AntdModal>
);
