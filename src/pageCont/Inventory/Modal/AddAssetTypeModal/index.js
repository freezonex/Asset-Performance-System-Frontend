import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Grid, Column, NumberInput } from '@carbon/react';
import styles from '@/styles/modal/modal.module.scss';

const ModalPages = ({ addModal, modalTitle, changeModalOpen, addConfirm }) => {
  const [formValue, setFormValue] = useState({
    assetType: '',
    unit: '',
    supplierName: '',
    priceValue:0,
  });

  const [primaryButtonDisabled, setPrimaryButtonDisabled] = useState(true);

  useEffect(() => {}, [addConfirm]);

  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValue((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    setPrimaryButtonDisabled(false);
  };

  // 关闭弹窗
  const handleCancelClicked = () => {
    setFormValue({
      assetType: '',
      unit: '',
      supplierName: '',
      priceValue: 0,
    });
    changeModalOpen(false);
  };

  // 提交
  const handleSubmit = async (e) => {
    setPrimaryButtonDisabled(true);
    await addConfirm({ ...formValue });
  };

  return (
    <div className={styles.ModalFromStyle}>
      <Modal
        open={addModal}
        modalHeading={modalTitle}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
        primaryButtonDisabled={primaryButtonDisabled}
      >
        <Grid className="pl-0 pr-0">
          <Column sm={4} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="assetType"
              labelText="Asset Type Name"
              placeholder="Asset Type Name"
              value={formValue.assetType}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={4} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="unit"
              labelText="Unit"
              placeholder="Unit"
              value={formValue.unit}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={4} md={4} lg={8}>
            <TextInput
              className="mb-8"
              id="supplierName"
              labelText="SupplierName"
              placeholder="SupplierName"
              value={formValue.supplierName}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={4} md={4} lg={8}>
            <NumberInput
              className="mb-8"
              id="priceValue"
              min={0}
              value={formValue.priceValue}
              label="Price At Purchase"
              placeholder="Price At Purchase"
              onChange={onFormValueChange}
            />
          </Column>
        </Grid>
      </Modal>
    </div>
  );
};

export default ModalPages;
