import React, { useState } from 'react';
import { Modal, RadioButtonGroup, RadioButton } from '@carbon/react';
import modalStyles from '@/styles/modal/modal.module.scss';
import classNames from 'classnames';
import styles from './index.module.scss';

function DownloadModal(props) {
  const { downloadModalIsOpen, changeState } = props;
  const [value, setValue] = useState(1);

  const handleCancelClicked = () => {
    setValue(1);
    changeState({
      downloadModalIsOpen: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileName = '';
    fetch(`${process.env.apiUrl}/apsbackend/maintenance/download?type=${value}`)
      .then((response) => {
        const arr = response.headers.get('Content-Disposition').split(';');
        fileName = window.decodeURI(arr[1]?.split('=')[1]);
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = fileName;
        a.href = url;
        a.click();
        window.URL.revokeObjectURL(url);
        a = null;
      });
  };

  return (
    <div className={classNames(modalStyles.ModalFromStyle)}>
      <Modal
        open={downloadModalIsOpen}
        modalHeading="Download"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
        size="xs"
      >
        <div className={styles.content}>
          <div className={styles.name}>File:</div>
          <RadioButtonGroup
            name="radio-button-group"
            valueSelected={value}
            onChange={(v) => {
              setValue(v);
            }}
            orientation="vertical"
          >
            <RadioButton
              labelText="Historical Maintenance Log"
              value={1}
              id="radio-1"
            />
            <RadioButton
              labelText="Maintenance Check Interval"
              value={2}
              id="radio-2"
            />
            <RadioButton
              labelText="Asset VaIue depreciation model"
              value={3}
              id="radio-3"
            />
          </RadioButtonGroup>
        </div>
      </Modal>
    </div>
  );
}

export default DownloadModal;
