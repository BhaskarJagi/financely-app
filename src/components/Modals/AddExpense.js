import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
}) {

    const [form] = Form.useForm();
  return (
    <Modal
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        Expense
      </Modal>
  )
}

export default AddExpenseModal;
