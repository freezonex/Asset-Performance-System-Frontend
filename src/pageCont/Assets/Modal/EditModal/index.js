import React, { useState } from 'react';
import {
  Modal,
  RadioButtonGroup,
  RadioButton,
  Column,
  Grid,
} from '@carbon/react';
import moment from 'moment';
import classNames from 'classnames';
import modalStyles from '@/styles/modal/modal.module.scss';
import styles from './index.module.scss';
import { assetStatusUpdate } from '@/api/assets';
const ModalPages = ({ editModalIsopen, changeState,tableRowData }) => {
  const [radioData, setRadioData] = useState(1);
  const handleCancelClicked = () => {
    // 关闭弹窗
    changeState({ editModalIsopen: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRadioData(1)
    statusUpdate()
  };
  const statusUpdate = async () => {
    let res = await assetStatusUpdate({id:tableRowData.id});
    if (res.data?.code == 200) {
      handleCancelClicked();
    }
  };

  return (
    <div className={classNames([modalStyles.ModalFromStyle, styles.EditModal])}>
      <Modal
        open={editModalIsopen}
        modalHeading="Has the Asset been used"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
      >
        <RadioButtonGroup
          defaultSelected={radioData}
          legendText=""
          name="radio-button-group"
          onChange={(e) => {
            setRadioData(e);
          }}
        >
          <RadioButton labelText="Yes" value={1} id="radio-1" />
        </RadioButtonGroup>
      </Modal>
    </div>
  );
};

export default ModalPages;
