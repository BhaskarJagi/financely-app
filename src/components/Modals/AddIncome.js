import { Modal } from "antd";
import React from "react";

function AddIncomeModal({isIncomeModalVisible, handleIncomeCancel}) {
  return (
    <div>
      <Modal
        title="Add Income"
        visible={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        Income
      </Modal>
    </div>
  );
}

export default AddIncomeModal;
