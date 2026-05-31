import { useState } from 'react';
import { Modal } from '../ui';

type UseConfirmModalProps = {
  onConfirmModal: () => void;
  confirmText: string;
};

export function useConfirmModal({ onConfirmModal, confirmText }: UseConfirmModalProps) {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const onHideModal = () => {
    setShowConfirmModal(false);
  };

  const setConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    onConfirmModal();
  };

  const renderConfirmModal = () => (
    <Modal open={showConfirmModal} onCancel={onHideModal} onOk={handleConfirm}>
      <div className="text-center">{confirmText}</div>
    </Modal>
  );

  return { openConfirmModal: setConfirmModal, renderConfirmModal };
}
