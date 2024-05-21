import React, { useState, useRef } from 'react';
import { Modal, RadioButtonGroup, RadioButton } from '@carbon/react';
import modalStyles from '@/styles/modal/modal.module.scss';
import classNames from 'classnames';
import styles from './index.module.scss';

function DownloadModal(props) {
  const { downloadModalIsOpen, changeState } = props;

  const [value, setValue] = useState(1);
  const linkRef = useRef(null);

  const handleCancelClicked = () => {
    setValue(1);
    changeState({
      downloadModalIsOpen: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    linkRef.current.click();

    // fetch(`${process.env.apiUrl}/apsbackend/maintenance/download?type=${value}`)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'file.txt';
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //   });
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

        <a
          style={{ visibility: 'hidden' }}
          href={`${process.env.apiUrl}/apsbackend/maintenance/download?type=${value}`}
          ref={linkRef}
          // target='_blank'
        ></a>
      </Modal>
    </div>
  );
}

export default DownloadModal;
