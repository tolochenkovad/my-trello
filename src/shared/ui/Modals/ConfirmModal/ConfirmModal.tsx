import { FC } from 'react';
import { Modal } from 'antd';

type Props = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
};

const ConfirmModal: FC<Props> = ({ show, onHide, onConfirm }) => (
  <Modal
    open={show}
    onOk={onConfirm}
    onCancel={onHide}
    closable={false}
    mask={{ closable: false }}
    footer={(_, { OkBtn, CancelBtn }) => (
      <>
        <CancelBtn />
        <OkBtn />
      </>
    )}
  >
    <div className="text-center">Are you sure you want to delete this task?</div>
  </Modal>
);

export default ConfirmModal;
