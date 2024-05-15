import React, { useState} from 'react';
import {
  Modal,
  TextInput
} from '@carbon/react';
import styles from '@/styles/modal/modal.module.scss';


const ModalPages = ({ addModal, modalTitle,changeModalOpen ,addConfirm}) => {
  const [formValue, setFormValue] = useState({
    text:'',
  })

  const [primaryButtonDisabled,setPrimaryButtonDisabled] = useState(true)


  // 关闭弹窗
  const handleCancelClicked = () => {
    // onClose();
    setFormValue({text:''})
    changeModalOpen(false);
  };

  // 提交
  const handleSubmit = (e) => {
    setPrimaryButtonDisabled(true)
    addConfirm({...formValue})
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
        <TextInput
              id="addText"
              labelText=""
              placeholder={modalTitle}
              value={formValue.text}
              onChange={(e)=>{
                setFormValue({text:e.target.value})
                setPrimaryButtonDisabled(false)
              }}
              // onFocus={(e) => setTimeout(() => e.target.select(), 1000)}
            />
      </Modal>
    </div>
  );
};

export default ModalPages;
